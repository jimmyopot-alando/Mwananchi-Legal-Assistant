// backend/src/routes/laws.js

const express = require('express');
const router = express.Router();
const lawController = require('../controllers/lawController');
const authMiddleware = require('../middleware/auth');

// Get all laws
router.get('/', lawController.getAllLaws);

// Get a single law by ID
router.get('/:id', lawController.getLawById);

// Search laws by keyword
router.get('/search/:keyword', lawController.searchLaws);

// Add a new law (admin only)
router.post('/', authMiddleware, lawController.addLaw);

// Update a law (admin only)
router.put('/:id', authMiddleware, lawController.updateLaw);

// Delete a law (admin only)
router.delete('/:id', authMiddleware, lawController.deleteLaw);

module.exports = router;
