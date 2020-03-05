/*
* Apppliction reducer
* We use immutableJS to ensure immutability on the application state level.
*/
 
import { INITIAL_STATE } from './initialState'

import {
  NUTRITIONAL_LOADED
} from '../types'


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

     case NUTRITIONAL_LOADED:
      return { ...state,
        menuItems: action.payload
      }   

    default:
      return state
  }
}
