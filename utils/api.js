'use strict';
// import fetch from './fetch'
require('isomorphic-fetch')

// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();

async function parseJSON(response) {
  if (response.status >= 400 || (response.status === 204 || response.status === 205)) return response
  return await response.json()
}

export default (function() {

  const API_URL = 'https://dev3.7eleven.ca/wp-json';  // process.env.ROOT_URL;

  // const ENDPOINT_URL =  'https://dev3.7eleven.ca/wp-json';  // process.env.ENDPOINT_URL

  function setOptions(method = 'GET', options = {}) {
    // console.log(options);
    const headers = options.headers || {}
    return {
      ...options,
      method,
      headers: {
        // "Origin": APP_ORIGIN,
        ...headers
      },
    }
  }

  return {
    post: function(path, data, options = {}) {
      const url = `${API_URL}${path}`
      return fetch(url, setOptions('POST', {
        ...options,
        body: JSON.stringify(data),
      })).then(parseJSON).catch((e) => {
        return e;
      })
    },
    get: function(path, options) {
      const url = `${API_URL}${path}`
      return fetch(url, setOptions('GET', options)).then(parseJSON).catch((e) => {
        return e;
      })
    },
    put: function(path, data, options = {}) {
      const url = `${API_URL}${path}`
      return fetch(url, setOptions('PUT', {
        ...options,
        body: JSON.stringify(data),
      })).then(parseJSON).catch((e) => {
        return e;
      })
    },
    delete: function(path, options) {
      const url = `${API_URL}${path}`
      return fetch(url, setOptions('DELETE', options)).then(parseJSON).catch((e) => {
        return e;
      })
    }
  }

})()
