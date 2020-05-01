import React, { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RewardItem from '@/components/7rewards/RewardItem';
import Button from '@/components/Button';

const MyRewards = ({ data, setTab }) => {
  const rewards = data.rewards;

  // TODO: Populate redeemed rewards into wallet.
  const wallet = [];

  return (
    <section className="MyRewards">
      <header className="MyRewards__header">
        <Container>
          <Row className="bg-gray text-white align-items-center justify-content-between p-4">
            <Col xs="auto">
              <h2 className="h4 m-0">My Rewards</h2>
            </Col>
            <Col xs="auto" className="text-center">
              <span className="h3 m-0">{rewards.rewards_points}</span>
              <span className="d-block">Points Remaining</span>
            </Col>
          </Row>
          <Row className="bg-dark text-white align-items-center justify-content-between p-4">
            <Col xs="auto">
              <span className="d-block h4 m-0">
                {rewards.rewards_loaded} Rewards Ready
              </span>
            </Col>
          </Row>
        </Container>
      </header>
      <div className="MyWallet MyRewards__myWallet p-5">
        {rewards.rewards_loaded > 0 && wallet ? (
          <ul className="RewardList list-unstyled">
            {wallet.map((item, index) => (
              <RewardItem key={index} data={item} />
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <p>Rewards are waiting for you.</p>
            <Button
              type="button"
              onClick={() => setTab('sevenrewards-reward-menu')}
            >
              + Add Items
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyRewards;
