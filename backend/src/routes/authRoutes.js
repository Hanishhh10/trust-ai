const express = require("express");
const router = express.Router();

// controllers (we will create next)
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
