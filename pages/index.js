import React, { useEffect } from 'react';
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
  

  let seoTitle = data && pageData && pageData.seo && pageData.seo.title !== '' ? pageData.seo.title : 'Home - 7-11 Canada'
  let seoDesc = data && pageData && pageData.seo ? pageData.seo.desc : ''

  console.log('seoTitle ::>> ', seoTitle )
  return (
    <Layout>
    <NextSeo
      title={seoTitle}
      description={seoDesc}
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
  return { query };
};

export default Home;

