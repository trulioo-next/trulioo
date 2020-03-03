import React from 'react';
import Link from 'next/link';

import './Button.scss';

const Button = props => {
  if (props.href) {
    if (props.as) {
      return (
        <Link as={props.as} href={props.href}>
          <a className="Button">{props.children}</a>
        </Link>
      );
    }

    return <a {...props} className="Button" />;
  }

  return <button {...props} className="Button" />;
};

export default Button;
