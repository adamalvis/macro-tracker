import actionTypes from '../actionTypes/user.actionTypes';

const initialState = {
  token: null,
  name: '',
  email: '',
  failedLogin: false,
  hasVerifiedEmail: false,
  registeredSuccessfully: false,
  emailVerificationResent: false,
};

function setUser(state, action) {
  const { user } = action;
  return { ...state, ...user };
}

function setFailedLogin(state) {
  return { ...state, failedLogin: true };
}

function setUnverifiedEmail(state) {
  return { ...state, unverifiedEmail: true };
}

function setRegisteredSuccessfully(state) {
  return { ...state, registeredSuccessfully: true };
}

function setEmailVerificationResent(state) {
  return { ...state, emailVerificationResent: true };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return setUser(state, action);
    case actionTypes.SET_FAILED_LOGIN:
      return setFailedLogin(state);
    case actionTypes.SET_UNVERIFIED_EMAIL:
      return setUnverifiedEmail(state);
    case actionTypes.SET_REGISTERED_SUCCESSFULLY:
      return setRegisteredSuccessfully(state);
    case actionTypes.SET_EMAIL_VERIFICATION_RESENT:
      return setEmailVerificationResent(state);
    default:
      return state;
  }
};
