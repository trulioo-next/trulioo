import { INITIAL_STATE } from './initialState'

import {
  SEARCHSITE_LOADED,
  SEARCHSITE_ERROR
} from '../types'


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SEARCHSITE_LOADED:
      return { ...state,
        results: action.payload,
        isLoading: false,
      }

    case SEARCHSITE_ERROR:
      return { ...state,
        error: action.payload,
        errorSource: SEARCHSITE_ERROR,
        isLoading: false,
      }

    default:
      return state
  }
}
