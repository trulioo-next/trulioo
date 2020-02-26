import React from "react";
import Link from "next/link";

import "./Button.scss";

const Button = props => {
  if (props.href) {
    if (props.as) {
      return (
        <Link as={props.as} href={props.href}>
          <a className="button">{props.children}</a>
        </Link>
      );
    }

    return <a {...props} className="button" />;
  }

  return <button {...props} className="button" />;
};

export default Button;
