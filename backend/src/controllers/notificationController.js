// backend/src/controllers/notificationController.js

const Notification = require('../models/Notification'); // We'll create this model next

// Get all notifications for the authenticated user
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ count: notifications.length, notifications });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching notifications' });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found or not authorized' });
    }

    res.json({ message: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating notification' });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found or not authorized' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting notification' });
  }
};

// Utility: Create a new notification (can be called from other controllers)
exports.createNotification = async (userId, message, type = 'general') => {
  try {
    const notification = new Notification({
      user: userId,
      message,
      type,
    });
    await notification.save();
    return notification;
  } catch (err) {
    console.error('Error creating notification:', err.message);
    return null;
  }
};
