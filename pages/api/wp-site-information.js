const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL
 
export default async (req, res) => {  
  try {
    

    const body = JSON.parse(req.body)
    let id = 'home';
    console.log('BODY', body.query.page);

    if(body.payload) {
      id =  body.query.page
    }

    if(body.query.page === 'favicon.ico' ) {
      let id = 'home';
    }

    const siteInformation = await fetch(ENDPOINT_URL, {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
    }) 

     const generalSettings = await fetch(ENDPOINT_URL+'/acf/v3/options/theme-general-settings', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })  

    const yoastSeo = await fetch(ENDPOINT_URL+'/wp/v2/pages?slug=home',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });


    let data = {
        siteInformation,
        generalSettings,
        yoastSeo
    }
    
    res.json(data)
	 return
	 
  } catch(error) {
     res.json({ error: error })
  }
};
