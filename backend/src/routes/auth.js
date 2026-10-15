// backend/src/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Get current user profile (protected route)
router.get('/me', authController.getProfile);

module.exports = router;
