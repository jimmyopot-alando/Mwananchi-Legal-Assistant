// backend/src/routes/courts.js

const express = require('express');
const router = express.Router();
const courtController = require('../controllers/courtController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Get all courts
router.get('/', courtController.getAllCourts);

// Get a single court by ID
router.get('/:id', courtController.getCourtById);

// Add a new court (admin only)
router.post('/', authMiddleware, adminMiddleware, courtController.addCourt);

// Update a court (admin only)
router.put('/:id', authMiddleware, adminMiddleware, courtController.updateCourt);

// Delete a court (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, courtController.deleteCourt);

module.exports = router;
