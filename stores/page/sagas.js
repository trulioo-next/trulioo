import { take, call, put, all, select } from 'redux-saga/effects'

import DataService from '../../services/dataService'

import {
  APP_STARTLOADING,
  APP_STARTUP_ERROR,
  PAGE_LOAD_REQUEST,
  PAGE_LOAD_ERROR,
  PAGE_LOADED,
  APP_STOPLOADING
} from '../types'


function* startup(payload) {

   
  try {
    
    // yield call(getGeolocation, payload.ip)

    const state = yield select((state) => state)

    const dataService = DataService(state)
    yield put({ type: PAGE_LOADED, payload: { page_data:[], acf_data:[], isLoading: true } })

    const response = yield call(dataService.getPageData, payload)

    // console.log('DATA RESPONSE', response )
      
    // console.log('RESONSE ', response)
    yield put({ type: PAGE_LOADED, payload: response  })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: PAGE_LOAD_ERROR, payload: errors})
  }
}


/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      PAGE_LOAD_REQUEST
   ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === PAGE_LOAD_REQUEST) {
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
