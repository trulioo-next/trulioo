import React, { useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import RewardMenu from '@/components/7rewards/RewardMenu';
import Deals from '@/components/7rewards/Deals';
import MyRewards from '@/components/7rewards/MyRewards';

import './RewardsTabs.scss';

const RewardsTabs = ({ data }) => {
  const [tab, setTab] = useState('sevenrewards-reward-menu');

  return (
    <section className="RewardsTabs SevenRewards__Tabs">
      <Tab.Container id="rewards-tab" activeKey={tab} onSelect={k => setTab(k)}>
        <Nav
          fill
          justify
          variant="tabs"
          defaultActiveKey="sevenrewards-reward-menu"
          className="RewardsTabs__nav"
        >
          <Nav.Item>
            <Nav.Link eventKey="sevenrewards-reward-menu">Reward Menu</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="sevenrewards-deals">Deals</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="sevenrewards-my-rewards">My Rewards</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="sevenrewards-reward-menu">
            <RewardMenu data={data} />
          </Tab.Pane>
          <Tab.Pane eventKey="sevenrewards-deals">
            <Deals data={data} />
          </Tab.Pane>
          <Tab.Pane eventKey="sevenrewards-my-rewards">
            <MyRewards data={data} setTab={setTab} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </section>
  );
};

export default RewardsTabs;
