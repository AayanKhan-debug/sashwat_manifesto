const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: [true, 'Visitor ID is required'],
      unique: true,
      trim: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Support = mongoose.model('Support', supportSchema);

module.exports = Support;
