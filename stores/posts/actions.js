import {
  PAGE_LOAD_REQUEST,
} from '../types'

export const reqPageDataAction = (payload ) => ({
  type: PAGE_LOAD_REQUEST,
  payload: payload
})

export default {
  reqPageDataAction
}
