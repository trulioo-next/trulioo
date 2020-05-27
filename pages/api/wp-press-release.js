const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL
 
export default async (req, res) => {  
  try {
    
    const body = JSON.parse(req.body)
    let page = 1;

    if(body.payload) {
		  page = body.payload.payload
    } 
    
    //
    const postList = await fetch(ENDPOINT_URL+'/wp/v2/press_releases/?per_page=9&page='+page, {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

    const years = await fetch(ENDPOINT_URL+'/wp/v2/press_releases_years?per_page=100', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

    const types = await fetch(ENDPOINT_URL+'/wp/v2/press_releases_types?per_page=100', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     }) 

    let data = {
      postList,
      years,
      types
    }
  
    res.json(data)
	 return
	 
  } catch(error) {
     res.json({ error: error })
  }
};
