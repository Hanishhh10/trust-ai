const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

router.get(
  "/protected",
  protect,
  authorizeRoles("admin", "interviewer"),
  (req, res) => {
    res.json({
      message: "Protected route accessed successfully",
      user: req.user,
    });
  }
);

module.exports = router;
