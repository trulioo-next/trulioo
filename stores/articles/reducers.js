/*
* Apppliction reducer
* We use immutableJS to ensure immutability on the application state level.
*/
 
import { INITIAL_STATE } from './initialState'

import {
  ARTICLES__LOADED,
  ARTICLES__ERROR
} from '../types'


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case ARTICLES__LOADED:
      return { ...state,
        postList: action.payload.postList,
        topics: action.payload.topics,
        types: action.payload.types,
        postDataById: action.payload.postDataById
      }

    case ARTICLES__ERROR:
      return { ...state,
        error: action.payload,
        errorSource: RESOURCES_LOAD_ERROR
      }

    default:
      return state
  }
}
