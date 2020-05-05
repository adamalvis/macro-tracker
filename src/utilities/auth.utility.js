import Cookies from 'js-cookie';
import http from './http.utility';

const TOKEN_KEY = 'macro-tracker-auth-token';

/**
 * Sets auth token cookie
 * @param {string} token - token to set
 */
export function setAuthToken(token) {
  Cookies.set(TOKEN_KEY, token, { expires: 1 });
  http.setAuthToken(token);
}

/**
 * Retrieves auth token from cookie
 */
export function getAuthToken() {
  return Cookies.get(TOKEN_KEY);
}

export default {
  setAuthToken,
  getAuthToken,
};
