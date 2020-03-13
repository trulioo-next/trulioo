import React, { useEffect, useState } from 'react';

import Section from './SectionNewsletter';

const SectionNewsletter = props => {
  // console.log('SectionNewsletter  PROPS :: ', props);

  return <Section data={props} />;
};

SectionNewsletter.defaultProps = {};

export default SectionNewsletter;
