const qr = require("qrcode");
const cloudinary = require("cloudinary");
const QrCode = require("../models/QrCodeModel");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.generate = async (req, res, next) => {
  const { type, name, catalogId } = req.body;

  console.log(req.body);
  if (!req.user._id)
    return res.status(400).json({
      status: "Error",
      message: "Please log in to access this route!",
    }); // redirect

  const urlLink = `http://localhost:5001/${type}?catlogId=${catalogId}`;

  qr.toDataURL(urlLink, async (err, url) => {
    try {
      const uploadResponse = await cloudinary.uploader.upload(url);
      const qrCode = uploadResponse.secure_url;
      const response = await QrCode.create({
        type,
        name,
        imageUrl: qrCode,
        user: req.user._id,
      });
      res.status(200).json({ status: "success", response });
    } catch (error) {
      res.status(500).json({ status: "Error", message: "Upload Failed" });
    }
  });
};

exports.getAll = async (req, res, next) => {
  const all = await QrCode.find({ user: req.user._id });

  return res.status(200).json({ status: "Success", data: all });
};
