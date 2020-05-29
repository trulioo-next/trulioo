/*
* Apppliction reducer
* We use immutableJS to ensure immutability on the application state level.
*/
 
import { INITIAL_STATE } from './initialState'

import {
  APP_STARTUP_LOADED,
  APP_STARTUP_ERROR,
  APP_STARTLOADING,
  APP_STOPLOADING,
  GLOBAL_DATA_LOADED,
  GLOBAL_DATA_SITE_INFORMATION
} from '../types'


export default (state = INITIAL_STATE, action) => {
   

  switch (action.type) {

    case APP_STARTUP_LOADED:
      return { ...state,
        isLoading: false,
        isLoaded: true,
        error: null,
      }

    case APP_STOPLOADING:
      return { ...state, isLoading: false, isLoaded: true, }

    case APP_STARTLOADING:
      return { ...state, isLoading: true }  

    case APP_STARTUP_ERROR:
      return { ...state,
        error: action.payload,
        errorSource: APP_STARTUP_ERROR,
        isLoading: false
      }

    case GLOBAL_DATA_LOADED:
      return { ...state,
        isLoaded: true,
        globalData: action.payload
      }

    
    case GLOBAL_DATA_SITE_INFORMATION:
      return { ...state,
        isLoaded: true,
        globalDataSiteInformation: action.payload
      } 

    

    default:
      return state
  }
}
