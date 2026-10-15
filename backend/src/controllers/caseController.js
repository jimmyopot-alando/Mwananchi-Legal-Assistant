// backend/src/controllers/caseController.js

const Case = require('../models/Case');
const translationService = require('../services/translationService');
const feeCalculatorService = require('../services/feeCalculatorService');
const validator = require('../utils/validator'); // <-- added

// Create a new case (user)
exports.createCase = async (req, res) => {
  try {
    const { title, description, court, status, phoneNumber } = req.body;

    // Validate required fields
    if (validator.isEmpty(title) || validator.isEmpty(description)) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    // Validate phone number if provided
    if (phoneNumber && !validator.isPhoneNumber(phoneNumber)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Calculate filing fee based on court type
    const feeDetails = feeCalculatorService.calculateFee(court);

    const newCase = new Case({
      user: req.user.id,
      title,
      description,
      court,
      status: status || 'open',
      fee: feeDetails.amount,
    });

    await newCase.save();

    res.status(201).json({
      message: 'Case created successfully',
      case: newCase,
      feeDetails,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error creating case' });
  }
};

// Get all cases for the authenticated user
exports.getUserCases = async (req, res) => {
  try {
    const cases = await Case.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ count: cases.length, cases });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching cases' });
  }
};

// Get a single case by ID
exports.getCaseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid case ID format' });
    }

    const caseItem = await Case.findOne({ _id: id, user: req.user.id });
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json({ case: caseItem });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching case' });
  }
};

// Update a case (user can update their own)
exports.updateCase = async (req, res) => {
  try {
    const { title, description, court, status } = req.body;

    if (title && validator.isEmpty(title)) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    if (description && validator.isEmpty(description)) {
      return res.status(400).json({ error: 'Description cannot be empty' });
    }

    // Recalculate fee if court type changes
    const feeDetails = feeCalculatorService.calculateFee(court);

    const caseItem = await Case.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, court, status, fee: feeDetails.amount },
      { new: true, runValidators: true }
    );

    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found or not authorized' });
    }

    res.json({
      message: 'Case updated successfully',
      case: caseItem,
      feeDetails,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating case' });
  }
};

// Delete a case (user can delete their own)
exports.deleteCase = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid case ID format' });
    }

    const caseItem = await Case.findOneAndDelete({ _id: id, user: req.user.id });
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found or not authorized' });
    }
    res.json({ message: 'Case deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting case' });
  }
};

// Admin: Get all cases
exports.getAllCases = async (req, res) => {
  try {
    const cases = await Case.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ count: cases.length, cases });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching all cases' });
  }
};

// Admin: Update any case
exports.adminUpdateCase = async (req, res) => {
  try {
    const { title, description, court, status } = req.body;

    const feeDetails = feeCalculatorService.calculateFee(court);

    const caseItem = await Case.findByIdAndUpdate(
      req.params.id,
      { title, description, court, status, fee: feeDetails.amount },
      { new: true, runValidators: true }
    );

    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }

    res.json({
      message: 'Case updated successfully (admin)',
      case: caseItem,
      feeDetails,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating case' });
  }
};

// Admin: Delete any case
exports.adminDeleteCase = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validator.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid case ID format' });
    }

    const caseItem = await Case.findByIdAndDelete(id);
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json({ message: 'Case deleted successfully (admin)' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting case' });
  }
};

// Translate a case description into a target language
exports.translateCaseDescription = async (req, res) => {
  try {
    const { caseId, targetLang } = req.body;

    if (!validator.isValidObjectId(caseId)) {
      return res.status(400).json({ error: 'Invalid case ID format' });
    }
    if (validator.isEmpty(targetLang)) {
      return res.status(400).json({ error: 'Target language is required' });
    }

    const caseItem = await Case.findOne({ _id: caseId, user: req.user.id });
    if (!caseItem) {
      return res.status(404).json({ error: 'Case not found or not authorized' });
    }

    const translatedText = await translationService.translateText(
      caseItem.description,
      targetLang
    );

    res.json({
      caseId: caseItem._id,
      original: caseItem.description,
      translated: translatedText,
      language: targetLang,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error translating case description' });
  }
};
