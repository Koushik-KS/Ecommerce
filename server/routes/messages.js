
const express = require("express");
const mongoose = require("mongoose");

const Message = require("../models/message");

const router = express.Router();

// =====================================================
// CUSTOMER: SEND CONTACT OR ORDER MESSAGE
// POST /api/messages
// =====================================================

router.post("/", async (req, res) => {
  try {
    const {
      orderId,
      customerName,
      customerEmail,
      message,
    } = req.body;

    // Validate required fields
    if (
      !customerName ||
      !customerEmail ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Customer name, email and message are required.",
      });
    }

    const trimmedName = customerName.trim();
    const trimmedEmail = customerEmail.trim().toLowerCase();
    const trimmedMessage = message.trim();
    const trimmedOrderId = orderId
      ? orderId.trim()
      : "";

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedMessage
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Customer name, email and message cannot be empty.",
      });
    }

    // Order ID exists = order message
    // No Order ID = contact message
    const messageType = trimmedOrderId
      ? "order"
      : "contact";

    const newMessage = await Message.create({
      orderId: trimmedOrderId,
      customerName: trimmedName,
      customerEmail: trimmedEmail,
      message: trimmedMessage,
      messageType,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Create message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  }
});

// =====================================================
// CUSTOMER: SUBMIT PRODUCT REVIEW
// POST /api/messages/review
// =====================================================

router.post("/review", async (req, res) => {
  try {
    const {
      productId,
      customerName,
      customerEmail,
      message,
      rating,
    } = req.body;

    if (
      !productId ||
      !customerName ||
      !customerEmail ||
      !message ||
      rating === undefined ||
      rating === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Product ID, customer name, email, review and rating are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isFinite(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    const newReview = await Message.create({
      productId,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      message: message.trim(),
      rating: numericRating,
      messageType: "review",
      status: "unread",
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      data: newReview,
    });
  } catch (error) {
    console.error("Create review error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit review.",
    });
  }
});

// =====================================================
// CUSTOMER: GET REVIEWS FOR A PRODUCT
// GET /api/messages/product/:productId
// =====================================================

router.get(
  "/product/:productId",
  async (req, res) => {
    try {
      const { productId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID.",
        });
      }

      const reviews = await Message.find({
        productId,
        messageType: "review",
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      console.error(
        "Get product reviews error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to fetch product reviews.",
      });
    }
  }
);

// =====================================================
// ADMIN: GET ALL MESSAGES
// GET /api/messages
// =====================================================

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages.",
    });
  }
});

// =====================================================
// ADMIN: GET ONE MESSAGE
// GET /api/messages/:id
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(
      req.params.id
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error(
      "Get single message error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch message.",
    });
  }
});

// =====================================================
// ADMIN: MARK MESSAGE AS READ
// PATCH /api/messages/:id/read
// =====================================================

router.patch("/:id/read", async (req, res) => {
  try {
    const updatedMessage =
      await Message.findByIdAndUpdate(
        req.params.id,
        {
          status: "read",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error(
      "Mark message read error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update message.",
    });
  }
});

// =====================================================
// ADMIN: REPLY TO MESSAGE
// PATCH /api/messages/:id/reply
// =====================================================

router.patch("/:id/reply", async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply || !reply.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply is required.",
      });
    }

    const updatedMessage =
      await Message.findByIdAndUpdate(
        req.params.id,
        {
          reply: reply.trim(),
          status: "replied",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reply saved successfully.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error(
      "Reply message error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to save reply.",
    });
  }
});

// =====================================================
// ADMIN: DELETE MESSAGE
// DELETE /api/messages/:id
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const deletedMessage =
      await Message.findByIdAndDelete(
        req.params.id
      );

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete message error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete message.",
    });
  }
});

module.exports = router;