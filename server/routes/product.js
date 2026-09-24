
const express = require("express");
const router = express.Router();

const pLimit = require("p-limit");
const cloudinary = require("cloudinary").v2;

const { Category } = require("../models/category");
const { Product } = require("../models/products");
const Notification = require("../models/Notification");

// =====================================================
// LOW STOCK CONFIGURATION
// =====================================================

const LOW_STOCK_THRESHOLD = 5;

// =====================================================
// CREATE LOW STOCK NOTIFICATION
// =====================================================

const createLowStockNotification = async (product) => {
  try {
    if (product.countInStock > LOW_STOCK_THRESHOLD) {
      return;
    }

    await Notification.create({
      type: "LOW_STOCK",
      title: "Low stock alert",
      message: `${product.name} has only ${product.countInStock} item(s) remaining in stock.`,
      referenceId: product._id.toString(),
      link: `/products/${product._id}`,
      isRead: false,
    });

    console.log(
      `Low stock notification created for ${product.name}`
    );
  } catch (error) {
    console.error(
      "Low stock notification error:",
      error.message
    );
  }
};

// =====================================================
// GET ALL PRODUCTS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const productList = await Product.find().populate("category");

    return res.status(200).json(productList);
  } catch (error) {
    console.error("Get products error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch products",
      error: error.message,
    });
  }
});

// =====================================================
// CREATE PRODUCT
// =====================================================

router.post("/create", async (req, res) => {
  try {
    const {
      name,
      description,
      images,
      brand,
      regularPrice,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    // Validate required fields

    if (
      !name ||
      !description ||
      !category ||
      !Array.isArray(images) ||
      images.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, description, category and images are required",
      });
    }

    // Check whether the category exists

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Invalid category",
      });
    }

    // Upload images to Cloudinary

    const limit = pLimit(2);

    const imagesToUpload = images.map((image) => {
      return limit(async () => {
        const result = await cloudinary.uploader.upload(image);

        return result.secure_url;
      });
    });

    const imageUrls = await Promise.all(imagesToUpload);

    if (!imageUrls || imageUrls.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Images could not be uploaded",
      });
    }

    // Create product

    const product = new Product({
      name: name.trim(),
      description: description.trim(),
      images: imageUrls,
      brand: brand || "",

      regularPrice: Number(regularPrice) || 0,
      price: Number(price) || 0,

      category,

      countInStock: Number(countInStock) || 0,

      rating: Number(rating) || 0,
      numReviews: Number(numReviews) || 0,

      isFeatured: Boolean(isFeatured),
    });

    const savedProduct = await product.save();

    // Create low stock notification

    await createLowStockNotification(savedProduct);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Create product error:", error);

    return res.status(500).json({
      success: false,
      message: "Product could not be created",
      error: error.message,
    });
  }
});

// =====================================================
// GET PRODUCT BY ID
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Get product error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch product",
      error: error.message,
    });
  }
});

// =====================================================
// DELETE PRODUCT
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    return res.status(500).json({
      success: false,
      message: "Product could not be deleted",
      error: error.message,
    });
  }
});

// =====================================================
// UPDATE PRODUCT
// =====================================================

router.put("/:id", async (req, res) => {
  try {
    // Find existing product

    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Store previous stock value

    const previousStock = existingProduct.countInStock;

    const {
      name,
      description,
      images,
      brand,
      regularPrice,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    // Keep old images by default

    let imageUrls = existingProduct.images;

    // Upload new images if provided

    if (Array.isArray(images) && images.length > 0) {
      const limit = pLimit(2);

      const imagesToUpload = images.map((image) => {
        return limit(async () => {
          const result = await cloudinary.uploader.upload(image);

          return result.secure_url;
        });
      });

      imageUrls = await Promise.all(imagesToUpload);
    }

    // Update basic product details

    if (name !== undefined) {
      existingProduct.name = name.trim();
    }

    if (description !== undefined) {
      existingProduct.description = description.trim();
    }

    existingProduct.images = imageUrls;

    if (brand !== undefined) {
      existingProduct.brand = brand;
    }

    // Update regular price

    if (regularPrice !== undefined) {
      existingProduct.regularPrice = Number(regularPrice);
    }

    // Update selling price

    if (price !== undefined) {
      existingProduct.price = Number(price);
    }

    // Update category

    if (category !== undefined) {
      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: "Invalid category",
        });
      }

      existingProduct.category = category;
    }

    // Update stock

    if (countInStock !== undefined) {
      existingProduct.countInStock = Number(countInStock);
    }

    // Update rating

    if (rating !== undefined) {
      existingProduct.rating = Number(rating);
    }

    // Update number of reviews

    if (numReviews !== undefined) {
      existingProduct.numReviews = Number(numReviews);
    }

    // Update featured status

    if (isFeatured !== undefined) {
      existingProduct.isFeatured = Boolean(isFeatured);
    }

    // Save updated product

    const updatedProduct = await existingProduct.save();

    // Create notification only when stock enters low-stock level

    const currentStock = updatedProduct.countInStock;

    if (
      previousStock > LOW_STOCK_THRESHOLD &&
      currentStock <= LOW_STOCK_THRESHOLD
    ) {
      await createLowStockNotification(updatedProduct);
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);

    return res.status(500).json({
      success: false,
      message: "Product could not be updated",
      error: error.message,
    });
  }
});

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;