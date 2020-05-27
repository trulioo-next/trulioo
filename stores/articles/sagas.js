import { take, call, put, all, select } from 'redux-saga/effects'

import ResourcesService from '../../services/resourcesService'

import {
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  ARTICLES_LOAD_REQUEST,
  ARTICLES__LOADED,
  ARTICLES__ERROR, 
  APP_STOPLOADING
} from '../types'


function* startup(payload) {

   
  try {

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.getArticleData, payload)
   
    yield put({ type: ARTICLES__LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: ARTICLES__ERROR, payload: errors})
  }
}


/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      ARTICLES_LOAD_REQUEST
   ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === ARTICLES_LOAD_REQUEST) {
      yield call(startup, action.payload)
    }

    yield put({ type: APP_STOPLOADING })
 
    yield action
  }
}

export default function* ArticlesSagas() {
   yield all([
     startupFlow(),
   ])
}
