const express = require("express");
const Settings = require("../models/Settings");

const router = express.Router();

/*
  GET /api/settings
  Get store settings
*/
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json({
      success: true,
      settings,
      admin: {
        name: process.env.ADMIN_NAME || "Koushik Shetty",
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        role: "Administrator",
        status: "Active",
      },
    });
  } catch (error) {
    console.error("Get settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load settings",
      error: error.message,
    });
  }
});

/*
  PUT /api/settings
  Update store settings
*/
router.put("/", async (req, res) => {
  try {
    const { general, delivery, order } = req.body;

    let settings = await Settings.findOne();

    // Create settings document if it doesn't exist
    if (!settings) {
      settings = new Settings();
    }

    if (general) {
      settings.general = {
        ...settings.general.toObject(),
        ...general,
      };
    }

    if (delivery) {
      settings.delivery = {
        ...settings.delivery.toObject(),
        ...delivery,
      };
    }

    if (order) {
      settings.order = {
        ...settings.order.toObject(),
        ...order,
      };
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Update settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update settings",
      error: error.message,
    });
  }
});

module.exports = router;