import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  // useLayoutEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import classnames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';

export const ParallaxBackground = ({
  className,
  background,
  mobileBackground,
  circle,
  foreground,
  mobileForeground,
  loaded,
  setLoaded,
}) => {
  // window states
  const [windowInnerWidth, setWindowInnerWidth] = useState(0);
  const [windowInnerHeight, setWindowInnerHeight] = useState(0);

  // breakpoints
  const mediaLgUp = useMediaQuery({ minWidth: 992 });
  const mediaSmDown = useMediaQuery({ maxWidth: 767 });

  // refs
  const containerRef = useRef();
  const [inViewRef, inView] = useInView({
    threshold: 0,
  });

  const setRefs = useCallback(
    node => {
      // Ref's from useRef needs to have the node assigned to `current`
      containerRef.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef],
  );

  // scroll variables
  const scrollProgress = useMotionValue(-1);
  const outputRange = {
    start: -windowInnerHeight + windowInnerHeight * 0.1,
    end: windowInnerHeight - windowInnerHeight * 0.1,
  };

  // circle variables
  const circleRef = useRef(null);
  const [circleOrigin, setCircleOrigin] = useState({ x: 0, y: 0 });
  const [circleSize, setCircleSize] = useState(windowInnerHeight * 1.1);
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  var counter = 0;
  var updateRate = 10;

  // update window dimensions
  useEffect(() => {
    const handleResize = () => {
      setWindowInnerWidth(window.innerWidth);
      setWindowInnerHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // update scroll
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

  // background positions
  const bgTransformY = useTransform(
    scrollProgress,
    [-1, 1],
    [outputRange.start, outputRange.end],
  );

  const initialY = mediaLgUp ? outputRange.start : 0,
    backgroundY = mediaLgUp ? bgTransformY : 0;

  // circle sizing
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
    window.addEventListener('resize', updateCircle);
    return () => window.removeEventListener('resize', updateCircle);
  }, [circleRef]);

  const updateRotation = event => {
    var e = event || window.event;

    const relativePosition = {
      x: e.clientX - circleOrigin.x,
      y: e.clientY - circleOrigin.y,
    };

    setRotation({
      rotateX: `${((relativePosition.y / circleSize / 2) * 35).toFixed(2)}deg`,
      rotateY: `${((relativePosition.x / circleSize / 2) * 31.5).toFixed(
        2,
      )}deg`,
    });
  };

  const circleRotation = mediaLgUp ? rotation : { rotateX: 0, rotateY: 0 };

  let backgroundImage = background;
  let foregroundImage = foreground || false;

  if (mobileBackground && mobileForeground) {
    backgroundImage = mediaSmDown ? mobileBackground : background;
    foregroundImage = mediaSmDown ? mobileForeground : foreground;
  } else if (mobileBackground && !foreground) {
    backgroundImage = mediaSmDown ? mobileBackground : background;
  }

  const [fgLoaded, setFgLoaded] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    if (!setLoaded) return;

    if (foregroundImage) {
      setLoaded(fgLoaded && bgLoaded);
    } else {
      setLoaded(bgLoaded);
    }
  });

  return (
    <div ref={setRefs} className="parallax-bg-container">
      <motion.div
        className={classnames('parallax-bg', className)}
        initial={{ translateY: initialY }}
        style={{ translateY: backgroundY }}
        onMouseMove={event => {
          counter++;

          if (counter % updateRate === 0) {
            updateRotation(event);
          }
        }}
      >
        {foreground && (
          <Fragment>
            <img
              className="parallax-bg-foreground"
              src={foregroundImage.url || foregroundImage}
              width={foregroundImage.width}
              height={foregroundImage.height}
              onLoad={() => setFgLoaded(true)}
            />
            <motion.div
              className="parallax-bg-circle"
              initial={{ translateY: 50 }}
              animate={{
                translateY: 0,
                scale: [1, 1.025, 1],
                ...circleRotation,
              }}
              style={{ color: circle, translateZ: '-110vh' }}
              ref={circleRef}
              transition={{
                type: 'spring',
                damping: 100,
                stiffness: 100,
                duration: 7,
                loop: Infinity,
              }}
            />
          </Fragment>
        )}
        <img
          className="parallax-bg-image"
          src={backgroundImage.url || backgroundImage}
          width={backgroundImage.width}
          height={backgroundImage.height}
          onLoad={() => setBgLoaded(true)}
        />
      </motion.div>
    </div>
  );
};

ParallaxBackground.propTypes = {
  className: PropTypes.string,
  background: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  mobileBackground: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  circle: PropTypes.string,
  foreground: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  mobileForeground: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
