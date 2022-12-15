const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.route("/:id").get(userController.getUser);
router
  .route("/session")
  .get(authController.protect, authController.authenticated);
router.post("/login", authController.login);
router.route("/signup").post(authController.signUp);
router.route("/logout").get(authController.logout);

module.exports = router;
