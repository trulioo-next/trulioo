const fetch = require('../../../utils/fetch')
const REWARDS_API_URL = process.env.REWARDS_API_URL
const CLIENT_ID_ANNO = process.env.CLIENT_ID_ANNO
const CLIENT_SECRET_ANNO = process.env.CLIENT_SECRET_ANNO
 
export default async (req, res) => {  
  try {

    const body = JSON.parse(req.body)
    const registerHeaders = { 
      "Content-Type": "application/json",
      "Authorization":`Bearer ${body.body.token}`,
      "X-SEI-TZ": '-04:00'
    };

    const cardCheckResponse = await fetch(REWARDS_API_URL+'/v4/users/me/cards/',
     {
       method: 'POST',
       headers: registerHeaders,
       body: JSON.stringify({
         "new_loyalty_id": body.body.card
      }) 
     });

     console.log('CARD RESPNSE --- : ',cardCheckResponse)   
 
     res.json(cardCheckResponse)
     return
  } catch(error) {
    res.json({error: error, body:req.body })
    // res.status(400).send({ error: error })
  }
};