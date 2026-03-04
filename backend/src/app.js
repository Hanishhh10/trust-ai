const express = require("express");
const examRoutes = require("./routes/examRoutes");
const app = express();

// middleware
app.use(express.json());

// health check route
app.get("/health", (req, res) => {
  res.json({ status: "TRUST AI backend running" });
});

// auth routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/exam", examRoutes);
app.use("/api/interview", require("./routes/interviewRoutes"));

module.exports = app;

