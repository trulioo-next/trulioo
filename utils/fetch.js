'use strict'

import ErrorHandler from './errorHandler'


/*
* Parses the JSON returned by a network request
*/
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) return null
  return response.json()
}

/*
* Checks if a network request came back fine, and throws an error if not
*/
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) return response
  const payload = await response.json()
  const error = new Error(payload.message)
  error.response = response
  error.payload = {
    ...payload,
    errors: payload.errors && Array.isArray(payload.errors) ? payload.errors : null,
  }
  throw error
}

/*
* Requests a URL, returning a promise
*/
export default function(url, options) {
  return fetch(url, {
    mode: 'cors',//'no-cors', // 'cors', //'*same-origin'
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
    ...options
  })
  .then(checkStatus)
  .then(parseJSON)
  .catch(ErrorHandler.network)
}
