const {Category}=require('../models/category');
const  express = require('express');
const router=express.Router();
const pLimit = require('p-limit');
const cloudinary =require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret,
});


router.get(`/`,async(RegExp,res)=>{
    const categoryList=await Category.find();

    if(!categoryList){
        res.status(500).json({sucess:false})
    }
    res.send(categoryList);
});

router.post('/create', async (req, res) => {

  const limit = pLimit(2);

  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);
      return result;
    });
  });

  const uploadStatus = await Promise.all(imagesToUpload);

  const imgurl = uploadStatus.map((item) => {
    return item.secure_url
  });

});

if(!uploadStatus){
  return res.status(500).json({
    error: "images cannot upload",
    status: false
  })
}

let category = new Category({
  name: req.body.name,
  images: imgurl,
  color: req.body.color
});

if (!category) {
  return res.status(500).json({
    error: err,
    success: false
  });
}

category = await category.save();

res.status(201).json(category);


module.exports=router;