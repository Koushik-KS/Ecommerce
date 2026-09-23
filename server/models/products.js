const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Product name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Product description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Product images
    images: {
      type: [String],
      required: true,
    },

    // Product brand
    brand: {
      type: String,
      default: "",
      trim: true,
    },

    // Original product price
    regularPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Discounted selling price
    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Product category
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // Available stock quantity
    countInStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Average customer rating
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // Total number of customer reviews
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Featured product status
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Product creation date
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Export Product model
exports.Product = mongoose.model(
  "Product",
  productSchema
);