const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL

export default async (req, res) => {
  try {

    const body = JSON.parse(req.body)
    let page = 1;

		const typeId = body.payload.type_id
    const topicId = body.payload.topic_id
    const postType = body.payload.post_type
    const search = body.payload.search

    console.log('TYPE ID SERVER  ', typeId, topicId, postType  )

    const postList = await fetch(ENDPOINT_URL+'/wp/v2/posts/?_embed&'+postType+'_types='+typeId+'&'+postType+'_topics='+topicId+'&offset=0&per_page=10&orderby=date&order=desc&search='+search, {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })


    // TODO : ADD MAX POST COUNT
    const posts = { posts:postList }
    const data = {
      postList:posts
    }

    res.json(data)
	 return

  } catch(error) {
     res.json({ error: error })
  }
};
