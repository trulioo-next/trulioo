'use strict';
import Fetch from './fetch'

// TODO : 
// ADD THESE TO ENV VARIABLES 
//
const APPORIGIN = 'development'
const API_HOST = 'localhost'
const API_PORT = '8000'

// TODO: API Services health check

export default (function() {

  const ORIGIN = `https://${APPORIGIN}`
  // const API_URI = `https://${API_HOST}:${API_PORT}`
  const API_URI = ''

  function setOptions(method = 'GET', options) {
    // console.log(options);
    const headers = options.headers || {}
    return {
      ...options,
      method,
      headers: {
        "Origin": ORIGIN,
        "Content-Type": "application/json; charset=utf-8",
        ...headers
      },
    }
  }

  return {
    post: function(path, data, options = {}) {
      const url = `${API_URI}${path}`
      return Fetch(url, setOptions('POST', {
        ...options,
        body: JSON.stringify(data),
      }))
    },
    get: function(path, options) {
      const url = `${API_URI}${path}`
     return Fetch(url, setOptions('GET', options))
    },
    put: function(path, data, options = {}) {
      const url = `${API_URI}${path}`
      return Fetch(url, setOptions('PUT', {
        ...options,
        body: JSON.stringify(data),
      }))
    },
    delete: function(path, options) {
      const url = `${API_URI}${path}`
      return Fetch(url, setOptions('DELETE', options))
    }
  }

})()
