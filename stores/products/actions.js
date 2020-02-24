import {
  PRODUCTS_LIST_START,
  PRODUCTS_LIST_ALL

} from '../types'

// Return a product List
//
export const startListProducts = () => ({
  type: PRODUCTS_LIST_START
})
//
export const getListProducts = (data) => ({
  type: PRODUCTS_LIST_ALL,
  payload: data
})

  
export default {
  startListProducts,
  getListProducts
}
