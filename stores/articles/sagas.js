import { take, call, put, all, select } from 'redux-saga/effects'

import ResourcesService from '../../services/resourcesService'

import {
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  ARTICLES_LOAD_REQUEST,
  ARTICLES_LOADED,
  ARTICLES_ERROR,
  APP_STOPLOADING,
  ARTICLES_FILTER_REQUEST,
  ARTICLES_FILTER_LOADED,
  ARTICLES_SEARCH_REQUEST,
  ARTICLES_SEARCH_LOADED,
} from '../types'


function* startup(payload) {

  try {

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.getArticleData, payload)

    yield put({ type: ARTICLES_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: ARTICLES_ERROR, payload: errors})
  }
}

// FILTER ARTITCLE POSTS
//
function* filterArticles(payload) {

  try {

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.filterArticleData, payload)

    yield put({ type: ARTICLES_FILTER_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: ARTICLES_ERROR, payload: errors})
  }
}

// SEARCH ARTICLE POSTS
//
function* searchArticles(payload) {

  try {

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.searchTypeData, payload)
    yield put({ type: ARTICLES_SEARCH_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: ARTICLES_ERROR, payload: errors})
  }
}

/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      ARTICLES_LOAD_REQUEST,
      ARTICLES_FILTER_REQUEST,
      ARTICLES_SEARCH_REQUEST
   ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === ARTICLES_LOAD_REQUEST) {
      yield call(startup, action.payload)
    }

    if (action.type === ARTICLES_FILTER_REQUEST) {
      yield call(filterArticles, action.payload)
    }

    if (action.type === ARTICLES_SEARCH_REQUEST) {
      yield call(searchArticles, action.payload)
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
