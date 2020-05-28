import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import routerPush from '@/helpers/routerPush';
import Error from 'next/error';
import { pageDataSelector } from '@/stores/page/selectors';
import { reqPageDataAction } from '@/stores/page/actions';

import Layout from '@/containers/Layout';
import SectionMaker from '@/components/SectionMaker';
import { SolutionsHero } from '@/components/SolutionsHero';
import { OnPageNav } from '@/components/OnPageNav';

const Page = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqPageDataAction({ payload: 'solutions' }));
  }, []);

  const pageData = useSelector(state => pageDataSelector(state));
  // console.log('SINGLE PAGE DATA ', pageData )
  // if(!pageData.acf_data) {
  //    routerPush('/404');
  // }

  let data =
    pageData && pageData.acf_data && pageData.acf_data.content_block_collection
      ? pageData.acf_data
      : false;

  return (
    <Layout>
      {data.background_image && <SolutionsHero component={data} />}
      {data.content_block_collection && (
        <Fragment>
          <OnPageNav components={data.content_block_collection} />
          {data.content_block_collection.map((section, sectionKey) => (
            <SectionMaker
              type={section.acf_fc_layout}
              params={section}
              key={sectionKey}
              sectionIndex={sectionKey}
              props={{ ...props }}
            />
          ))}
        </Fragment>
      )}
    </Layout>
  );
};

Page.getInitialProps = async ({ query, res, req, store }) => {
  const initalState = store.getState();
  const pageData = initalState.page.data;
  return { query, pageData };
};

export default Page;
