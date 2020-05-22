import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Button } from 'reactstrap';

export const FlipButton = ({ className, children, ...props }) => {
  return (
    <Button className={ classnames('flip-button', className) } { ...props }>
      <span className="btn-text">{children}</span>
      <span className="flip-text" aria-hidden>{children}</span>
    </Button>
  );
};

FlipButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
