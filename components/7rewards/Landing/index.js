import React, { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Hero from '@/components/Hero';

import SevenRewardsLogo from '@/static/images/7rewards/7-rewards-logo.svg';

import EarnPoints from './EarnPoints';
import WaysToGet from './WaysToGet';
import HowToRedeem from './HowToRedeem';

import './Landing.scss';

export const Landing = props => {
  return (
    <div className="Landing SevenRewards__landing">
      <Container>
        <Row className="justify-content-center py-lg-4">
          <Col xs="6" md="3">
            <SevenRewardsLogo className="my-5" />
          </Col>
        </Row>
      </Container>
      <Hero className="pt-md-5" bgColor="#000">
        <Hero.Title
          className="mt-4"
          title="Get 7Rewards Rich Quick"
          color="#fff"
        />
      </Hero>
      <Container>
        <EarnPoints />
        <WaysToGet />
        <HowToRedeem />
      </Container>
    </div>
  );
};

export default Landing;
