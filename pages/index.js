import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '@/components/SectionMaker';
import Layout from '@/containers/Layout';
import Header from '@/components/Header';

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
  let data = pageData && pageData.acf_data && pageData.acf_data.components ? pageData.acf_data.components : false;
    
 
  console.log('HOME PAGE LOADED ', pageData )

  return (
     
    <Layout>
      <Header title="" />
      {data &&
        data.map((section, sectionKey) => {
          return (
            <SectionMaker
              type={section.acf_fc_layout}
              params={section}
              key={sectionKey}
              sectionIndex={sectionKey}
            />
          );
        })}
    </Layout>
     
  );
};

Home.getInitialProps = async ({ query, res, isServer }) => {
  return { query };
};

export default Home;
