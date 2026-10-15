// backend/src/controllers/paymentController.js

const Payment = require('../models/Payment'); // We'll create this model next
const { v4: uuidv4 } = require('uuid');

// Initiate a new payment
exports.initiatePayment = async (req, res) => {
  try {
    const { amount, method } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid payment amount' });
    }

    // Generate a unique transaction ID
    const transactionId = uuidv4();

    // For now, simulate pending status. Later, integrate with M-Pesa/Stripe API.
    const payment = new Payment({
      user: req.user.id,
      amount,
      method: method || 'mpesa',
      transactionId,
      status: 'pending',
    });

    await payment.save();

    res.status(201).json({
      message: 'Payment initiated successfully',
      payment,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error initiating payment' });
  }
};

// Check payment status
exports.checkPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const payment = await Payment.findOne({ transactionId, user: req.user.id });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Later: update status by querying M-Pesa/Stripe API
    res.json({ status: payment.status, payment });
  } catch (err) {
    res.status(500).json({ error: 'Server error checking payment status' });
  }
};

// Get all payments for the authenticated user
exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ count: payments.length, payments });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching payments' });
  }
};
