import actionTypes from '../actionTypes/targets.actionTypes';

const initialState = {
  calories: null,
  protein: null,
  fat: null,
  carbohydrates: null,
  isUpdated: null,
  isLoaded: false,
};

function loadTargets(state, action) {
  const { targets } = action;
  return { ...state, ...targets, isLoaded: true, };
}

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.LOAD_TARGETS:
      return loadTargets(state, action);
    default:
      return state;
  }
};