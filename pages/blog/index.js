import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isNil } from 'lodash';
import SectionMaker from '@/components/SectionMaker';
import Layout from '@/containers/Layout';

import { NextSeo } from 'next-seo';

import { pageDataSelector } from '@/stores/page/selectors';
import { reqPageDataAction } from '@/stores/page/actions';
import { reqArticlesAction } from '@/stores/articles/actions';
import { articlesDataSelector  } from '@/stores/articles/selectors';

import { HalfHero }  from '@/components/HalfHero';
import { PopularArticles } from '@/components/PopularArticles';
import { FeaturedBlog } from '@/components/FeaturedBlog';
import { BlogsPagination } from './pagination';
import { Search as SearchWithFilters } from '@/components/SearchWithFilters';


import {
  MarketoBlog,
} from '@/components/Marketo';

import { selectGeneralSettings } from '@/stores/app/selectors';
import { selectYoastSettings } from '@/stores/app/selectors';


import {
  GroupPost
} from '@/components/Post';


import {
  Container,
  Row,
  Col
} from 'reactstrap';


const Blog = props => {
  const isSearching = false;
  const dispatch = useDispatch();

  const yoastDataSeo = useSelector(state =>  selectYoastSettings(state));
  let yoastSeo = yoastDataSeo && yoastDataSeo[0] && yoastDataSeo[0].yoast_meta ? yoastDataSeo[0].yoast_meta : ''

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
  const [ removeFeatured, setRemoveFeatured ] = useState(false);
  const featuredPosts = articles &&  articles.featured && articles.featured.posts ?  articles.featured.posts
  : false;
  const blogsList = articles &&  articles.postList && articles.postList.posts ?  articles.postList.posts
  : false;

  console.log(featuredPosts);
  let data =
    pageData && pageData.acf_data && pageData.acf_data.content_block_collection
      ? pageData.acf_data
      : false;

  const postsToRender = blogsList || false;

  let acfData = pageData && pageData.acf_data ? pageData.acf_data : false;
  let popularArticles = articles && articles.popularArticles ? articles.popularArticles.acf : false;

  function callBack(value) {
    setRemoveFeatured(value)
  }

  let seoTitle = data && pageData && pageData.seo && pageData.seo.title !== '' ? pageData.seo.title : 'Trulioo'
  let seoDesc = data && pageData && pageData.seo ? pageData.seo.desc : ''
  let seoImage = data && pageData && pageData.seo ? pageData.seo.facebook_image : ''


  return (
    <Layout>
      <NextSeo
          title={seoTitle}
          description={seoDesc}
          openGraph={{
            url: 'https://trulioo.com/',
            title: seoTitle,
            description: seoDesc,
            images: [
              {
                url: seoImage,
                width: 800,
                height: 600,
                alt: 'Trulioo',
              },
              
              { url: seoImage },
            ],
            site_name: 'https://trulioo.com',
          }}
          twitter={{
            handle: '@trullio',
            site: '@trullio',
            cardType: 'summary_large_image',
          }}
          additionalMetaTags={yoastSeo}
        />
      { acfData && <HalfHero component={ acfData.hero }/> }
       <SearchWithFilters callBack={ (value) => callBack(value) } type='articles' />
       { !removeFeatured &&
         <FeaturedBlog isSearching={ false } data={ featuredPosts } />
        }
      <section className="blog-posts-section">
        <Container fluid className="py-4 p-md-5 container-md">
          <Row className="py-5 justify-content-between">
            <Col xs="12" md="8" lg="7" className="px-0 mb-5 px-md-4 mb-md-0">
              {
                postsToRender && postsToRender.map((post, index) => (
                  <GroupPost isSearching={ isSearching } key={ index } post={ post } />
                ))
              }
               {  postsToRender.length === 0 && 'There are no more posts!'}
              <BlogsPagination maxPage={ 5 } windowSize={ 5 } />
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
