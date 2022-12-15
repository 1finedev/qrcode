const Product = require("../models/productModel");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addProduct = async (req, res, next) => {
  const {
    catalogId,
    catalogName,
    businessName,
    productName,
    description,
    image,
    price,
  } = req.body;

  const uploadResponse = await cloudinary.uploader.upload(image);
  const imageUrl = uploadResponse.secure_url;

  console.log(req.body);

  const catalog = await Product.create({
    catalogId,
    productName,
    catalogName,
    businessName,
    description,
    imageUrl,
    price,
    user: req.user._id,
  }).catch((err) => console.log(err));
  res.status(200).json({
    status: "success",
    data: catalog,
  });
};
