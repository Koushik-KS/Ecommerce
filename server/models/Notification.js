
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "ORDER",
        "ORDER_STATUS",
        "REVIEW",
        "LOW_STOCK",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    referenceId: {
      type: String,
      default: "",
      trim: true,
    },

    link: {
      type: String,
      default: "",
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({
  createdAt: -1,
});

notificationSchema.index({
  isRead: 1,
  createdAt: -1,
});

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

module.exports = Notification;