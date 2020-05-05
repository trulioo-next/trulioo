import {
  APP_STARTUP_REQUEST,
} from '../types'

export const reqStartupAction = ({ isAuthenticated, ip, query }) => ({
  type: APP_STARTUP_REQUEST,
  payload: {isAuthenticated, ip, query }
})

export const reqAlertDataAction = ( ) => (
  {
  type: ALERT_LOAD_REQUEST
})

export default {
  reqStartupAction,
  reqAlertDataAction
}
