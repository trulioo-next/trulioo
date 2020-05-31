import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from 'framer-motion';

import { useMediaQuery } from 'react-responsive';

export const ParallaxContent = ({
  children,
  topOffset = 83,
  bottomOffset = 83,
  range = 60,
}) => {
  const { scrollY } = useViewportScroll();
  const ref = useRef();
  const [minHeight, setMinHeight] = useState('auto');
  const [triggerRange, setTriggerRange] = useState({ start: 0, end: 0 });

  const mediaLgUp = useMediaQuery({ minWidth: 992 });

  useEffect(() => {
    if (!ref.current) return;

    const onResize = () => {
      if (ref.current) {
        setMinHeight(ref.current.offsetHeight + range);
        setTriggerRange({
          start: ref.current.getBoundingClientRect().top - topOffset,
          end: ref.current.getBoundingClientRect().top + bottomOffset,
        });
      }
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [
    ref,
    range,
    topOffset,
    bottomOffset,
    triggerRange.start,
    triggerRange.end,
  ]);

  const bounceY = useSpring(
    useTransform(scrollY, [triggerRange.start, triggerRange.end], [0, range]),
    {
      damping: 100,
      stiffness: 100,
      mass: Math.floor(Math.random() * 3),
    },
  );

  return mediaLgUp ? (
    <div className="parallax-content" style={{ minHeight }}>
      <motion.div
        ref={ref}
        initial={{ translateY: 0 }}
        style={{ translateY: bounceY }}
      >
        {children}
      </motion.div>
    </div>
  ) : (
    <div className="section-content">{children}</div>
  );
};

ParallaxContent.propTypes = {
  children: PropTypes.node,
  topOffset: PropTypes.number,
  bottomOffset: PropTypes.number,
  range: PropTypes.number,
};
