import React, { useEffect, useState } from 'react';

import Section from './SectionGiftCardBalance';

const SectionGiftCardBalance = props => {
  console.log('SectionGiftCardBalance :: ', props);

  return (
    <Section params={props.settings} media={props.media} content={props.body} modalData={props} />
  );
};

SectionGiftCardBalance.defaultProps = {};

export default SectionGiftCardBalance;
