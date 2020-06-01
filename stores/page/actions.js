import {
  PAGE_LOAD_REQUEST,
  PAGE_BANNER_REQUEST,
} from '../types'

export const reqPageDataAction = (payload ) => ({
  type: PAGE_LOAD_REQUEST,
  payload: payload
})

export const reqPageBannersAction = (payload ) => ({
  type: PAGE_BANNER_REQUEST,
  payload: payload
})

export default {
  reqPageBannersAction,
  reqPageDataAction
}
