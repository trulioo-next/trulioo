import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '@/components/SectionMaker';
import Layout from '@/containers/Layout/Layout';
import { NextSeo } from 'next-seo';

import routerPush from '@/helpers/routerPush';
import Error from 'next/error';
import { pageDataSelector } from '@/stores/page/selectors';
import { reqPageDataAction } from '@/stores/page/actions';
import { selectYoastSettings } from '@/stores/app/selectors';

const Page = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  const yoastDataSeo = useSelector(state =>  selectYoastSettings(state));
  let yoastSeo = yoastDataSeo && yoastDataSeo[0] && yoastDataSeo[0].yoast_meta ? yoastDataSeo[0].yoast_meta : ''

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqPageDataAction({ payload: props.query.page }));

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

  const pageData = useSelector(state => pageDataSelector(state));
  // console.log('SINGLE PAGE DATA ', pageData )
  // if(!pageData.acf_data) {
  //    routerPush('/404');
  // }

  let data =
    pageData && pageData.acf_data && pageData.acf_data.content_block_collection
      ? pageData.acf_data
      : false;

    let seoTitle = data && pageData && pageData.seo && pageData.seo.title !== '' ? pageData.seo.title : 'Trulioo'
    let seoDesc = data && pageData && pageData.seo ? pageData.seo.desc : ''
    let seoImage = data && pageData && pageData.seo ? pageData.seo.facebook_image : ''

      
  return (
    <Layout>
      <NextSeo
          title={seoTitle}
          description={seoDesc}
          openGraph={{
            url: 'https://trulioo.com/',
            title: seoTitle,
            description: seoDesc,
            images: [
              {
                url: seoImage,
                width: 800,
                height: 600,
                alt: 'Trulioo',
              },
              
              { url: seoImage },
            ],
            site_name: 'https://trulioo.com',
          }}
          twitter={{
            handle: '@trullio',
            site: '@trullio',
            cardType: 'summary_large_image',
          }}
          additionalMetaTags={yoastSeo}
        />
      {data &&
        data.content_block_collection.map((section, sectionKey) => (
          <SectionMaker
            type={section.acf_fc_layout}
            params={section}
            key={sectionKey}
            sectionIndex={sectionKey}
            props={{ ...props }}
          />
        ))}
    </Layout>
  );
};

Page.getInitialProps = async ({ query, res, req, store }) => {
  const initalState = store.getState();
  const pageData = initalState.page.data;
  return { query, pageData };
};

export default Page;
