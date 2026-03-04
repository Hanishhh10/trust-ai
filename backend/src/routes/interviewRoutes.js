const express = require("express");
const router = express.Router();

const {
  createInterview,
  startInterview,
  logEvent,
  endInterview,
  getInterview
} = require("../controllers/interviewController");

const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

/* =========================
   CREATE INTERVIEW
========================= */
router.post(
  "/create",
  protect,
  authorizeRoles("interviewer"),
  createInterview
);

/* =========================
   START INTERVIEW
========================= */
router.post(
  "/start/:sessionId",
  protect,
  startInterview
);

/* =========================
   LOG EVENT
========================= */
router.post(
  "/:sessionId/events",
  protect,
  logEvent
);

/* =========================
   END INTERVIEW
========================= */
router.post(
  "/end/:sessionId",
  protect,
  endInterview
);

/* =========================
   GET INTERVIEW DETAILS
========================= */
router.get(
  "/:sessionId",
  protect,
  getInterview
);

module.exports = router;