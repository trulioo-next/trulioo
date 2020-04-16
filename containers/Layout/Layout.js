import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import { reqPageDataAction } from '../../stores/page/actions';
import { reqStartupAction } from '../../stores/app/actions';

const STATICDATA = require('../../data/global.json')

import Error from 'next/error';

import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

import {
  selectIsLoading,
  selectIsLoaded,
  selectHeaderData,
  selectFooterData,
} from '../../stores/app/selectors';

import './Layout.scss';

const Layout = props => {
   
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(reqStartupAction({ isAuthenticated: false,  query: false }));
  // }, []);
  const close = false;
  let headerData = useSelector(state => selectHeaderData(state));
  const isLoading = useSelector(state => selectIsLoading(state));
  if(!headerData) {
    headerData = STATICDATA['header-menu']
  }
  // console.log('HEADER DATA ', headerData )

  return (
    <div className="Layout">
         <Header
           title="7 Eleven"
            description="Page MetaData here"
            canonical="http://7-eleven.ca"
         />
         { headerData &&
            <NavBar data={headerData} />
          }

         <main className="SiteMain">
           {isLoading && <Loader />}
           {props.children}
         </main>

         <Footer />
      </div>
  );
};

Layout.getInitialProps = async ({ query, res, children }) => {
  return { query, children };
};

export default Layout;
