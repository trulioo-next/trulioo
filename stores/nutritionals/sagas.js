import { take, call, put, all, select } from 'redux-saga/effects'
import NutritionalService from '../../services/nutritionalService';

import {
  NUTRITIONAL_LOAD_REQUEST,
  NUTRITIONAL_LOADED,
  NUTRITIONAL_ERROR,
  APP_STARTLOADING
} from '../types'

function* startup(payload) {
   
  try {
    
    const state = yield select((state) => state)
    const nutritionalService = NutritionalService(state);
    const nutritionalResponse = yield call(nutritionalService.getNutritionalData, true)
    yield put({ type: NUTRITIONAL_LOADED, payload: nutritionalResponse })


  } catch(err) {

    const errors = err.payload || err
    yield put({ type: NUTRITIONAL_ERROR, payload: errors})
  }
}


/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      NUTRITIONAL_LOAD_REQUEST
    ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === NUTRITIONAL_LOAD_REQUEST) {
      yield call(startup, action.payload)
    }
 
    yield action
  }
}

export default function* NutritionalsSagas() {
   yield all([
     startupFlow(),
   ])
}
