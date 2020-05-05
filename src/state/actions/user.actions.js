import userActionTypes from '../actionTypes/user.actionTypes';
import { setAuthToken } from '../../utilities/auth.utility';
import userService from '../../services/user.service';

/**
 * Set's a user in state
 * 
 * @param {object} payload
 * @param {string} payload.name - user's name
 * @param {string} payload.email - user's email
 * @param {string} payload.token - user's auth token
 * @param {string} payload.hasVerifiedEmail - user's email verification status
 * @return {object}
 */
export function setUser({ name, email, token, hasVerifiedEmail }) {
  // stores token in cookie
  setAuthToken(token);

  return {
    type: userActionTypes.SET_USER,
    user: {
      name,
      email,
      token,
      hasVerifiedEmail,
      failedLogin: false,
    },
  };
}

/**
 * Attempts to login in current user by username & password
 * 
 * @param {string} email - attempted username
 * @param {string} password - attempted password
 * @return {Function} - thunk
 */
export function login(email, password) {
  return async (dispatch) => {
    try {
      const result = await userService.login(email, password);
      const { token, name, hasVerifiedEmail } = result;

      dispatch(setUser({ name, email, token, hasVerifiedEmail }));
    } catch (error) {
      const status = error?.response?.status;
      
      if (status === 401) {
        dispatch(setFailedLogin());
      }

      if (status === 403) {
        dispatch(setUnverifiedEmail());
      }
    }
  };
}

/**
 * Registers a new user
 * @param {string} name - new users name
 * @param {string} email - new users email
 * @param {string} password - new users password
 * @returns {Function} - thunk
 */
export function register(name, email, password) {
  return async (dispatch) => {
    try {
      const result = await userService.register(name, email, password);

      const { hasVerifiedEmail, token } = result;

      dispatch(setUser({ name, email, token, hasVerifiedEmail }));
      dispatch(setRegisteredSuccessfully());
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * Validates locally stored auth token, if valid sets user in state
 * @param {string} token - stored auth token
 * @returns {Function} - thunk
 */
export function validateToken(token) {
  return async (dispatch) => {
    try {
      const result = await userService.validateToken(token);
      const { email, name, hasVerifiedEmail } = result;

      dispatch(setUser({ name, email, token, hasVerifiedEmail }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function resendEmailVerification() {
  return async (dispatch) => {
    try {
      await userService.resendEmailVerification();
      dispatch(setEmailVerificationResent());
    } catch (error) {
      console.log(error);
    }
  };
}

/**
 * Sets registeredSuccessfully user state to true
 */
export function setRegisteredSuccessfully() {
  return { type: userActionTypes.SET_REGISTERED_SUCCESSFULLY };
}

/**
 * Sets failedLogin user state to true
 */
export function setFailedLogin() {
  return { type: userActionTypes.SET_FAILED_LOGIN };
}

/**
 * Sets unverifiedEmail user state to true
 */
export function setUnverifiedEmail() {
  return { type: userActionTypes.SET_UNVERIFIED_EMAIL };
}

/**
 * Sets emailVerificationResent user state to true
 */
export function setEmailVerificationResent() {
  return { type: userActionTypes.SET_EMAIL_VERIFICATION_RESENT };
}
