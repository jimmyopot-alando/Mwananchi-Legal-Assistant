// backend/src/models/QnA.js

const mongoose = require('mongoose');

const qnaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
      minlength: 5,
    },
    answer: {
      type: String,
      default: 'Pending AI response',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('QnA', qnaSchema);
