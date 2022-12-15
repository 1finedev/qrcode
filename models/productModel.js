const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required!"],
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      unique: true,
      required: [true, "ImageUrl is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Product must belong to a User"],
    },
    catalogName: String,
    catalogId: {
      type: String,
      required: [true, "catalogId is required"],
    },
    businessName: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
