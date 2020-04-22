import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '@/components/SectionMaker';
import Layout from '@/containers/Layout';
import Header from '@/components/Header';
import Error from 'next/error';

import { reqPageDataAction } from '../stores/page/actions';
import { pageDataSelector } from '../stores/page/selectors';


import API from '../utils/api'


import {
  selectIsLoading,
} from '../stores/app/selectors';


const Home = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(reqPageDataAction({ payload: 'home' }));
  // }, []);
 

  const isLoading = useSelector(state => selectIsLoading(state));

  console.log( 'HOME STORE DATA ', props.data )
     
 // console.log(' PAGE DATA ::>>   ', props.data )
 // console.log('waitToRender ::>>  ', waitToRender  )
 // console.log('isLoading ::>>   ',  isLoading )

 { props.data &&
        props.data.acf_data.components.map((section, sectionKey) => {
          return (
            <SectionMaker
              type={section.acf_fc_layout}
              params={section}
              key={sectionKey}
              sectionIndex={sectionKey}
            />
          );
        })}

   
  return (
     
    <Layout>
      <Header title="" />
       

      
    </Layout>
     
  );
};

Home.getInitialProps = async ({ query, res, isServer }) => {
   let data = await API.post('/api/wp-page-data', { payload:'home'} );
  return { query, data };
};

export default Home;
