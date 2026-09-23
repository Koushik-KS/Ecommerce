
const express = require("express");

const Message = require("../models/message");

const router = express.Router();

// =====================================================
// CUSTOMER: SEND MESSAGE ABOUT AN ORDER
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

    if (
      !orderId ||
      !customerName ||
      !customerEmail ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order ID, customer name, email and message are required.",
      });
    }

    const newMessage = await Message.create({
      orderId,
      customerName,
      customerEmail,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error(
      "Create message error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to send message.",
    });
  }
});

// =====================================================
// ADMIN: GET ALL MESSAGES
// GET /api/messages
// =====================================================

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error(
      "Get messages error:",
      error
    );

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