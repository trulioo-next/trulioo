import React, { useEffect, useState } from 'react';
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
  const user = useSelector(state => userDataSelector(state));
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

  const redeemPoints = (code) => {
    // 822165536
    // 822165472
    // 822165520
    // 7589290752
    // 7360138342
    dispatch(reqRedeemAction({ token: user.token, id:7589290752 }));
  } 

  //
  const verifySMS = () => {
    dispatch(reqSMSAction({ token: user.token, mobileNumber:phone }));
  }  

  const verifySMSWithCode = () => {
    dispatch(reqSMSAction({ token: user.token, mobileNumber:phone, code:code }));
  } 

  //
  function updateCode(e) {
    setCode( e.target.value )
  }

  //
  function updatePhone(e) {
    setPhone( e.target.value )
  }


  let redeemError = user && user.redeem && user.redeem.error ? user.redeem.error.payload.error_description : false;
  let smsError = user && user.sms && user.sms.error ? user.sms.error.payload.error_description : false;
  let smsSuccess = user && user.sms && user.sms.success ? user.sms.success : false;

  let redeemSuccessPoints = user && user.redeem && user.redeem.rewards_points ? user.redeem.rewards_points : false;
   
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
      
        <div>
        { redeemSuccessPoints && 
          <h2>Points : {redeemSuccessPoints}</h2>
        }
        </div>
        
        <div>
          { redeemSuccessPoints &&

            user.redeem.member_rewards.map((item, key) => (
                <div>
                  <h5>{item.title}</h5>
                  <p>{item.tier_label}</p>
                  <p>{item.description}</p>
                </div>
            ))

           }

          </div>

       

        { redeemError && 

          <p className="error__message">{ redeemError }</p>
        }
        </Col>
        <Col>
        
         <form className="form__test">
          <input id="mobile_phone" type="number" value={phone} placeholder="Enter Mobile Phone" onChange={ (e) => updatePhone(e) }/>
        </form>

        <Button green className="Section__cta" onClick={verifySMS}>
          Get Code
        </Button>
        <form className="form__test" > 
          <input id="sms_code" type="text" value={code} placeholder="Enter Code Here" onChange={ (e) => updateCode(e) }/>
        </form>

        <Button green className="Section__cta" onClick={verifySMSWithCode}>
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

