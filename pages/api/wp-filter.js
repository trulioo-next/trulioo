const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL

export default async (req, res) => {
  try {

    const body = JSON.parse(req.body)
    let page = 1;

		const typeId = body.payload.type_id
    const topicId = body.payload.topic_id

    const postList = await fetch(ENDPOINT_URL+'/wp/v2/posts/?_embed&articles_types='+typeId+'&articles_topics='+topicId+'&offset=0&per_page=10&orderby=date&order=desc&search=', {
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

   const topics = await fetch(ENDPOINT_URL+'/wp/v2/articles_topics?per_page=100', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

   const types = await fetch(ENDPOINT_URL+'/wp/v2/articles_types?per_page=100', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

   const marketoBlog = await fetch(ENDPOINT_URL+'/acf/v3/options/marketo-on-blog-pages', {
     method: 'GET',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }
   })


   const popularArticles = await fetch(ENDPOINT_URL+'/acf/v3/options/popular-articles-settings', {
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
     types,
     marketoBlog,
     popularArticles
   }

    res.json(data)
	 return

  } catch(error) {
     res.json({ error: error })
  }
};
