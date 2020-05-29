import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isNil } from 'lodash';
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

import { selectGeneralSettings } from '@/stores/app/selectors';


import {
  GroupPost
} from '../../components/Post';


import {
  Container,
  Row,
  Col
} from 'reactstrap';


const Blog = props => {
  const isSearching = false;
  const dispatch = useDispatch();

  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  useEffect(() => {
 
      // Dispatch Articles
      dispatch(reqArticlesAction({ post_id: 1, offset:0, posts_per_page: 5 }));
      dispatch(reqPageDataAction({ payload:'blog' }));

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
  const articles = useSelector(articlesDataSelector);
  const generalSettings = useSelector(state =>  selectGeneralSettings(state));

  let featuredPosts = articles.featured;
  let blogsList = articles.postList.posts;


  let data =
    pageData && pageData.acf_data && pageData.acf_data.content_block_collection
      ? pageData.acf_data
      : false;
 
  const postsToRender = isSearching ? result : blogsList;

  // useEffect(() => {
  //   const loadMarketoBlog = (data) => dispatch(
  //     { type: 'LOAD_MARKETO_BLOG', payload: data }
  //   );

  //   const isMounted = loader;

  //   // acf.Content.getOptions('marketo-on-blog-pages')
  //   // .then((data) => {
  //   //   if (isMounted) {
  //   //     loadMarketoBlog(data.acf.marketo_on_blog_page);
  //   //   }
  //   // });
  //   getBlogs(dispatch)(4);
  //   getInitialData(dispatch)(setComponents, setHeroBlog, setFeaturedBlogs, setPopularArticles, data);
  //   searchBlogsFromUrl(dispatch)(searchBlogs);
  //   return () => {
  //     setLoader(false);
  //     clearBlogs(dispatch)();
  //   };
  // }, [ dispatch ]);

  // useEffect(() => {
  //   onPagination();
  // }, [ blogsPage ]);

  // if (isNil(blogsList)) {
  //   return (
  //     <div className="text-center">
  //       <div className="spinner-border" role="status">
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // }

  // const onPagination = () => {
  //   // offsetBy should match the per_page number passed in 'services/api.js'
  //   if (isSearching) {
  //     const pageOffset = calcPageOffset({ page: blogsPage, offsetBy: 10 });
  //     searchBlogs(dispatch)({ pageOffset, term, types, topics, page: 1 });
  //   } else {
  //     const pageOffset = calcPageOffset({ page: blogsPage, offsetBy: 5 });
  //     getBlogs(dispatch)(pageOffset);
  //   }
  // };



  // let pagination;
  // if (isSearching) {
  //   if (max_page && max_page['x-wp-totalpages'] > 1 ) {
  //     pagination = <BlogsPagination maxPage={ max_page } windowSize={ 5 } />;
  //   }
  // } else {
  //   pagination = <BlogsPagination windowSize={ 5 } />;
  // }


  let acfData = pageData && pageData.acf_data ? pageData.acf_data : false;
  let popularArticles = articles && articles.popularArticles ? articles.popularArticles.acf : false;

  return (
    <Layout>
      { acfData && <HalfHero component={ acfData.hero }/> }
      {/* <SearchBlogs /> */}
      {/* <FeaturedBlog isSearching={ isSearching } data={ getFeaturedBlogs } /> */}
      <section className="blog-posts-section">
        <Container fluid className="py-4 p-md-5 container-md">
          <Row className="py-5 justify-content-between">
            <Col xs="12" md="8" lg="7" className="px-0 mb-5 px-md-4 mb-md-0">
              {
                postsToRender && postsToRender.map((post, index) => (
                  <GroupPost isSearching={ isSearching } key={ index } post={ post } />
                ))
              }
              {/* { hasError || postsToRender.length === 0 && 'There are no more posts!'} */}
              {/* {pagination} */}
            </Col>
            <Col xs="12" md="4" className="px-5 mt-5 px-md-4 mt-md-0">
              {popularArticles && <PopularArticles getPopularArticles={ popularArticles.popular_articles }/>}
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
