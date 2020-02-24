import {
  APP_STARTUP
} from '../types'


export const startup = (isAuthenticated) => ({
  type: APP_STARTUP,
  payload: isAuthenticated
})

export default {
  startup,
}
