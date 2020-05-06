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
  SEVEN_REWARDS_LOGOUT,
  SEVEN_REWARDS_FACEBOOK_AUTH_REQUEST,
  SEVEN_REWARDS_FACEBOOK_AUTH,
  SEVEN_REWARDS_FACEBOOK_REGISTER_REQUEST,
  SEVEN_REWARDS_CHECKCARD_REQUEST,
  SEVEN_REWARDS_CHECKCARD,
  APP_STOPLOADING,
  SEVEN_REWARDS_REDEEM_REQUEST,
  SEVEN_REWARDS_REDEEM,
  SEVEN_REWARDS_SMS_REQUEST,
  SEVEN_REWARDS_SMS,
  SEVEN_REWARDS_UPDATE_REQUEST,
  SEVEN_REWARDS_UPDATE,
  SEVEN_REWARDS_PASSWORD_RESET_REQUEST,
  SEVEN_REWARDS_PASSWORD_RESET,
  SEVEN_REWARDS_UPDATE_ERROR,
  SEVEN_REWARDS_UPDATE_PREFERNCES_REQUEST,
  SEVEN_REWARDS_UPDATE_PREFERNCES
} from '../types'

function* startup(payload) {
   
  try {
     
    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
   
    const loginClientResponse = yield call(sevenRewardsService.userAuth, payload)

    // console.log('LOGIN USER PAYLOAD REWARDS SAGA !!   ', loginClientResponse )

    yield put({ type: SEVEN_REWARDS_AUTH_LOADED, payload:loginClientResponse})

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_AUTH_ERROR, payload: errors})
  }
}



function* facebookUserAuth(payload) {
   
  try {
     
    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
   
    const loginClientResponse = yield call(sevenRewardsService.userAuthFb, payload)

    console.log('FACEBOOK LOGIN SAGA !!   ', loginClientResponse  )
    console.log('FACEBOOK payload !!   ', payload  )

    yield put({ type:SEVEN_REWARDS_FACEBOOK_AUTH, payload:loginClientResponse})

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
    // console.log('HELLO IS USER AUTH ', userClientResponse)
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

    // console.log('REGISTER USER PAYLOAD REWARDS !!   ', registerClientResponse )
    
    yield put({ type: SEVEN_REWARDS_REGISTER_LOADED, payload:registerClientResponse})

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_REGISTER_ERROR, payload: errors})
  }
}


//
function* updatePreferences(payload) {

  try {
    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
    const updateResponse = yield call(sevenRewardsService.updatePreferences, payload)
    // console.log('UPDATE USER PREFERENCES   !!   ', updateResponse )

    if(updateResponse.error) {
      yield put({ type: SEVEN_REWARDS_UPDATE_PREFERNCES, payload:updateResponse })
    } else {
      yield put({ type: SEVEN_REWARDS_UPDATE, payload:updateResponse })
    }

  } catch(err) {
    console.log('SAGA ERROR ', err )
     
    yield put({ type:SEVEN_REWARDS_UPDATE_ERROR, payload: err })
  }
}


//
function* updateUser(payload) {

  try {
    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
    const updateResponse = yield call(sevenRewardsService.updateUser, payload)
    // console.log('UPDATE USER DETAILS  !!   ', updateResponse )

    if(updateResponse.error) {
      yield put({ type: SEVEN_REWARDS_UPDATE_ERROR, payload:updateResponse })
    } else {
      yield put({ type: SEVEN_REWARDS_UPDATE, payload:updateResponse })
    }
    
   

  } catch(err) {
    console.log('SAGA ERROR ', err )
     
    yield put({ type:SEVEN_REWARDS_UPDATE_ERROR, payload: err })
  }
}



//
function* passwordReset(payload) {

  try {
    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
   
    const resetResponse = yield call(sevenRewardsService.passwordReset, payload)

    console.log('RESET PASSWORD !!   ', resetResponse )
    
    yield put({ type:SEVEN_REWARDS_PASSWORD_RESET, payload:resetResponse })

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_REGISTER_ERROR, payload: errors})
  }
}


