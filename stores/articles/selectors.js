/**
 * Selectors let us factorize logic that queries the state. Selectors can be used
 * in sagas or components to avoid duplicating that logic.
 */

// Direct selector to the app state domain


export const articlesDataSelector = (state) => {
	return state.articles
}

export const articlesTypesSelector = (state) => {
	return state.articles.types
}

export const articlesTopicsSelector = (state) => {
	return state.articles.topics
}

export default {
  articlesDataSelector,
  articlesTypesSelector,
  articlesTopicsSelector
}
