import { useState, useEffect, useRef } from 'react';

export default function useScrollDirection() {
  const scrollPos = useRef(0);
  const ticking = useRef(false);
  const [ direction, setDirection ] = useState({
    isDown: false,
    isUp: false
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setDirection({
            isDown: window.pageYOffset > scrollPos.current,
            isUp: window.pageYOffset < scrollPos.current
          });
          scrollPos.current = window.pageYOffset;
          ticking.current = false;
        });
      }

      ticking.current = true;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return direction;
}
