const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});

// GET all
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    return res.status(500).json({ success: false }); // ✅ return added
  }

  res.send(categoryList);
});

// GET by ID
router.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(500).json({ message: 'The category with the given ID was not found' }); // ✅ return added
  }

  return res.status(200).send(category);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const deleteUser = await Category.findByIdAndDelete(req.params.id);

  if (!deleteUser) {
    return res.status(404).json({ message: 'The category not found', success: false }); // ✅ return added
  }

  res.status(200).json({ message: 'The category is deleted', success: true });
});

// POST create
router.post('/create', async (req, res) => {
  const limit = pLimit(2);

  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);
      return result;
    });
  });

  const uploadStatus = await Promise.all(imagesToUpload);

  if (!uploadStatus) {
    return res.status(500).json({ error: 'images cannot upload', success: false });
  }

  const imgurl = uploadStatus.map((item) => item.secure_url);

  let category = new Category({
    name: req.body.name,
    images: imgurl,
    color: req.body.color,
  });

  category = await category.save();

  res.status(201).json(category);
});

// PUT update
router.put('/:id', async (req, res) => {
  const imagesToUpload = req.body.images.map(async (image) => {
    const result = await cloudinary.uploader.upload(image);
    return result;
  });

  const uploadStatus = await Promise.all(imagesToUpload);

  if (!uploadStatus || uploadStatus.length === 0) {
    return res.status(500).json({ message: 'images cannot upload', success: false });
  }

  const imgurl = uploadStatus.map((item) => item.secure_url);

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, images: imgurl, color: req.body.color },
    { new: true }
  );

  if (!category) {
    return res.status(404).json({ message: 'The category cannot be updated', success: false });
  }

  res.send(category);
});

module.exports = router;