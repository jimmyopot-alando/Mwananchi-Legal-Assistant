// backend/src/models/Law.js

const mongoose = require('mongoose');

const lawSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Law title is required'],
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, 'Law description is required'],
      trim: true,
      minlength: 10,
    },
    category: {
      type: String,
      required: [true, 'Law category is required'],
      trim: true,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Law', lawSchema);
