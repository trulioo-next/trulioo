import { take, call, put, all } from 'redux-saga/effects'

import { startListProducts, getListProducts } from './actions'

import { ProductService } from '../../services/productService'

import {
  APP_STARTLOADING,
  APP_STOPLOADING,
  PRODUCTS_LIST_ALL,
  PRODUCTS_LIST_ERROR,
  PRODUCTS_LIST_START
} from '../types'

// Load All Products
//
function * loadAllProductsSaga () {

  try {

    const response = yield call(ProductService.getAllProducts, null)
    yield put(getListProducts(response.Products))

  } catch (errors) {
    // yield put(error(err))
    console.log(errors);
    yield put({ type: PRODUCTS_LIST_ERROR, payload: errors})
  }
}


/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* productsFlow() {
  while (true) {

    // watching for authentication actions
    const action = yield take([ PRODUCTS_LIST_START ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === PRODUCTS_LIST_START ) {
      yield call(loadAllProductsSaga, action.payload)
    }

    yield put({ type: APP_STOPLOADING })

    yield action
  }
}
//
export default function* ProductSagas() {
   yield all([
     productsFlow(),
     //loadAllProductsSaga()
   ]);
}