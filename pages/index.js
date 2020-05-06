import React, { useEffect } from 'react';
import fetch from 'isomorphic-unfetch'
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '../components/SectionMaker';
import Layout from '../containers/Layout/Layout';
import Header from '../components/Header/Header';
import { NextSeo } from 'next-seo';

import Error from 'next/error';

import { reqPageDataAction } from '../stores/page/actions';
import { pageDataSelector } from '../stores/page/selectors';

const Home = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqPageDataAction({ payload: 'home' }));
  }, []);

  const pageData = useSelector(state => pageDataSelector(state));
  let data = pageData && pageData.acf_data && pageData.acf_data.components ? pageData.acf_data : false;
  let seoTitle = data && pageData && pageData.seo && pageData.seo.title !== '' ? pageData.seo.title : 'Home - 7-Eleven Canada'
  let seoDesc = data && pageData && pageData.seo ? pageData.seo.desc : ''
  let seoImage = data && pageData && pageData.seo ? pageData.seo.facebook_image : ''

  return (
    <Layout>
    <NextSeo
      title={seoTitle}
      description={seoDesc}
      openGraph={{
        url: 'https://7-eleven.ca/',
        title: seoTitle,
        description: seoDesc,
        images: [
          {
            url: seoImage,
            width: 800,
            height: 600,
            alt: '7-Eleven Canada',
          },
           
          { url: seoImage },
        ],
        site_name: '7-Eleven Canada',
      }}
      twitter={{
        handle: '@7ElevenCanada',
        site: '@7ElevenCanada',
        cardType: 'summary_large_image',
      }}

    />
      <Header title={seoTitle} />
      { data &&
        data.components.map((section, sectionKey) => (
          <SectionMaker
            type={section.acf_fc_layout}
            params={section}
            key={sectionKey}
            sectionIndex={sectionKey}
          />
        ))}
    </Layout>
  );
};

Home.getInitialProps = async ({ query, res }) => {
  // TODO: GET STATE DATA HERE 
  // 
  // https://content.7-eleven.ca/blog_data/home.json 
  // https://content.7-eleven.ca/blog_data/home.json 
  // const data = await fetch('https://content.7-eleven.ca/blog_data/home.json')
  // const json = await data.json()
  return { query };
};

export default Home;

