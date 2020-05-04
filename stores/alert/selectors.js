/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

// Direct selector to the app state domain
 

 export const alertDataSelector = (state) => {
   return state.alert && state.alert.alerts && Array.isArray(state.alert.alerts) ? [...state.alert.alerts] : [];
 }

 
export default {
  alertDataSelector
}
