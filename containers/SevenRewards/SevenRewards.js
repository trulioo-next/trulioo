import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './SevenRewards.scss';

const SevenRewards = props => {
  return (
    <div className="SevenRewards">
      <Container>
        <Row className="my-5">
          <Col className="text-center">
            <img
              className="SevenRewards__logo"
              src="/static/images/7rewards/7Rewards-logo.png"
              alt="7Rewards"
            />
          </Col>
        </Row>
      </Container>
      {props.children}
    </div>
  );
};

export default SevenRewards;
