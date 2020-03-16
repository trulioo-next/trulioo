import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import './Hero.scss';

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
Title.propTypes = {
  as: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

const Caption = ({ className, color, children }) => (
  <div
    className={classNames(className, 'Hero__caption')}
    style={{ color: color }}
    dangerouslySetInnerHTML={{ __html: children }}
  ></div>
);

Caption.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
};

const Hero = ({ src, bgColor, className, children }) => (
  <section
    className={classNames(className, 'Hero')}
    style={{ backgroundColor: bgColor }}
  >
    {src && <img className="Hero__image" src={src} />}
    <div
      className={classNames('container', 'Hero__container', {
        '-overlay': src,
      })}
    >
      <div className="row">
        <div className="col text-center">{children}</div>
      </div>
    </div>
  </section>
);

Hero.propTypes = {
  src: PropTypes.string,
  bgColor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
Hero.Title = Title;
Hero.Caption = Caption;

export default Hero;
