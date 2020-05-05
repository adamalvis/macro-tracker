import http from '../utilities/http.utility';
import { replaceUrlParams } from '../utilities/service.utility';

const routes = {
  LOGIN: '/login',
  REGISTER: '/register',
  VALIDATE_TOKEN: '/validate-token?token={token}',
  RESEND_EMAIL_VERIFICATION: '/resend-email-verification',
};

/**
 * Makes request to log in user with username/password
 * @param {string} email - users email
 * @param {string} password - users password
 * @returns {Promise}
 */
async function login(email, password) {
  const url = `/api${routes.LOGIN}`;
  return http.post(url, { email, password });
}

/**
 * Registers a new user
 * @param {string} name - users name
 * @param {string} email - users email
 * @param {string} password - users password
 * @returns {Promise}
 */
async function register(name, email, password) {
  const url = `/api${routes.REGISTER}`;
  return http.post(url, { name, email, password });
}

/**
 * Validates an auth token
 * @param {string} token - token to validate
 * @return {Promise}
 */
async function validateToken(token) {
  const url = `/api${routes.VALIDATE_TOKEN}`;
  const finalUrl = replaceUrlParams(url, { token });
  return http.get(finalUrl);
}

/**
 * Resends verification email
 * @return {Promise}
 */
async function resendEmailVerification() {
  const url = `/api${routes.RESEND_EMAIL_VERIFICATION}`;
  return http.post(url);
}

export default {
  login,
  register,
  validateToken,
  resendEmailVerification,
};
