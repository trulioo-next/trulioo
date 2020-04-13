import { take, call, put, all, select } from 'redux-saga/effects'
import UserClientService from '../../services/userClientService';
import SevenRewardsService from '../../services/server/sevenRewardsService';

import {
  SEVEN_REWARDS_AUTH_REQUEST,
  SEVEN_REWARDS_AUTH_LOADED,
  SEVEN_REWARDS_AUTH_ERROR,
  APP_STARTLOADING,
  SEVEN_REWARDS_CHECK_REQUEST,
  SEVEN_REWARDS_CHECK_LOADED,
  SEVEN_REWARDS_REGISTER_REQUEST,
  SEVEN_REWARDS_REGISTER_LOADED,
  SEVEN_REWARDS_REGISTER_ERROR,
  SEVEN_REWARDS_LOGOUT_REQUEST,
  SEVEN_REWARDS_LOGOUT
} from '../types'

function* startup(payload) {
   
  try {
    

    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
   
    const loginClientResponse = yield call(sevenRewardsService.userAuth, payload)

    console.log('LOGIN USER PAYLOAD REWARDS SAGA !!   ', loginClientResponse )

    yield put({ type: SEVEN_REWARDS_AUTH_LOADED, payload:loginClientResponse})

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_AUTH_ERROR, payload: errors})
  }
}

//
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

//
function* registerUser(payload) {


   
  try {
    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
   
    const registerClientResponse = yield call(sevenRewardsService.registerUser, payload)

     console.log('REGISTER USER PAYLOAD REWARDS !!   ', registerClientResponse )
    
    yield put({ type: SEVEN_REWARDS_REGISTER_LOADED, payload:registerClientResponse})

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_REGISTER_ERROR, payload: errors})
  }
}

//
// Log User Out
function* logoutUser() {
 
  try {
    
    yield put({ type: SEVEN_REWARDS_LOGOUT })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_REGISTER_ERROR, payload: errors})
  }
}

/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      SEVEN_REWARDS_AUTH_REQUEST,
      SEVEN_REWARDS_CHECK_REQUEST,
      SEVEN_REWARDS_REGISTER_REQUEST,
      SEVEN_REWARDS_LOGOUT_REQUEST
    ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === SEVEN_REWARDS_AUTH_REQUEST) {
      yield call(startup, action.payload)
    }

    if (action.type === SEVEN_REWARDS_CHECK_REQUEST) {
      yield call(checkUserAuth, action.payload)
    }

    if (action.type === SEVEN_REWARDS_REGISTER_REQUEST) {
      yield call(registerUser, action.payload)
    }

    if (action.type === SEVEN_REWARDS_LOGOUT_REQUEST) {
      yield call(logoutUser)
    }
 
    yield action
  }
}

export default function* UserSagas() {
   yield all([
     startupFlow(),
   ])
}
