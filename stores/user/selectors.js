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

export default {
  userDataSelector
}
