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
<<<<<<< HEAD
 
=======

  console.log('THIS STORE ', props.data);

>>>>>>> d7e52368ed993c6d4074afbeb50232bc481dafeb
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqPageDataAction({ payload: 'gift-cards' }));
  }, []);

  const pageData = useSelector(state => pageDataSelector(state));
<<<<<<< HEAD
  let data = pageData && pageData.acf_data && pageData.acf_data.components ? pageData.acf_data : false;
 
=======
  let data =
    pageData && pageData.acf_data && pageData.acf_data.components
      ? pageData.acf_data
      : false;

  // console.log('GIFT CARD DATA ', data )

>>>>>>> d7e52368ed993c6d4074afbeb50232bc481dafeb
  return (
    <Layout>
      {pageData.page_data && <Header title={pageData.page_data.post_title} />}
      {data &&
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

<<<<<<< HEAD
Page.getInitialProps = async ({ query, res }) => {
  
  return { query };
=======
Page.getInitialProps = async ({ query, res, store }) => {
  let data = store;
  return { query, data };
>>>>>>> d7e52368ed993c6d4074afbeb50232bc481dafeb
};

export default Page;
