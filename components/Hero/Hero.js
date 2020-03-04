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

const Caption = ({ className, children }) => (
  <div className={classNames(className, 'Hero__caption')}>{children}</div>
);

const Hero = ({ src, className, children }) => (
  <section
    className={classNames(className, 'Hero')}
    style={{ backgroundImage: `url('${src}')` }}
  >
    <img className="Hero__image" src={src} />
    <div className="container Hero__container">
      <div className="row">
        <div className="col text-center">{children}</div>
      </div>
    </div>
  </section>
);

Hero.propTypes = {
  src: PropTypes.string,
};
Hero.Title = Title;
Hero.Caption = Caption;

export default Hero;
