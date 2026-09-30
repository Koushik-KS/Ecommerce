const express = require("express");
const mongoose = require("mongoose");

const Message = require("../models/message");

const {
  sendContactMessageToAdmin,
  sendAdminReplyEmail,
} = require("../services/emailService");

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

    // =================================================
    // VALIDATE REQUIRED FIELDS
    // =================================================

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

    const trimmedEmail =
      customerEmail.trim().toLowerCase();

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

    // =================================================
    // DETERMINE MESSAGE TYPE
    // =================================================

    const messageType = trimmedOrderId
      ? "order"
      : "contact";

    // =================================================
    // SAVE MESSAGE TO MONGODB
    // =================================================

    const newMessage = await Message.create({
      orderId: trimmedOrderId,
      customerName: trimmedName,
      customerEmail: trimmedEmail,
      message: trimmedMessage,
      messageType,
      status: "unread",
    });

    // =================================================
    // RESPOND TO CLIENT IMMEDIATELY
    // =================================================
    // The customer does not have to wait for SMTP.
    // Email will be attempted in the background.

    res.status(201).json({
      success: true,
      message:
        "Your message has been received successfully. Our team will contact you soon.",
      emailSent: false,
      data: newMessage,
    });

    // =================================================
    // SEND EMAIL TO ADMIN IN BACKGROUND
    // =================================================

    sendContactMessageToAdmin({
      customerName: trimmedName,
      customerEmail: trimmedEmail,
      orderId: trimmedOrderId,
      message: trimmedMessage,
    })
      .then(() => {
        console.log(
          "Contact notification email sent successfully to admin."
        );
      })
      .catch((emailErr) => {
        console.error(
          "Message saved to MongoDB, but admin email failed:",
          emailErr.message
        );
      });

  } catch (error) {
    console.error(
      "Create message error:",
      error
    );

    return res.status(500).json({
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

    // =================================================
    // VALIDATE REQUIRED FIELDS
    // =================================================

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

    // =================================================
    // VALIDATE PRODUCT ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const trimmedName = customerName.trim();

    const trimmedEmail =
      customerEmail.trim().toLowerCase();

    const trimmedMessage = message.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedMessage
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Customer name, email and review cannot be empty.",
      });
    }

    // =================================================
    // VALIDATE RATING
    // =================================================

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

    // =================================================
    // SAVE REVIEW
    // =================================================

    const newReview = await Message.create({
      productId,
      customerName: trimmedName,
      customerEmail: trimmedEmail,
      message: trimmedMessage,
      rating: numericRating,
      messageType: "review",
      status: "unread",
    });

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      data: newReview,
    });

  } catch (error) {
    console.error(
      "Create review error:",
      error
    );

    return res.status(500).json({
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

      // =================================================
      // VALIDATE PRODUCT ID
      // =================================================

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID.",
        });
      }

      // =================================================
      // GET REVIEWS
      // =================================================

      const reviews = await Message.find({
        productId,
        messageType: "review",
      }).sort({
        createdAt: -1,
      });

      return res.status(200).json({
        success: true,
        data: reviews,
      });

    } catch (error) {
      console.error(
        "Get product reviews error:",
        error
      );

      return res.status(500).json({
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

    return res.status(200).json({
      success: true,
      data: messages,
    });

  } catch (error) {
    console.error(
      "Get messages error:",
      error
    );

    return res.status(500).json({
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
    const { id } = req.params;

    // =================================================
    // VALIDATE MESSAGE ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID.",
      });
    }

    // =================================================
    // FIND MESSAGE
    // =================================================

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: message,
    });

  } catch (error) {
    console.error(
      "Get single message error:",
      error
    );

    return res.status(500).json({
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
    const { id } = req.params;

    // =================================================
    // VALIDATE MESSAGE ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID.",
      });
    }

    // =================================================
    // UPDATE MESSAGE
    // =================================================

    const updatedMessage =
      await Message.findByIdAndUpdate(
        id,
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

    return res.status(200).json({
      success: true,
      message: "Message marked as read.",
      data: updatedMessage,
    });

  } catch (error) {
    console.error(
      "Mark message read error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update message.",
    });
  }
});

// =====================================================
// ADMIN: REPLY TO MESSAGE + SEND EMAIL
// PATCH /api/messages/:id/reply
// =====================================================

router.patch("/:id/reply", async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    // =================================================
    // VALIDATE MESSAGE ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID.",
      });
    }

    // =================================================
    // VALIDATE REPLY
    // =================================================

    if (
      !reply ||
      typeof reply !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Reply is required.",
      });
    }

    const trimmedReply = reply.trim();

    if (!trimmedReply) {
      return res.status(400).json({
        success: false,
        message: "Reply cannot be empty.",
      });
    }

    // =================================================
    // FIND ORIGINAL CUSTOMER MESSAGE
    // =================================================

    const existingMessage =
      await Message.findById(id);

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    // =================================================
    // SAVE ADMIN REPLY
    // =================================================

    existingMessage.reply = trimmedReply;
    existingMessage.status = "replied";
    existingMessage.repliedAt = new Date();

    await existingMessage.save();

    // =================================================
    // EMAIL RESULT VARIABLES
    // =================================================

    let emailSent = false;
    let emailError = null;

    // =================================================
    // SEND REPLY EMAIL TO CUSTOMER
    // =================================================

    try {
      await sendAdminReplyEmail({
        customerName:
          existingMessage.customerName,

        customerEmail:
          existingMessage.customerEmail,

        originalMessage:
          existingMessage.message,

        adminReply:
          trimmedReply,

        orderId:
          existingMessage.orderId || "",
      });

      emailSent = true;

      // =================================================
      // UPDATE EMAIL STATUS
      // =================================================

      existingMessage.emailNotificationSent = true;
      existingMessage.emailNotificationError = "";

      await existingMessage.save();

      console.log(
        "Reply email sent successfully to:",
        existingMessage.customerEmail
      );

    } catch (emailErr) {
      emailError = emailErr.message;

      // =================================================
      // SAVE EMAIL FAILURE
      // =================================================

      existingMessage.emailNotificationSent = false;

      existingMessage.emailNotificationError =
        emailError;

      await existingMessage.save();

      console.error(
        "Reply saved, but email failed:",
        emailError
      );
    }

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,

      message: emailSent
        ? "Reply saved and email sent successfully."
        : "Reply saved, but email could not be sent.",

      emailSent,

      emailError,

      data: existingMessage,
    });

  } catch (error) {
    console.error(
      "Reply message error:",
      error
    );

    return res.status(500).json({
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
    const { id } = req.params;

    // =================================================
    // VALIDATE MESSAGE ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID.",
      });
    }

    // =================================================
    // DELETE MESSAGE
    // =================================================

    const deletedMessage =
      await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });

  } catch (error) {
    console.error(
      "Delete message error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete message.",
    });
  }
});

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;