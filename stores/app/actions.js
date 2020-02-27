import {
  APP_STARTUP_REQUEST,
} from '../types'

export const reqStartupAction = ({ isAuthenticated, ip, query }) => ({
  type: APP_STARTUP_REQUEST,
  payload: {isAuthenticated, ip, query }
})

export default {
  reqStartupAction
}
