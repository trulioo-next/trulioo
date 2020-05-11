const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = process.env.REWARDS_API_URL
// https://api-test.7-eleven.com 
// https://api-stage.7-eleven.com
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_ID_ANNO = process.env.CLIENT_ID_ANNO
const CLIENT_SECRET_ANNO = process.env.CLIENT_SECRET_ANNO

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
 
    // console.log('REGITERS TOKEN ', registerHeaders )
    let month = body.body.bMonth;
    let day = body.body.bDay;
    let birthdate = body.body.bYear +'-'+ month +'-'+ day;
    let phone = body.body.phone === 'null' ||  body.body.phone === null ? false : true;
    let gender =  body.body.gender === 'Prefer not to say' ? false : true;


    // console.log('BIRTHDAY ', birthdate )

    let payload = {
        "first_name": body.body.firstName,
        "last_name": body.body.lastName,
        "country": "CA",
        "birthdate": birthdate,
        "postal_code": body.body.postal,
        "address_line_1": body.body.address1,
        "address_line_2": body.body.address2,
        "city": body.body.city,
        "state_or_province": body.body.province,
        "favorite_store_ids":[],
        "mp_needs_alias": false,
        "android_pay_enabled": true,
        "email": body.body.email
      }

      // console.log('PHONE ', body.body.phone )    
      if(phone) {
        payload.mobile_number = body.body.phone;
      }
      if(gender) {
        payload.gender = body.body.gender;
      }
 
    // Get an Access Token
    //
    const updateUser = await fetch(REWARDS_API_URL+'/v4/users/me/?profile=full',
     {
       method: 'PATCH',
       headers: updateHeaders,
       body: JSON.stringify(payload)
     });
     
    res.json({user:updateUser, fieldErrors:false })  
     
     return
  } catch(error) {
    console.log('ERROR ', error )
    res.json({error: error })
   // res.status(500).send({ error: error })
  }
};