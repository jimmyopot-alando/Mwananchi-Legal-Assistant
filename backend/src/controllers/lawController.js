// backend/src/controllers/lawController.js

const Law = require('../models/Law'); // We'll create this model next

// Get all laws
exports.getAllLaws = async (req, res) => {
  try {
    const laws = await Law.find().sort({ createdAt: -1 });
    res.json({ count: laws.length, laws });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching laws' });
  }
};

// Get a single law by ID
exports.getLawById = async (req, res) => {
  try {
    const law = await Law.findById(req.params.id);
    if (!law) {
      return res.status(404).json({ error: 'Law not found' });
    }
    res.json({ law });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching law' });
  }
};

// Search laws by keyword
exports.searchLaws = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const laws = await Law.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.json({ count: laws.length, laws });
  } catch (err) {
    res.status(500).json({ error: 'Server error searching laws' });
  }
};

// Add a new law (admin only)
exports.addLaw = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const law = new Law({ title, description, category });
    await law.save();

    res.status(201).json({ message: 'Law added successfully', law });
  } catch (err) {
    res.status(500).json({ error: 'Server error adding law' });
  }
};

// Update a law
exports.updateLaw = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const law = await Law.findByIdAndUpdate(
      req.params.id,
      { title, description, category },
      { new: true, runValidators: true }
    );

    if (!law) {
      return res.status(404).json({ error: 'Law not found' });
    }

    res.json({ message: 'Law updated successfully', law });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating law' });
  }
};

// Delete a law
exports.deleteLaw = async (req, res) => {
  try {
    const law = await Law.findByIdAndDelete(req.params.id);

    if (!law) {
      return res.status(404).json({ error: 'Law not found' });
    }

    res.json({ message: 'Law deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting law' });
  }
};
