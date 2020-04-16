import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ as, href, className, children, outlined, ...props }) => {
  let ButtonClasses = classNames(
    'Button',
    { '-outlined': outlined },
    className,
  );

  if (href) {
    if (!as) {
      return (
        <Link href={href}>
          <a className={ButtonClasses}>{children}</a>
        </Link>
      );
    }

    return (
      <a {...props} className={ButtonClasses}>
        {children}
      </a>
    );
  }

  return (
    <button {...props} className={ButtonClasses}>
      {children}
    </button>
  );
};

Button.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  outlined: PropTypes.bool,
};

export default Button;
