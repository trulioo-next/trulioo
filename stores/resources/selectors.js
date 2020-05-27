/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

// Direct selector to the app state domain
 

 export const pageDataSelector = (state) => {
   return state.page.data
 }

 
export default {
  pageDataSelector
}
