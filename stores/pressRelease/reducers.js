/*
* Apppliction reducer
* We use immutableJS to ensure immutability on the application state level.
*/

import { INITIAL_STATE } from './initialState'

import {
  PRESS_LOADED,
  PRESS_ERROR,
  PRESS_FILTER_LOADED,
  PRESS_SEARCH_LOADED,
  PRESS_TYPES_LOADED,
} from '../types'


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case PRESS_LOADED:
      return { ...state,
        postList: action.payload.postList,
        years: action.payload.years,
        types: action.payload.types,
        featured: action.payload.featured,
      }

   case PRESS_FILTER_LOADED:
          return { ...state,
            postList: action.payload.postList,
            years: action.payload.years,
            types: action.payload.types,
            featured: action.payload.featured,
          }

      case PRESS_SEARCH_LOADED:
          return { ...state,
            postList: action.payload.postList,
          }

    case PRESS_TYPES_LOADED:
          return { ...state,
            types: action.payload.postList,
          }

    case PRESS_ERROR:
      return { ...state,
        error: action.payload,
        errorSource: PRESS_ERROR
      }

    default:
      return state
  }
}
