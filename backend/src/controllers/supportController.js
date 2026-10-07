const mongoose = require('mongoose');
const Support = require('../models/Support');

/**
 * Validates the visitorId string.
 * Must be non-empty string between 5 and 128 characters, containing safe alphanumeric or hyphen/underscore characters.
 */
const isValidVisitorId = (id) => {
  if (!id || typeof id !== 'string') return false;
  const trimmed = id.trim();
  if (trimmed.length < 5 || trimmed.length > 128) return false;
  const safeIdRegex = /^[a-zA-Z0-9_-]+$/;
  return safeIdRegex.test(trimmed);
};

const getDatabaseName = () => {
  return mongoose.connection.name || mongoose.connection.db?.databaseName || 'sashwat_campaign';
};

const isDev = () => process.env.NODE_ENV !== 'production';

/**
 * @route   GET /api/support
 * @desc    Get total count of verified support actions from MongoDB
 * @access  Public
 */
const getSupportCount = async (req, res, next) => {
  try {
    const count = await Support.countDocuments();

    if (isDev()) {
      const dbName = getDatabaseName();
      const collectionName = Support.collection?.collectionName || 'supports';
      console.log(`[SUPPORT] GET count request | Database: ${dbName} | Collection: ${collectionName} | Count: ${count}`);
    }

    return res.status(200).json({ count });
  } catch (error) {
    console.error(`[SUPPORT] Error retrieving count: ${error.message}`);
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
      if (isDev()) {
        console.warn(`[SUPPORT] Validation failed for visitorId`);
      }
      return res.status(400).json({
        success: false,
        message: 'A valid visitorId is required to record support.',
      });
    }

    const cleanVisitorId = visitorId.trim();

    if (isDev()) {
      const dbName = getDatabaseName();
      const collectionName = Support.collection?.collectionName || 'supports';
      console.log(`[SUPPORT] Received visitorId: ${cleanVisitorId} | DB: ${dbName} | Coll: ${collectionName}`);
    }

    // 2. Check if visitor has already recorded support
    const existing = await Support.findOne({ visitorId: cleanVisitorId });
    if (existing) {
      const currentCount = await Support.countDocuments();
      if (isDev()) {
        console.log(`[SUPPORT] Existing supporter detected. Current count: ${currentCount}`);
      }

      return res.status(200).json({
        success: true,
        supported: false,
        alreadySupported: true,
        count: currentCount,
      });
    }

    // 3. Attempt creation. In high concurrency, handle potential E11000 duplicate race condition gracefully
    try {
      const newDoc = await Support.create({ visitorId: cleanVisitorId });
      const updatedCount = await Support.countDocuments();

      if (isDev()) {
        console.log(`[SUPPORT] Document inserted (${newDoc._id}). Updated count: ${updatedCount}`);
      } else {
        console.log(`[SUPPORT] Verified support recorded. Count: ${updatedCount}`);
      }

      return res.status(201).json({
        success: true,
        supported: true,
        count: updatedCount,
      });
    } catch (insertError) {
      // Duplicate key error code 11000 from MongoDB unique index
      if (insertError.code === 11000) {
        const currentCount = await Support.countDocuments();
        if (isDev()) {
          console.log(`[SUPPORT] E11000 duplicate caught. Count: ${currentCount}`);
        }

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
    console.error(`[SUPPORT] Error recording support: ${error.message}`);
    next(error);
  }
};

module.exports = {
  getSupportCount,
  addSupport,
};
