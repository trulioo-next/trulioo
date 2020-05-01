import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import { reqPageDataAction } from '../../stores/page/actions';
import { reqStartupAction } from '../../stores/app/actions';

const STATICDATA = require('../../data/global.json')

import Error from 'next/error';

import Alert from '@/components/Alert';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import CookiesBanner from '@/components/CookiesBanner';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

import {
  selectIsLoading,
  selectIsLoaded,
  selectHeaderData,
  selectFooterData,
} from '../../stores/app/selectors';

import { reqAlertDataAction } from '../../stores/alert/actions';
import { alertDataSelector } from '../../stores/alert/selectors';

import {
  userDataSelector
} from '../../stores/user/selectors';

import './Layout.scss';

const Layout = props => {
   
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(reqStartupAction({ isAuthenticated: false,  query: false }));
  // }, []);
  
  useEffect(() => {
    dispatch(reqAlertDataAction({ }));
  }, []);

  const close = false;
  let headerData = useSelector(state => selectHeaderData(state));
  let userData = useSelector(state => userDataSelector(state));
  const isLoading = useSelector(state => selectIsLoading(state));

  // console.log('IS LOADING  ', isLoading )


  if(!headerData) {
    headerData = STATICDATA['header-menu'];
    // console.log('STATIC HEADER DATA ', headerData )
  }
  // console.log('HEADER DATA ', headerData )

  const alertsData = useSelector(state => alertDataSelector(state));

  return (
    <React.Fragment>
      <div className="Layout">
      <div className="sticky__header">
      { alertsData &&
        <Alert alertData={alertsData} />
      }
        <Header
          title="7 Eleven"
          description="Page MetaData here"
          canonical="http://7-eleven.ca"
        />
        { headerData &&
          <NavBar data={headerData} user={userData} />
        }
        </div>
        <main className="SiteMain">
          {isLoading && <Loader />}
          {props.children}
        </main>
        <Footer />
      </div>
      <CookiesBanner />
    </React.Fragment>
  );
};

Layout.getInitialProps = async ({ query, res, children }) => {
  let defaultData = STATICDATA;
  return { query, children, defaultData };
};

export default Layout;
