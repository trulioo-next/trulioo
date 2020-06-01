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

 export const selectSiteInformation = (state) => {
  return state.app.globalDataSiteInformation['siteInformation']
}

export const selectGeneralSettings = (state) => {
  return state.app.globalDataSiteInformation['generalSettings']
}

 export const selectHeaderData = (state) => {
   return state.app.globalData['main']
 }

 export const selectFooterData = (state) => {

    let data = state.app.globalData;

    let footerData = [
      { footer:data['footer'] },
      { footerSubMenu:data['footer-sub-menu'] }
    ]

   return footerData
 }

 // Alert selector
export const alertDataSelector = (state) => {
  return state.app.alerts
 }


export default {
  selectIsLoading,
  selectIsLoaded,
  selectError,
  selectErrorSource,
  selectIsAuthenticated,
  selectSiteInformation,
  selectHeaderData,
  selectFooterData,
  alertDataSelector
}
