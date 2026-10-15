// backend/src/services/notificationService.js

const Notification = require('../models/Notification'); // We'll define this model
const nodemailer = require('nodemailer');

/**
 * Save notification in DB
 */
exports.saveNotification = async (userId, message, type = 'general') => {
  try {
    const notification = new Notification({ user: userId, message, type });
    await notification.save();
    return notification;
  } catch (err) {
    console.error('Notification save error:', err.message);
    throw new Error('Failed to save notification');
  }
};

/**
 * Send email notification
 */
exports.sendEmailNotification = async (recipientEmail, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or Outlook, depending on your setup
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    console.error('Email notification error:', err.message);
    throw new Error('Failed to send email notification');
  }
};

/**
 * Send SMS notification (stub — integrate with Twilio or Africa’s Talking)
 */
exports.sendSMSNotification = async (phoneNumber, message) => {
  try {
    // Example stub: integrate with Twilio or Africa's Talking API
    console.log(`SMS sent to ${phoneNumber}: ${message}`);
    return { success: true };
  } catch (err) {
    console.error('SMS notification error:', err.message);
    throw new Error('Failed to send SMS notification');
  }
};
