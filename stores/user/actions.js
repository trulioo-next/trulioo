import {
  SEVEN_REWARDS_AUTH_REQUEST,
  SEVEN_REWARDS_REGISTER_REQUEST,
  SEVEN_REWARDS_LOGOUT_REQUEST,
  SEVEN_REWARDS_FACEBOOK_AUTH_REQUEST,
  SEVEN_REWARDS_FACEBOOK_REGISTER_REQUEST,
  SEVEN_REWARDS_CHECKCARD_REQUEST,
  SEVEN_REWARDS_REDEEM_REQUEST
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

export const reqRedeemAction = (payload) => ({
  type: SEVEN_REWARDS_REDEEM_REQUEST,
  payload: payload
})

export default {
  reqUserAuthAction,
  reqUserRegisterAction,
  reqUserLogoutAction,
  reqUserFacebookAuthAction,
  reqUserFacebookRegisterAction,
  reqCheckCardAction,
  reqRedeemAction
}
