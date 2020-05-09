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
  SEVEN_REWARDS_REDEEM,
  SEVEN_REWARDS_SMS,
  SEVEN_REWARDS_UPDATE,
  SEVEN_REWARDS_PASSWORD_RESET,
  SEVEN_REWARDS_UPDATE_ERROR,
  SEVEN_REWARDS_UPDATE_PREFERNCES,
  SEVEN_REWARDS_ADDCARD,
  SEVEN_REWARDS_SMS_ERROR
} from '../types'


export default (state = INITIAL_STATE, action) => {
  
  switch (action.type) {

      case SEVEN_REWARDS_ADDCARD:
        return { ...state,
           addCard: action.payload
        }

      case SEVEN_REWARDS_UPDATE_PREFERNCES:
        return { ...state,
           user: action.payload.user
        }

      case SEVEN_REWARDS_UPDATE_ERROR:
        return { ...state,
           fieldErrors: action.payload
        }

      case SEVEN_REWARDS_PASSWORD_RESET:
        return { ...state,
         passwordReset: action.payload
      }
      
      case SEVEN_REWARDS_UPDATE:
        return { ...state,
         user: action.payload.user,
         fieldErrors:false
      }

      case SEVEN_REWARDS_CHECKCARD:
        return { ...state,
          cardBalance:action.payload
      }

      case SEVEN_REWARDS_SMS:
        return { ...state,
          sms: action.payload
        }  

      case SEVEN_REWARDS_SMS_ERROR:
        return { ...state,
          sms: action.payload
        }  

      case SEVEN_REWARDS_REDEEM:
        return { ...state,
          redeem: action.payload,
          myRewards: action.payload.myRewards,

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
        token:action.payload.token,
        myRewards:action.payload.myRewards,
        fieldErrors:false
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
        error:action.payload.error,
        myRewards:action.payload.myRewards
      }  

      case SEVEN_REWARDS_CHECK_LOADED:
      return { ...state,
        auth: action.payload
      }  

      case SEVEN_REWARDS_REGISTER_LOADED:
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
        token:action.payload.token,
        myRewards:action.payload.myRewards,
        fieldErrors:false,
        sms:action.payload.sms
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
        token:false,
        sms:false,
        myRewards:false
      }  

    default:
      return state
  }
}
