import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '@/containers/Layout/Layout';
import Header from '@/components/Header';
import Error from 'next/error';
import { reqRedeemAction, reqSMSAction } from '@/stores/user/actions';
import { userDataSelector } from '@/stores/user/selectors';
import Hero from '@/components/Hero';
import Button from '@/components/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    // 822165536
    // 822165472
    // 822165520
    // 7589290752
    // 7360138342
    dispatch(reqRedeemAction({ token: user.token, id:73601 }));
  } 

  //
  const verifySMS = (code) => {
    dispatch(reqSMSAction({ token: user.token, mobileNumber:4166716261 }));
  }  

  let redeemError = user && user.redeem && user.redeem.error ? user.redeem.error.payload.error_description : false;
  let smsError = user && user.sms && user.sms.error ? user.sms.error.payload.error_description : false;
  let smsSuccess = user && user.sms && user.sms.success ? user.sms.success : false;
   
  return (
    <Layout>
      <Header title="" />
      <Hero src='/static/images/placeholders/Pizza_Hero.jpg'></Hero>
      
      <div className="wrapper__margins">
       
       <Container>

        <Row>
            <Col className="rewards-wrapper">
        <Button green className="Section__cta" onClick={redeemPoints}>
          Redeem Points 
        </Button>

        { redeemError && 

          <p className="error__message">{ redeemError }</p>
        }
        </Col>
        <Col>

         <Button green className="Section__cta" onClick={verifySMS}>
          Verify SMS
        </Button>

        { smsSuccess && 
          <p className="error__message">{ smsSuccess }</p>
        }

        { smsError && 

          <p className="error__message">{ smsError }</p>
        }
        </Col>
        </Row>
        </Container>

      </div>
       
    </Layout>
  );
};

Home.getInitialProps = async ({ query, res }) => {
  return { query };
};

export default Home;

