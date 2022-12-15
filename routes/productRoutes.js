const express = require("express");
const productController = require("../controllers/productController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/addProduct")
  .post(authController.protect, productController.addProduct);

module.exports = router;
