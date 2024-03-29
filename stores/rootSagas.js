import { all } from 'redux-saga/effects'

import AddSagas from './app/sagas'
import PageSagas from './page/sagas'
import SearchSiteSagas from './searchSite/sagas'
import ResourceSagas from './resources/sagas'
import PressReleaseSagas from './pressRelease/sagas'
import ArticlesSagas from './articles/sagas'

// single entry point to start all Sagas at once
//
export default function* rootSaga() {
  yield all([
    AddSagas(),
    PageSagas(),
    SearchSiteSagas(),
    ResourceSagas(),
    PressReleaseSagas(),
    ArticlesSagas()
  ]);
}
