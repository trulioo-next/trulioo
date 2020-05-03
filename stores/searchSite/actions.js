import {
  SEARCHSITE_LOAD_REQUEST,
} from '../types'

export const reqSearchSiteDataAction = (payload ) => ({
  type: SEARCHSITE_LOAD_REQUEST,
  payload: payload
})

export default {
  reqSearchSiteDataAction
}
