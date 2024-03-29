import React, { useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '../components/SectionMaker';
import Layout from '../containers/Layout/Layout';

import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Error from 'next/error';

import { reqStartupAction } from '../stores/app/actions';
import { pageDataSelector } from '../stores/page/selectors';

import { selectYoastSettings } from '../stores/app/selectors';


const Home = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  const pageData = props.pageData ? props.pageData : false;
  let data = pageData && pageData.acf_data && pageData.acf_data.content_block_collection ? pageData.acf_data : false;
  let seoTitle = data && pageData && pageData.seo && pageData.seo.title !== '' ? pageData.seo.title : 'Trulioo'
  let seoDesc = data && pageData && pageData.seo ? pageData.seo.desc : ''
  let seoImage = data && pageData && pageData.seo ? pageData.seo.facebook_image : ''

  const yoastDataSeo = useSelector(state =>  selectYoastSettings(state));
  let yoastSeo = yoastDataSeo && yoastDataSeo[0] && yoastDataSeo[0].yoast_meta ? yoastDataSeo[0].yoast_meta : ''

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
      { data &&
        data.content_block_collection.map((section, sectionKey) => (
          <SectionMaker
            type={section.acf_fc_layout}
            params={section}
            key={sectionKey}
            sectionIndex={sectionKey}
            homepage
          />
        ))}
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
