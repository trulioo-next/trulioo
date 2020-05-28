const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL
 
export default async (req, res) => {  
  try {
    
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


    let data = {
        siteInformation,
        generalSettings
    }
    
    res.json(data)
	 return
	 
  } catch(error) {
     res.json({ error: error })
  }
};
