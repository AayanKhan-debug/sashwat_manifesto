const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    departmentYear: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Support = mongoose.model("Support", supportSchema);

module.exports = Support;