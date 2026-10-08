const rateLimit = require("express-rate-limit");

const supportRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

module.exports = supportRateLimiter;