// backend/src/models/Notification.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Notification message is required'],
      trim: true,
      minlength: 5,
    },
    type: {
      type: String,
      enum: ['general', 'payment', 'case', 'deadline', 'system'],
      default: 'general',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
