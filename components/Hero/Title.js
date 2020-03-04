import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  as: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

const Title = React.forwardRef(
  ({ as: Component = 'h1', title, className, color, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, 'Hero__title')}
        style={{ color: color }}
      >
        {title}
      </Component>
    );
  },
);

Title.displayName = Title;
Title.propTypes = propTypes;

export default Title;
