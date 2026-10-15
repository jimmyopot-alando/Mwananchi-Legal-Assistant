// backend/src/utils/logger.js

/**
 * Simple logger utility
 * Provides consistent logging with timestamp and metadata
 */

const log = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`, meta);
};

exports.info = (message, meta) => log('info', message, meta);
exports.warn = (message, meta) => log('warn', message, meta);
exports.error = (message, meta) => log('error', message, meta);
