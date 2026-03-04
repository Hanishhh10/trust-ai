const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");


const { startExam } = require("../controllers/examController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/start", protect, startExam);

module.exports = router;

