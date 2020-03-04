const fetch = require('../../utils/fetch')

const ENDPOINT_URL = 'https://dev3.7eleven.ca/wp-json'; // process.env.ENDPOINT_URL

export default async (req, res) => { // http://seven-eleven-wp.local/wp-json
  try {
    
    const body = JSON.parse(req.body)
    let id = 'components';

    if(body.payload) {
      id = body.payload
    }
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
    res.status(400).send({ error: error.message })
  }
};
