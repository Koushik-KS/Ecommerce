
const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// Allowed order statuses
const allowedStatuses = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED"
];

// Generate order ID
const generateOrderId = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `ORD-${year}${month}${day}-${randomNumber}`;
};

// Create a new order
router.post("/", async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      deliveryCharge,
      total
    } = req.body;

    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer details are required"
      });
    }

    if (
      !customer.fullName ||
      !customer.mobile ||
      !customer.email ||
      !customer.address ||
      !customer.city ||
      !customer.state ||
      !customer.pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "All customer details are required"
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one item is required"
      });
    }

    if (
      typeof subtotal !== "number" ||
      typeof deliveryCharge !== "number" ||
      typeof total !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount"
      });
    }

    const order = new Order({
      orderId: generateOrderId(),
      customer,
      items,
      subtotal,
      deliveryCharge,
      total,
      status: "PENDING"
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message
    });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    });
  }
});

// Get one order by order ID
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Get single order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message
    });
  }
});

// Update order status
router.patch("/:orderId/status", async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Order status is required"
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
        allowedStatuses
      });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    console.error("Update order status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message
    });
  }
});

module.exports = router;