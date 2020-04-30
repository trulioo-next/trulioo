import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HowToRedeem = () => (
  <section className="p-5">
    <Row className="justify-content-center">
      <Col xs="12" md="10" lg="9">
        <Row className="text-center my-md-5">
          <Col>
            <h2 className="Landing__heading">How To Redeem</h2>
          </Col>
        </Row>
        <Row className="my-md-5 justify-content-center">
          <Col className="w-100">
            <ol className="Landing__steps lead mb-5">
              <li>Sign in to 7Rewards.ca or your 7-Eleven app</li>
              <li>Select your FREE food or drink from the Rewards Menu</li>
              <li>
                Get your reward item in-store by scanning the barcode on your
                card, app or online… or use the phone number associated with
                your account
              </li>
              <li>Your reward will be automatically applied</li>
            </ol>
          </Col>
          <Col xs="12" md="4">
            <img src="/static/images/7rewards/how-to-redeem.gif" />
          </Col>
        </Row>
      </Col>
    </Row>
  </section>
);

export default HowToRedeem;
