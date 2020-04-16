import { take, call, put, all, select } from 'redux-saga/effects'

import DataService from '../../services/dataService'
const nutritionalData = require('../../data/nutritionals.json')
 
import {
  APP_STARTUP_REQUEST,
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  GLOBAL_DATA_LOADED,
  NUTRITIONAL_LOADED
} from '../types'


function* startup(payload) {

  try {
 
    const state = yield select((state) => state)
    const dataService = DataService(state)
    const response = yield call(dataService.getGlobalData, true)

    // console.log('STARTUP GLOBAL DATA SAGA  ', response )
    yield put({ type: GLOBAL_DATA_LOADED, payload: response })

    // Load default Nutri Data 
    // console.log('STARTUP NUTRITIONAL_LOADED SAGA  ', nutritionalData )
    yield put({ type: NUTRITIONAL_LOADED, payload: nutritionalData })

 
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
