/**
 * Products Selectors
 */

export const selectProductsList = (state) => {
  return state.get('root').getIn(['products', 'list'])
}

export const selectCurrentProduct = (state) => {
  return state.get('root').getIn(['products', 'currentProduct'])
}

/**
 * Other specific selectors
 */


export default {
  selectProductsList,
  selectCurrentProduct
}
