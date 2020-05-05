export const CATEGORIES = {
  BREAKFAST: 0,
  LUNCH: 1,
  DINNER: 2,
  SNACK: 3,
};

export const CATEGORY_LABELS = {
  [CATEGORIES.BREAKFAST]: 'Breakfast',
  [CATEGORIES.LUNCH]: 'Lunch',
  [CATEGORIES.DINNER]: 'Dinner',
  [CATEGORIES.SNACK]: 'Snack',
};

/**
 * Checks that macro is a valid number
 * @param {string|number} macro - macro
 * @returns {boolean}
 */
export function isValidMacro(macro) {
  return !Number.isNaN(parseFloat(macro));
}
