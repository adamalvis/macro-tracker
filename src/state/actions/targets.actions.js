import actionTypes from '../actionTypes/targets.actionTypes';
import targetsService from '../../services/targets.service';

export function loadTargets() {
  return async (dispatch) => {
    try {
      const targets = await targetsService.getTargets();
      dispatch({
        type: actionTypes.LOAD_TARGETS,
        targets,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
