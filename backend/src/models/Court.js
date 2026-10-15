// backend/src/models/Court.js

const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Court name is required'],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    location: {
      type: String,
      required: [true, 'Court location is required'],
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    level: {
      type: String,
      enum: ['magistrate', 'high', 'appeal', 'supreme', 'tribunal'],
      default: 'magistrate',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Court', courtSchema);
