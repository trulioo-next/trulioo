const fetch = require('../../utils/fetch')


const ENDPOINT_URL = process.env.ENDPOINT_URL

export default async (req, res) => {
  try {
    const response = await fetch('http://seven-eleven-wp.local/wp-json/global-settings/global',
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
