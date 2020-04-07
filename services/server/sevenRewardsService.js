import API from '../../utils/api'
 
"use strict";
 

export default function SevenRewardsService(state) {

   	async function userAuth() {
		let data = await API.post('/api/seven-rewards/user-auth', {});
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

	async function registerUser() {
		let data = await API.post('/api/seven-rewards/user-register', {});
		return data;
	}

   return {
    userAuth,
    userAuthFb,
    userAuthAnonymous,
    registerUser
   }

}