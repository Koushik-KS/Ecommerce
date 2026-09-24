
const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Notification = require("../models/Notification");

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
  const day = String(date.getDate()).padStart(2, "0");

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
// CREATE NEW ORDER
// POST /api/orders
// ===============================

router.post("/", async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      deliveryCharge,
      total,
    } = req.body;

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
    // VALIDATE ITEMS
    // ==========================================

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required",
      });
    }

    // ==========================================
    // NORMALIZE PRODUCT IDs
    // ==========================================

    const normalizedItems = normalizeOrderItems(items);

    // ==========================================
    // VALIDATE PRODUCT IDs
    // ==========================================

    const invalidItemIndex = normalizedItems.findIndex(
      (item) =>
        !item.productId ||
        item.productId.trim() === ""
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
    // VALIDATE ITEM OBJECTS
    // ==========================================

    const invalidItemObject = normalizedItems.some(
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
    // LOG NORMALIZED ITEMS
    // ==========================================

    console.log(
      "Normalized order items:",
      JSON.stringify(normalizedItems, null, 2)
    );

    // ==========================================
    // VALIDATE AMOUNTS
    // ==========================================

    if (
      !isValidAmount(subtotal) ||
      !isValidAmount(deliveryCharge) ||
      !isValidAmount(total)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Subtotal, delivery charge, and total must be valid numbers",
      });
    }

    // ==========================================
    // VALIDATE TOTAL CALCULATION
    // ==========================================

    const calculatedTotal = subtotal + deliveryCharge;

    if (Math.abs(calculatedTotal - total) > 0.01) {
      return res.status(400).json({
        success: false,
        message:
          "Order total does not match subtotal and delivery charge",
      });
    }

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
      status: "PENDING",
    });

    const savedOrder = await order.save();

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
    // CREATE ORDER STATUS NOTIFICATION
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