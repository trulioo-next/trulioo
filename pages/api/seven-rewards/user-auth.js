const fetch = require('../../../utils/fetch')

// NOTE: CURRENTLY USING PRODUCTION ENDPOINT 
//
const REWARDS_API_URL = "https://api.7-eleven.com";
// "https://api-test.7-eleven.com";

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
 
export default async (req, res) => {  
  try {

    const body = JSON.parse(req.body)
    const headers = { "Content-Type": "application/json" };

    // Get an Access Token
    //
    // NOTE: CURRENTLY USING PRODUCTION KEYS 
    const userToken = await fetch(REWARDS_API_URL+'/auth/token',
     {
       method: 'POST',
       headers: headers,
       body: JSON.stringify({
       "client_id": '8spmO1OlYWRl2q33FSDSFm2gqQ6O2MgebQ4D8xwp',
        "client_secret": 'C3BrydLGlg6evoRKuVcgLfN1DagmAm6tD5QNzet4uclBP3QLjcQ0kHbzWxOGfY5mHBCXb2Ce05XVpH5ZT5yVzLrueU7BhBQ0D5EHxfUzREDCl4lXQy9S1UsqWr60jv89',
        "grant_type": "password",
        "username": body.body.userName,
        "password": body.body.password
      }) 
     });
  

    if(!userToken || userToken.error) {
       res.json({error:userToken.error, user:false, rewards:false, auth:false, coupons:false, deals:false, promotions:false  })
    }


    // console.log('USER userToken >>  ',  userToken )

 
    let user = {
      isAuth: true,
      token: userToken.access_token,
      expire:userToken.expires_in
    }

    //
    const authHeaders = { 
      "Content-Type": "application/json",
      "Authorization":`Bearer ${userToken.access_token}`,
      "X-SEI-TZ": '-04:00'

    };

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
 
     res.json({user:fullProfile, rewards, auth:user, coupons, deals, promotions, error:false  })
     return
  } catch(error) {
    res.json({error: error, user:false, rewards:false, auth:false, coupons:false, deals:false, promotions:false  })
    // res.status(400).send({ error: error })
  }
};