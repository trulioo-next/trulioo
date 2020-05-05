/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

const headerData = require('../../data/global.json')

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
   // if( !state.app.globalData ) {
   //    let staticData = headerData['header-menu']
   //    return  staticData;
   // }

   return state.app.globalData['header-menu']
 }

 export const selectFooterData = (state) => {

    let data = state.app.globalData;
    // console.log('FOOTER SELECTOR ', state.app.globalData.code )
    if( state.app.globalData.code ) {
      data = headerData
    }
 
    let footerData = [
      { footer1:data['footer-1-menu'] },
      { footer2:data['footer-2-menu'] },
      { footer3:data['footer-3-menu'] },
      { footer4:data['footer-4-menu'] }
     
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
  selectHeaderData,
  selectFooterData,
  alertDataSelector
}
