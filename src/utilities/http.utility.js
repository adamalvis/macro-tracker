import axios from 'axios';

// sets api domain as baseURL
axios.defaults.baseURL = process.env.REACT_APP_API_DOMAIN;

/**
 * Globally sets auth token for axios
 * @param {string} token - auth token
 */
function setAuthToken(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

/**
 * Performs GET request to specificed url
 * @param {string} url - url to GET
 * @param {object} config - configuration object
 * @return {Promise}
 */
async function get(url, config = {}) {
  const result = await axios.get(url, config);
  return result?.data;
}

/**
 * Performs a POST request to specified url
 * @param {string} url - url to POST to
 * @param {object} data - payload
 * @param {object} config - configuration object
 * @returns {Promise}
 */
async function post(url, data, config = {}) {
  const result = await axios.post(url, data, config);
  return result?.data;
}

/**
 * Makes a PATCH request to specified url
 * @param {string} url - url to PATCH to
 * @param {object} data - payload
 * @param {object} config - configuration object
 * @return {Promise}
 */
async function patch(url, data, config = {}) {
  const result = await axios.patch(url, data, config);
  return result?.data;
}

/**
 * Performs a DELETE request to specified url
 * @param {string} url - url to DELETE to
 * @param {data} config - configuration object
 * @return {Promise}
 */
async function deleteRequest(url, config = {}) {
  const result = await axios.delete(url, config);
  return result?.data;
}

export default {
  get,
  post,
  patch,
  delete: deleteRequest,
  setAuthToken,
};
