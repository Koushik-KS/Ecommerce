
const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    general: {
      storeName: {
        type: String,
        default: "Sparsha Kitchen",
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },

      address: {
        type: String,
        default: "",
        trim: true,
      },

      city: {
        type: String,
        default: "",
        trim: true,
      },

      state: {
        type: String,
        default: "",
        trim: true,
      },

      pincode: {
        type: String,
        default: "",
        trim: true,
      },
    },

    delivery: {
      deliveryCharge: {
        type: Number,
        default: 0,
        min: 0,
      },

      freeDeliveryAbove: {
        type: Number,
        default: 500,
        min: 0,
      },

      minimumOrderAmount: {
        type: Number,
        default: 100,
        min: 0,
      },

      estimatedDeliveryTime: {
        type: String,
        default: "30-45 minutes",
        trim: true,
      },

      deliveryEnabled: {
        type: Boolean,
        default: true,
      },

      freeDeliveryEnabled: {
        type: Boolean,
        default: true,
      },
    },

    order: {
      acceptOrders: {
        type: Boolean,
        default: true,
      },

      defaultStatus: {
        type: String,
        enum: [
          "PENDING",
          "CONFIRMED",
          "PROCESSING",
          "SHIPPED",
          "DELIVERED",
          "CANCELLED",
        ],
        default: "PENDING",
      },

      cashOnDelivery: {
        type: Boolean,
        default: true,
      },

      autoCancelEnabled: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;