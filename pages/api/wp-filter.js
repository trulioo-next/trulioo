const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL

export default async (req, res) => {
  try {

    const body = JSON.parse(req.body)
    let page = 1;

		const typeId = body.payload.type_id
    const topicId = body.payload.topic_id

    console.log('TYPE ID SERVER  ', typeId, topicId  )

    const postList = await fetch(ENDPOINT_URL+'/wp/v2/posts/?_embed&articles_types='+typeId+'&articles_topics='+topicId+'&offset=0&per_page=10&orderby=date&order=desc&search=', {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

    let posts = {posts:postList}

    let data = {
      postList:posts
    }

    res.json(data)
	 return

  } catch(error) {
     res.json({ error: error })
  }
};
