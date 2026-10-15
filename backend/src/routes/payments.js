// backend/src/routes/payments.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/auth');

// Initiate a new payment
router.post('/initiate', authMiddleware, paymentController.initiatePayment);

// Check payment status
router.get('/status/:transactionId', authMiddleware, paymentController.checkPaymentStatus);

// Get all payments for the authenticated user
router.get('/', authMiddleware, paymentController.getUserPayments);

module.exports = router;
