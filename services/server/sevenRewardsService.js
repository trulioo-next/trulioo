import API from '../../utils/api'


import ErrorHandler from '../../utils/errorHandler'
 
"use strict";
 

export default function SevenRewardsService(state) {

   	async function userAuth(payload) {
		let data = await API.post('/api/seven-rewards/user-auth', {body:payload} );
		 
		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'userAuthentcation',
		          message: 'User Auth Failed'
		        }
		    })
		}

		return data;
	}
	async function userAuthFb(payload) {
		let data = await API.post('/api/seven-rewards/user-auth-fb', {body:payload});
		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'FacebookAuthentcation',
		          message: 'Facebook Auth Failed'
		        }
		    })
		}
		return data;
	}
	async function userAuthAnonymous() {
		let data = await API.post('/api/seven-rewards/anonymous-auth', {});
		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'userAuthAnonymous',
		          message: 'User Auth Anonymous Failed'
		        }
		    })
		}
		return data;
	}

	async function registerUser(payload) {
		let data = await API.post('/api/seven-rewards/user-register', {body:payload});
		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'registerUser',
		          message: 'Register User Failed'
		        }
		    })
		}
		return data;
	}


	async function registerFacebookUser(payload) {
		let data = await API.post('/api/seven-rewards/user-register-fb', {body:payload});
		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'registerFacebookUser',
		          message: 'Register Facebook User Failed'
		        }
		    })
		}
		return data;
	}


	async function checkCardBalance(payload) {
		let data = await API.post('/api/seven-rewards/check-card-balance', {body:payload});
		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'checkCardBalance',
		          message: 'Checking Card Balance Failed'
		        }
		    })
		}
		return data;
	}


	async function redeemPoints(payload) {
		// console.log('REDEEM SERVICE PAYLOAD ', payload )
		let data = await API.post('/api/seven-rewards/redeem', {body:payload});
		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'redeem',
		          message: 'Redeem Points Failed'
		        }
		    })
		}
		return data;
	}

   return {
    userAuth,
    userAuthFb,
    userAuthAnonymous,
    registerUser,
    registerFacebookUser,
    checkCardBalance,
    redeemPoints
   }

}