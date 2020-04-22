const fetch = require('../../utils/fetch')

const ENDPOINT_URL = process.env.ENDPOINT_URL

export default async (req, res) => {  
  try {
    
    const body = JSON.parse(req.body)
    let id = 'components';

    if(body.payload) {
      id = body.payload
    }

    // console.log('BODY TAG ', body )
    // TODO: Normalise page ID : 
    const response = await fetch(ENDPOINT_URL+'/api/v1/page/'+id,
     {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })
 
     res.json(response)
     return
  } catch(error) {
     res.json({ error: error })
     // res.status(502).send({ error: error })
  }
};
