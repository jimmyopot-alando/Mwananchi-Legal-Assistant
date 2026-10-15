// backend/src/controllers/courtController.js

const Court = require('../models/Court');
const courtFinderService = require('../services/courtFinderService');
const gpsService = require('../services/gpsService');

// Get all courts
exports.getAllCourts = async (req, res) => {
  try {
    const courts = await Court.find().sort({ name: 1 });
    res.json({ count: courts.length, courts });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching courts' });
  }
};

// Get a single court by ID
exports.getCourtById = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ error: 'Court not found' });
    }
    res.json({ court });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching court' });
  }
};

// Add a new court (admin only)
exports.addCourt = async (req, res) => {
  try {
    const { name, location, level, locationCoordinates } = req.body;

    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }

    const court = new Court({
      name,
      location,
      level: level || 'magistrate',
      locationCoordinates, // { lat, lon }
    });

    await court.save();

    res.status(201).json({ message: 'Court added successfully', court });
  } catch (err) {
    res.status(500).json({ error: 'Server error adding court' });
  }
};

// Update a court (admin only)
exports.updateCourt = async (req, res) => {
  try {
    const { name, location, level, locationCoordinates } = req.body;

    const court = await Court.findByIdAndUpdate(
      req.params.id,
      { name, location, level, locationCoordinates },
      { new: true, runValidators: true }
    );

    if (!court) {
      return res.status(404).json({ error: 'Court not found' });
    }

    res.json({ message: 'Court updated successfully', court });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating court' });
  }
};

// Delete a court (admin only)
exports.deleteCourt = async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);
    if (!court) {
      return res.status(404).json({ error: 'Court not found' });
    }
    res.json({ message: 'Court deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting court' });
  }
};

// Suggest nearest court based on case type + user location
exports.suggestNearestCourt = async (req, res) => {
  try {
    const { caseType, userLocation } = req.body;

    if (!caseType || !userLocation) {
      return res.status(400).json({ error: 'caseType and userLocation are required' });
    }

    const nearestCourt = await courtFinderService.findNearestCourt(caseType, userLocation);

    if (!nearestCourt) {
      return res.status(404).json({ error: 'No court found for this case type near your location' });
    }

    res.json({
      message: 'Nearest court found',
      court: nearestCourt,
      userLocation,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error suggesting nearest court' });
  }
};
