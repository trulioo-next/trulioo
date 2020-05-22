import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import { reqPageDataAction } from '../../stores/page/actions';
import { reqStartupAction } from '../../stores/app/actions';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';

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
   

  const close = false;
  let headerData = useSelector(state => selectHeaderData(state));
  const isLoading = useSelector(state => selectIsLoading(state));
   
  return (
    <React.Fragment>
      <div className="Layout">
       
       <Header
          title="Trulioo"
        />

        { headerData &&
          <NavBar data={headerData} user={false} />
        }
       
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
