// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import SectionMaker from '@/components/SectionMaker';
// import Layout from '@/containers/Layout';
// import Header from '@/components/Header';
// import Error from 'next/error';

// import { reqPageDataAction } from '../stores/page/actions';
// import { pageDataSelector } from '../stores/page/selectors';


// import API from '../utils/api'
// import STATICDATA from '../data/home.json'


// import {
//   selectIsLoading,
// } from '../stores/app/selectors';


// const Home = props => {
//   if (props.errorCode) {
//     return <Error statusCode={props.errorCode} />;
//   }

//   // const dispatch = useDispatch();
//   // useEffect(() => {
//   //   dispatch(reqPageDataAction({ payload: 'home' }));
//   // }, []);
 

//   const isLoading = useSelector(state => selectIsLoading(state));
//   // const homeData = useSelector(state => pageDataSelector(state));
//   // console.log( 'HOME STORE DATA ', props.data )
//   // console.log( 'IS LOADING  ', isLoading )
     
//  // console.log(' PAGE DATA ::>>   ', props.data )
//  // console.log('waitToRender ::>>  ', waitToRender  )
//  // console.log('isLoading ::>>   ',  isLoading )
 
//   return (
     
//     <Layout>
//       <Header title="" />
//         { props.data &&
//         props.data.acf_data.components.map((section, sectionKey) => {
//           return (
//             <SectionMaker
//               type={section.acf_fc_layout}
//               params={section}
//               key={sectionKey}
//               sectionIndex={sectionKey}
//             />
//           );
//         })}

      
//     </Layout>
     
//   );
// };

// Home.getInitialProps = async ({ query, res, isServer }) => {
//    let data = STATICDATA;

//    // await API.post('/api/wp-page-data', { payload:'home'} );

//    // if(!data && data.errno ) {

//    //    data = STATICDATA;
//    // }
//   return { query, data };
// };

// export default Home;



import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '../components/SectionMaker';
import Layout from '../containers/Layout/Layout';
import Header from '../components/Header/Header';

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

  return (
    <Layout>
      <Header title="" />
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

