import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { ContentLeft } from './content-left';
import { ContentRight } from './content-right';

export const OnPageSection = ({ component }) => {
  const componentSections = (component) => {
    switch (component.position) {
      case 'right':
        return <ContentRight component={ component } />;
      case 'left':
        return <ContentLeft component={ component } />;
      default:
        return <ContentLeft component={ component } />;
    }
  };
  return (
    <Fragment>
      {component && componentSections(component)}
    </Fragment>
  );
};

OnPageSection.propTypes = {
  component: PropTypes.object,
};
