const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = "https://api.7-eleven.com";
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
    let month = body.body.bMonth >= 10 ? body.body.bMonth : `${body.body.bMonth}`
    let day = body.body.bDay >= 10 ? body.body.bDay : `0${body.body.bDayh}`
    let birthdate = body.body.bYear +'-'+ month +'-'+ day;
    let phone = body.body.phone === 'null' ||  body.body.phone === null ? false : true;

    let payload = {
        "first_name": body.body.firstName,
        "last_name": body.body.lastName,
        "country": "CA",
        "birthdate": birthdate,
        "postal_code": body.body.postal,
        "address_line_1": body.body.address1,
        "address_line_2": body.body.address2,
        "city": body.body.city,
        "gender":body.body.gender,
        "state_or_province": body.body.province,
        "favorite_store_ids":[],
        "mp_needs_alias": false,
        "android_pay_enabled": true,
        "email": body.body.email
      }

      if(phone) {
        payload.mobile_number = body.body.phone;
      }
 
    //
    // console.log('PAYLOAD BODY EMAIL ',  payload )

    // Get an Access Token
    //
    const updateUser = await fetch(REWARDS_API_URL+'/v4/users/me/?profile=full',
     {
       method: 'PATCH',
       headers: updateHeaders,
       body: JSON.stringify(payload)
     });
 
    // console.log('updateUser ', updateUser)
      
    res.json({user:updateUser, fieldErrors:false })  
     
     return
  } catch(error) {
    console.log('ERROR ', error )
    res.json({error: error })
   // res.status(500).send({ error: error })
  }
};