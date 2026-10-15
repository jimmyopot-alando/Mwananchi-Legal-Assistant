// backend/src/routes/qna.js

const express = require('express');
const router = express.Router();
const qnaController = require('../controllers/qnaController');
const authMiddleware = require('../middleware/auth');

// Submit a new legal question
router.post('/', authMiddleware, qnaController.askQuestion);

// Get all questions asked by the authenticated user
router.get('/', authMiddleware, qnaController.getUserQuestions);

// Get a single question and its answer
router.get('/:id', authMiddleware, qnaController.getQuestionById);

// Delete a question (user can remove their own)
router.delete('/:id', authMiddleware, qnaController.deleteQuestion);

module.exports = router;
