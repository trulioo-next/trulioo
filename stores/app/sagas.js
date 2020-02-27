import { take, call, put, all, select } from 'redux-saga/effects'

import DataService from '../../services/dataService'

import {
  APP_STARTUP_REQUEST,
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  GLOBAL_DATA_LOADED
} from '../types'


function* startup(payload) {

   
  try {
    

    // yield call(getGeolocation, payload.ip)

    const state = yield select((state) => state)

    const dataService = DataService(state)

    const response = yield call(dataService.getGlobalData, true)
    // console.log('RESONSE ', response)
    yield put({ type: GLOBAL_DATA_LOADED, payload: response })

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
    }
 
    yield action
  }
}

export default function* AppSagas() {
   yield all([
     startupFlow(),
   ])
}
