/*
* Apppliction reducer
* We use immutableJS to ensure immutability on the application state level.
*/
 
import { INITIAL_STATE } from './initialState'

import {
  SEVEN_REWARDS_AUTH_LOADED,
  SEVEN_REWARDS_CHECK_LOADED
} from '../types'


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

     case SEVEN_REWARDS_AUTH_LOADED:
      return { ...state,
        auth: action.payload
      }  

      case SEVEN_REWARDS_CHECK_LOADED:
      return { ...state,
        auth: action.payload
      }   

    default:
      return state
  }
}
