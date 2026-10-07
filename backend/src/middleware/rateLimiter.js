const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for support creation: max 10 requests per minute per IP.
 */
const supportRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  standardHeaders: true, // Return standard rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many support requests from this IP. Please try again after 1 minute.',
  },
});

module.exports = {
  supportRateLimiter,
};
