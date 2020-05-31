import React from 'react';
import PropTypes from 'prop-types';

import { ContentLeft } from './content-left';
import { ContentRight } from './content-right';

export const SectionVideoBg = ({ component }) => {
  switch (component.position) {
    case 'right':
      return <ContentRight component={component} />;
    case 'left':
      return <ContentLeft component={component} />;
    default:
      return <ContentLeft component={component} />;
  }
};

SectionVideoBg.propTypes = {
  component: PropTypes.object,
};
