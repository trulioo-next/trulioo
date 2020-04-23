const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api-test.7-eleven.com";
// https://api-test.7-eleven.com 
// https://api-stage.7-eleven.com
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
 
export default async (req, res) => {  
  try {

    const body = JSON.parse(req.body)
    

    // EAAOeoZCWjmwEBAP6atZBLS3fTNteeQtPg1bPjaLulVnfkKP08T3ZA9vK7oRjTt49MexblNGWkTxPzUh3PAo25iFImHB3xfu0ozbUTTT1tiESlZC0Ig1q3y0zGUZBg87vT7Kqka9QFEFHT66OCahEZARu4OphMBDAJZAc103q3ZCzLzZBXcn8cN5tc7hmtHFunFnhHcKYetcPsAQZDZD
    

     
    const registerHeaders = { 
      "Content-Type": "application/json"
    };

    // console.log('REGITERS TOKEN ', registerHeaders )
    let birthdate = body.body.bYear +'-'+ body.body.bMonth +'-'+ body.body.bDay
    let payload = {
        "access_token":"EAAOeoZCWjmwEBAP6atZBLS3fTNteeQtPg1bPjaLulVnfkKP08T3ZA9vK7oRjTt49MexblNGWkTxPzUh3PAo25iFImHB3xfu0ozbUTTT1tiESlZC0Ig1q3y0zGUZBg87vT7Kqka9QFEFHT66OCahEZARu4OphMBDAJZAc103q3ZCzLzZBXcn8cN5tc7hmtHFunFnhHcKYetcPsAQZDZD",
        "provider": "facebook",

        "first_name": body.body.firstName,
        "last_name": body.body.lastName,
        "birthdate": birthdate,  
        "country": "CA",  
        "mobile_number": body.body.phone,  
        "accepts_us_terms":false,
        "accepts_ca_terms":true,
        "accepts_ca_communications":false  
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