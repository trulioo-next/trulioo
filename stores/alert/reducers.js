/*
* Apppliction reducer
* We use immutableJS to ensure immutability on the application state level.
*/
 
import { INITIAL_STATE } from './initialState'

import {
  ALERT_LOADED,
  ALERT_LOAD_ERROR
} from '../types'


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ALERT_LOADED:
      return { ...state,
                alerts: action.payload };

    case ALERT_LOAD_ERROR:
      return { ...state,
        error: action.payload,
        errorSource: APP_STARTUP_ERROR
      }

    default:
      return state
  }
}
