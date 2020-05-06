import React from 'react';
import Link from 'next/link';

import Button from '@/components/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Intro = () => (
  <Row className="justify-content-center text-center mt-md-5">
    <Col xs="12" md="9" lg="8" className="col">
      <h2 className="Landing__heading mb-5">
        Earn Points on Everyday Purchases
      </h2>
      <p className="lead">
        Drink and snack to the max with more points for your purchases at
        7&#8209;Eleven.
      </p>
    </Col>
  </Row>
);

const EarnPointsColumns = () => (
  <Row className="justify-content-center mt-5 pt-md-4">
    <Col xs="12" md="10" className="col">
      <Row className="text-center text-md-left text-lg-center">
        <Col xs="12" md="12" lg="4" className="col mb-5">
          <Row className="justify-content-center">
            <Col xs="12" md="4" lg="9" className="col">
              <img src="/static/images/7rewards/join-rewards.png" />
            </Col>
            <Col xs="12" md="8" lg="11" className="col">
              <h3 className="Landing__colHeading mt-5 mb-5">Join Rewards</h3>
              <p className="lead">
                Download the app or register. It's free, easy, and fast.
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs="12" md="12" lg="4" className="col mb-5">
          <Row className="justify-content-center">
            <Col xs="12" md="4" lg="9" className="px-md-4">
              <img src="/static/images/7rewards/earn-points.png" />
            </Col>
            <Col xs="12" md="8" lg="11" className="col">
              <h3 className="Landing__colHeading mt-5">Earn Points</h3>
              <p className="lead">
                Scan the 7-Eleven app or barcode in store with each purchase.
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs="12" md="12" lg="4" className="col mb-5">
          <Row className="justify-content-center">
            <Col xs="12" md="4" lg="9" className="col">
              <img src="/static/images/7rewards/roll-in-rewards.png" />
            </Col>
            <Col xs="12" md="8" lg="11" className="col">
              <h3 className="Landing__colHeading mt-5">Roll In Rewards</h3>
              <p className="lead">
                Redeem your points for a ton of tasty goodness.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center text-center mt-5 pt-md-4">
        <Col xs="12" lg="4" className="col mb-5">
          <Button className="Landing__button" href="/7rewards/register">
            Join 7Rewards
          </Button>
          <Link href="/7rewards/signin">
            <a className="d-block mt-4">Already a member? Sign in.</a>
          </Link>
        </Col>
      </Row>
    </Col>
  </Row>
);

const EarnPointsTiles = () => (
  <Row className="justify-content-center">
    <Col xs="12" md="8" lg="10" className="col">
      <Row className="align-items-stretch justify-content-center mt-5 py-lg-5">
        <Col xs="12" lg="6" className="d-flex col">
          <div className="Landing__tile">
            <div className="Landing__tileImage">
              <img src="/static/images/7rewards/earn-bonus-points-fast.png" />
            </div>
            <h3 className="h2">Earn Bonus Points Fast</h3>
            <p className="lead">
              Earn faster with extra points when you buy select snacks, drinks,
              and other items in store.
            </p>
          </div>
        </Col>
        <Col xs="12" lg="6" className="d-flex col">
          <div className="Landing__tile">
            <div className="Landing__tileImage">
              <img src="/static/images/7rewards/7th-cup-always-free.png" />
            </div>
            <h3 className="h2">7th Cup Always Free</h3>
            <p className="lead">
              Keep scanning and keep sipping, because when you buy six
              qualifying cups you&apos;ll get the 7th cup free.
            </p>
          </div>
        </Col>
      </Row>
    </Col>
  </Row>
);

const EarnPoints = () => (
  <section className="Section">
    <Container className="Section__container">
      <Intro />
      <EarnPointsColumns />
    </Container>
  </section>
);

export default EarnPoints;
