// backend/src/utils/costCalculator.js

/**
 * Calculate final cost after applying discounts and surcharges
 * @param {Number} baseAmount - initial fee or cost
 * @param {Number} discountPercent - percentage discount (e.g., 10 for 10%)
 * @param {Number} surchargePercent - percentage surcharge (e.g., 5 for 5%)
 * @returns {Object} { baseAmount, finalAmount, discountApplied, surchargeApplied }
 */
exports.calculateCost = (baseAmount, discountPercent = 0, surchargePercent = 0) => {
  let finalAmount = baseAmount;

  // Apply discount
  let discountApplied = 0;
  if (discountPercent > 0) {
    discountApplied = (finalAmount * discountPercent) / 100;
    finalAmount -= discountApplied;
  }

  // Apply surcharge
  let surchargeApplied = 0;
  if (surchargePercent > 0) {
    surchargeApplied = (finalAmount * surchargePercent) / 100;
    finalAmount += surchargeApplied;
  }

  return {
    baseAmount,
    finalAmount: Math.round(finalAmount),
    discountApplied: Math.round(discountApplied),
    surchargeApplied: Math.round(surchargeApplied),
  };
};

/**
 * Split payment into installments
 * @param {Number} totalAmount
 * @param {Number} installments - number of installments
 * @returns {Array} installment amounts
 */
exports.splitIntoInstallments = (totalAmount, installments = 1) => {
  if (installments <= 1) return [Math.round(totalAmount)];

  const installmentValue = totalAmount / installments;
  return Array.from({ length: installments }, () => Math.round(installmentValue));
};

/**
 * Add tax to a cost
 * @param {Number} amount
 * @param {Number} taxPercent
 * @returns {Number} amount with tax
 */
exports.addTax = (amount, taxPercent = 0) => {
  if (taxPercent <= 0) return Math.round(amount);
  const tax = (amount * taxPercent) / 100;
  return Math.round(amount + tax);
};
