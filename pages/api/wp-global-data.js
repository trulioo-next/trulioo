const fetch = require('../../utils/fetch')

const fs = require('fs');
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

     res.json(response)
     return
  } catch(error) {
    // NOTE: Should provide an error resource here
    console.log('ERROR SEND LOCAL DATA ')
    res.json({'error':'Error loading global data'})
  }
};
