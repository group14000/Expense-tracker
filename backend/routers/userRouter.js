const express = require("express");
const router = express.Router();
const {
  signupController,
  loginController,
} = require("../controllers/userController");

router.post("/", signupController.createUser); 
router.post("/", loginController.loginUser); 

module.exports = router;
