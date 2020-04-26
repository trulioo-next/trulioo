import { take, call, put, all, select } from 'redux-saga/effects'
import NewsroomService from '../../services/newsroomService';

import {
  NEWSROOM_LOAD_REQUEST,
  NEWSROOM_LOADED,
  NEWSROOM_ERROR,
  APP_STARTLOADING,
  APP_STOPLOADING
} from '../types'

function* startup(action) {
   
  const payload = action.payload;
  try {
    
    const state = yield select((state) => state)
    const newsroomService = NewsroomService(state);

    const newsroomResponse = yield call(newsroomService.getNewsroomData, payload);
    
    yield put({ type: NEWSROOM_LOADED, payload: newsroomResponse })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type: NEWSROOM_ERROR, payload: errors})
  }
}


/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      NEWSROOM_LOAD_REQUEST,
    ])
  
    yield put({ type: APP_STARTLOADING })

    if (action.type === NEWSROOM_LOAD_REQUEST) {
      yield call(startup, action)
    }


    yield put({ type: APP_STOPLOADING })
 
    yield action
  }
}

export default function* NewsroomSagas() {
   yield all([
     startupFlow(),
   ])
}
