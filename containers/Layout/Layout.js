import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import { reqPageDataAction } from '../../stores/page/actions';
import { reqStartupAction } from '../../stores/app/actions';

const STATICDATA = require('../../data/global.json')

import Error from 'next/error';
import Loader from '@/components/Loader';

import {
  selectIsLoading,
  selectIsLoaded,
  selectHeaderData,
  selectFooterData,
} from '../../stores/app/selectors';

  
// import './Layout.scss';

const Layout = props => {
   
  const dispatch = useDispatch();
   
  const close = false;
  let headerData = useSelector(state => selectHeaderData(state));
  const isLoading = useSelector(state => selectIsLoading(state));
 
  if(!headerData) {
    headerData = STATICDATA['header-menu'];
  }
 

  return (
    <React.Fragment>
      <div className="Layout">
      <div className="sticky__header">
       
        </div>
        <main className="SiteMain">
          {isLoading && <Loader />}
          {props.children}
        </main>
        
      </div>
       
    </React.Fragment>
  );
};

Layout.getInitialProps = async ({ query, res, children }) => {
  let defaultData = STATICDATA;
  return { query, children, defaultData };
};

export default Layout;
