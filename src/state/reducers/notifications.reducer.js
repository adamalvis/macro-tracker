import actionTypes from '../actionTypes/notifications.actionTypes';

const initialState = {
  msgs: [],
};

function showNotification(state, action) {
  const { text, color, id } = action;

  return {
    ...state,
    msgs: [
      ...state.msgs,
      { text, color, id },
    ],
  };
}

function removeNotification(state, action) {
  const { id } = action;
  const msgs = state.msgs.filter(msg => msg.id !== id);

  return { ...state, msgs };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return showNotification(state, action);
    case actionTypes.REMOVE_NOTIFICATION:
      return removeNotification(state, action);
    default:
      return state;
  }
}