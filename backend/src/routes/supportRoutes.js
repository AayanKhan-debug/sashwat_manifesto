const express = require('express');
const router = express.Router();
const { getSupportCount, addSupport } = require('../controllers/supportController');
const { supportRateLimiter } = require('../middleware/rateLimiter');

// GET /api/support - Retrieve verified database count
router.get('/', getSupportCount);

// POST /api/support - Record an anonymous support action (rate limited)
router.post('/', supportRateLimiter, addSupport);

module.exports = router;
