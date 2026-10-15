// backend/src/routes/documents.js

const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/auth');

// Get all documents for a user
router.get('/', authMiddleware, documentController.getAllDocuments);

// Get a single document by ID
router.get('/:id', authMiddleware, documentController.getDocumentById);

// Create a new document
router.post('/', authMiddleware, documentController.createDocument);

// Update an existing document
router.put('/:id', authMiddleware, documentController.updateDocument);

// Delete a document
router.delete('/:id', authMiddleware, documentController.deleteDocument);

module.exports = router;
