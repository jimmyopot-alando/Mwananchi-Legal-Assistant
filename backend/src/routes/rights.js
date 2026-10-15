// backend/src/routes/rights.js

const express = require('express');
const router = express.Router();
const Right = require('../models/Right'); // import the model

// List all rights
router.get('/', async (req, res) => {
  try {
    const rights = await Right.find();
    res.json(rights);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single right by ID
router.get('/:id', async (req, res) => {
  try {
    const right = await Right.findById(req.params.id);
    if (!right) return res.status(404).json({ message: 'Right not found' });
    res.json(right);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
