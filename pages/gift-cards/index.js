import classNames from 'classnames';
import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

import Layout from '@/containers/Layout';
import Header from '@/components/Header';

import Hero from '@/components/Hero';
import CheckBalanceSection from './components/CheckBalance';
import FAQSection from './components/FAQ';
import Get7RewardsSection from '@/components/Get7Rewards';

class GiftCardsPage extends React.Component {
  render() {
    return (
      <Layout>
        <Header title="Gift Cards - 7-Eleven Canada" />
        <Hero src="/static/images/placeholders/GiftCards_Hero.jpg">
          <Hero.Title title="Gift Cards" color="#1B8065" />
          <Hero.Caption>
            <p>Choose from a selection of over 50 gift cards</p>
          </Hero.Caption>
        </Hero>
        <CheckBalanceSection />
        <FAQSection />
        <Get7RewardsSection />
      </Layout>
    );
  }
}

export default GiftCardsPage;
