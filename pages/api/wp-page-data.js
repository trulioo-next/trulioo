const fetch = require('../../utils/fetch')

const ENDPOINT_URL = process.env.ENDPOINT_URL

import STATICDATA from '../../data/home.json'

export default async (req, res) => {  
  try {
    
    const body = JSON.parse(req.body)
    let id = 'components';

    if(body.payload) {
      id = body.payload
    }
    



    console.log('BODY TAG ', body )
    // TODO: Normalise page ID : 
    const response = await fetch(ENDPOINT_URL+'/api/v1/page/'+id,
     {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

    console.log('PAGE SLUG ', id );
    console.log('PAGE DATA' , response )
 
     res.json(response)
     return
  } catch(error) {
     console.log("ERROR FETCHING PAGE", error )
     res.json(STATICDATA)
     // res.status(502).send({ error: error })
  }
};