//
function* registerFacebookUser(payload) {
 
  try {
    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
   
    const registerClientResponse = yield call(sevenRewardsService.registerFacebookUser, payload)

     // console.log('REGISTER USER PAYLOAD REWARDS !!   ', registerClientResponse )
    
    yield put({ type: SEVEN_REWARDS_REGISTER_LOADED, payload:registerClientResponse})

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_REGISTER_ERROR, payload: errors})
  }
}

// 

//
function* checkGiftcardBalance(payload) {
 
  try {
    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
   
    const checkBalanceResponse = yield call(sevenRewardsService.checkCardBalance, payload)

     // console.log('CHECK CARD BALANCE !!   ', checkBalanceResponse )
    
    yield put({ type: SEVEN_REWARDS_CHECKCARD, payload:checkBalanceResponse})

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_REGISTER_ERROR, payload: errors})
  }
}

//
function* redeemPoints(payload) {
 
  try {
    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
   
    const redeemResponse = yield call(sevenRewardsService.redeemPoints, payload)

    // console.log('REDEEM!!   ', redeemResponse )
    
    yield put({ type: SEVEN_REWARDS_REDEEM, payload:redeemResponse})

  } catch(err) {

    const errors = err.payload || err
    yield put({ type:SEVEN_REWARDS_REGISTER_ERROR, payload: errors})
  }
}


//
function* checkSms(payload) {
 
  try {
    const state = yield select((state) => state)
    const sevenRewardsService = SevenRewardsService(state);
   
    const smsResponse = yield call(sevenRewardsService.verifySms, payload)

    // console.log('!! SMS  ', smsResponse )
    
    yield put({ type: SEVEN_REWARDS_SMS, payload:smsResponse})

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
      SEVEN_REWARDS_LOGOUT_REQUEST,
      SEVEN_REWARDS_FACEBOOK_AUTH_REQUEST,
      SEVEN_REWARDS_FACEBOOK_REGISTER_REQUEST,
      SEVEN_REWARDS_CHECKCARD_REQUEST,
      SEVEN_REWARDS_REDEEM_REQUEST,
      SEVEN_REWARDS_SMS_REQUEST,
      SEVEN_REWARDS_UPDATE_REQUEST,
      SEVEN_REWARDS_PASSWORD_RESET_REQUEST,
      SEVEN_REWARDS_UPDATE_PREFERNCES_REQUEST
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

    if (action.type === SEVEN_REWARDS_FACEBOOK_AUTH_REQUEST) {
      yield call(facebookUserAuth, action.payload)
    }

    if (action.type === SEVEN_REWARDS_FACEBOOK_REGISTER_REQUEST) {
      yield call(registerFacebookUser, action.payload)
    }

    if (action.type === SEVEN_REWARDS_REDEEM_REQUEST) {
      yield call(redeemPoints, action.payload)
    }

    if (action.type === SEVEN_REWARDS_CHECKCARD_REQUEST) {
      yield call(checkGiftcardBalance, action.payload)
    }

    if (action.type === SEVEN_REWARDS_SMS_REQUEST) {
      yield call(checkSms, action.payload)
    }

    if (action.type === SEVEN_REWARDS_UPDATE_REQUEST) {
      yield call(updateUser, action.payload)
    }

    if (action.type === SEVEN_REWARDS_PASSWORD_RESET_REQUEST) {
      yield call(passwordReset, action.payload)
    }

    if (action.type === SEVEN_REWARDS_UPDATE_PREFERNCES_REQUEST) {
      yield call(updatePreferences, action.payload)
    }


    yield put({ type: APP_STOPLOADING })
 
    yield action
  }
}

export default function* UserSagas() {
   yield all([
     startupFlow(),
   ])
}
