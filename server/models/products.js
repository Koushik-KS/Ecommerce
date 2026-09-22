const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    // Original product price
    regularPrice: {
      type: Number,
      default: 0,
    },

    // Discounted selling price
    price: {
      type: Number,
      default: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // Available stock quantity
    countInStock: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

exports.Product = mongoose.model("Product", productSchema);