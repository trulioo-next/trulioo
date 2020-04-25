const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api.7-eleven.com"
const CLIENT_ID_ANNO = process.env.CLIENT_ID_ANNO
const CLIENT_SECRET_ANNO = process.env.CLIENT_SECRET_ANNO
 
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

    // console.log('userToken   :: ', userToken) 

    let timeZoneOffset = new Date()
    const registerHeaders = { 
      "Content-Type": "application/json",
      "Authorization":`Bearer ${userToken.access_token}`,
      "X-SEI-TZ": '-04:00'
    };

    const cardCheckResponse = await fetch(REWARDS_API_URL+'/v4/accounts/card-check',
     {
       method: 'POST',
       headers: registerHeaders,
       body: JSON.stringify({
         "loyalty_id": body.body.payload
      }) 
     });

 
    // console.log('CARD RESPNSE --- : ',cardCheckResponse)   
 
     res.json(cardCheckResponse)
     return
  } catch(error) {
    res.json({error: error, body:req.body })
    // res.status(400).send({ error: error })
  }
};