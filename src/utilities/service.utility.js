/**
 * Replaces params inside curly brackets with their values
 * @param {string} url - the url
 * @param {object} params - params to replace
 * @returns {string}
 */
export function replaceUrlParams(url, params) {
  let finalUrl = url;

  Object.entries(params).forEach(([key, val]) => {
    finalUrl = finalUrl.replace(`{${key}}`, val);
  });

  return finalUrl;
}
