// backend/src/utils/validator.js

/**
 * Check if a value is empty
 * @param {String} value
 * @returns {Boolean}
 */
exports.isEmpty = (value) => {
  return !value || value.trim().length === 0;
};

/**
 * Validate email format
 * @param {String} email
 * @returns {Boolean}
 */
exports.isEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate phone number (international format)
 * @param {String} phone
 * @returns {Boolean}
 */
exports.isPhoneNumber = (phone) => {
  const regex = /^\+?\d{10,15}$/; // supports +2547... or 0712...
  return regex.test(phone);
};

/**
 * Validate MongoDB ObjectId
 * @param {String} id
 * @returns {Boolean}
 */
exports.isValidObjectId = (id) => {
  const mongoose = require('mongoose');
  return mongoose.Types.ObjectId.isValid(id);
};
