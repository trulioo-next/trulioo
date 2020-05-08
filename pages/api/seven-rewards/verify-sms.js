const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api.7-eleven.com";
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
 
export default async (req, res) => {  
  try {

    const body = JSON.parse(req.body)
    const headers = { "Content-Type": "application/json" };
   // console.log('BODY :: >> ', body.body )

    let code = body.body.code;

    let payload = {
      "id": body.body.mobileNumber
    }

    if(code) {
      payload = {
        "id": body.body.mobileNumber,
        "code" : code
      }
    }

    const registerHeaders = { 
      "Content-type": "application/json",
      "Authorization":`Bearer ${body.body.token}`
    };

    const smsResponse = await fetch(REWARDS_API_URL+'/v4/users/me/verify/sms',
     {
       method: 'POST',
       headers: registerHeaders,
       body: JSON.stringify(payload) 
     });
     
     // console.log('BODY :: >> ', body );
     // console.log(smsResponse)   
     if(code) {
       res.json({success:'SUCCESS! You have validated your device'})
     } else {
       res.json({success:'SUCCESS! Code Sent to your Mobile Device'})
     }
      

     return
  } catch(error) {
    res.json({error: error, sms:error })
    // res.status(400).send({ error: error })
  }
};