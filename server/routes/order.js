
const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Notification = require("../models/Notification");
const Settings = require("../models/Settings");

const {
  sendOrderConfirmationEmail,
} = require("../services/emailService");

// ===============================
// ALLOWED ORDER STATUSES
// ===============================

const allowedStatuses = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

// ===============================
// GENERATE ORDER ID
// ===============================

const generateOrderId = () => {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(
    2,
    "0"
  );

  const day = String(date.getDate()).padStart(
    2,
    "0"
  );

  const randomNumber = Math.floor(
    1000 + Math.random() * 9000
  );

  return `ORD-${year}${month}${day}-${randomNumber}`;
};

// ===============================
// VALIDATE AMOUNT
// ===============================

const isValidAmount = (amount) => {
  return (
    typeof amount === "number" &&
    Number.isFinite(amount) &&
    amount >= 0
  );
};

// ===============================
// ROUND AMOUNT
// ===============================

const roundAmount = (amount) => {
  return Number(Number(amount).toFixed(2));
};

// ===============================
// NORMALIZE ORDER ITEMS
// ===============================

const normalizeOrderItems = (items) => {
  return items.map((item) => {
    const productId =
      item.productId ||
      item._id ||
      item.id ||
      item.product?._id ||
      item.product?.id;

    return {
      ...item,
      productId: productId
        ? String(productId)
        : undefined,
    };
  });
};

// ===============================
// LOAD STORE SETTINGS
// ===============================

const getStoreSettings = async () => {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  return settings;
};

// ===============================
// CREATE NEW ORDER
// POST /api/orders
// ===============================

