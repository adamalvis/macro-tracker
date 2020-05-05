import { CATEGORIES, CATEGORY_LABELS } from "../constants/food";

/**
 * Returns
 * @param {array} food - array of food objects
 * @returns {object} { calories: Number, protein: Number, fat: Number, carbohydrates: Number }
 */
export function getMacroTotals(food) {
  const totals = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  };

  food.forEach((item) => {
    totals.calories += item.calories;
    totals.protein += item.protein;
    totals.fat += item.fat;
    totals.carbohydrates += item.carbohydrates;
  });

  return totals;
}

/**
 * Returns all food categories formatted as <Select> options
 * @returns {array}
 */
export function getCategoriesAsOptions() {
  return Object.values(CATEGORIES).map(categoryId => ({
    label: CATEGORY_LABELS[categoryId],
    value: categoryId.toString(),
  }));
}

export function getCategorizedFood(food) {
  const categorizedFood = {
    [CATEGORIES.BREAKFAST]: [],
    [CATEGORIES.LUNCH]: [],
    [CATEGORIES.DINNER]: [],
    [CATEGORIES.SNACK]: [],
  };

  food.forEach((item) => {
    categorizedFood[item.category] = [
      ...categorizedFood[item.category],
      item,
    ];
  });

  return categorizedFood;
}
