const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api-stage.7-eleven.com"
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
 
export default async (req, res) => {  
  try {

     
    const body = JSON.parse(req.body)
    const headers = { "Content-Type": "application/json" };

    console.log('FACEBOOK LOGIN CALL ')
 
    // Get an Access Token
    //
    const userToken = await fetch(REWARDS_API_URL+'/auth/token/social',
     {
       method: 'POST',
       headers: headers,
       body: JSON.stringify({
       "client_id": '6gMB2gr2UT8rnUUeQ3uO8Ny4DFveMMe8PhjTd6Mt',
        "client_secret": 'oSLvmQEdqzN3dW4fcFewo7XQqMNT8ncuO8nP703GL03WlOPh3zq3dezHYaPATXK4zvTqrzBQFjYzmqs8YwuOTJHlXXnBAquQ9O3YcsPv1WZf7I8NkVQBjkUuoHWqwK0G',
        "provider": "facebook", 
        'access_token':req.body
      }) 
     });
      
    // let user = {
    //   userName:body.userName,
    //   isAuth: true,
    //   token: userToken.access_token,
    //   expire:userToken.expires_in
    // }

    console.log('FULL USER DATA   :: ', userToken )   
 
     res.json(userToken)
     return
  } catch(error) {
    res.json({error: error })
    // res.status(400).send({ error: error })
  }
};