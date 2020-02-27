/**
* Combine all reducers in this file and export the combined reducers.
**/

import { combineReducers } from 'redux'

// Import reducers here
import app from './app/reducers'
import page from './page/reducers'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer() {

  const rootReducer = combineReducers({
    app,
    page
  })

  return rootReducer
}
