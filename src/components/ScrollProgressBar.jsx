import React, { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrolled = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(Math.max(scrolled, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: 'rgba(123, 15, 36, 0.1)',
        zIndex: 99999,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          backgroundColor: '#c9182b',
          transition: 'width 0.08s ease-out',
          position: 'relative'
        }}
      >
        <span
          style={{
            position: 'absolute',
            right: '-10px',
            top: '-8px',
            fontSize: '14px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
          }}
        >
          🍒
        </span>
      </div>
    </div>
  );
}
