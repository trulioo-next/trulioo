/*
* Products reducer
*
* The reducer takes care of our data. Using actions, we can change our application state.
* To add a new action, add it to the switch statement in the reducer function.
*
* We use immutableJS to ensure immutability on the application state level.
*
* Example:
* case YOUR_ACTION_CONSTANT:
*   return state.set('yourStateVariable', true)
*/

import { fromJS } from 'immutable'
import { INITIAL_STATE } from './initialState'


import {
  PRODUCTS_LIST_ALL,
} from '../types'


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case PRODUCTS_LIST_ALL:
      return state
        .set('list', action.payload)

    default:
      return state
  }
}
