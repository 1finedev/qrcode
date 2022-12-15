const express = require("express");
const qrController = require("./../controllers/qrController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/generate").post(authController.protect, qrController.generate);
router.route("/getAll").get(authController.protect, qrController.getAll);

module.exports = router;
