import React, { useState } from 'react';
import { sound } from '../utils/audio';

export default function Header() {
  const [bagCount, setBagCount] = useState(0);

  const scrollTo = (id) => {
    sound.playPop(520);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBagClick = () => {
    sound.playSparkle();
    setBagCount((prev) => prev + 1);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#fcd5df',
        padding: '14px 20px 12px 20px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1080px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {/* Center Logo: "happy birthday" (Chubby lowercase retro typography) */}
        <div style={{ textAlign: 'center' }}>
          <span
            onClick={() => scrollTo('section-hero')}
            style={{
              fontFamily: "'Fredoka', 'DynaPuff', sans-serif",
              fontSize: 'clamp(26px, 4.5vw, 36px)',
              fontWeight: 700,
              color: '#70091d',
              letterSpacing: '-0.03em',
              display: 'inline-block',
              cursor: 'pointer',
              lineHeight: 1,
              userSelect: 'none'
            }}
          >
            happy birthday
          </span>
        </div>

        {/* Cute Drawstring Candy Pouch Icon with 0 Counter on the right */}
        <div
          onClick={handleBagClick}
          title="Candy Bag: Tap to collect sweet treats!"
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <svg
            width="22"
            height="24"
            viewBox="0 0 24 26"
            fill="none"
            stroke="#70091d"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Tied ruffled pouch top */}
            <path d="M8 5 C 9 3, 11 3, 12 4.5 C 13 3, 15 3, 16 5" />
            {/* Drawstring loop & dangling ties */}
            <path d="M7 8 Q 12 9.5 17 8" />
            <path d="M12 8.5 L 10 12" />
            <path d="M12 8.5 L 14 11.5" />
            {/* Sack body */}
            <path d="M7 8 C 4 10.5, 3.5 19, 6.5 22 C 8.5 24, 15.5 24, 17.5 22 C 20.5 19, 20 10.5, 17 8 Z" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '13px',
              color: '#70091d',
              lineHeight: 1
            }}
          >
            {bagCount}
          </span>
        </div>
      </div>

      {/* Downward Scalloped Awning Edge across 100% width */}
      <svg
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          height: '14px',
          display: 'block',
          pointerEvents: 'none',
          zIndex: 100
        }}
      >
        <defs>
          <pattern
            id="navbar-scallop-pattern"
            x="0"
            y="0"
            width="28"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            {/* Semicircular scallop curving downward from y=0 to y=14 */}
            <path
              d="M 0 0 A 14 14 0 0 1 28 0 Z"
              fill="#fcd5df"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="14" fill="url(#navbar-scallop-pattern)" />
      </svg>
    </header>
  );
}
