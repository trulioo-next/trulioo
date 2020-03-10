import API from '../utils/api'
 
"use strict";
 

export default function UserClientService(state) {

   	async function getUserAuth(payload) {
		let data = await API.post('/api/seven-rewards/user-auth', payload);
		return data;
	}

	async function checkUserAuth(payload) {
	    let user = state.user;
	    let date = new Date();
	    if(date > user.expire){
			console.log('DATE 1', date)
			console.log('USER DATE 1', user.expire)
	    }

	    console.log('DATE 2', date)
		console.log('USER DATE 2 ', user.expire)

		return user;
	}

   return {
    getUserAuth,
    checkUserAuth
  }

}