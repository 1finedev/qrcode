const mongoose = require("mongoose");

const QrCodeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "QrCode name is required!"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "qrCode must belong to a user"],
    },
    imageUrl: {
      type: String,
      unique: true,
      required: [true, "Image Url is required"],
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

const QrCode = mongoose.model("QrCode", QrCodeSchema);

module.exports = QrCode;
