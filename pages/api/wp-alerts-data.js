const fetch = require('../../utils/fetch')

const ENDPOINT_URL = process.env.ENDPOINT_URL

export default async (req, res) => {  
  try {
  
    const response = await fetch(ENDPOINT_URL+'/api/v1/alerts',
     {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
	 })
	 
	 // console.log(JSON.stringify(response));
 
     res.json(response)
	 return
	 
  } catch(error) {
    res.status(400).send({ error: error.message })
  }
};