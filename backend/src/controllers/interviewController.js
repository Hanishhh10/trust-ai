// src/controllers/interviewController.js

const InterviewSession = require("../models/interviewSession");
const { v4: uuidv4 } = require("uuid");

/* =========================
   CREATE INTERVIEW
========================= */
exports.createInterview = async (req, res) => {
  try {
    const { candidateId } = req.body;

    const session = await InterviewSession.create({
      sessionId: uuidv4(),
      interviewer: req.user.id,
      candidate: candidateId,
      status: "created",
      trustScore: 100,
      events: []
    });

    res.status(201).json({
      message: "Interview session created",
      session
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================
   START INTERVIEW
========================= */
exports.startInterview = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await InterviewSession.findOne({ sessionId });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "created") {
      return res.status(400).json({ message: "Interview already started or ended" });
    }

    session.status = "started";
    session.startTime = new Date();

    await session.save();

    res.status(200).json({
      message: "Interview started",
      session
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================
   LOG EVENT
========================= */
exports.logEvent = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { type, details } = req.body;

    const session = await InterviewSession.findOne({ sessionId });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "started") {
      return res.status(400).json({ message: "Interview not started" });
    }

    session.events.push({
      type,
      timestamp: new Date(),
      details
    });

    // Trust score logic
    if (type === "tab_switch") session.trustScore -= 5;
    if (type === "multiple_faces") session.trustScore -= 25;
    if (type === "no_face") session.trustScore -= 15;

    if (session.trustScore < 0) session.trustScore = 0;

    await session.save();

    res.status(200).json({
      message: "Event logged",
      trustScore: session.trustScore
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================
   END INTERVIEW
========================= */
exports.endInterview = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await InterviewSession.findOne({ sessionId });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "started") {
      return res.status(400).json({ message: "Interview not active" });
    }

    session.status = "ended";
    session.endTime = new Date();

    await session.save();

    res.status(200).json({
      message: "Interview ended",
      finalTrustScore: session.trustScore
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================
   GET INTERVIEW DETAILS
========================= */
exports.getInterview = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await InterviewSession.findOne({ sessionId })
      .populate("interviewer", "name email")
      .populate("candidate", "name email");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};