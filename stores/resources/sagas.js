import { take, call, put, all, select } from 'redux-saga/effects'

import ResourcesService from '../../services/resourcesService'

import {
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  RESOURCES_LOAD_REQUEST,
  RESOURCES_LOADED,
  RESOURCES_ERROR,
  APP_STOPLOADING
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


/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      RESOURCES_LOAD_REQUEST
   ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === RESOURCES_LOAD_REQUEST) {
      yield call(startup, action.payload)
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
