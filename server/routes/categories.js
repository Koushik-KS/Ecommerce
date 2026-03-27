const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});

// GET
router.get('/', async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    return res.status(500).json({ success: false });
  }

  res.send(categoryList);
});

// POST
router.post('/create', async (req, res) => {
  try {
    const limit = pLimit(2);

    const imagesToUpload = req.body.images.map((image) => {
      return limit(async () => {
        const result = await cloudinary.uploader.upload(image);
        return result;
      });
    });

    const uploadStatus = await Promise.all(imagesToUpload);

    if (!uploadStatus) {
      return res.status(500).json({
        error: "images cannot upload",
        success: false
      });
    }

    const imgurl = uploadStatus.map((item) => item.secure_url);

    let category = new Category({
      name: req.body.name,
      images: imgurl,
      color: req.body.color
    });

    category = await category.save();

    res.status(201).json(category);

  } catch (err) {
    return res.status(500).json({
      error: err.message,
      success: false
    });
  }
});

module.exports = router;