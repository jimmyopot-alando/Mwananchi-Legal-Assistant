// backend/src/utils/languageDetector.js

const franc = require('franc'); // lightweight language detection library

/**
 * Detect language code from text
 * @param {String} text
 * @returns {String} ISO 639-3 language code (e.g., 'eng', 'swa')
 */
exports.detectLanguage = (text) => {
  try {
    const langCode = franc(text);
    return langCode === 'und' ? 'unknown' : langCode;
  } catch (err) {
    console.error('Language detection error:', err.message);
    return 'unknown';
  }
};

/**
 * Check if text is already in target language
 * @param {String} text
 * @param {String} targetLang - ISO 639-3 code
 * @returns {Boolean}
 */
exports.isAlreadyInTargetLanguage = (text, targetLang) => {
  const detected = exports.detectLanguage(text);
  return detected === targetLang;
};
