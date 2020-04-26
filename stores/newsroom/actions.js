import {
  NEWSROOM_LOAD_REQUEST,
} from '../types'

export const reqNewsroomDataAction = (payload ) => ({
  type: NEWSROOM_LOAD_REQUEST,
  payload: payload
})

export default {
  reqNewsroomDataAction
}
