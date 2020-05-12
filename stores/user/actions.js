import {
  SEVEN_REWARDS_AUTH_REQUEST,
  SEVEN_REWARDS_REGISTER_REQUEST,
  SEVEN_REWARDS_LOGOUT_REQUEST,
  SEVEN_REWARDS_FACEBOOK_AUTH_REQUEST,
  SEVEN_REWARDS_FACEBOOK_REGISTER_REQUEST,
  SEVEN_REWARDS_CHECKCARD_REQUEST,
  SEVEN_REWARDS_REDEEM_REQUEST,
  SEVEN_REWARDS_SMS_REQUEST,
  SEVEN_REWARDS_UPDATE_REQUEST,
  SEVEN_REWARDS_PASSWORD_RESET_REQUEST,
  SEVEN_REWARDS_UPDATE_PREFERNCES_REQUEST,
  SEVEN_REWARDS_ADDCARD_REQUEST,
  SEVEN_REWARDS_VALIDATE_SMS,
  SEVEN_REWARDS_UNVALIDATE_SMS
} from '../types'

export const reqUserAuthAction = (payload) => ({
  type: SEVEN_REWARDS_AUTH_REQUEST,
  payload: payload
})

export const reqUserFacebookAuthAction = (payload) => ({
  type: SEVEN_REWARDS_FACEBOOK_AUTH_REQUEST,
  payload: payload
})
 
export const reqUserLogoutAction = (payload) => ({
  type: SEVEN_REWARDS_LOGOUT_REQUEST,
  payload: payload
})
 
export const reqUserRegisterAction = (payload) => ({
  type: SEVEN_REWARDS_REGISTER_REQUEST,
  payload: payload
})

export const reqUserFacebookRegisterAction = (payload) => ({
  type: SEVEN_REWARDS_FACEBOOK_REGISTER_REQUEST,
  payload: payload
})

export const reqCheckCardAction = (payload) => ({
  type: SEVEN_REWARDS_CHECKCARD_REQUEST,
  payload: payload
})

export const reqAddCardAction = (payload) => ({
  type: SEVEN_REWARDS_ADDCARD_REQUEST,
  payload: payload
})

export const reqRedeemAction = (payload) => ({
  type: SEVEN_REWARDS_REDEEM_REQUEST,
  payload: payload
})

export const reqSMSAction = (payload) => ({
  type: SEVEN_REWARDS_SMS_REQUEST,
  payload: payload
})

export const reqUpdateAction = (payload) => ({
  type: SEVEN_REWARDS_UPDATE_REQUEST,
  payload: payload
})

export const reqPasswordResetAction = (payload) => ({
  type: SEVEN_REWARDS_PASSWORD_RESET_REQUEST,
  payload: payload
})

export const reqPreferenceUpdateAction = (payload) => ({
  type: SEVEN_REWARDS_UPDATE_PREFERNCES_REQUEST,
  payload: payload
})

export const validateSMSAction = (payload) => ({
  type: SEVEN_REWARDS_VALIDATE_SMS,
  payload: payload
})

export const unValidateSMSAction = (payload) => ({
  type: SEVEN_REWARDS_UNVALIDATE_SMS,
  payload: payload
})

export default {
  reqUserAuthAction,
  reqUserRegisterAction,
  reqUserLogoutAction,
  reqUserFacebookAuthAction,
  reqUserFacebookRegisterAction,
  reqCheckCardAction,
  reqRedeemAction,
  reqSMSAction,
  reqUpdateAction,
  reqPasswordResetAction,
  reqPreferenceUpdateAction,
  reqAddCardAction,
  validateSMSAction,
  unValidateSMSAction
}
