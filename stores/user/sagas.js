import { take, call, put, all, select } from 'redux-saga/effects'
import UserClientService from '../../services/userClientService';

import {
  SEVEN_REWARDS_AUTH_REQUEST,
  SEVEN_REWARDS_AUTH_LOADED,
  SEVEN_REWARDS_AUTH_ERROR,
  APP_STARTLOADING,
  SEVEN_REWARDS_CHECK_REQUEST,
  SEVEN_REWARDS_CHECK_LOADED
} from '../types'

function* startup(payload) {
   
  try {
    
    const state = yield select((state) => state)
    const userClientService = UserClientService(state);
    const userClientResponse = yield call(userClientService.getUserAuth, payload)
    yield put({ type: SEVEN_REWARDS_AUTH_LOADED, payload:userClientResponse})

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_AUTH_ERROR, payload: errors})
  }
}


function* checkUserAuth(payload) {
   
  try {
    
    const userClientService = UserClientService(state);
    const userClientResponse = yield call(userClientService.checkUserAuth)
    console.log('HELLO IS USER AUTH ', userClientResponse)
    yield put({ type: SEVEN_REWARDS_CHECK_LOADED, payload:userClientResponse})

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_AUTH_ERROR, payload: errors})
  }
}

/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      SEVEN_REWARDS_AUTH_REQUEST,
      SEVEN_REWARDS_CHECK_REQUEST
    ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === SEVEN_REWARDS_AUTH_REQUEST) {
      yield call(startup, action.payload)
    }

    if (action.type === SEVEN_REWARDS_CHECK_REQUEST) {
      yield call(checkUserAuth, action.payload)
    }
 
    yield action
  }
}

export default function* UserSagas() {
   yield all([
     startupFlow(),
   ])
}
