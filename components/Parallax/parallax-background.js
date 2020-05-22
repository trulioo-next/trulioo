import React, { Fragment, useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import classnames from 'classnames';
import { useInView } from 'react-intersection-observer';

export const ParallaxBackground = ({ className, background, mobileBackground, circle, foreground, mobileForeground, loaded, setLoaded }) => {
 

 const [ isWindow, setIsWindow ] = useState(false);
 const [ windowInnerWidth, setWindowInnerWidth] = useState(0);
 const [ windowInnerHeight, setWindowInnerHeight] = useState(0);
 const [ bgLoaded, setBgLoaded] = useState(false);
  
  if (process.browser && !bgLoaded ) {
    setIsWindow(true)
    setWindowInnerWidth(window.innerWidth);
    setWindowInnerHeight(window.innerHeight);
    setBgLoaded(true)
  }
 
  const [ imageLoaded, setImageLoaded ] = useState(0);
  const breakpoint = 992;
  const containerRef = useRef();
  const [ inViewRef, inView ] = useInView({
    threshold: 0,
  });

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      containerRef.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [ inViewRef ],
  );

  const scrollProgress = useMotionValue(-1);
  const outputRange = {
    start: -windowInnerHeight + (windowInnerHeight * 0.1),
    end: windowInnerHeight - (windowInnerHeight * 0.1)
  };

  const circleRef = useRef(null);
  const [ circleOrigin, setCircleOrigin ] = useState({ x: 0, y: 0 });
  const [ circleSize, setCircleSize ] = useState(windowInnerHeight * 1.1);
  const [ rotation, setRotation ] = useState({ rotateX: 0, rotateY: 0 });

  var counter = 0;
  var updateRate = 10;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(windowInnerWidth);
    };
    
    if (process.browser) {
      window.addEventListener('resize', handleResize);
      return () => { window.removeEventListener('resize', handleResize); };
    }
  });

  useEffect(() => {
    if (process.browser) {
    const cachedContainer = containerRef.current;

    const updateScroll = () => {
      if (inView && cachedContainer) {
        const containerBounds = cachedContainer.getBoundingClientRect();
        const scrollRatio = -(containerBounds.y) / window.innerHeight;
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
    }
  }, [ containerRef, inView, inViewRef, scrollProgress ]);

  const bgTransformY = useTransform(
    scrollProgress,
    [ -1, 1 ],
    [ outputRange.start, outputRange.end ],
  );

  const initialY = windowInnerWidth > breakpoint ? outputRange.start : 0,
    backgroundY = windowInnerWidth > breakpoint ? bgTransformY : 0;

  useEffect(() => {
    if (!circleRef.current && circleRef.current === null) return;

    const cachedCircle = circleRef.current;

    const updateCircle = () => {
      if (cachedCircle) {
        setCircleOrigin({
          x: cachedCircle.offsetLeft + Math.floor(cachedCircle.offsetWidth / 2),
          y: cachedCircle.offsetTop + Math.floor(cachedCircle.offsetHeight / 2),
        });

        setCircleSize(cachedCircle.offsetWidth || cachedCircle.offsetHeight);
      }
    };

    updateCircle();
    if (process.browser) {
      window.addEventListener('resize', updateCircle);
      return () => window.removeEventListener('resize', updateCircle);
    }
  }, [ circleRef ]);

  const updateRotation = (event) => {
    var e = event || window.event;

    const relativePosition = {
      x: e.clientX - circleOrigin.x,
      y: e.clientY - circleOrigin.y
    };

    setRotation({
      rotateX: `${ (relativePosition.y / circleSize / 2 * 35).toFixed(2) }deg`,
      rotateY: `${ (relativePosition.x / circleSize / 2 * 31.5).toFixed(2) }deg`
    });
  };

  const circleRotation = windowInnerWidth > breakpoint ? rotation : { rotateX: 0, rotateY: 0 };

  let backgroundImage = background;
  let foregroundImage = foreground || false;

  if (mobileBackground && mobileForeground) {
    backgroundImage = windowInnerWidth < 768 ? mobileBackground : background;
    foregroundImage = windowInnerWidth < 768 ? mobileForeground : foreground;
  } else if (mobileBackground && !foreground) {
    backgroundImage = windowInnerWidth < 768 ? mobileBackground : background;
  }

  return (
    <div ref={ setRefs } className="parallax-bg-container">
      <motion.div
        className={ classnames('parallax-bg', className) }
        initial={ { opacity: 0, translateY: initialY } }
        animate={ { opacity: loaded ? 1 : imageLoaded } }
        style={ { translateY: backgroundY } }
        onMouseMove={ event => {
          counter++;

          if (counter % updateRate === 0) {
            updateRotation(event);
          }
        } }
      >
        { foreground && (
          <Fragment>
            <img
              className="parallax-bg-foreground"
              src={ foregroundImage.url || foregroundImage }
              width={ foregroundImage.width }
              height={ foregroundImage.height }
            />
            <motion.div
              className="parallax-bg-circle"
              initial={ { translateY: 50 } }
              animate={ { translateY: 0, scale: [ 1, 1.025, 1 ], ...circleRotation } }
              style={ { color: circle, translateZ: '-110vh' } }
              ref={ circleRef }
              transition={ {
                type: 'spring',
                damping: 100,
                stiffness: 100,
                duration: 7,
                loop: Infinity,
              } }
            />
          </Fragment>
        )}
        <img
          className="parallax-bg-image"
          src={ backgroundImage.url || backgroundImage }
          width={ backgroundImage.width }
          height={ backgroundImage.height }
          onLoad={ () => {
            if (setLoaded) {
              setLoaded(true);
            } else {
              setImageLoaded(1);
            }
          } }
        />
      </motion.div>
    </div>
  );
};

ParallaxBackground.propTypes = {
  className: PropTypes.string,
  background: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  mobileBackground: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  circle: PropTypes.string,
  foreground: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  mobileForeground: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  loaded: PropTypes.bool,
  setLoaded: PropTypes.func,
};
