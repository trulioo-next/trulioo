import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from '../components/SectionMaker';
import Layout from '../containers/Layout/Layout';
import Header from '../components/Header/Header';

import Error from 'next/error';

import { reqPageDataAction } from '../stores/page/actions';

import { pageDataSelector } from '../stores/page/selectors';

const Page = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqPageDataAction({ payload: props.query.slug }));

    if(window.location.hash)
    { scrollToAnchor(window.location.hash.replace('#', ''))
    }
  }, []);

   
  function scrollToAnchor(anchor)
  { const attempt = (function(a) { attemptScrollToAnchor(a); })(anchor);
    setTimeout(attempt, 100);
  }

  function attemptScrollToAnchor(anchor)
  { const a = document.querySelector("a[name='" + anchor + "']");
    if (a)
    { a.scrollIntoView({behavior: "smooth", block: "start"});
      return true;
    }
    scrollToAnchor(anchor);
  }


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

Page.getInitialProps = async ({ query, res }) => {
  return { query };
};

export default Page;
