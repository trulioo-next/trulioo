/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

// Direct selector to the app state domain
 

 export const nutritionalsSelector = (state) => {
   return state.nutritionals.menuItems
 }

 
export default {
  nutritionalsSelector
}
