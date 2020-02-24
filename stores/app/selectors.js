/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

// Direct selector to the app state domain
export const selectIsLoading = (state) => {
  return state.get('root').getIn(['app','isLoading'])
}

export const selectIsLoaded = (state) => {
  return state.get('root').getIn(['app','isLoaded'])
}

export const selectError = (state) => {
  return state.get('root').getIn(['app','error'])
}

/**
 * Other specific selectors
 */

 export const selectIsAuthenticated = (state) => {
   return false
 }

 export const selectErrorSource = (state) => {
   return state.get('root').getIn(['app','errorSource'])
 }


export default {
  selectIsLoading,
  selectIsLoaded,
  selectError,
  selectErrorSource,
  selectIsAuthenticated,
}
