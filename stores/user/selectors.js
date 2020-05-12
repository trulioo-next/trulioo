/**
 * User Data Selector
 */

// Direct selector to the app state domain
 
 export const userDataSelector = (state) => {
 	if (!process.browser) {
        return null;
    }
   return state.user
 }


export const userTokenSelector = (state) => {
 	if (!process.browser) {
        return null;
    }
   return state.user.token
 }

export const smsValidatedSelector = (state) => {
 	if (!process.browser) {
        return null;
    }
   return state.user.hasValidatedSms
 } 

export default {
  userDataSelector,
  userTokenSelector,
  smsValidatedSelector
}
