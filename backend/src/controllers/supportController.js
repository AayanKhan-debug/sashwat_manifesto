const Support = require('../models/Support');

/**
 * Validates the visitorId string.
 * Must be non-empty string between 10 and 128 characters, containing safe alphanumeric or hyphen characters.
 */
const isValidVisitorId = (id) => {
  if (!id || typeof id !== 'string') return false;
  const trimmed = id.trim();
  if (trimmed.length < 5 || trimmed.length > 128) return false;
  // Validates standard UUIDs, alphanumeric tokens with hyphens/underscores
  const safeIdRegex = /^[a-zA-Z0-9_-]+$/;
  return safeIdRegex.test(trimmed);
};

/**
 * @route   GET /api/support
 * @desc    Get total count of verified support actions from MongoDB
 * @access  Public
 */
const getSupportCount = async (req, res, next) => {
  try {
    const count = await Support.countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/support
 * @desc    Record an anonymous support action for Sashwat Kumar's campaign
 * @access  Public (Rate-limited)
 */
const addSupport = async (req, res, next) => {
  try {
    const { visitorId } = req.body;

    // 1. Validate visitorId presence and format
    if (!visitorId || !isValidVisitorId(visitorId)) {
      return res.status(400).json({
        success: false,
        message: 'A valid visitorId is required to record support.',
      });
    }

    const cleanVisitorId = visitorId.trim();

    // 2. Check if visitor has already recorded support
    const existing = await Support.findOne({ visitorId: cleanVisitorId });
    if (existing) {
      const currentCount = await Support.countDocuments();
      return res.status(200).json({
        success: true,
        supported: false,
        alreadySupported: true,
        count: currentCount,
      });
    }

    // 3. Attempt creation. In high concurrency, handle potential E11000 duplicate race condition gracefully
    try {
      await Support.create({ visitorId: cleanVisitorId });
      const updatedCount = await Support.countDocuments();

      return res.status(201).json({
        success: true,
        supported: true,
        count: updatedCount,
      });
    } catch (insertError) {
      // Duplicate key error code 11000 from MongoDB unique index
      if (insertError.code === 11000) {
        const currentCount = await Support.countDocuments();
        return res.status(200).json({
          success: true,
          supported: false,
          alreadySupported: true,
          count: currentCount,
        });
      }
      throw insertError;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSupportCount,
  addSupport,
};
