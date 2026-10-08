const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const supportRoutes = require("./routes/supportRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// Parse JSON
app.use(express.json());

// Connect to database
connectDB();

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

// Routes
app.use("/api/support", supportRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;