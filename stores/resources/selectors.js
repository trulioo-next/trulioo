/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

// Direct selector to the app state domain

 export const resourceDataSelector = (state) => {
   return state.resources
 }


 export const resoucesTypesSelector = (state) => {
 	return state.resources.types
 }

 export const resoucesTopicsSelector = (state) => {
 	return state.resources.topics
 }

export default {
  resourceDataSelector,
  resoucesTypesSelector,
  resoucesTopicsSelector
}
