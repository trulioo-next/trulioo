/*
* Apppliction reducer
* We use immutableJS to ensure immutability on the application state level.
*/
 
import { INITIAL_STATE } from './initialState'

import {
  SEVEN_REWARDS_AUTH_LOADED,
  SEVEN_REWARDS_CHECK_LOADED,
  SEVEN_REWARDS_REGISTER_LOADED,
  SEVEN_REWARDS_LOGOUT,
  SEVEN_REWARDS_FACEBOOK_AUTH,
  SEVEN_REWARDS_CHECKCARD,
  SEVEN_REWARDS_REDEEM
} from '../types'


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {


    case SEVEN_REWARDS_CHECKCARD:
      return { ...state,
        cardBalance:action.payload
      }

      case SEVEN_REWARDS_REDEEM:
        return { ...state,
          redeem: action.payload.redeem
        }  

     case SEVEN_REWARDS_AUTH_LOADED:
      return { ...state,
        auth: action.payload.auth,
        user: action.payload.user,
        rewards:action.payload.rewards,
        coupons:action.payload.coupons,
        deals:action.payload.deals,
        promotions:action.payload.promotions,
        bonusOffers:action.payload.bonusOffers,
        registered: true,
        error:action.payload.error,
        token:action.payload.token
      }  


      case SEVEN_REWARDS_FACEBOOK_AUTH:
      return { ...state,
        auth: action.payload.auth,
        user: action.payload.user,
        rewards:action.payload.rewards,
        coupons:action.payload.coupons,
        deals:action.payload.deals,
        promotions:action.payload.promotions,
        bonusOffers:action.payload.bonusOffers,
        registered: true,
        token:action.payload.token,
        error:action.payload.error
      }  

      case SEVEN_REWARDS_CHECK_LOADED:
      return { ...state,
        auth: action.payload
      }  

      case SEVEN_REWARDS_REGISTER_LOADED:
      return { ...state,
        auth:action.payload.auth,
        user: action.payload.user,
        registered: action.payload.registered
      } 

      case SEVEN_REWARDS_LOGOUT:
      return { ...state,
        auth: false,
        user: false,
        rewards:false,
        coupons:false,
        deals:false,
        promotions:false,
        registered: false,
        error:false,
        redeem:false,
        token:false
      }  

    default:
      return state
  }
}
