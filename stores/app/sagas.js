import { take, call, put, all, select } from 'redux-saga/effects'

import DataService from '../../services/dataService'


import {
  APP_STARTUP_REQUEST,
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  APP_STOPLOADING,
  GLOBAL_DATA_LOADED,
  GLOBAL_DATA_SITE_INFORMATION,
  PAGE_LOAD_REQUEST,
  PAGE_LOADED,
  APP_PAGE_LOAD_ERROR
} from '../types'


function* startup(payload) {

  try {

    const state = yield select((state) => state)
    const dataService = DataService(state)
    const response = yield call(dataService.getGlobalData, true)
    yield put({ type: GLOBAL_DATA_LOADED, payload: response })

  } catch(err) {
    const errors = err.payload || err
    yield put({ type: APP_STARTUP_ERROR, payload: errors})
  }
}

function* startupSiteInformation(payload) {

  try {

    const state = yield select((state) => state)
    const dataService = DataService(state)
    const response = yield call(dataService.getSiteInformation, payload)
      
    yield put({ type: GLOBAL_DATA_SITE_INFORMATION, payload: response })


  } catch(err) {
    const errors = err.payload || err
    yield put({ type: APP_STARTUP_ERROR, payload: errors})
  }
}

/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      APP_STARTUP_REQUEST
   ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === APP_STARTUP_REQUEST) {
      yield call(startup, action.payload)
      yield call(startupSiteInformation, action.payload)
    }


    yield put({ type: APP_STOPLOADING })

    yield action
  }
}

export default function* AppSagas() {
   yield all([
     startupFlow(),
   ])
}
