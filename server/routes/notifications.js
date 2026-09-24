
const express = require("express");
const Notification = require("../models/Notification");

const router = express.Router();

// GET ALL NOTIFICATIONS
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .lean();

    const unreadCount = await Notification.countDocuments({
      isRead: false,
    });

    res.status(200).json({
      success: true,
      count: notifications.length,
      unreadCount,
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications.",
      error: error.message,
    });
  }
});

// GET UNREAD COUNT
router.get("/unread-count", async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      isRead: false,
    });

    res.status(200).json({
      success: true,
      unreadCount,
    });
  } catch (error) {
    console.error("Unread count error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch unread count.",
      error: error.message,
    });
  }
});

// MARK ALL AS READ
// This route must come before /:id/read
router.patch("/read-all", async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Mark all as read error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to mark all notifications as read.",
      error: error.message,
    });
  }
});

// DELETE ALL READ NOTIFICATIONS
// This route must come before /:id
router.delete("/read", async (req, res) => {
  try {
    const result = await Notification.deleteMany({
      isRead: true,
    });

    res.status(200).json({
      success: true,
      message: "Read notifications deleted successfully.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete read notifications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete read notifications.",
      error: error.message,
    });
  }
});

// MARK ONE NOTIFICATION AS READ
router.patch("/:id/read", async (req, res) => {
  try {
    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        { isRead: true },
        { new: true, runValidators: true }
      );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      notification,
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to mark notification as read.",
      error: error.message,
    });
  }
});

// DELETE ONE NOTIFICATION
router.delete("/:id", async (req, res) => {
  try {
    const notification =
      await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    console.error("Delete notification error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete notification.",
      error: error.message,
    });
  }
});

module.exports = router;