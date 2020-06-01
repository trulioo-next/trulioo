const fetch = require('../../utils/fetch')
const ENDPOINT_URL = process.env.ENDPOINT_URL

export default async (req, res) => {
  try {

    const body = JSON.parse(req.body)
    let page = 1;

		const postsPerPage = body.payload.posts_per_page
    const offset = body.payload.offset
    const postId = body.payload.post_id

    const postList = await fetch(ENDPOINT_URL+'/trulioo/posts/?offset='+offset+'&posts_per_page='+postsPerPage, {
       method: 'GET',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })

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

    const postDataById = await fetch(ENDPOINT_URL+'/trulioo/post/'+postId, {
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
      postList,
      featured,
      topics,
      types,
      postDataById,
      marketoBlog,
      popularArticles
    }

    res.json(data)
	 return

  } catch(error) {
     res.json({ error: error })
  }
};
