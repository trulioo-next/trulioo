const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api-test.7-eleven.com"
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
 
export default async (req, res) => {  
  try {

    const body = JSON.parse(req.body)
    const tokenHeaders = { "Content-Type": "application/json"};

    const userToken = await fetch(REWARDS_API_URL+'/auth/token',
     {
       method: 'POST',
       headers: tokenHeaders,
       body: JSON.stringify({
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "client_credentials"
      }) 
     });


    const registerHeaders = { "Content-Type": "application/json", "Authorization":`Bearer ${userToken.access_token}` };

    console.log('REGITERS TOKEN ', userToken )

    
   
    let payload = {
        "email": body.body.email,
        "email_secondary": body.body.email,
        "password": body.body.password,
        "first_name": body.body.firstName,
        "last_name":body.body.lastName,
        "birthdate": "1978-05-28", // year-month-day
        "postal_code": "80440",
        "country": "CA", // US or CA
        "mobile_phone": "5124998811", // 10 digit number with no space or hyphens
        "accepts_us_terms":false,
        "accepts_ca_terms":true,
        "link_card": "1773927800088888888" // 19 digit number
    }


      console.log('PAYLOAD BODY EMAIL ',  JSON.stringify(payload) )

    // // Get an Access Token
    // //
    const userRegister = await fetch(REWARDS_API_URL+'/v4/users/',
     {
       method: 'POST',
       headers: registerHeaders,
       xhrFields: {
        withCredentials: 'true'
       },
       body: JSON.stringify(payload)
     });

    console.log('REGITERS TOKEN ', userRegister )
      
    // let user = {
    //   isAuth: true,
    //   token: userToken.access_token,
    //   expire:userToken.expires_in
    // }

    console.log('FULL USER DATA   :: ', userRegister )   
 
     res.json(body)
     return
  } catch(error) {
    res.json({error: error })
    // res.status(400).send({ error: error })
  }
};