const express = require("express");

const {
  getSupportCount,
  addSupport,
} = require("../controllers/supportController");

const supportRateLimiter = require("../middleware/rateLimiter");

const router = express.Router();

router.get("/", getSupportCount);

router.post("/", supportRateLimiter, addSupport);

module.exports = router;