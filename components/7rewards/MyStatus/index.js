import React, { useState } from 'react';

import './MyStatus.scss';

import Slider from 'react-slick';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyStatus = ({ data }) => {
  const [activePunchCard, setActivePunchCard] = useState(0);

  // TODO: Get points graph in.

  const sliderSettings = {
    className: 'PunchCard__slider',
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    centerPadding: '33%',
    afterChange: newIndex => setActivePunchCard(newIndex),
  };

  return (
    <aside className="MyStatus">
      <Row className="align-items-center mx-md-n4">
        <Col xs="12" md="6" lg="12" className="px-md-4">
          <div className="RewardGraph MyStatus__rewardGraph"></div>
        </Col>
        <Col xs="12" md="6" lg="12" className="px-md-4 px-lg-0">
          <div className="PunchCard MyStatus__punchCard">
            <span className="PunchCard__heading text-center">
              {data.punch_cards[activePunchCard].title}
            </span>
            <Slider {...sliderSettings}>
              {data.punch_cards.map((punchCard, index) => (
                <div key={index} className="PunchCard__card px-2">
                  <img src={punchCard.web_image} className="PunchCard__stamp" />
                </div>
              ))}
            </Slider>
          </div>
        </Col>
      </Row>
    </aside>
  );
};

export default MyStatus;
