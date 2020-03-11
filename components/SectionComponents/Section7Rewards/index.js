import React, { useEffect, useState } from 'react';

import Section from './Section7Rewards';

const Section7Rewards = props => {
  console.log('Section7Rewards  PROPS :: ', props);

  return <Section data={props} />;
};

Section7Rewards.defaultProps = {};

export default Section7Rewards;
