import { INITIAL_STATE } from './initialState'

import {
  NEWSROOM_LOADED,
  NEWSROOM_ERROR
} from '../types'


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case NEWSROOM_LOADED:
      return { ...state,
        data: action.payload
      }

    case NEWSROOM_ERROR:
      return { ...state,
        error: action.payload,
        errorSource: APP_STARTUP_ERROR
      }

    default:
      return state
  }
}
