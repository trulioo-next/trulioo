import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '@/components/SectionMaker';
import Layout from '@/containers/Layout/Layout';


import Error from 'next/error';

import { reqPageDataAction } from '@/stores/page/actions';

import { pageDataSelector } from '@/stores/page/selectors';

const Page = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  const dispatch = useDispatch();
   
  useEffect(() => {
     dispatch(reqPageDataAction({ payload: 'company--'+props.query.slug }));

    // console.log('DISPATCH SLUG : >>> ', props.query )

    if (window.location.hash) {
      scrollToAnchor(window.location.hash.replace('#', ''));
    }
  }, []);

  let scrollAttempts = 0;

  function scrollToAnchor(anchor) {
    if (scrollAttempts > 100) {
      console.log('Anchor #' + anchor + ' not found in page.');
      return false;
    }

    const attempt = (function(a) {
      return function() {
        attemptScrollToAnchor(a);
      };
    })(anchor);
    setTimeout(attempt, 100);
  }

  function attemptScrollToAnchor(anchor) {
    scrollAttempts++;
    const a = document.querySelector("a[name='" + anchor + "']");
    if (a) {
      a.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    scrollToAnchor(anchor);
  }

  const pageData =  useSelector(state => pageDataSelector(state));
  // console.log('SINGLE CHILD PAGE DATA ', pageData )
  // if(!pageData.acf_data) {
  //   // routerPush('/404');
  // }

  let data =
    pageData && pageData.acf_data && pageData.acf_data.content_block_collection
      ? pageData.acf_data
      : false;

  return (
    <Layout>

      {data &&
        data.content_block_collection.map((section, sectionKey) => (
          <SectionMaker
            type={section.acf_fc_layout}
            params={section}
            key={sectionKey}
            sectionIndex={sectionKey}
            props={{...props}}
          />
        ))}
    </Layout>
  );
};

Page.getInitialProps = async ({ query, res, req, store  }) => {
  const initalState = store.getState();
  const pageData = initalState.page.data;
  return { query, pageData  };
};

export default Page;
