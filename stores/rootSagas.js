import { all } from 'redux-saga/effects'

import AddSagas from './app/sagas'
import PageSagas from './page/sagas'
import NutritionalsSagas from './nutritionals/sagas'
import UserSagas from './user/sagas'
import AlertSagas from './alert/sagas'

// single entry point to start all Sagas at once
//
export default function* rootSaga() {
  yield all([
    AddSagas(),
    PageSagas(),
    NutritionalsSagas(),
    UserSagas(),
    AlertSagas()
  ]);
}
