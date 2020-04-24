const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api.7-eleven.com";
// https://api-test.7-eleven.com 
// https://api-stage.7-eleven.com
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_ID_ANNO = process.env.CLIENT_ID_ANNO
const CLIENT_SECRET_ANNO = process.env.CLIENT_SECRET_ANNO

import Rewards from './user-rewards';
 
export default async (req, res) => {  
  try {

    const body = JSON.parse(req.body)
    const tokenHeaders = { "Content-Type": "application/json"};

    const userToken = await fetch(REWARDS_API_URL+'/auth/token',
     {
       method: 'POST',
       headers: tokenHeaders,
       body: JSON.stringify({
        "client_id": CLIENT_ID_ANNO,
        "client_secret": CLIENT_SECRET_ANNO,
        "grant_type": "client_credentials"
      }) 
     });
    

    let timeZoneOffset = new Date()
    const registerHeaders = { 
      "Content-Type": "application/json",
      "Authorization":`Bearer ${userToken.access_token}`,
      "X-SEI-TZ": '-04:00'

    };

    // console.log('REGITERS TOKEN ', registerHeaders )
    let birthdate = body.body.bYear +'-'+ body.body.bMonth +'-'+ body.body.bDay
    let payload = {
        "email": body.body.email,
        "email_secondary": body.body.email,
        "password": body.body.password,
        "first_name": body.body.firstName,
        "last_name":body.body.lastName,
        "birthdate": '1982-05-28', // year-month-day
        "postal_code": body.body.postal,
        "country": "CA",
        "mobile_phone": body.body.phone,  
        "accepts_us_terms":false,
        "accepts_ca_terms":true,
        "accepts_ca_communications":false,
        "link_card": '1773927800088888888' // 19 digit number
    }

    //
    console.log('PAYLOAD BODY EMAIL ',  payload )

    // // Get an Access Token
    // //
    const userRegister = await fetch(REWARDS_API_URL+'/v4/users',
     {
       method: 'POST',
       headers: registerHeaders,
       body: JSON.stringify(payload)
     });

    // Once you create an account, we log you in 
    //
    const loginToken = await fetch(REWARDS_API_URL+'/auth/token',
     {
       method: 'POST',
       headers: tokenHeaders,
       body: JSON.stringify({
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "password",
        "username": body.body.email,
        "password": body.body.password
      }) 
     });
    
    // Get a rewards list 
    const userRewards = Rewards();
    let rewards = await userRewards.getUserRewards(loginToken.access_token, loginToken.expires_in)
    //
    // console.log('REGITERS TOKEN ', rewards )
      
    let userAuthToken = {
      isAuth: true,
      token: userToken.access_token,
      expire:userToken.expires_in
    }

    res.json({user:userRegister, rewards:rewards.rewards, auth:userAuthToken, coupons:rewards.coupons, deals:rewards.deals, promotions:rewards.promotions, error:false  })  
     
     return
  } catch(error) {
    console.log('ERROR ', error )
    res.json({error: error, user:false, rewards:false, auth:false, coupons:false, deals:false, promotions:false  })
    // res.status(400).send({ error: error })
  }
};