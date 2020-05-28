import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '../../components/SectionMaker';
import Layout from '../../containers/Layout';
 
import { pageDataSelector } from '../../stores/page/selectors';
import { reqPageDataAction } from '../../stores/page/actions';
import { reqArticlesAction } from '../../stores/articles/actions';
import { articlesDataSelector } from '../../stores/articles/selectors';

import { HalfHero }  from '../../components/HalfHero';
import { PopularArticles } from '../../components/PopularArticles';
import { FeaturedBlog } from '../../components/FeaturedBlog';
import {
  MarketoBlog,
} from '../../components/Marketo';

import {
  GroupPost
} from '../../components/Post';
import { SearchBlogs } from './search';
import { BlogsPagination } from './pagination';
import { calcPageOffset } from './utils';

// import {
//   getInitialData,
//   getBlogs,
//   searchBlogsFromUrl,
//   searchBlogs,
//   clearBlogs
// } from './thunks';

import {
  Container,
  Row,
  Col
} from 'reactstrap';


const Blog = props => {

  const dispatch = useDispatch();
  const { result, max_page, isSearching, term, types, topics, hasError } = useSelector(state => state.api.blogs.search);
  const blogsList = useSelector(state => state.api.blogs.list);
  const blogsPage = useSelector(state => state.api.blogs.page);
  const [ popularArticles, setPopularArticles ] = useState(null);
  const [ getComponents, setComponents ] = useState(null);
  const [ getHeroBlog, setHeroBlog ] = useState(null);
  const [ getFeaturedBlogs, setFeaturedBlogs ] = useState(null);

  const [ loader, setLoader ] = useState(true);

  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  useEffect(() => {
      dispatch(reqPageDataAction({ payload: props.query.page }));

      // Dispatch Articles
      dispatch(reqArticlesAction({ post_id: 1, offset:0, posts_per_page:100 }));


    if (window.location.hash) {
      scrollToAnchor(window.location.hash.replace('#', ''));
    }
  }, []);

  let scrollAttempts = 0;

  function scrollToAnchor(anchor) {
    if (scrollAttempts > 100) {
      console.log('Anchor #' + anchor + ' not found in page.');
      return false;
    }

    const attempt = (function(a) {
      return function() {
        attemptScrollToAnchor(a);
      };
    })(anchor);
    setTimeout(attempt, 100);
  }

  function attemptScrollToAnchor(anchor) {
    scrollAttempts++;
    const a = document.querySelector("a[name='" + anchor + "']");
    if (a) {
      a.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    scrollToAnchor(anchor);
  }

   

   const pageData = useSelector(state => pageDataSelector(state));
  // console.log('SINGLE PAGE DATA ', pageData )
  // if(!pageData.acf_data) {
  //    routerPush('/404');
  // }

  let data =
    pageData && pageData.acf_data && pageData.acf_data.content_block_collection
      ? pageData.acf_data
      : false;

  ///

  useEffect(() => {
    const loadMarketoBlog = (data) => dispatch(
      { type: 'LOAD_MARKETO_BLOG', payload: data }
    );

    const isMounted = loader;

    // acf.Content.getOptions('marketo-on-blog-pages')
    // .then((data) => {
    //   if (isMounted) {
    //     loadMarketoBlog(data.acf.marketo_on_blog_page);
    //   }
    // });
    getBlogs(dispatch)(4);
    getInitialData(dispatch)(setComponents, setHeroBlog, setFeaturedBlogs, setPopularArticles, data);
    searchBlogsFromUrl(dispatch)(searchBlogs);
    return () => {
      setLoader(false);
      clearBlogs(dispatch)();
    };
  }, [ dispatch ]);

  useEffect(() => {
    onPagination();
  }, [ blogsPage ]);

  if (isNil(blogsList)) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const onPagination = () => {
    // offsetBy should match the per_page number passed in 'services/api.js'
    if (isSearching) {
      const pageOffset = calcPageOffset({ page: blogsPage, offsetBy: 10 });
      searchBlogs(dispatch)({ pageOffset, term, types, topics, page: 1 });
    } else {
      const pageOffset = calcPageOffset({ page: blogsPage, offsetBy: 5 });
      getBlogs(dispatch)(pageOffset);
    }
  };

  const postsToRender = isSearching ? result : blogsList;

  let pagination;
  if (isSearching) {
    if (max_page && max_page['x-wp-totalpages'] > 1 ) {
      pagination = <BlogsPagination maxPage={ max_page } windowSize={ 5 } />;
    }
  } else {
    pagination = <BlogsPagination windowSize={ 5 } />;
  }
  console.log('Articles ',articles)
  return (
    <Layout>
      { getHeroBlog && <HalfHero component={ getHeroBlog }/> }
      <SearchBlogs />
      <FeaturedBlog isSearching={ isSearching } data={ getFeaturedBlogs } />
      <section className="blog-posts-section">
        <Container fluid className="py-4 p-md-5 container-md">
          <Row className="py-5 justify-content-between">
            <Col xs="12" md="8" lg="7" className="px-0 mb-5 px-md-4 mb-md-0">
              {
                !hasError && postsToRender.map((post, index) => (
                  <GroupPost isSearching={ isSearching } key={ index } post={ post } />
                ))
              }
              { hasError || postsToRender.length === 0 && 'There are no more posts!'}
              {pagination}
            </Col>
            <Col xs="12" md="4" className="px-5 mt-5 px-md-4 mt-md-0">
              <PopularArticles getPopularArticles={ popularArticles }/>
            </Col>
          </Row>
        </Container>
      </section>
      {data &&
        data.content_block_collection.map((section, sectionKey) => (
          <SectionMaker
            type={section.acf_fc_layout}
            params={section}
            key={sectionKey}
            sectionIndex={sectionKey}
            props={{...props}}
          />
        ))}
      <MarketoBlog/>
    </Layout>
  );
};

Blog.getInitialProps = async ({ query, res, req, store }) => {
  const initalState = store.getState();
  const pageData = initalState.page.data;
  return { query, pageData };
};

export default Blog;
