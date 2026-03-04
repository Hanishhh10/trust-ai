const ExamSession = require("../models/ExamSession");

const startExam = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const session = await ExamSession.create({
      user: req.user._id
    });

    res.status(201).json({
      message: "Exam session started",
      sessionId: session._id
    });

  } catch (error) {
    console.error("Start Exam Error:", error);
    res.status(500).json({
      message: "Error starting exam",
      error: error.message
    });
  }
};

module.exports = { startExam };
