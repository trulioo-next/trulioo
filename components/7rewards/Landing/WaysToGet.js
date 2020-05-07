import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Landing.scss';

const WaysToGet = () => (
  <section className="Section">
    <Container className="Section__container">
      <Row className="justify-content-center text-center my-lg-5">
        <Col xs="12" md="9" lg="8" className="col">
          <h2 className="Landing__heading">Join. Earn. Get Rewarded.</h2>
          <p className="lead">
            When you join 7REWARDS you can earn points on every purchase and
            redeem those points on FREE snacks and drinks. Collect extra points
            on select bonus point items to enjoy rewards faster. Get the
            7-Eleven app and get started.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center text-center mt-4 mt-md-5">
        <Col xs="12" className="col mb-5">
          <a
            className="d-inline-block my-3 mr-md-5"
            href="https://play.google.com/store/apps/details?id=com.sei.android"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="Landing__downloadBadge"
              src="https://www.7-eleven.com/assets/img/7rewards/logged-out/cta-google-play.svg"
              alt="Get it on Google Play"
              style={{
                width: '261px',
                height: '77px',
              }}
            />
          </a>
          <a
            className="d-inline-block my-3"
            href="https://apps.apple.com/ca/app/7-eleven/id589653414"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="Landing__downloadBadge"
              src="https://www.7-eleven.com/assets/img/7rewards/logged-out/cta-app-store.svg"
              alt="Download on the App Store"
              style={{
                width: '231px',
                height: '77px',
              }}
            />
          </a>
        </Col>
      </Row>
    </Container>
  </section>
);

export default WaysToGet;
