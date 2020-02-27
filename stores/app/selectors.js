/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

// Direct selector to the app state domain
export const selectIsLoading = (state) => {
  return state.app.isLoading
}

export const selectIsLoaded = (state) => {
  return state.app.isLoading
}

export const selectError = (state) => {
  return state.app.error
}

/**
 * Other specific selectors
 */
 export const selectIsAuthenticated = (state) => {
   return false
 }

 export const selectErrorSource = (state) => {
  return state.app.errorSource
 }

 export const selectHeaderData = (state) => {
   return state.app.globalData['header-menu']
 }

 export const selectFooterData = (state) => {
    let footerData = [
      { footer1:state.app.globalData['footer-1-menu'] },
      { footer2:state.app.globalData['footer-2-menu'] },
      { footer3:state.app.globalData['footer-3-menu'] },
      { footer4:state.app.globalData['footer-4-menu'] },
      { footer5:state.app.globalData['footer-5-menu'] },
      { footer6:state.app.globalData['footer-6-menu'] },
      { footer7:state.app.globalData['footer-7-menu'] },
      { footer8:state.app.globalData['footer-8-menu'] },
      { footerUpper:state.app.globalData['footer-upper-menu'] }
    ]
    
   return footerData
 }


export default {
  selectIsLoading,
  selectIsLoaded,
  selectError,
  selectErrorSource,
  selectIsAuthenticated,
  selectHeaderData,
  selectFooterData
}
