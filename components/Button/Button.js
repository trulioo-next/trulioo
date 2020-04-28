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
    let exnernalPath = href.split('://');
    if (exnernalPath[0] === 'https' || exnernalPath[0] === 'http') {
      return (
        <a href={href} {...props} className={ButtonClasses}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href}>
        <a className={ButtonClasses}>{children}</a>
      </Link>
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
