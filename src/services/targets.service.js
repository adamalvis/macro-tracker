import http from '../utilities/http.utility';

const routes = {
  GET_TARGETS: '/targets',
  UPDATE_TARGETS: '/targets',
};

/**
 * Retrieves targets for active user
 * @returns {Promise}
 */
async function getTargets() {
  const url = `/api${routes.GET_TARGETS}`;
  return http.get(url);
}

export default {
  getTargets,
};
