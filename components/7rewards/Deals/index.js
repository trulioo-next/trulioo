import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Deals = props => {
  // TODO: Build out Deals section.

  return (
    <Container>
      <Row>
        <Col>
          <h3>
            Showing Deals at:
            <small>3200 HACKBERRY RD. Irving, TX 75063</small>
          </h3>
        </Col>
        <Col>
          <button type="button">Change</button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Recommended for You</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Categories</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Deals;
