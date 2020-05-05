import React, { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import SevenRewards from '@/containers/SevenRewards';

import EarnPoints from './EarnPoints';
import WaysToGet from './WaysToGet';
import HowToRedeem from './HowToRedeem';

import './Landing.scss';

export const Landing = props => {
  return (
    <SevenRewards>
      <div className="Landing SevenRewards__landing">
        <Container>
          <EarnPoints />
          <WaysToGet />
          <HowToRedeem />
        </Container>
      </div>
    </SevenRewards>
  );
};

export default Landing;
