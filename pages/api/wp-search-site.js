const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL
 
export default async (req, res) => {  
  try {
    
    const body = JSON.parse(req.body)
    let searchTerm = '';

    if(body.payload) {
		searchTerm = body.payload
    }

    const response = await fetch(ENDPOINT_URL+'/api/v1/search?search='+searchTerm,
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
  }
};
