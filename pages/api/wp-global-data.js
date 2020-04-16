const fetch = require('../../utils/fetch')
const data = require('../../data/global.json')

const ENDPOINT_URL = process.env.ENDPOINT_URL
 
export default async (req, res) => {

  // console.log('GLOBAL DATA ENDPOINT ')
  try {
 
    const response = await fetch(ENDPOINT_URL+'/global-settings/global',
     {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

     // console.log('GLOBAL DATA ', response )
 
     res.json(response)
     return
  } catch(error) {
    // NOTE: Should provide an error resource here 
    console.log('ERROR SEND LOCAL DATA ', data )
    res.json(data)
  }
};
