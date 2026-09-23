
const express = require("express");
const mongoose = require("mongoose");

const Review = require("../models/Review");

// IMPORTANT: Product is exported using exports.Product
const { Product } = require("../models/products");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

// =====================================================
// HELPER: VALIDATE MONGODB OBJECT ID
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// HELPER: GET USER ID FROM JWT
// =====================================================

const getUserIdFromToken = (user) => {
  if (!user) {
    return null;
  }

  return (
    user.id ||
    user._id ||
    user.userId ||
    user.user_id ||
    null
  );
};

// =====================================================
// HELPER: UPDATE PRODUCT RATING
// =====================================================

const updateProductRating = async (productId) => {
  const productReviews = await Review.find({
    product: productId,
  });

  const totalReviews = productReviews.length;

  const totalRating = productReviews.reduce(
    (total, review) => {
      return total + Number(review.rating || 0);
    },
    0
  );

  const averageRating =
    totalReviews > 0
      ? totalRating / totalReviews
      : 0;

  await Product.findByIdAndUpdate(
    productId,
    {
      rating: Number(averageRating.toFixed(1)),
      numReviews: totalReviews,
    },
    {
      new: true,
    }
  );

  return {
    averageRating: Number(averageRating.toFixed(1)),
    totalReviews,
  };
};

// =====================================================
// GET REVIEWS FOR A PRODUCT
// =====================================================

// GET /api/reviews/product/:productId

router.get(
  "/product/:productId",
  async (req, res) => {
    try {
      const { productId } = req.params;

      console.log(
        "Fetching reviews for product:",
        productId
      );

      if (!isValidObjectId(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      const reviews = await Review.find({
        product: productId,
      })
        .populate("user", "name email")
        .sort({
          createdAt: -1,
        });

      const totalReviews = reviews.length;

      const ratingDistribution = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      let totalRating = 0;

      reviews.forEach((review) => {
        const reviewRating = Number(review.rating);

        if (
          Object.prototype.hasOwnProperty.call(
            ratingDistribution,
            reviewRating
          )
        ) {
          ratingDistribution[reviewRating] += 1;
        }

        totalRating += reviewRating;
      });

      const averageRating =
        totalReviews > 0
          ? totalRating / totalReviews
          : 0;

      return res.status(200).json({
        success: true,
        totalReviews,
        averageRating: Number(
          averageRating.toFixed(1)
        ),
        ratingDistribution,
        reviews,
      });
    } catch (error) {
      console.error(
        "Get reviews error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch reviews",
      });
    }
  }
);

// =====================================================
// CREATE CUSTOMER REVIEW
// =====================================================

// POST /api/reviews

router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      // =================================================
      // DEBUG JWT USER
      // =================================================

      console.log(
        "Decoded user:",
        req.user
      );

      const userId = getUserIdFromToken(
        req.user
      );

      console.log(
        "User ID:",
        userId
      );

      console.log(
        "Review request body:",
        req.body
      );

      const {
        productId,
        rating,
        reviewText,
      } = req.body;

      // =================================================
      // VALIDATE USER ID
      // =================================================

      if (!userId) {
        console.log(
          "User ID not found in decoded token"
        );

        return res.status(401).json({
          success: false,
          message:
            "User authentication required. User ID not found in token.",
        });
      }

      if (!isValidObjectId(userId)) {
        console.log(
          "Invalid user ID:",
          userId
        );

        return res.status(400).json({
          success: false,
          message:
            "Invalid user ID in authentication token.",
        });
      }

      // =================================================
      // VALIDATE REQUIRED FIELDS
      // =================================================

      if (
        !productId ||
        rating === undefined ||
        rating === null ||
        !reviewText
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Product, rating, and review text are required.",
        });
      }

      // =================================================
      // VALIDATE PRODUCT ID
      // =================================================

      if (!isValidObjectId(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID.",
        });
      }

      // =================================================
      // VALIDATE RATING
      // =================================================

      const numericRating = Number(rating);

      if (
        !Number.isInteger(numericRating) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Rating must be an integer between 1 and 5.",
        });
      }

      // =================================================
      // VALIDATE REVIEW TEXT
      // =================================================

      if (typeof reviewText !== "string") {
        return res.status(400).json({
          success: false,
          message:
            "Review text must be a string.",
        });
      }

      const trimmedReviewText =
        reviewText.trim();

      if (
        trimmedReviewText.length < 3 ||
        trimmedReviewText.length > 1000
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Review must contain between 3 and 1000 characters.",
        });
      }

      // =================================================
      // CHECK PRODUCT
      // =================================================

      console.log(
        "Checking product:",
        productId
      );

      const product = await Product.findById(
        productId
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      console.log(
        "Product found:",
        product._id
      );

      // =================================================
      // CHECK DUPLICATE REVIEW
      // =================================================

      const existingReview =
        await Review.findOne({
          product: productId,
          user: userId,
        });

      if (existingReview) {
        return res.status(409).json({
          success: false,
          message:
            "You have already reviewed this product.",
        });
      }

      // =================================================
      // CREATE REVIEW
      // =================================================

      const review = await Review.create({
        product: productId,
        user: userId,
        rating: numericRating,
        reviewText: trimmedReviewText,
      });

      console.log(
        "Review created successfully:",
        review._id
      );

      // =================================================
      // UPDATE PRODUCT RATING
      // =================================================

      const ratingDetails =
        await updateProductRating(productId);

      console.log(
        "Updated rating details:",
        ratingDetails
      );

      // =================================================
      // POPULATE USER DETAILS
      // =================================================

      const populatedReview =
        await Review.findById(
          review._id
        ).populate(
          "user",
          "name email"
        );

      // =================================================
      // SUCCESS RESPONSE
      // =================================================

      return res.status(201).json({
        success: true,
        message:
          "Review submitted successfully.",
        review: populatedReview,
        averageRating:
          ratingDetails.averageRating,
        totalReviews:
          ratingDetails.totalReviews,
      });
    } catch (error) {
      console.error(
        "Create review error:",
        error
      );

      // Duplicate index error
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message:
            "You have already reviewed this product.",
        });
      }

      // Invalid MongoDB ObjectId
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message:
            "Invalid product or user ID.",
        });
      }

      return res.status(500).json({
        success: false,
        message:
          "Failed to submit review.",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      });
    }
  }
);

