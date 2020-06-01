import { take, call, put, all, select } from 'redux-saga/effects'

import ResourcesService from '../../services/resourcesService'

import {
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  RESOURCES_LOAD_REQUEST,
  RESOURCES_LOADED,
  RESOURCES_ERROR,
  APP_STOPLOADING,
  RESOURCES_FILTER_REQUEST,
  RESOURCES_FILTER_LOADED,
  RESOURCES_SEARCH_REQUEST,
  RESOURCES_SEARCH_LOADED,
  RESOURCES_TYPES_LOADED,
  RESOURCES_TYPES_REQUEST
} from '../types'


function* startup(payload) {


  try {

    // yield call(getGeolocation, payload.ip)

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.getResourceData, payload)

    // console.log('RESONSE ', response)
    yield put({ type: RESOURCES_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: RESOURCES_ERROR, payload: errors})
  }
}

// FILTER POSTS
//
function* filterResouces(payload) {

  try {

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.filterResoucesData, payload)

    yield put({ type: RESOURCES_FILTER_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: RESOURCES_ERROR, payload: errors})
  }
}

// SEARCH POSTS
//
function* searchResouces(payload) {

  try {

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.searchResoucesData, payload)
    yield put({ type: RESOURCES_SEARCH_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: RESOURCES_ERROR, payload: errors})
  }
}

// Resource TYPES
//
function* resouceTypes(payload) {

  try {

    const state = yield select((state) => state)
    const resourcesService = ResourcesService(state)
    const response = yield call(resourcesService.resoucesTypesData, payload)
    console.log('SAGA TYPES ', response )
    yield put({ type: RESOURCES_TYPES_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: RESOURCES_ERROR, payload: errors})
  }
}



/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      RESOURCES_LOAD_REQUEST,
      RESOURCES_FILTER_REQUEST,
      RESOURCES_SEARCH_REQUEST,
      RESOURCES_TYPES_REQUEST
   ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === RESOURCES_LOAD_REQUEST) {
      yield call(startup, action.payload)
    }

    if (action.type === RESOURCES_FILTER_REQUEST) {
      yield call(filterResouces, action.payload)
    }

    if (action.type === RESOURCES_SEARCH_REQUEST) {
      yield call(searchResouces, action.payload)
    }

    if (action.type === RESOURCES_TYPES_REQUEST) {
      yield call(resouceTypes, action.payload)
    }

    yield put({ type: APP_STOPLOADING })

    yield action
  }
}

export default function* ResourceSagas() {
   yield all([
     startupFlow(),
   ])
}
