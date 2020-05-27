import React, { useEffect } from 'react';

import fetch from 'isomorphic-unfetch'
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '../components/SectionMaker';
import Layout from '../containers/Layout/Layout';
 
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Error from 'next/error';

import { reqResourcesAction } from '../stores/resources/actions';
import { pageDataSelector } from '../stores/page/selectors';

const Home = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(reqResourcesAction({ payload: 1 }));

     
  }, []);
   
  // console.log('HELLO PAGE ', pageData )

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

