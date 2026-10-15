// backend/src/services/gpsService.js

const geoip = require('geoip-lite');
const { haversineDistance } = require('../utils/geoUtils'); // reuse your geoUtils

/**
 * Detect user location from IP address
 * @param {string} ip - User's IP address
 * @returns {Object} { lat, lon, city, country }
 */
exports.getLocationFromIP = (ip) => {
  try {
    const geo = geoip.lookup(ip);
    if (!geo) {
      throw new Error('Unable to detect location from IP');
    }
    return {
      lat: geo.ll[0],
      lon: geo.ll[1],
      city: geo.city,
      country: geo.country,
    };
  } catch (err) {
    console.error('GPS error:', err.message);
    throw new Error('Location detection failed');
  }
};

/**
 * Calculate distance between two coordinates
 * @param {Object} pointA - { lat, lon }
 * @param {Object} pointB - { lat, lon }
 * @returns {Number} distance in kilometers
 */
exports.calculateDistance = (pointA, pointB) => {
  try {
    return haversineDistance(pointA.lat, pointA.lon, pointB.lat, pointB.lon);
  } catch (err) {
    console.error('Distance calculation error:', err.message);
    throw new Error('Failed to calculate distance');
  }
};

/**
 * Check if user is within a given radius of a location
 * @param {Object} userLocation - { lat, lon }
 * @param {Object} targetLocation - { lat, lon }
 * @param {Number} radiusKm - radius in kilometers
 * @returns {Boolean}
 */
exports.isWithinRadius = (userLocation, targetLocation, radiusKm) => {
  const distance = this.calculateDistance(userLocation, targetLocation);
  return distance <= radiusKm;
};
