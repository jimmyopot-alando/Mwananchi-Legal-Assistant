// backend/src/routes/cases.js

const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Create a new case (user)
router.post('/', authMiddleware, caseController.createCase);

// Get all cases for the authenticated user
router.get('/', authMiddleware, caseController.getUserCases);

// Get a single case by ID (user)
router.get('/:id', authMiddleware, caseController.getCaseById);

// Update a case (user can update their own)
router.put('/:id', authMiddleware, caseController.updateCase);

// Delete a case (user can delete their own)
router.delete('/:id', authMiddleware, caseController.deleteCase);

// Translate case description (user)
router.post('/translate', authMiddleware, caseController.translateCaseDescription);

// Admin: Get all cases in the system
router.get('/admin/all', authMiddleware, adminMiddleware, caseController.getAllCases);

// Admin: Update any case
router.put('/admin/:id', authMiddleware, adminMiddleware, caseController.adminUpdateCase);

// Admin: Delete any case
router.delete('/admin/:id', authMiddleware, adminMiddleware, caseController.adminDeleteCase);

module.exports = router;
