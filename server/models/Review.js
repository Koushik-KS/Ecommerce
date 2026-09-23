const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // =========================
    // PRODUCT REFERENCE
    // =========================

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // =========================
    // CUSTOMER REFERENCE
    // =========================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // =========================
    // RATING
    // =========================

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // =========================
    // REVIEW TEXT
    // =========================

    reviewText: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 1000,
    },

    // =========================
    // ADMIN REPLY
    // =========================

    adminReply: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    repliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// =========================
// ONE REVIEW PER USER PER PRODUCT
// =========================

reviewSchema.index(
  {
    product: 1,
    user: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "Review",
  reviewSchema
);