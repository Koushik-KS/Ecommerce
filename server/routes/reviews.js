const express = require("express");

const Review = require("../models/Review");
const Product = require("../models/products");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

// =====================================================
// GET REVIEWS FOR A PRODUCT
// =====================================================

// GET /api/reviews/product/:productId

router.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({
      product: productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews > 0
        ? reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / totalReviews
        : 0;

    res.status(200).json({
      success: true,
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      reviews,
    });
  } catch (error) {
    console.error("Get reviews error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
});

// =====================================================
// CREATE A REVIEW
// =====================================================

// POST /api/reviews

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      productId,
      rating,
      reviewText,
    } = req.body;

    const userId = req.user.id;

    // Validate required fields
    if (!productId || !rating || !reviewText) {
      return res.status(400).json({
        success: false,
        message:
          "Product, rating, and review text are required",
      });
    }

    // Validate rating
    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5",
      });
    }

    // Validate review length
    const trimmedReviewText = reviewText.trim();

    if (
      trimmedReviewText.length < 3 ||
      trimmedReviewText.length > 1000
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Review must contain between 3 and 1000 characters",
      });
    }

    // Check whether product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check whether customer already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message:
          "You have already reviewed this product",
      });
    }

    // Create review
    const review = await Review.create({
      product: productId,
      user: userId,
      rating: numericRating,
      reviewText: trimmedReviewText,
    });

    // Recalculate product rating
    const productReviews = await Review.find({
      product: productId,
    });

    const totalReviews = productReviews.length;

    const averageRating =
      productReviews.reduce(
        (total, currentReview) =>
          total + currentReview.rating,
        0
      ) / totalReviews;

    // Update product rating information
    product.rating = Number(averageRating.toFixed(1));
    product.numReviews = totalReviews;

    await product.save();

    // Return created review with customer name
    const populatedReview = await Review.findById(
      review._id
    ).populate("user", "name");

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review: populatedReview,
      averageRating: product.rating,
      totalReviews: product.numReviews,
    });
  } catch (error) {
    console.error("Create review error:", error);

    // Handle duplicate index error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "You have already reviewed this product",
      });
    }

    // Handle invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit review",
    });
  }
});

module.exports = router;