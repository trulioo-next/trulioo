import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ContentLeft } from './content-left';
import { ContentRight } from './content-right';
import { ContentCenter } from './content-center';

export const SectionImageList = ({ component, parallax }) => {
  switch (component.position) {
    case 'right':
      return <ContentRight component={component} parallax={parallax} />;
    case 'left':
      return <ContentLeft component={component} parallax={parallax} />;
    case 'center':
      return <ContentCenter component={component} />;
    default:
      return <ContentLeft component={component} parallax={parallax} />;
  }
};

SectionImageList.propTypes = {
  component: PropTypes.object,
  parallax: PropTypes.bool,
};
