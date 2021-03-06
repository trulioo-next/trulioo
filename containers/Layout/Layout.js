import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';

import { reqPageDataAction } from '../../stores/page/actions';
import { reqStartupAction } from '../../stores/app/actions';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import Error from 'next/error';
import Loader from '@/components/Loader';

import {
  selectIsLoading,
  selectIsLoaded,
  selectHeaderData,
  selectFooterData,
} from '../../stores/app/selectors';

const Layout = props => {
  const close = false;
  let headerData = useSelector(state => selectHeaderData(state));
  const isLoading = useSelector(state => selectIsLoading(state));

  return (
    <React.Fragment>
      <div className={classnames('Layout', props.className)}>
        <Header title="Trulioo" />

        <main className="SiteMain">
          {isLoading && <Loader />}
          {props.children}
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
};

Layout.getInitialProps = async ({ query, res, children }) => {
  let defaultData = STATICDATA;
  return { query, children, defaultData };
};

export default Layout;
