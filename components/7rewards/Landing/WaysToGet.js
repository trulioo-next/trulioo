import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const WaysToGet = () => (
  <section className="p-5">
    <Row className="justify-content-center text-center my-lg-5">
      <Col xs="12" md="9">
        <h2 className="Landing__heading">Ways To Get 7Rewards Rich Quick</h2>
        <p className="lead">
          Scan the barcode on your Rewards card, mobile web account or 7-Eleven
          app after each purchase at 7-Eleven.
        </p>
        <img src="/static/images/7rewards/ways-to-7rewards.gif" />
      </Col>
    </Row>
  </section>
);

export default WaysToGet;
