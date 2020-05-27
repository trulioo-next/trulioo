import React, { useEffect } from 'react';

import fetch from 'isomorphic-unfetch'
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '../components/SectionMaker';
import Layout from '../containers/Layout/Layout';
 
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Error from 'next/error';

import { reqResourcesAction } from '../stores/resources/actions';
import { reqPressReleaseAction } from '../stores/pressRelease/actions';
import { reqArticlesAction } from '../stores/articles/actions';
import { pageDataSelector } from '../stores/page/selectors';
import { resourceDataSelector } from '../stores/resources/selectors';
import { pressDataSelector } from '../stores/pressRelease/selectors';
import { articlesDataSelector } from '../stores/articles/selectors';

const Home = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  
   const dispatch = useDispatch();
   useEffect(() => {

      // Dispatch action for resources 
      dispatch(reqResourcesAction({ payload: 1 }));
      
      // Dispatch action for Press Release
      dispatch(reqPressReleaseAction({ payload: 1 }));

      // Dispatch Articles
      dispatch(reqArticlesAction({ post_id: 1, offset:0, posts_per_page:100 }));

  }, []);
   
  const articles = useSelector(articlesDataSelector);
  const press = useSelector(pressDataSelector);
  const resources = useSelector(resourceDataSelector);

  console.log('Articles ',articles)
  console.log('Press Releases ',press)
  console.log('Resources ',resources)

  return (
    <Layout>
      
       Resources
    </Layout>
  );
};

Home.getInitialProps = async ({ query, res, store }) => {
  // TODO: GET STATE DATA HERE 
  //
  const initalState = store.getState();
  const pageData = initalState.page.data;
  return { query, pageData };
};

export default Home;

