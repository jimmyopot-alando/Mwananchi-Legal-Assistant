// backend/src/services/feeCalculatorService.js

const costCalculator = require('../utils/costCalculator'); // <-- added

/**
 * Fee table — you can expand this with more case types or services.
 * Values are in Kenyan Shillings (KES).
 */
const feeTable = {
  magistrate: { amount: 500, currency: 'KES', description: 'Magistrate court filing fee' },
  high: { amount: 1500, currency: 'KES', description: 'High court filing fee' },
  appeal: { amount: 2500, currency: 'KES', description: 'Appeal court filing fee' },
  supreme: { amount: 5000, currency: 'KES', description: 'Supreme court filing fee' },

  consultation: { amount: 1000, currency: 'KES', description: 'Legal consultation fee' },
  documentDrafting: { amount: 2000, currency: 'KES', description: 'Document drafting fee' },
};

/**
 * Calculate fee based on case type or service
 * @param {String} category - e.g., 'magistrate', 'high', 'consultation'
 * @returns {Object} fee details { amount, currency, description }
 */
exports.calculateFee = (category) => {
  try {
    const fee = feeTable[category];
    if (!fee) {
      return { amount: 0, currency: 'KES', description: 'No fee defined for this category' };
    }
    return fee;
  } catch (err) {
    console.error('Fee calculator error:', err.message);
    throw new Error('Fee calculation failed');
  }
};

/**
 * Apply discounts or surcharges using costCalculator
 * @param {Object} fee - { amount, currency, description }
 * @param {Number} discountPercent - e.g., 10 for 10% discount
 * @param {Number} surchargePercent - e.g., 5 for 5% surcharge
 * @returns {Object} updated fee details
 */
exports.adjustFee = (fee, discountPercent = 0, surchargePercent = 0) => {
  const adjustment = costCalculator.calculateCost(fee.amount, discountPercent, surchargePercent);

  return {
    ...fee,
    amount: adjustment.finalAmount,
    discountApplied: adjustment.discountApplied,
    surchargeApplied: adjustment.surchargeApplied,
    description: `${fee.description} (adjusted)`,
  };
};

/**
 * Add tax to a fee
 * @param {Object} fee - { amount, currency, description }
 * @param {Number} taxPercent - e.g., 16 for VAT
 * @returns {Object} updated fee details
 */
exports.addTax = (fee, taxPercent = 0) => {
  const taxedAmount = costCalculator.addTax(fee.amount, taxPercent);

  return {
    ...fee,
    amount: taxedAmount,
    description: `${fee.description} (with tax)`,
    taxPercent,
  };
};

/**
 * Split fee into installments
 * @param {Object} fee - { amount, currency, description }
 * @param {Number} installments - number of installments
 * @returns {Array} installment amounts
 */
exports.splitFeeIntoInstallments = (fee, installments = 1) => {
  return costCalculator.splitIntoInstallments(fee.amount, installments);
};
