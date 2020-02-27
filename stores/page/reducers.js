/*
* Apppliction reducer
* We use immutableJS to ensure immutability on the application state level.
*/
 
import { INITIAL_STATE } from './initialState'

import {
  PAGE_LOADED,
  PAGE_LOAD_ERROR
} from '../types'


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case PAGE_LOADED:
      return { ...state,
        data: action.payload,
        isLoading: false
      }

    case PAGE_LOAD_ERROR:
      return { ...state,
        error: action.payload,
        errorSource: APP_STARTUP_ERROR,
        isLoading: false
      }

    default:
      return state
  }
}
