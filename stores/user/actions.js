import {
  SEVEN_REWARDS_AUTH_REQUEST,
} from '../types'

export const reqUserAuthAction = (payload) => ({
  type: SEVEN_REWARDS_AUTH_REQUEST,
  payload: payload
})

export default {
  reqUserAuthAction
}
