// backend/src/routes/notifications.js

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/auth');

// Get all notifications for the authenticated user
router.get('/', authMiddleware, notificationController.getUserNotifications);

// Mark a notification as read
router.put('/:id/read', authMiddleware, notificationController.markAsRead);

// Delete a notification
router.delete('/:id', authMiddleware, notificationController.deleteNotification);

module.exports = router;
