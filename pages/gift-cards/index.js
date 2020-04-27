import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '@/components/SectionMaker';
import Layout from '@/containers/Layout/Layout';
import Header from '@/components/Header/Header';

import Error from 'next/error';

import { reqPageDataAction } from '@/stores/page/actions';

import { pageDataSelector } from '@/stores/page/selectors';

const Page = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }


  console.log('THIS STORE ', props.data )

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqPageDataAction({ payload: 'gift-cards'}));
  }, []);
 
  const pageData = useSelector(state => pageDataSelector(state));
  let data = pageData && pageData.acf_data && pageData.acf_data.components ? pageData.acf_data : false;

  // console.log('GIFT CARD DATA ', data )

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

Page.getInitialProps = async ({ query, res, store  }) => {
  let data = store;
  return { query, data };
};

export default Page;
