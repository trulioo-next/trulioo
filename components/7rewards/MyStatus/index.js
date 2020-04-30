import React from 'react';

import './MyStatus.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyStatus = ({ data }) => {
  const seventhCupPunchCard = data.punch_cards[0];

  // TODO: Get points graph in.

  return (
    <aside className="MyStatus">
      <Row>
        <Col className="w-100">
          <div className="RewardGraph MyStatus__RewardGraph"></div>
        </Col>
        <Col xs="12" md="auto" lg="12">
          <div className="MyStatus__divider" />
        </Col>
        <Col className="w-100">
          <div className="MyStatus__stampCard text-center my-4">
            <span className="StampCard__heading">
              Any 7th <span className="text-success">Cup</span> Free
            </span>
            <img
              src={`/static/images/7rewards/cup-dial/${seventhCupPunchCard.punches_earned}.svg`}
            />
          </div>
        </Col>
      </Row>
    </aside>
  );
};

export default MyStatus;
