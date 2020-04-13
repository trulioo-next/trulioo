const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api-test.7-eleven.com";
// https://api-test.7-eleven.com 
// https://api-stage.7-eleven.com
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
        "client_id": 'JpU08oDTxHLMhwVbxXKwaUK7CPn7k3WXLJ6AAw67',
        "client_secret": '81sVmbvZAinbpOxLtNd2eqcict21wVmtxfYlTzUIf863h5Ny43P4EfRRoJPc7UFD6H8ONZaL4cnemAMnv9de4WbqWx2Pkxf0UhzYnWzKsYaKZuRjQLcOYXpp6VEGwqsm',
        "grant_type": "client_credentials",
        "username": body.body.email,
        "password": body.body.password
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
        "birthdate": birthdate, // year-month-day
        "postal_code": body.body.postal,
        "country": "CA",  
        "mobile_phone": body.body.phone,  
        "accepts_us_terms":false,
        "accepts_ca_terms":true,
        "accepts_ca_communications":true,
        "link_card": body.body.cardNumber // 19 digit number
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
    

    //
    console.log('REGITERS TOKEN ', userRegister )
      
    let userAuthToken = {
      isAuth: true,
      token: userToken.access_token,
      expire:userToken.expires_in
    }

 
     res.json({user:userRegister, registered:true, auth:userAuthToken})
     return
  } catch(error) {
    console.log('ERROR ', error )
    res.json({error: error })
    // res.status(400).send({ error: error })
  }
};