const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api-stage.7-eleven.com"
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
 
export default async (req, res) => {  
  try {

   
    const body = JSON.parse(req.body)
    const headers = { "Content-Type": "application/json" };

    // Get an Access Token
    //
    const userToken = await fetch(REWARDS_API_URL+'/v4/users/me/verify/sms',
     {
       method: 'POST',
       headers: headers,
       body: JSON.stringify({
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "facebook", 
         "username": body.userName,
         "password": body.password
      }) 
     });
      
    let user = {
      userName:body.userName,
      isAuth: true,
      token: userToken.access_token,
      expire:userToken.expires_in
    }

    console.log('FULL USER DATA   :: ', user )   
 
     res.json(user)
     return
  } catch(error) {
    res.json({error: error })
    // res.status(400).send({ error: error })
  }
};