const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api.7-eleven.com"
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_ID_ANNO = process.env.CLIENT_ID_ANNO
const CLIENT_SECRET_ANNO = process.env.CLIENT_SECRET_ANNO


import Rewards from './user-rewards';
 
export default async (req, res) => {  
  try {

     
    const body = JSON.parse(req.body)
    const headers = { "Content-Type": "application/json" };

     
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


    const userAuth = await fetch(REWARDS_API_URL+'/auth/token/social',
     {
       method: 'POST',
       headers: headers,
       body: JSON.stringify({
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "provider": "facebook",
        'access_token':body.body
      }) 
     });
  

    if(!userAuth || userAuth.error) {
       res.json({error: error, user:false, rewards:false, auth:userAuth, coupons:false, deals:false, promotions:false,token: false, myRewards:false,  body:JSON.parse(req.body) })
    }
 

    // Get a rewards list 
    const userRewards = Rewards();
    let rewards = await userRewards.getUserRewards(userAuth.access_token, userAuth.expires_in)
    //
    // console.log('REGITERS TOKEN ', rewards )
      
    let userAuthToken = {
      isAuth: true,
      token: userAuth.access_token,
      expire:userAuth.expires_in
    }

    res.json({user:rewards.fullProfile, rewards:rewards.rewards, auth:userAuthToken, coupons:rewards.coupons, deals:rewards.deals, promotions:rewards.promotions, error:false , token: userAuth.access_token, myRewards:rewards.myRewards })  
 
     return
  } catch(error) {
    res.json({error: error, user:false, rewards:false, auth:false, coupons:false, deals:false, promotions:false, body:JSON.parse(req.body)  })
    // res.status(400).send({ error: error })
  }
};