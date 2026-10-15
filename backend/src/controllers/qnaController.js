// backend/src/controllers/qnaController.js

const QnA = require('../models/QnA'); // We'll create this model next

// Ask a new legal question
exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length < 5) {
      return res.status(400).json({ error: 'Question must be at least 5 characters long' });
    }

    // For now, we’ll simulate an AI answer. Later, integrate with Python AI service.
    const simulatedAnswer = "This is a placeholder answer. AI service integration will provide detailed legal guidance.";

    const qna = new QnA({
      user: req.user.id,
      question,
      answer: simulatedAnswer,
    });

    await qna.save();

    res.status(201).json({ message: 'Question submitted successfully', qna });
  } catch (err) {
    res.status(500).json({ error: 'Server error submitting question' });
  }
};

// Get all questions asked by the authenticated user
exports.getUserQuestions = async (req, res) => {
  try {
    const questions = await QnA.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ count: questions.length, questions });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching questions' });
  }
};

// Get a single question and its answer
exports.getQuestionById = async (req, res) => {
  try {
    const qna = await QnA.findOne({ _id: req.params.id, user: req.user.id });
    if (!qna) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ qna });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching question' });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const qna = await QnA.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!qna) {
      return res.status(404).json({ error: 'Question not found or not authorized' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting question' });
  }
};
