import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HowToRedeem = () => (
  <section className="Section">
    <Container className="Section__container">
      <Row className="justify-content-center">
        <Col xs="12" md="10" lg="9" className="col">
          <Row className="text-center my-md-5">
            <Col>
              <h2 className="Landing__heading">How To Redeem</h2>
            </Col>
          </Row>
          <Row className="my-md-5 justify-content-center">
            <Col className="w-100" classNAme="col">
              <ol className="Landing__steps lead mb-5">
                <li>Sign in to 7Rewards.ca or the 7-Eleven app</li>
                <li>Click “Choose reward” button</li>
                <li>Select your reward</li>
                <li>Click “redeem” button</li>
                <li>Scan your customer barcode at checkout</li>
              </ol>
            </Col>
            <Col xs="12" md="4" className="col">
              <img src="/static/images/7rewards/how-to-redeem.gif" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

export default HowToRedeem;
