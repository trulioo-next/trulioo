/**
* Combine all reducers in this file and export the combined reducers.
**/

import { combineReducers } from 'redux-immutable'

 
// Import reducers here
import app from './app/reducers'
  
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {

  const rootReducer = combineReducers({
    app
  });

  return combineReducers({
    root: rootReducer,
    ...injectedReducers
  })
}
