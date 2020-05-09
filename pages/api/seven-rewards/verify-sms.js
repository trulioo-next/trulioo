const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = process.env.REWARDS_API_URL
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
 
export default async (req, res) => {  
  try {

    const body = JSON.parse(req.body)
    const headers = { "Content-Type": "application/json" };
    console.log('BODY :: >> ', body.body )

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

    // if(body.body.mobileNumber ==='') {
    //   res.json({error: 'No Number Was Added', sms:{error:{payload:{ error_description:'Please save a valid phone number before trying to verify.' }}}})
    // }

    const registerHeaders = { 
      "Content-type": "application/json",
      "Authorization":`Bearer ${body.body.token}`
    };


    console.log('registerHeaders  ', registerHeaders )

    const smsResponse = await fetch(REWARDS_API_URL+'/v4/users/me/verify/sms',
     {
       method: 'POST',
       headers: registerHeaders,
       body: JSON.stringify(payload) 
     });
      
     console.log('SMS RESPONSE ', smsResponse)


      // User Full Profile 
    // /v4/users/me/?profile=full
    const fullProfile = await fetch(REWARDS_API_URL+'/v4/users/me/?profile=full',
     {
       method: 'GET',
       headers: registerHeaders
     }); 

      console.log('USER FULL PROFILE ', fullProfile )


     res.json({success:smsResponse, user:fullProfile})
    
      

     return
  } catch(error) {
    console.log('SMS ERROR ', error )
    res.json({error: error  })
    // res.status(400).send({ error: error })
  }
};