// backend/src/models/Document.js

const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Document title is required'],
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    content: {
      type: String,
      required: [true, 'Document content is required'],
      minlength: 10,
    },
    type: {
      type: String,
      enum: ['contract', 'petition', 'affidavit', 'agreement', 'other'],
      default: 'other',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', documentSchema);
