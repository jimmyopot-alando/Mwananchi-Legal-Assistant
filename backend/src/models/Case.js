// backend/src/models/Case.js

const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Case title is required'],
      trim: true,
      minlength: 5,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, 'Case description is required'],
      trim: true,
      minlength: 10,
    },
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Court',
      required: false, // optional, can be linked later
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'pending', 'appeal'],
      default: 'open',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Case', caseSchema);
