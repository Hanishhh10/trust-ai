const mongoose = require("mongoose");

const examSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  startTime: {
    type: Date,
    default: Date.now
  },

  endTime: {
    type: Date
  },

  tabSwitchCount: {
    type: Number,
    default: 0
  },

  multipleFaceCount: {
    type: Number,
    default: 0
  },

  lookingAwayCount: {
    type: Number,
    default: 0
  },

  trustScore: {
    type: Number,
    default: 100
  },

  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  }

}, { timestamps: true });

module.exports = mongoose.model("ExamSession", examSessionSchema);
