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

     
    // Get an Access Token
    //
    const userToken = await fetch(REWARDS_API_URL+'/auth/token/social',
     {
       method: 'POST',
       headers: headers,
       body: JSON.stringify({
       "client_id": CLIENT_ID,
       "client_secret": CLIENT_SECRET,
       "provider": "facebook", 
       'access_token':req.body
      }) 
     });
      

   // Get a rewards list 
    const userRewards = Rewards();
    let rewards = await userRewards.getUserRewards(userToken.access_token, userToken.expires_in)
    //
    // console.log('REGITERS TOKEN ', rewards )
      
    let userAuthToken = {
      isAuth: true,
      token: userToken.access_token,
      expire:userToken.expires_in
    }

    res.json({user:rewards.fullProfile, rewards:rewards.rewards, auth:userAuthToken, coupons:rewards.coupons, deals:rewards.deals, promotions:rewards.promotions, error:false  })  
 
     return
  } catch(error) {
    res.json({error: error, user:false, rewards:false, auth:false, coupons:false, deals:false, promotions:false, body:req.body  })
    // res.status(400).send({ error: error })
  }
};