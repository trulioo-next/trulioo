import { take, call, put, all, select } from 'redux-saga/effects'

import DataService from '../../services/dataService'

import {
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  ALERT_LOAD_REQUEST,
  ALERT_LOAD_ERROR,
  ALERT_LOADED,
  APP_STOPLOADING
} from '../types'


function* startup(payload) {
  try {
    const state = yield select((state) => state)
    
    const dataService = DataService(state)
    // yield put({ type: ALERT_LOADED, payload: { alerts:[], isLoading: true } })
    
    const response = yield call(dataService.getAlertsData)

    // console.log('DATA RESPONSE', response )
      
    yield put({ type: ALERT_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: ALERT_LOAD_ERROR, payload: errors})
  }
}


/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      ALERT_LOAD_REQUEST
   ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === ALERT_LOAD_REQUEST) {
      yield call(startup, action.payload)
    }

    yield put({ type: APP_STOPLOADING })
 
    yield action
  }
}

export default function* PageSagas() {
   yield all([
     startupFlow(),
   ])
}
