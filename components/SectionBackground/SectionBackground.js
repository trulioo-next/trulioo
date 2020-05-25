import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ParallaxBackground } from '../Parallax';

export const SectionBackground = ({ background }) => {
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const breakpoint = 768;

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
      return () => { window.removeEventListener('resize', handleResize); };
    });
  
    return windowWidth > breakpoint ? (
       <ParallaxBackground background={ background } />
    ) :
    null;
};


SectionBackground.propTypes = {
    background: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ])
};
  