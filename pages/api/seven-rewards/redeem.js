const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api.7-eleven.com";
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
 
export default async (req, res) => {  
  try {

    const body = JSON.parse(req.body)
    const headers = { "Content-Type": "application/json" };
    console.log('BODY :: >> ', body.body.token )

    const registerHeaders = { 
      "Content-type": "application/json",
      "Authorization":`Bearer ${body.body.token}`
    };

    const redeemResponse = await fetch(REWARDS_API_URL+'/v4/rewards/redeem/',
     {
       method: 'POST',
       headers: registerHeaders,
       body: JSON.stringify({
         "id": body.body.id
      }) 
     });
 
     console.log('CARD RESPNSE --- : ', redeemResponse)   
 
     res.json(redeemResponse)
     return
  } catch(error) {
    res.json({error: error, body:req.body, redeem:error })
    // res.status(400).send({ error: error })
  }
};