
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    brand: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },

    customer: {
      fullName: {
        type: String,
        required: true,
        trim: true
      },

      mobile: {
        type: String,
        required: true,
        trim: true
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },

      address: {
        type: String,
        required: true,
        trim: true
      },

      city: {
        type: String,
        required: true,
        trim: true
      },

      state: {
        type: String,
        required: true,
        trim: true
      },

      pincode: {
        type: String,
        required: true,
        trim: true
      }
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one product"
      }
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    },

    deliveryCharge: {
      type: Number,
      default: 0,
      min: 0
    },

    total: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED"
      ],
      default: "PENDING"
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;