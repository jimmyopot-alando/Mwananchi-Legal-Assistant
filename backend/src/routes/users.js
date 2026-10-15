// backend/src/routes/users.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Get current user profile
router.get('/me', authMiddleware, userController.getProfile);

// Update current user profile
router.put('/me', authMiddleware, userController.updateProfile);

// Get all users (admin only)
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);

// Get a single user by ID (admin only)
router.get('/:id', authMiddleware, adminMiddleware, userController.getUserById);

// Delete a user (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
