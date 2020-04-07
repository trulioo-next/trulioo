import {
  SEVEN_REWARDS_AUTH_REQUEST,
  SEVEN_REWARDS_REGISTER_REQUEST,
} from '../types'

export const reqUserAuthAction = (payload) => ({
  type: SEVEN_REWARDS_AUTH_REQUEST,
  payload: payload
})


export const reqUserRegisterAction = (payload) => ({
  type: SEVEN_REWARDS_REGISTER_REQUEST,
  payload: payload
})

export default {
  reqUserAuthAction,
  reqUserRegisterAction
}
