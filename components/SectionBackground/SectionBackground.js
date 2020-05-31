import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ParallaxBackground } from '../Parallax';

export const SectionBackground = ({ background }) => {
  
    const breakpoint = 768;

    const [bgLoaded, setBgLoaded] = useState(false);
    const [ windowWidth, setWindowWidth ] = useState(null);
  
    if (process.browser && !bgLoaded) {
      setWindowWidth(window.innerWidth);
      setBgLoaded(true);
    }

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
  