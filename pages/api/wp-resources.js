const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL
 
export default async (req, res) => {  
  try {
    
    const body = JSON.parse(req.body)
    let searchTerm = '';

    if(body.payload) {
		  searchTerm = body.payload
    }
   
    //
    const postList = await fetch(ENDPOINT_URL+'/wp/v2/resources/?_embed&per_page=9&page=1', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

    const topics = await fetch(ENDPOINT_URL+'/wp/v2/resources_topics?per_page=100', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })


    const types = await fetch(ENDPOINT_URL+'/wp/v2/resources_types?per_page=100', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     }) 

    let data = {
      postList,
      topics,
      types
    }

    console.log('DATA ', data )

    res.json(data)
	 return
	 
  } catch(error) {
     res.json({ error: error })
  }
};
