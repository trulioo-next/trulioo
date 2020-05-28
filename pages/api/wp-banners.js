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
    const banners = await fetch(ENDPOINT_URL+'/trulioo/post/blogslider/5', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

    let data = {
      banners
    }
  
    res.json(data)
	 return
	 
  } catch(error) {
     res.json({ error: error })
  }
};
