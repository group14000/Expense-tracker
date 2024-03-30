const express = require("express");
const router = express.Router();
const {
  signupController,
  loginController,
} = require("../controllers/userController");

router.post("/signup", signupController.createUser);
router.post("/login", loginController.loginUser);

module.exports = router;
