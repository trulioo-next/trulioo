
"use strict";


const fetch = require('../../../utils/fetch')

// NOTE: CURRENTLY USING PRODUCTION ENDPOINT 
//
const REWARDS_API_URL = "https://api.7-eleven.com";
// "https://api-test.7-eleven.com";
 
 
export default function Rewards() {

  async function getUserRewards(access_token) {
     //
    const authHeaders = { 
      "Content-Type": "application/json",
      "Authorization":`Bearer ${access_token}`,
      "X-SEI-TZ": '-04:00'

    };


    console.log('USER ACCESS TOKNE ', access_token )

    // User Full Profile 
    // /v4/users/me/?profile=full
    const fullProfile = await fetch(REWARDS_API_URL+'/v4/users/me/?profile=full',
     {
       method: 'GET',
       headers: authHeaders
     });
     
    // Rewards : 
    // /v4/rewards/catalog/ 
    const rewards = await fetch(REWARDS_API_URL+'/v4/rewards/catalog/',
     {
       method: 'GET',
       headers: authHeaders
     });

    // Coupons 
    // /v4/rewards/coupons/
    const coupons = await fetch(REWARDS_API_URL+'/v4/rewards/coupons/',
     {
       method: 'GET',
       headers: authHeaders
     });
    
    // Deals 
    // /v4/rewards/deals/
    const deals = await fetch(REWARDS_API_URL+'/v4/rewards/deals/',
     {
       method: 'GET',
       headers: authHeaders
     });

    // Promotions
    // /v4/promotions
    const promotions = await fetch(REWARDS_API_URL+'/v4/promotions/',
     {
       method: 'GET',
       headers: authHeaders
     });

    //
    // console.log('USER CARDS   ', promotions )
    // console.log('USER DEALS  ', deals )
    // console.log('USER COUPONS  ', coupons )
    // console.log('USER FULL PROFILE STRINGIFY :: >>  ',  fullProfile )
    // console.log('REWARDS ', rewards )
    // console.log('USER ACCESS TOKEN :: ', user )   
 
     return {user:fullProfile, rewards, auth:user, coupons, deals, promotions, error:false  }
  }
 
   return {
    getUserRewards
  }

}


