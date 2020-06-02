const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL

export default async (req, res) => {
  try {

    const types = await fetch(ENDPOINT_URL+'/wp/v2/articles_types?per_page=100', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

    let data = { types }

    res.json(data)
	 return

  } catch(error) {
     res.json({ error: error })
  }
};
