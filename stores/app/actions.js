import {
  APP_STARTUP_REQUEST,
} from '../types'

export const reqStartupAction = ({ isAuthenticated, ip, query, page }) => ({
  type: APP_STARTUP_REQUEST,
  payload: {isAuthenticated, ip, query, page }
})

export const reqAlertDataAction = ( ) => (
  {
  type: ALERT_LOAD_REQUEST
})

export default {
  reqStartupAction,
  reqAlertDataAction
}
