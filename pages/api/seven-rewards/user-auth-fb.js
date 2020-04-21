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
       "client_id": '8spmO1OlYWRl2q33FSDSFm2gqQ6O2MgebQ4D8xwp',
        "client_secret": 'C3BrydLGlg6evoRKuVcgLfN1DagmAm6tD5QNzet4uclBP3QLjcQ0kHbzWxOGfY5mHBCXb2Ce05XVpH5ZT5yVzLrueU7BhBQ0D5EHxfUzREDCl4lXQy9S1UsqWr60jv89',
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