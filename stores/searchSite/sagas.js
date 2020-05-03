import { take, call, put, all, select } from 'redux-saga/effects'
import SearchSiteService from '../../services/searchSiteService';

import {
  SEARCHSITE_LOAD_REQUEST,
  SEARCHSITE_LOADED,
  SEARCHSITE_ERROR,
  APP_STARTLOADING,
  APP_STOPLOADING
} from '../types'

function* startup(action) {
   
  const payload = action.payload;
  
  try {
    
    const state = yield select((state) => state)
    const searchSiteService = SearchSiteService(state);

    const searchSiteResponse = yield call(searchSiteService.searchSite, payload);
    
    yield put({ type: SEARCHSITE_LOADED, payload: searchSiteResponse })
    
  } catch(err) {
    
    const errors = err.payload || err
    yield put({ type: SEARCHSITE_ERROR, payload: errors})
  }
}


/*
* Startup flow to allow concurrent actions to be dispatched
*/
function* startupFlow() {
  while (true) {

    const action = yield take([
      SEARCHSITE_LOAD_REQUEST,
    ])
  
    yield put({ type: APP_STARTLOADING })
    
    if (action.type === SEARCHSITE_LOAD_REQUEST) {
      yield call(startup, action)
    }


    yield put({ type: APP_STOPLOADING })
 
    yield action
  }
}

export default function* SearchSiteSagas() {
   yield all([
     startupFlow(),
   ])
}
