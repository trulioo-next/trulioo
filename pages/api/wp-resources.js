const fetch = require('../../utils/fetch');
const ENDPOINT_URL = process.env.ENDPOINT_URL;

export default async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    let page = 1;

    if (body.payload) {
      page = body.payload.payload;
    }

    //
    const postList = await fetch(
      ENDPOINT_URL + '/wp/v2/resources/?_embed&per_page=100&page=' + page,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const topics = await fetch(
      ENDPOINT_URL + '/wp/v2/resources_topics?per_page=100',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const types = await fetch(
      ENDPOINT_URL + '/wp/v2/resources_types?per_page=100',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const featured = await fetch(
      ENDPOINT_URL + '/trulioo/resources/featured/3',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    let data = {
      postList,
      topics,
      types,
      featured,
    };

    res.json(data);
    return;
  } catch (error) {
    res.json({ error: error });
  }
};
