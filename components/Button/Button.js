import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ as, href, className, children, ...props }) => {
  if (href) {
    if (as) {
      return (
        <Link as={as} href={href}>
          <a className={classNames(className, 'Button')}>{children}</a>
        </Link>
      );
    }

    return (
      <a {...props} className={classNames(className, 'Button')}>
        {children}
      </a>
    );
  }

  return (
    <button {...props} className={classNames(className, 'Button')}>
      {children}
    </button>
  );
};

Button.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
};

export default Button;
