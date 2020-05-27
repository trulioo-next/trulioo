import {
  RESOURCES_LOAD_REQUEST,
} from '../types'

export const reqResourcesAction = (payload ) => ({
  type: RESOURCES_LOAD_REQUEST,
  payload: payload
})

export default {
  reqResourcesAction
}
