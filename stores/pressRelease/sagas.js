import { take, call, put, all, select } from 'redux-saga/effects'

import ResourcesService from '../../services/resourcesService'

import {
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  PRESS_LOAD_REQUEST,
  PRESS_LOADED,
  PRESS_ERROR,
  APP_STOPLOADING,
  PRESS_FILTER_REQUEST,
  PRESS_FILTER_LOADED,
  PRESS_SEARCH_REQUEST,
  PRESS_SEARCH_LOADED,
  PRESS_TYPES_LOADED,
  PRESS_TYPES_REQUEST
} from '../types'


function* startup(payload) {


  try {

    // yield call(getGeolocation, payload.ip)
    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.getPressReleaseData, payload)

    console.log('RESONSE ', response)
    yield put({ type: PRESS_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: PRESS_ERROR, payload: errors})
  }
}

// FILTER  POSTS
//
function* filterPress(payload) {

  try {

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.filterArticleData, payload)

    yield put({ type: PRESS_FILTER_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: PRESS_ERROR, payload: errors})
  }
}

// SEARCH POSTS
//
function* searchPress(payload) {

  try {

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.searchTypeData, payload)
    yield put({ type: PRESS_SEARCH_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: PRESS_ERROR, payload: errors})
  }
}

// PRESS TYPES
//
function* pressTypes(payload) {

  try {

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.articleTypesData, payload)
    console.log('SAGA TYPES ', response )
    yield put({ type: PRESS_TYPES_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: PRESS_ERROR, payload: errors})
  }
}




/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      PRESS_LOAD_REQUEST,
      PRESS_FILTER_REQUEST,
      PRESS_SEARCH_REQUEST,
      PRESS_TYPES_REQUEST
   ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === PRESS_LOAD_REQUEST) {
      yield call(startup, action.payload)
    }

    if (action.type === PRESS_FILTER_REQUEST) {
      yield call(filterPress, action.payload)
    }

    if (action.type === PRESS_SEARCH_REQUEST) {
      yield call(searchPress, action.payload)
    }

    if (action.type === PRESS_TYPES_REQUEST) {
      yield call(pressTypes, action.payload)
    }

    yield put({ type: APP_STOPLOADING })

    yield action
  }
}

export default function* PressReleaseSagas() {
   yield all([
     startupFlow(),
   ])
}
