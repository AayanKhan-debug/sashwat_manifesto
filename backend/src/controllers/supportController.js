const Support = require("../models/Support");

const getSupportCount = async (req, res, next) => {
  try {
    const count = await Support.countDocuments();

    res.status(200).json({
      count,
    });
  } catch (error) {
    next(error);
  }
};

const addSupport = async (req, res, next) => {
  try {
    const { visitorId, name, departmentYear } = req.body;

    if (!visitorId || !name || !departmentYear) {
      return res.status(400).json({
        success: false,
        message: "Visitor ID, name and department/year are required.",
      });
    }

    const existingSupport = await Support.findOne({ visitorId });

    if (existingSupport) {
      const count = await Support.countDocuments();

      return res.status(200).json({
        success: true,
        supported: false,
        alreadySupported: true,
        count,
      });
    }

    await Support.create({
      visitorId,
      name,
      departmentYear,
    });

    const count = await Support.countDocuments();

    res.status(201).json({
      success: true,
      supported: true,
      alreadySupported: false,
      count,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSupportCount,
  addSupport,
};