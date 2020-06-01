import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ParallaxBackground } from '../Parallax';
import { useMediaQuery } from 'react-responsive';

export const SectionBackground = ({ background }) => {
  const mediaMdUp = useMediaQuery({ minWidth: 768 });

  return mediaMdUp ? <ParallaxBackground background={background} /> : null;
};

SectionBackground.propTypes = {
  background: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
