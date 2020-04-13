import API from '../../utils/api'
 
"use strict";
 

export default function SevenRewardsService(state) {

   	async function userAuth(payload) {
		let data = await API.post('/api/seven-rewards/user-auth', {body:payload} );
		return data;
	}
	async function userAuthFb() {
		let data = await API.post('/api/seven-rewards/user-auth-fb', {});
		return data;
	}
	async function userAuthAnonymous() {
		let data = await API.post('/api/seven-rewards/anonymous-auth', {});
		return data;
	}

	async function registerUser(payload) {
		let data = await API.post('/api/seven-rewards/user-register', {body:payload});
		return data;
	}

   return {
    userAuth,
    userAuthFb,
    userAuthAnonymous,
    registerUser
   }

}