
const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api-stage.7-eleven.com";
const GET_SHORT_PROFILE = "https://api-stage.7-eleven.com/v4/users/me";
const CLIENT_ID = "6gMB2gr2UT8rnUUeQ3uO8Ny4DFveMMe8PhjTd6Mt";
const CLIENT_SECRET = "oSLvmQEdqzN3dW4fcFewo7XQqMNT8ncuO8nP703GL03WlOPh3zq3dezHYaPATXK4zvTqrzBQFjYzmqs8YwuOTJHlXXnBAquQ9O3YcsPv1WZf7I8NkVQBjkUuoHWqwK0G";

export default async (req, res) => {  
  try {

    let date = new Date();
    date.setMinutes ( date.getMinutes() + 5 );
    const body = JSON.parse(req.body)
    const headers = { "Content-Type": "application/json" };

    // Get an Access Token
    //
    const userToken = await fetch('https://api-stage.7-eleven.com/auth/token',
     {
       method: 'POST',
       headers: headers,
       body: JSON.stringify({
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "password", 
         "username": body.userName,
         "password": body.password
      }) 
     });

    console.log('USER DATA WITH DATA ', userToken )
      
 
     let user = {
       userName:body.userName,
       isAuth: true,
       token: userToken.access_token,
       expire:userToken.expires_in
     }

    // console.log('FULL USER DATA   :: ', user )   
 
     res.json(user)
     return
  } catch(error) {
    res.json({error: error })
    // res.status(400).send({ error: error })
  }
};