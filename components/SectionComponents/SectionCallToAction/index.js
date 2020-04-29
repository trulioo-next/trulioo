import React, { useEffect, useState } from 'react';

import {SectionCallToAction as Section} from './SectionCallToAction';

const SectionCallToAction = props => {
  // console.log('CALL TO ACTION PROPS :: ', props);

  return (
    <Section params={props.settings} media={props.media} content={props.body} />
  );
};

SectionCallToAction.defaultProps = {};

export default SectionCallToAction;
