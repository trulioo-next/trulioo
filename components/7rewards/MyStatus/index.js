import React, { useState } from 'react';

import './MyStatus.scss';

import Slider from 'react-slick';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RewardsGraph from './RewardsGraph';

const MyStatus = ({ data }) => {
  const [activePunchCard, setActivePunchCard] = useState(0);

  const sliderSettings = {
    className: 'PunchCard__slider',
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    centerPadding: '33%',
    afterChange: newIndex => setActivePunchCard(newIndex),
  };

  let tiers = [
    {
      tier: '1000',
      color: '#EE7102',
    },
    {
      tier: '1500',
      color: '#008062',
    },
    {
      tier: '2000',
      color: '#ED2525',
    },
    {
      tier: '2750',
      color: '#007CBA',
    },
    {
      tier: '4000',
      color: '#8C2C7E',
    },
    {
      tier: '6000',
      color: '#50488A',
    },
  ];

  return (
    <aside className="MyStatus">
      <Row className="align-items-center mx-md-n4">
        <Col xs="12" md="6" lg="12" className="px-md-4">
          <div className="RewardGraph MyStatus__rewardGraph">
            <RewardsGraph tiers={tiers} points={data.rewards_points || 0} />
          </div>
        </Col>
        <Col xs="12" md="6" lg="12" className="px-md-4 px-lg-0">
          <div className="PunchCard MyStatus__punchCard">
            <span
              className="PunchCard__heading text-center"
              dangerouslySetInnerHTML={{
                __html: data.punch_cards[activePunchCard].title.replace(
                  new RegExp(
                    `(${data.punch_cards[activePunchCard].highlight_text})`,
                  ),
                  `<strong style="color: ${data.punch_cards[activePunchCard].active_color}">$1</strong>`,
                ),
              }}
            ></span>
            <Slider {...sliderSettings}>
              {data.punch_cards.map((punchCard, index) => (
                <div key={index} className="PunchCard__card px-2">
                  <img src={punchCard.web_image} className="PunchCard__stamp" />
                </div>
              ))}
            </Slider>
            <p className="px-4 mt-4 text-center">
              Finish a punch card and earn a free item! Rules and products vary
              per punch card.
            </p>
          </div>
        </Col>
      </Row>
    </aside>
  );
};

export default MyStatus;
