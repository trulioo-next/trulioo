const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api-test.7-eleven.com";
// https://api-test.7-eleven.com 
// https://api-stage.7-eleven.com
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
 
export default async (req, res) => {  
  try {

    const body = JSON.parse(req.body)
     const headers = { "Content-Type": "application/json" };
    
     const userToken = await fetch(REWARDS_API_URL+'/auth/token',
     {
       method: 'POST',
       headers: headers,
       body: JSON.stringify({
        "client_id": '6gMB2gr2UT8rnUUeQ3uO8Ny4DFveMMe8PhjTd6Mt',
        "client_secret": 'oSLvmQEdqzN3dW4fcFewo7XQqMNT8ncuO8nP703GL03WlOPh3zq3dezHYaPATXK4zvTqrzBQFjYzmqs8YwuOTJHlXXnBAquQ9O3YcsPv1WZf7I8NkVQBjkUuoHWqwK0G',
        "grant_type": "client_credentials"
        
      }) 
     });


     if(!userToken || userToken.error) {
       res.json({error:userToken.error, user:false, rewards:false, auth:false, coupons:false, deals:false, promotions:false  })
    }
 
     const authHeaders = { 
      "Content-Type": "application/json",
      "Authorization":`Bearer ${userToken.access_token}`,
      "X-SEI-TZ": '-04:00'
    };

    // console.log('REGITERS TOKEN ', registerHeaders )
    // let birthdate = body.body.bYear +'-'+ body.body.bMonth +'-'+ body.body.bDay
    let payload = {
        "access_token":body.body.token,
        "provider": "facebook",
        "first_name": body.body.response.first_name,
        "last_name": body.body.response.last_name,
        "birthdate": '1978-05-28',  
        "country": "CA",  
        "mobile_number": '1111111111',  
        "accepts_us_terms":false,
        "accepts_ca_terms":true,
        "accepts_ca_communications":false  
    }

    
    // // Get an Access Token
    // //
    const userRegister = await fetch(REWARDS_API_URL+'/v4/users',
     {
       method: 'POST',
       headers: authHeaders,
       body: JSON.stringify(payload)
     });
    

    //
    console.log('REGITERS TOKEN ', userRegister )
      
    let userAuthToken = {
      isAuth: true,
      token: '',
      expire:''
    }

 
     res.json({user:userRegister, registered:true, auth:userAuthToken})
     return
  } catch(error) {
    console.log('ERROR ', error )
    const body = JSON.parse(req.body)
    res.json({error:error, user:false, rewards:false, auth:false, coupons:false, deals:false, promotions:false,  body:body  })
    
    // res.status(400).send({ error: error })
  }
};