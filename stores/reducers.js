/**
* Combine all reducers in this file and export the combined reducers.
**/

import { combineReducers } from 'redux-immutable'

/*************************************************
// TODO: Implemente reducers dynamic injection
*************************************************/


// Import reducers here
import app from './app/reducers'
import products from './products/reducers'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {

  const rootReducer = combineReducers({
    app,
    products
  });

  return combineReducers({
    root: rootReducer,
    ...injectedReducers
  })
}
