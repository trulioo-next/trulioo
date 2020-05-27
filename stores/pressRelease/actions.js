import {
  PRESS_LOAD_REQUEST,
} from '../types'

export const reqPressReleaseAction = (payload ) => ({
  type: PRESS_LOAD_REQUEST,
  payload: payload
})

export default {
  reqPressReleaseAction
}
