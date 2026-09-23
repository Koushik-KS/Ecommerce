
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    // Order ID (optional for contact messages and reviews)
    orderId: {
      type: String,
      trim: true,
      default: "",
    },

    // Product ID (used for product reviews)
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    // Message type
    messageType: {
      type: String,
      enum: ["order", "review", "contact"],
      default: "contact",
    },

    // Customer details
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Message or review text
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Product rating (only for reviews)
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },

    // Message status
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },

    // Admin reply
    reply: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;