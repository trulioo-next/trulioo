const fetch = require('../../utils/fetch')

const ENDPOINT_URL = process.env.ENDPOINT_URL

export default async (req, res) => {  
  try {
    
    
    // TODO: Normalise page ID : 
    const response = await fetch(ENDPOINT_URL+'/api/v1/nutritionals',
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