// =====================================================
// ADMIN REPLY TO REVIEW
// =====================================================

// PATCH /api/reviews/:reviewId/reply

router.patch(
  "/:reviewId/reply",
  async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { adminReply } = req.body;

      if (!isValidObjectId(reviewId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid review ID.",
        });
      }

      if (typeof adminReply !== "string") {
        return res.status(400).json({
          success: false,
          message:
            "Admin reply must be a string.",
        });
      }

      const trimmedReply = adminReply.trim();

      if (
        trimmedReply.length < 3 ||
        trimmedReply.length > 1000
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Reply must contain between 3 and 1000 characters.",
        });
      }

      const review = await Review.findById(
        reviewId
      );

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found.",
        });
      }

      review.adminReply = trimmedReply;
      review.repliedAt = new Date();

      await review.save();

      const updatedReview =
        await Review.findById(
          review._id
        ).populate(
          "user",
          "name email"
        );

      return res.status(200).json({
        success: true,
        message:
          "Admin reply saved successfully.",
        review: updatedReview,
      });
    } catch (error) {
      console.error(
        "Admin reply error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to save admin reply.",
      });
    }
  }
);

// =====================================================
// DELETE ADMIN REPLY
// =====================================================

// DELETE /api/reviews/:reviewId/reply

router.delete(
  "/:reviewId/reply",
  async (req, res) => {
    try {
      const { reviewId } = req.params;

      if (!isValidObjectId(reviewId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid review ID.",
        });
      }

      const review = await Review.findById(
        reviewId
      );

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found.",
        });
      }

      review.adminReply = "";
      review.repliedAt = null;

      await review.save();

      const updatedReview =
        await Review.findById(
          review._id
        ).populate(
          "user",
          "name email"
        );

      return res.status(200).json({
        success: true,
        message:
          "Admin reply deleted successfully.",
        review: updatedReview,
      });
    } catch (error) {
      console.error(
        "Delete admin reply error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete admin reply.",
      });
    }
  }
);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;