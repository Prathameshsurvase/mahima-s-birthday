import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function LoaderScreen({ onComplete, gfName, setIsMusicPlaying }) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  // Attempt automatic music playback as soon as the site opens
  useEffect(() => {
    const startAudio = () => {
      try {
        sound.init();
        if (!sound.isPlayingMusic) {
          sound.startMusicBox();
          if (setIsMusicPlaying) setIsMusicPlaying(true);
          setAudioStarted(true);
        }
      } catch (e) {
        console.log('Audio autoplay blocked by browser policy:', e);
      }
    };

    // Try autoplay immediately
    startAudio();

    // Fallback: unlock audio on the very first touch/click anywhere on screen
    const unlockOnGesture = () => {
      startAudio();
      setHasInteracted(true);
    };

    window.addEventListener('click', unlockOnGesture, { once: true });
    window.addEventListener('touchstart', unlockOnGesture, { once: true });

    return () => {
      window.removeEventListener('click', unlockOnGesture);
      window.removeEventListener('touchstart', unlockOnGesture);
    };
  }, [setIsMusicPlaying]);

  // When clicking the CTA to Enter
  const handleEnter = () => {
    sound.init();
    if (!sound.isPlayingMusic) {
      sound.startMusicBox();
      if (setIsMusicPlaying) setIsMusicPlaying(true);
    }
    sound.playSparkle();

    // Celebratory confetti burst
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#c9182b', '#7b0f24', '#ff758c', '#ffd700', '#ffffff', '#fad5df']
    });

    if (onComplete) {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: {
          duration: 0.95,
          ease: [0.76, 0, 0.24, 1] // Smooth window blind / curtain opening upward
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'radial-gradient(ellipse at 50% 35%, #fff5f7 0%, #fbe7ed 55%, #f6ced8 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(88, 8, 24, 0.45)'
      }}
    >
      {/* Decorative Vintage Ribbon Header */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 28px',
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '2px',
          color: '#7b0f24',
          textTransform: 'uppercase'
        }}
      >
        <span>🎀 SPECIAL CELEBRATION</span>
        <span>FOR {gfName ? gfName.toUpperCase() : 'MAHIMA'} 🍒</span>
      </div>

      {/* Floating Sparkles in the background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[
          { top: '15%', left: '10%', size: '20px', delay: 0 },
          { top: '22%', right: '12%', size: '24px', delay: 0.5 },
          { top: '65%', left: '8%', size: '18px', delay: 1 },
          { top: '70%', right: '10%', size: '22px', delay: 1.5 },
          { top: '40%', left: '88%', size: '16px', delay: 0.8 },
          { top: '50%', left: '5%', size: '16px', delay: 1.2 }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -14, 0],
              opacity: [0.35, 0.85, 0.35],
              scale: [0.9, 1.2, 0.9]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.8,
              delay: item.delay,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              right: item.right,
              fontSize: item.size,
              userSelect: 'none'
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Center Card Content */}
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Real Birthday Cake with Candle Glow */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -8, 0]
          }}
          transition={{
            scale: { duration: 0.7, ease: 'easeOut' },
            opacity: { duration: 0.7 },
            y: { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }
          }}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}
        >
          {/* Warm Candle Light Radial Glow behind cake */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.65, 0.95, 0.65]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              top: '15%',
              width: '260px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(255, 195, 110, 0.55) 0%, rgba(255, 130, 80, 0.22) 50%, transparent 75%)',
              borderRadius: '50%',
              filter: 'blur(16px)',
              pointerEvents: 'none'
            }}
          />

          {/* Birthday Cake Image */}
          <img
            src="./assets/images/birthday_cake_real.png"
            alt="Happy Birthday Cake"
            style={{
              width: '100%',
              maxWidth: 'min(300px, 72vw)',
              height: 'auto',
              maxHeight: '270px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 16px 28px rgba(120, 13, 33, 0.28))',
              position: 'relative',
              zIndex: 1,
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          />
        </motion.div>

        {/* Big Bold Typography: HAPPY BIRTHDAY */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(38px, 9vw, 66px)',
              fontWeight: 900,
              color: '#780d21',
              letterSpacing: '0.01em',
              lineHeight: 1.05,
              textTransform: 'uppercase',
              margin: '6px 0 2px 0',
              textShadow: '0 3px 12px rgba(120, 13, 33, 0.16)'
            }}
          >
            HAPPY BIRTHDAY
          </h1>

          <h2
            style={{
              fontFamily: 'var(--font-love)',
              fontSize: 'clamp(32px, 7.5vw, 50px)',
              fontWeight: 700,
              color: '#c9182b',
              margin: '0 0 10px 0',
              lineHeight: 1.15
            }}
          >
            {gfName || 'Mahima'} 💖✨
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 3.2vw, 16px)',
              fontWeight: 500,
              color: '#7d3e4d',
              maxWidth: '400px',
              margin: '0 auto 24px auto',
              lineHeight: 1.45
            }}
          >
            A magical birthday boutique made just for you, filled with our sweetest memories! 🍰
          </p>
        </motion.div>

        {/* CTA to Enter the Website */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 8px 24px rgba(120, 13, 33, 0.28)',
                '0 14px 36px rgba(201, 24, 43, 0.48)',
                '0 8px 24px rgba(120, 13, 33, 0.28)'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut'
            }}
            onClick={handleEnter}
            style={{
              background: 'linear-gradient(135deg, #c9182b 0%, #780d21 100%)',
              color: '#ffffff',
              border: '2px solid rgba(255, 255, 255, 0.85)',
              borderRadius: '999px',
              padding: '16px 42px',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(16px, 4vw, 19px)',
              fontWeight: 800,
              letterSpacing: '1px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              userSelect: 'none'
            }}
          >
            <span>ENTER CELEBRATION</span>
            <span>🎀</span>
          </motion.button>
        </motion.div>

        {/* Audio / Music Playing Status */}
        <motion.div
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            marginTop: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(4px)',
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid #fad5df',
            fontSize: '12px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            color: '#780d21'
          }}
        >
          <span>🎶</span>
          <span>Happy Birthday Melody Playing · Tap to Open</span>
          <span>✨</span>
        </motion.div>
      </div>

      {/* Bottom Scallop / Window Shade Edge */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '14px',
          background: 'linear-gradient(to bottom, transparent, rgba(120, 13, 33, 0.12))',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
}