router.post("/", async (req, res) => {
  try {
    const {
      customer,
      items,
    } = req.body;

    // ==========================================
    // LOAD ADMIN SETTINGS
    // ==========================================

    const settings = await getStoreSettings();

    const deliverySettings = settings.delivery || {};

    const orderSettings = settings.order || {};

    // ==========================================
    // CHECK WHETHER ORDERS ARE ACCEPTED
    // ==========================================

    if (orderSettings.acceptOrders === false) {
      return res.status(403).json({
        success: false,
        message:
          "Orders are currently unavailable. Please try again later.",
      });
    }

    // ==========================================
    // CHECK DELIVERY AVAILABILITY
    // ==========================================

    if (deliverySettings.deliveryEnabled === false) {
      return res.status(403).json({
        success: false,
        message:
          "Delivery is currently unavailable. Please try again later.",
      });
    }

    // ==========================================
    // CHECK CASH ON DELIVERY
    // ==========================================

    if (orderSettings.cashOnDelivery === false) {
      return res.status(403).json({
        success: false,
        message:
          "Cash on Delivery is currently unavailable.",
      });
    }

    // ==========================================
    // VALIDATE CUSTOMER OBJECT
    // ==========================================

    if (
      !customer ||
      typeof customer !== "object" ||
      Array.isArray(customer)
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer details are required",
      });
    }

    // ==========================================
    // VALIDATE CUSTOMER FIELDS
    // ==========================================

    const requiredCustomerFields = [
      "fullName",
      "mobile",
      "email",
      "address",
      "city",
      "state",
      "pincode",
    ];

    const missingCustomerField =
      requiredCustomerFields.find(
        (field) =>
          !customer[field] ||
          String(customer[field]).trim() === ""
      );

    if (missingCustomerField) {
      return res.status(400).json({
        success: false,
        message: `${missingCustomerField} is required`,
      });
    }

    // ==========================================
    // VALIDATE CUSTOMER MOBILE NUMBER
    // ==========================================

    if (!/^[6-9]\d{9}$/.test(String(customer.mobile))) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit mobile number",
      });
    }

    // ==========================================
    // VALIDATE CUSTOMER EMAIL
    // ==========================================

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        String(customer.email)
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    // ==========================================
    // VALIDATE CUSTOMER PINCODE
    // ==========================================

    if (!/^\d{6}$/.test(String(customer.pincode))) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 6-digit pincode",
      });
    }

    // ==========================================
    // VALIDATE ITEMS
    // ==========================================

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required",
      });
    }

    // ==========================================
    // VALIDATE ITEM OBJECTS
    // ==========================================

    const invalidItemObject = items.some(
      (item) =>
        !item ||
        typeof item !== "object" ||
        Array.isArray(item)
    );

    if (invalidItemObject) {
      return res.status(400).json({
        success: false,
        message: "Invalid order item details",
      });
    }

    // ==========================================
    // NORMALIZE PRODUCT IDS
    // ==========================================

    const normalizedItems = normalizeOrderItems(items);

    // ==========================================
    // VALIDATE PRODUCT IDS
    // ==========================================

    const invalidItemIndex = normalizedItems.findIndex(
      (item) =>
        !item.productId ||
        String(item.productId).trim() === ""
    );

    if (invalidItemIndex !== -1) {
      return res.status(400).json({
        success: false,
        message: `Product ID is missing for item ${
          invalidItemIndex + 1
        }`,
      });
    }

    // ==========================================
    // VALIDATE ITEM PRICE AND QUANTITY
    // ==========================================

    const invalidPriceOrQuantity =
      normalizedItems.findIndex((item) => {
        const price = Number(
          item.price ||
            item.salePrice ||
            item.product?.price ||
            0
        );

        const quantity = Number(item.quantity || 0);

        return (
          !Number.isFinite(price) ||
          price < 0 ||
          !Number.isFinite(quantity) ||
          !Number.isInteger(quantity) ||
          quantity <= 0
        );
      });

    if (invalidPriceOrQuantity !== -1) {
      return res.status(400).json({
        success: false,
        message:
          "Each item must have a valid price and quantity",
      });
    }

    // ==========================================
    // CALCULATE SUBTOTAL ON SERVER
    // ==========================================

    const calculatedSubtotal = normalizedItems.reduce(
      (total, item) => {
        const price = Number(
          item.price ||
            item.salePrice ||
            item.product?.price ||
            0
        );

        const quantity = Number(item.quantity || 1);

        return total + price * quantity;
      },
      0
    );

    const subtotal = roundAmount(calculatedSubtotal);

    // ==========================================
    // GET DELIVERY SETTINGS
    // ==========================================

    const deliveryChargeAmount = Math.max(
      0,
      Number(deliverySettings.deliveryCharge || 0)
    );

    const freeDeliveryAbove = Math.max(
      0,
      Number(deliverySettings.freeDeliveryAbove || 0)
    );

    const minimumOrderAmount = Math.max(
      0,
      Number(deliverySettings.minimumOrderAmount || 0)
    );

    const freeDeliveryEnabled =
      deliverySettings.freeDeliveryEnabled !== false;

    // ==========================================
    // VALIDATE MINIMUM ORDER AMOUNT
    // ==========================================

    if (subtotal < minimumOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ₹${minimumOrderAmount}. Your subtotal is ₹${subtotal}.`,
      });
    }

    // ==========================================
    // CALCULATE DELIVERY CHARGE ON SERVER
    // ==========================================

    const isEligibleForFreeDelivery =
      freeDeliveryEnabled &&
      freeDeliveryAbove > 0 &&
      subtotal >= freeDeliveryAbove;

    const deliveryCharge = isEligibleForFreeDelivery
      ? 0
      : roundAmount(deliveryChargeAmount);

    // ==========================================
    // CALCULATE FINAL TOTAL ON SERVER
    // ==========================================

    const total = roundAmount(
      subtotal + deliveryCharge
    );

    // ==========================================
    // SELECT DEFAULT ORDER STATUS
    // ==========================================

    const configuredDefaultStatus =
      String(
        orderSettings.defaultStatus || "PENDING"
      ).toUpperCase();

    const defaultStatus = allowedStatuses.includes(
      configuredDefaultStatus
    )
      ? configuredDefaultStatus
      : "PENDING";

    // ==========================================
    // LOG ORDER CALCULATION
    // ==========================================

    console.log("Order calculation:", {
      subtotal,
      deliveryCharge,
      total,
      minimumOrderAmount,
      freeDeliveryAbove,
      isEligibleForFreeDelivery,
      defaultStatus,
    });

    // ==========================================
    // CREATE ORDER
    // ==========================================

    const order = new Order({
      orderId: generateOrderId(),
      customer,
      items: normalizedItems,
      subtotal,
      deliveryCharge,
      total,
      status: defaultStatus,
    });

    const savedOrder = await order.save();

    // ==========================================
    // SEND ORDER CONFIRMATION EMAIL
    // ==========================================

    try {
      await sendOrderConfirmationEmail({
        customerName: savedOrder.customer.fullName,

        customerEmail: savedOrder.customer.email,

        orderId: savedOrder.orderId,

        items: savedOrder.items,

        subtotal: savedOrder.subtotal,

        deliveryCharge: savedOrder.deliveryCharge,

        total: savedOrder.total,
      });

      console.log(
        "Order confirmation email sent successfully."
      );
    } catch (emailError) {
      console.error(
        "Order confirmation email error:",
        emailError.message
      );
    }

    // ==========================================
    // CREATE NEW ORDER NOTIFICATION
    // ==========================================

    try {
      await Notification.create({
        type: "ORDER",
        title: "New order received",
        message: `New order ${
          savedOrder.orderId
        } was placed by ${
          savedOrder.customer.fullName
        }.`,
        referenceId: savedOrder.orderId,
        link: `/orders/${savedOrder.orderId}`,
        isRead: false,
      });
    } catch (notificationError) {
      console.error(
        "New order notification error:",
        notificationError.message
      );
    }

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
});

// ===============================
// GET ALL ORDERS
// GET /api/orders
// ===============================

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// ===============================
// GET ONE ORDER
// GET /api/orders/:orderId
// ===============================

router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({
      orderId,
    }).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get single order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});

// ===============================
// UPDATE ORDER STATUS
// PATCH /api/orders/:orderId/status
// ===============================

router.patch("/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // ==========================================
    // VALIDATE STATUS
    // ==========================================

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Order status is required",
      });
    }

    const normalizedStatus = String(status).toUpperCase();

    if (!allowedStatuses.includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
        allowedStatuses,
      });
    }

    // ==========================================
    // FIND EXISTING ORDER
    // ==========================================

    const existingOrder = await Order.findOne({
      orderId,
    });

    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const previousStatus = existingOrder.status;

    // ==========================================
    // UPDATE ORDER STATUS
    // ==========================================

    existingOrder.status = normalizedStatus;

    const updatedOrder = await existingOrder.save();

    // ==========================================
    // CREATE STATUS NOTIFICATION
    // ==========================================

    if (previousStatus !== normalizedStatus) {
      try {
        await Notification.create({
          type: "ORDER_STATUS",
          title: "Order status updated",
          message: `Order ${orderId} status changed from ${previousStatus} to ${normalizedStatus}.`,
          referenceId: orderId,
          link: `/orders/${orderId}`,
          isRead: false,
        });
      } catch (notificationError) {
        console.error(
          "Order status notification error:",
          notificationError.message
        );
      }
    }

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
});

// ===============================
// EXPORT ROUTER
// ===============================

module.exports = router;