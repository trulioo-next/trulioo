/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

// Direct selector to the app state domain
 

export const newsroomDataSelector = (state) => {
  return state.newsroom.data
}


export const newsroomPostSelector = (state) => {
  return state.newsroom.post
}

 
export default {
  newsroomDataSelector,
  newsroomPostSelector
}
