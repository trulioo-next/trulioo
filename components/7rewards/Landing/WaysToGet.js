import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WaysToGet = () => (
  <section className="Section">
    <Container className="Section__container">
      <Row className="justify-content-center text-center my-lg-5">
        <Col xs="12" md="9" lg="8" className="col">
          <h2 className="Landing__heading">Ways To Get 7Rewards Rich Quick</h2>
          <p className="lead">
            Scan the barcode on your Rewards card, mobile web account, 7-Eleven
            app or enter your phone number in store after each purchase at
            7-Eleven.
          </p>
          <img src="/static/images/7rewards/ways-to-7rewards.gif" />
        </Col>
      </Row>
    </Container>
  </section>
);

export default WaysToGet;
