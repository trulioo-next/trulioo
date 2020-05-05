const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api.7-eleven.com";
import Rewards from './user-rewards';
 
export default async (req, res) => {  
  try {

    const body = JSON.parse(req.body)
    const tokenHeaders = { "Content-Type": "application/json"};
    const updateHeaders = { 
      "Content-Type": "application/json",
      "Authorization":`Bearer ${body.body.token}`,
      "X-SEI-TZ": '-04:00'
    };
 
    let payload = {
      "preferences":
          {
              "us_communication": false,
              "ca_communication": body.body.value,
              "alcohol": false,
              "tobacco": false,
              "cigarettes": false,
              "cigars": false,
              "snuff": false,
              "snus": false,
              "electronic_cigarettes": false,
              "lottery": false,
              "age_verified_other": false
          }
    }
   
    // Get an Access Token
    //
    const updateUser = await fetch(REWARDS_API_URL+'/v4/users/me/preferences',
     {
       method: 'POST',
       headers: updateHeaders,
       body: JSON.stringify(payload)
     });
 
     // console.log('updateUser ', body.body.user)
      
    res.json({user:body.body.user, fieldErrors:false })  
     
     return
  } catch(error) {
    console.log('ERROR ', error )
    res.json({error: error })
   // res.status(500).send({ error: error })
  }
};