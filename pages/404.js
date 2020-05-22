import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '../components/SectionMaker';
import Layout from '../containers/Layout/Layout';


import Error from 'next/error';

import { reqPageDataAction } from '../stores/page/actions';
import { pageDataSelector } from '../stores/page/selectors';

const Page404 = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqPageDataAction({ payload: '404-2' }));
  }, []);

  const pageData = useSelector(state => pageDataSelector(state));
  let data = pageData && pageData.acf_data && pageData.acf_data.components ? pageData.acf_data : false;
   console.log('DATA ', pageData)

  return (
    <Layout>
       
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

 

export default Page404;

