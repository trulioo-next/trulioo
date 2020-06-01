import React, { useRef, useState, useEffect } from 'react';

export const CustomCursor = () => {
  const ref = useRef();
  const [ position, setPosition ] = useState({ top: window.event ? window.event.clientX : 0, left: window.event ? window.event.clientY : 0 });

  useEffect(() => {
    const updateCursor = (event) => {
      setPosition({ left: event.clientX, top: event.clientY });

      if (event.target && (event.target.tagName.toLowerCase() === 'a' || event.target.tagName.toLowerCase() === 'button'
        || (event.target.parentElement && event.target.parentElement.tagName.toLowerCase() === 'a'))) {
        ref.current.classList.add('grow');
      } else {
        ref.current.classList.remove('grow');
      }

    };

    document.body.classList.add('custom-cursor-enabled');

    window.addEventListener('mousemove', updateCursor);
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  return (
    <div className="custom-cursor"
      ref={ ref }
      style={ {
        top: position.top,
        left: position.left,
      } }
    />
  );
};
