import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '@/components/SectionMaker';
import Layout from '@/containers/Layout';
import Header from '@/components/Header';

import Error from 'next/error';

import { reqPageDataAction } from '../stores/page/actions';

import { pageDataSelector } from '../stores/page/selectors';


import {
  selectIsLoading,
} from '../stores/app/selectors';


const Home = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqPageDataAction({ payload: 'home' }));
  }, []);
 

  const isLoading = useSelector(state => selectIsLoading(state));
  const pageData = useSelector(state => pageDataSelector(state));
  let waitToRender = false;

  if( pageData.acf_data.length === 0 ) {
      waitToRender = true;
  }
 
 // console.log(' PAGE DATA ::>>   ', pageData )
 // console.log('waitToRender ::>>  ', waitToRender  )
 // console.log('isLoading ::>>   ',  isLoading )
   
  return (
     
    <Layout>
      <Header title="" />
       { !waitToRender &&
        pageData.acf_data.components.map((section, sectionKey) => {
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
