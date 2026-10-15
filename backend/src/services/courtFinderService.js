// backend/src/services/courtFinderService.js

const Court = require('../models/Court');
const gpsService = require('./gpsService');

/**
 * Find the nearest court by case type and user location
 * @param {String} caseType - e.g., 'magistrate', 'high', 'appeal', 'supreme'
 * @param {Object} userLocation - { lat, lon }
 * @returns {Object|null} nearest court or null if none found
 */
exports.findNearestCourt = async (caseType, userLocation) => {
  try {
    // Fetch courts matching the case type
    const courts = await Court.find({ level: caseType });
    if (!courts || courts.length === 0) {
      return null;
    }

    // Calculate distance for each court
    let nearestCourt = null;
    let minDistance = Infinity;

    for (const court of courts) {
      if (!court.locationCoordinates) continue; // skip if no coordinates

      const distance = gpsService.calculateDistance(
        userLocation,
        court.locationCoordinates
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestCourt = court;
      }
    }

    return nearestCourt;
  } catch (err) {
    console.error('Court finder error:', err.message);
    throw new Error('Court lookup failed');
  }
};

/**
 * Check if a user is within a given radius of a court
 * @param {Object} userLocation - { lat, lon }
 * @param {Object} court - Court document with locationCoordinates
 * @param {Number} radiusKm - radius in kilometers
 * @returns {Boolean}
 */
exports.isUserNearCourt = (userLocation, court, radiusKm) => {
  if (!court.locationCoordinates) return false;
  return gpsService.isWithinRadius(userLocation, court.locationCoordinates, radiusKm);
};
