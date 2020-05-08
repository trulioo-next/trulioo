const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = process.env.REWARDS_API_URL
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

     const registerHeaders = { 
      "Content-Type": "application/json",
      "Authorization":`Bearer ${userToken.access_token}`,
      "X-SEI-TZ": '-04:00'
    };

    let payload = { "email": body.body.email }
    
    // Get an Access Token
    //
    const updateUser = await fetch(REWARDS_API_URL+'/v4/accounts/reset-password/',
     {
       method: 'POST',
       headers: registerHeaders,
       body: JSON.stringify(payload)
     });
      
    res.json({success:"Email Send"})  
     
     return
  } catch(error) {
    console.log('ERROR ', error )
    res.json({error: error, body:req.body  })
    // res.status(400).send({ error: error })
  }
};