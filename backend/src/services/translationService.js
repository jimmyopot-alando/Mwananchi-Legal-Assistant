// backend/src/services/translationService.js

const translate = require('@vitalets/google-translate-api');
const languageDetector = require('../utils/languageDetector'); // <-- added

/**
 * Translate text into a target language
 * @param {string} text - The text to translate
 * @param {string} targetLang - Target language code (e.g., 'sw' for Swahili, 'fr' for French)
 * @returns {Object} { original, translated, sourceLang, targetLang }
 */
exports.translateText = async (text, targetLang) => {
  try {
    // Detect source language
    const sourceLang = languageDetector.detectLanguage(text);

    // If text is already in target language, skip translation
    if (languageDetector.isAlreadyInTargetLanguage(text, targetLang)) {
      return {
        original: text,
        translated: text,
        sourceLang,
        targetLang,
        note: 'Text already in target language',
      };
    }

    // Perform translation
    const result = await translate(text, { to: targetLang });

    return {
      original: text,
      translated: result.text,
      sourceLang,
      targetLang,
    };
  } catch (err) {
    console.error('Translation error:', err.message);
    throw new Error('Translation failed');
  }
};
