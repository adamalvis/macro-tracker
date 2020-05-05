import actionTypes from '../actionTypes/navigation.actionTypes';

const initialState = {
  menuIsOpen: false,
};

function togglePrimaryMenu(state) {
  const { menuIsOpen } = state;
  return { ...state, menuIsOpen: !menuIsOpen };
}

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.TOGGLE_PRIMARY_MENU:
      return togglePrimaryMenu(state);
    default:
      return state;
  }
};
