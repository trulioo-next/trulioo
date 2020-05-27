import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import classnames from 'classnames';
import { useInView } from 'react-intersection-observer';

export const ParallaxVideo = ({ className, video }) => {
  const [isWindow, setIsWindow] = useState(false);
  const [windowInnerWidth, setWindowInnerWidth] = useState(0);
  const [windowInnerHeight, setWindowInnerHeight] = useState(0);
  const [bgLoaded, setBgLoaded] = useState(false);

  if (process.browser && !bgLoaded) {
    setIsWindow(true);
    setWindowInnerWidth(window.innerWidth);
    setWindowInnerHeight(window.innerHeight);
    setBgLoaded(true);
  }

  const breakpoint = 992;

  const containerRef = useRef();
  const [inViewRef, inView] = useInView({
    threshold: 0,
  });
  const scrollProgress = useMotionValue(-1);
  const outputRange = {
    start: windowInnerHeight + windowInnerHeight * 0.1,
    end: windowInnerHeight - windowInnerHeight * 0.1,
  };

  const setRefs = useCallback(
    node => {
      // Ref's from useRef needs to have the node assigned to `current`
      containerRef.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef],
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowInnerWidth(windowInnerWidth);
    };

    if (process.browser) {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  });

  useEffect(() => {
    const cachedContainer = containerRef.current;

    const updateScroll = () => {
      if (inView && cachedContainer) {
        const containerBounds = cachedContainer.getBoundingClientRect();
        const scrollRatio = -containerBounds.y / window.innerHeight;
        scrollProgress.set(scrollRatio);
      }
    };

    updateScroll();
    window.addEventListener('resize', updateScroll);
    window.addEventListener('scroll', updateScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateScroll);
      window.removeEventListener('scroll', updateScroll);
    };
  }, [containerRef, inView, inViewRef, scrollProgress]);

  const bgTransformY = useTransform(
    scrollProgress,
    [-1, 1],
    [outputRange.start, outputRange.end],
  );

  const initialY = windowInnerWidth > breakpoint ? outputRange.start : 0,
    backgroundY = windowInnerWidth > breakpoint ? bgTransformY : 0,
    bgScale = windowInnerWidth > breakpoint ? 0.833 : 1;

  const circles = [
    {
      animate: {
        translateY: ['10%', '-10%'],
      },
    },
    {
      animate: {
        translateY: ['0%', '15%'],
      },
    },
    {
      animate: {
        scale: [1.05, 1.1, 1.05, 1],
      },
    },
    {
      animate: {
        translateY: ['0%', '10%'],
      },
    },
    {
      animate: {
        scale: [1, 1.125],
      },
    },
  ];

  return (
    <div ref={setRefs} className="parallax-bg-container type-video">
      <motion.div
        className={classnames('parallax-bg', className)}
        initial={{ translateY: initialY }}
        style={{ translateY: backgroundY, scale: bgScale }}
      >
        <motion.div
          className="parallax-circles"
          transition={{ staggerChildren: 0.2 }}
        >
          {circles &&
            circles.map((circle, key) => (
              <motion.div
                key={key}
                className="parallax-circle"
                transition={{
                  ease: 'easeInOut',
                  duration: 5,
                  flip: Infinity,
                }}
                {...circle}
              />
            ))}
        </motion.div>
        <motion.div
          className="parallax-video"
          animate={{
            scale: [1, 1.025],
          }}
          transition={{
            ease: 'easeInOut',
            duration: 7.5,
            flip: Infinity,
          }}
        >
          <video width="100%" height="100%" autoPlay muted loop>
            <source src={video} />
          </video>
        </motion.div>
      </motion.div>
    </div>
  );
};

ParallaxVideo.propTypes = {
  className: PropTypes.string,
  video: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
