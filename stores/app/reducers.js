/*
* Apppliction reducer
* We use immutableJS to ensure immutability on the application state level.
*/

import { fromJS } from 'immutable'
import InitialState from './initialState' // Register your reducers here.
import {
  APP_SUCCESS,
  APP_STARTLOADING,
  APP_STOPLOADING,
  APP_STARTUP_ERROR,
  PRODUCTS_LIST_ERROR,
} from '../types'


export default (state = InitialState, action) => {

  switch (action.type) {

    case APP_SUCCESS:
      return state
        .set('isLoading', false)
        .set('isLoaded', true)
        .set('error', null)

    case APP_STARTLOADING:
      return state
        .set('isLoading', true)

    case APP_STOPLOADING:
      return state
        .set('isLoading', false)

    case APP_STARTUP_ERROR:
      return state
        .set('errorSource', 'Startup')
        .set('error', action.payload)
        .set('isLoading', false)

    case PRODUCTS_LIST_ERROR:
      return state
        .set('errorSource', 'Products list')
        .set('error', action.payload)
        .set('isLoading', false)

    default:
      return state
  }
}
