import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '@/containers/Layout/Layout';
import Header from '@/components/Header';
import Error from 'next/error';
import { reqRedeemAction } from '@/stores/user/actions';
import { userDataSelector } from '@/stores/user/selectors';
import Hero from '@/components/Hero';
import Button from '@/components/Button';

import Styles from "./RegisterScreen.scss";

const Home = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(reqRedeemAction({ payload: 'home' }));
  // }, []);

  const user = useSelector(state => userDataSelector(state));

  const redeemPoints = (code) => {
    dispatch(reqRedeemAction({ token: user.token, id:'822165520' }));
  }  
   
  return (
    <Layout>
      <Header title="" />
      <Hero src='/static/images/placeholders/Pizza_Hero.jpg'></Hero>
      
      <div className="wrapper__margins">
       
        <Button green className="Section__cta" onClick={redeemPoints}>
          Redeem Points 
        </Button>
      </div>
       
    </Layout>
  );
};

Home.getInitialProps = async ({ query, res }) => {
  return { query };
};

export default Home;

