import { all } from 'redux-saga/effects'

import StartupSagas from './startup/sagas'
import ProductsSagas from './products/sagas'


// single entry point to start all Sagas at once
//
export default function* rootSaga() {
  yield all([
    StartupSagas(),
    ProductsSagas()
  ]);
}
