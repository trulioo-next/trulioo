import { take, call, put, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
  APP_STARTUP,
  APP_STARTLOADING,
  APP_STOPLOADING,
  APP_SUCCESS,
  APP_STARTUP_ERROR,
} from '../types'


function* startup(isLoaded) {
  try {

    // test loading
    console.log('>>> Starting app delayed  - do something')
    yield call(delay, 2000)

    // dispatch success action to app reducer
    yield put({ type: APP_SUCCESS })

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

    // watching for authentication actions
    const action = yield take([ APP_STARTUP ])

    yield put({ type: APP_STARTLOADING })

    if (action.type === APP_STARTUP) {
      yield call(startup, action.payload)
    }

    yield put({ type: APP_STOPLOADING })

    yield action
  }
}

export default function* StartupSagas() {
   yield all([
     startupFlow(),
   ])
}
