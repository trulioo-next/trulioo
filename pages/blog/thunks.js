
import { parseUrl, urlHasParams, pushUrl } from '../../../utils/parseURL';
import { calcPageOffset } from './utils';


export const getInitialData = dispatch => (setComponents, setHeroBlog, setFeaturedBlogs, setPopularArticles, data) => {
  const loadData = (data) => dispatch(
    { type: 'LOAD_COMPONENTS', payload: data }
  );

  const loadBlogHeroData = (data) => dispatch(
    { type: 'LOAD_BLOG_HERO', payload: data }
  );


  const loadFeaturedBlogData = (data) => dispatch(
    { type: 'LOAD_FEATURED_BLOGS', payload: data }
  );

  loadBlogHeroData(data.acf.hero);
  setHeroBlog(data.acf.hero);
  loadData(data.acf.content_block_collection);
  setComponents(data.acf.content_block_collection);

  acf.Content.getOptions('popular-articles-settings')
  .then((data) => {
    setPopularArticles(data.acf.popular_articles);
  });

  api.Articles.postList(0, 4)
  .then((result) => {
    loadFeaturedBlogData(result.posts);
    setFeaturedBlogs(result.posts);
  });

};

export const getBlogs = dispatch => pageOffset => {
  return api.Articles.postList(pageOffset)
  .then((result) => {
    dispatch(
      { type: 'LOAD_BLOGS_LIST', payload: result.posts }
    );
  });
};

export const searchBlogsFromUrl = dispatch => search => {
  const urlParams = parseUrl();
  if (urlHasParams(urlParams)) {
    searchBlogs(dispatch)({
      ...urlParams,
      pageOffset: calcPageOffset(urlParams.page),
    });
    dispatch({
      type: 'LOAD_BLOGS_PAGINATION', payload: urlParams.page
    });
  }
};

export const searchBlogs = dispatch => ({
  types = [], topics = [], pageOffset, term, page
}) => {
  return api.Articles.search(types, topics, pageOffset, term)
  .then((data) => {
    const result = data.body;
    const max_page = data.headers;

    dispatch({
      type: 'LOAD_BLOGS_SEARCH',
      payload: { term, types, topics, result, max_page }
    });
  })
  .catch((error) => {
    dispatch({
      type: 'LOAD_BLOGS_SEARCH_ERROR',
      payload: { term }
    });
  });
  const urlParams = { types, topics, page };
  if (urlHasParams(urlParams)) {
    pushUrl(urlParams);
  }
};

export const clearBlogs = dispatch => () => {
  dispatch({ type: 'CLEAR_BLOGS_SEARCH' });
  pushUrl({ types: null, topics: null, page: 1 });
};
