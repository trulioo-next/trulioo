const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL

export default async (req, res) => {
  try {

    const body = JSON.parse(req.body)
    let page = 1;

		const typeId = body.payload.type_id
    const topicId = body.payload.topic_id

    const postList = await fetch(ENDPOINT_URL+'/wp/v2/posts/?_embed&resouces_types='+typeId+'&resouces_topics='+topicId+'&offset=0&per_page=10&orderby=date&order=desc&search=', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

    let posts = {posts:postList}

    const featured = await fetch(ENDPOINT_URL+'/trulioo/press/featured', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

   const topics = await fetch(ENDPOINT_URL+'/wp/v2/resouces_topics?per_page=100', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

   const types = await fetch(ENDPOINT_URL+'/wp/v2/resouces_types?per_page=100', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })


   let data = {
     postList:posts,
     featured,
     topics,
     types
   }

    res.json(data)
	 return

  } catch(error) {
     res.json({ error: error })
  }
};
