
const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// ===============================
// ALLOWED ORDER STATUSES
// ===============================

const allowedStatuses = [
  "PENDING",
  "PENDING_CONFIRMATION",
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
  const month = String(date.getMonth() + 1).padStart(2, "0");
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

    // Validate customer object

    if (!customer || typeof customer !== "object") {
      return res.status(400).json({
        success: false,
        message: "Customer details are required",
      });
    }

    // Validate customer fields

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

    // Validate items

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required",
      });
    }

    // Validate amounts

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

    // Validate total calculation

    const calculatedTotal = subtotal + deliveryCharge;

    if (Math.abs(calculatedTotal - total) > 0.01) {
      return res.status(400).json({
        success: false,
        message:
          "Order total does not match subtotal and delivery charge",
      });
    }

    // Create order

    const order = new Order({
      orderId: generateOrderId(),
      customer,
      items,
      subtotal,
      deliveryCharge,
      total,
      status: "PENDING",
    });

    const savedOrder = await order.save();

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

    const updatedOrder =
      await Order.findOneAndUpdate(
        { orderId },
        { status: normalizedStatus },
        {
          new: true,
          runValidators: true,
        }
      ).lean();

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

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