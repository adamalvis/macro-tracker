import moment from 'moment';
import actionTypes from '../actionTypes/food.actionTypes';
import foodService from '../../services/food.service';
import { showError, showNotification } from './notifications.actions';
import { COLOR_NAMES } from '../../constants/colors';

/**
 * Loads all food items for the current day
 * @returns {Function} thunk
 */
export function loadTodaysFood() {
  return async (dispatch) => {
    try {
      const date = moment().format('YYYY-MM-DD');
      const todaysFood = await foodService.foodByDay(date);

      dispatch({
        type: actionTypes.LOAD_TODAYS_FOOD,
        todaysFood,
      });
    } catch (error) {
      dispatch(showError(error));
    }
  };
}

/**
 * Action to add a new food item
 * @param {object} payload
 * @param {string} payload.name - item name
 * @param {number} payload.category - category number
 * @param {number} payload.calories - number of calories
 * @param {number} payload.protein - grams of protein
 * @param {number} payload.fat - grams of fat
 * @param {number} payload.carbohydrates - grams of carbohydrates
 */
export function addFood({
  name, category, calories, protein, fat, carbohydrates,
}) {
  return async (dispatch) => {
    try {
      const newFoodItem = await foodService.create({
        name,
        category,
        calories: parseInt(calories),
        protein: parseInt(protein),
        fat: parseInt(fat),
        carbohydrates: parseInt(carbohydrates),
      });
  
      dispatch({
        type: actionTypes.ADD_FOOD,
        food: newFoodItem,
      });
      dispatch(showNotification('Food item added', COLOR_NAMES.SUCCESS));
    } catch (error) {
      dispatch(showError(error));
    }
  };
}

/**
 * Removes a food item by id
 * @param {string} id - food id
 * @returns {Function} - thunk
 */
export function removeFood(id) {
  return async (dispatch) => {
    try {
      await foodService.remove(id);
      dispatch({
        type: actionTypes.REMOVE_FOOD,
        id,
      });
      dispatch(showNotification('Food item removed'))
    } catch (error) {
      dispatch(showError(error));
      throw error;
    }
  };
}
