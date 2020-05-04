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

        // console.log("REDEEM SERVICE ", payload )	
        // console.log("REDEEM SERVICE DATA ", data )

        let updatedUser = payload.user.user;
        updatedUser.rewards_points = data.rewards_points

        let updatedRewards = payload.user.rewards;
        updatedRewards.rewards_points = data.rewards_points

		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'redeem',
		          message: 'Redeem Points Failed'
		        }
		    })
		}
		return { redeem:data, user:updatedUser, rewards:updatedRewards, myRewards:data };
	}

	async function verifySms(payload) {
		let data = await API.post('/api/seven-rewards/verify-sms', {body:payload});
		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'Verify Sms',
		          message: 'Verify Sms Failed'
		        }
		    })
		}
		return data;
	}

	async function updateUser(payload) {
		let data = await API.post('/api/seven-rewards/user-update', {body:payload});
		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'User Update',
		          message: 'User Update Failed'
		        }
		    })
		}
		return data;
	}


	async function passwordReset(payload) {
		let data = await API.post('/api/seven-rewards/reset-password', {body:payload});
		if(data.error) {
			ErrorHandler({
		        error: data.error.payload.error_description,
		        crumb: {
		          category: 'Password Reset',
		          message: 'Password Reset Failed'
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
    redeemPoints,
    verifySms,
    updateUser,
    passwordReset
   }

}