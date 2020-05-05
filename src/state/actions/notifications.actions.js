import actionTypes from '../actionTypes/notifications.actionTypes';
import { COLOR_NAMES } from '../../constants/colors';
import { v4 as uuidv4 } from 'uuid';

const DISPLAY_TIME = 3000;

/**
 * Displays notification
 * @param {string} text - text to display
 * @param {string} color - color of notification pane
 * @returns {Function} - thunk
 */
export function showNotification(text, color = COLOR_NAMES.INFO) {
  return (dispatch) => {
    const id = uuidv4();

    setTimeout(() => {
      dispatch(removeNotification(id));
    }, DISPLAY_TIME);

    dispatch({
      type: actionTypes.SHOW_NOTIFICATION,
      text,
      color,
      id,
    });
  };
}

/**
 * Helper for showing error messages
 * @param {object} text - Error
 * @returns {Function} - thunk
 */
export function showError(error) {
  const text = error?.message || 'Sorry we encountered an error.';
  return showNotification(text, COLOR_NAMES.DANGER);
}

/**
 * Removes a currently displayed notification
 * @param {string} id - uuid of notification
 * @returns {object} - redux action
 */
export function removeNotification(id) {
  return {
    type: actionTypes.REMOVE_NOTIFICATION,
    id,
  };
}
