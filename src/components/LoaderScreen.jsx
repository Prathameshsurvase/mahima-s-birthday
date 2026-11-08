import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function LoaderScreen({ onComplete, gfName }) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const phases = [
    { text: "Baking sweetest birthday memories... 🍰", emoji: "🍰" },
    { text: "Wrapping custom candies with extra love... 🍬", emoji: "🍬" },
    { text: "Tuning the nostalgic birthday music box... 🎶", emoji: "🎶" },
    { text: "Sprinkling stardust & warm hugs... ✨", emoji: "✨" },
    { text: `Surprise ready for ${gfName || 'My Princess'}! 💖`, emoji: "🎀" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Smooth random increment
        const increment = Math.floor(Math.random() * 4) + 2;
        const next = Math.min(prev + increment, 100);

        // Update phase text based on percentage
        if (next < 25) setPhaseIndex(0);
        else if (next < 50) setPhaseIndex(1);
        else if (next < 75) setPhaseIndex(2);
        else if (next < 98) setPhaseIndex(3);
        else setPhaseIndex(4);

        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [gfName]);

  useEffect(() => {
    if (progress === 100 && !isFinished) {
      sound.playSparkle();
      const finishTimeout = setTimeout(() => {
        setIsFinished(true);
      }, 500);
      return () => clearTimeout(finishTimeout);
    }
  }, [progress, isFinished]);

  const handleEnter = () => {
    sound.playSparkle();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#c9182b', '#7b0f24', '#fcecef', '#fbd5c5', '#c4d4f8']
    });
    if (onComplete) onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#fdfbf7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Corner Ribbons / Stickers */}
      <div style={{ position: 'absolute', top: '24px', left: '28px', color: '#7b0f24', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
        ( SPECIAL BIRTHDAY EDITION )
      </div>
      <div style={{ position: 'absolute', top: '24px', right: '28px', color: '#7b0f24', fontSize: '20px' }}>
        🍒
      </div>

      <div style={{ maxWidth: '440px', width: '100%', textAlign: 'center' }}>
        {/* Animated Swedish Candy Cart / Birthday Gift Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, -2, 2, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.4,
            ease: "easeInOut"
          }}
          style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 24px auto',
            background: 'radial-gradient(circle, #fcecef 60%, #fad5df 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 28px rgba(123, 15, 36, 0.12)',
            border: '3px solid #ffffff',
            position: 'relative'
          }}
        >
          <span style={{ fontSize: '56px', userSelect: 'none' }}>
            {phases[phaseIndex].emoji}
          </span>
          <motion.span
            animate={{ scale: [1, 1.25, 1], rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{ position: 'absolute', top: '-6px', right: '-4px', fontSize: '24px' }}
          >
            ✨
          </motion.span>
        </motion.div>

        {/* Vintage Candy Boutique Title */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 5vw, 36px)',
            color: '#7b0f24',
            fontWeight: 500,
            marginBottom: '6px',
            letterSpacing: '-0.01em'
          }}
        >
          sweetheart
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: '#c9182b',
            marginBottom: '32px'
          }}
        >
          THE SWEETEST CELEBRATION CART
        </p>

        {/* Progress Bar Container */}
        <div
          style={{
            width: '100%',
            height: '16px',
            backgroundColor: '#f5e8eb',
            borderRadius: '999px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
            marginBottom: '16px',
            border: '1.5px solid #fad5df'
          }}
        >
          <motion.div
            style={{
              height: '100%',
              backgroundColor: '#c9182b',
              borderRadius: '999px',
              width: `${progress}%`,
              transition: 'width 0.1s linear'
            }}
          />
        </div>

        {/* Percentage Counter and Current Phase */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 600,
            color: '#7b0f24'
          }}
        >
          <span>{progress}% Loaded</span>
          <span style={{ fontSize: '13px', color: '#c9182b' }}>
            {progress === 100 ? "Ready to unwrap!" : "Almost there..."}
          </span>
        </div>

        {/* Dynamic Status Text with Smooth Transitions */}
        <div style={{ minHeight: '36px' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={phaseIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'var(--font-note)',
                fontSize: '20px',
                color: '#580818'
              }}
            >
              {phases[phaseIndex].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Enter Celebration Button when 100% */}
        <div style={{ marginTop: '28px', minHeight: '52px' }}>
          <AnimatePresence>
            {progress >= 100 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="retro-pill-btn retro-pill-bordeaux"
                style={{
                  fontSize: '16px',
                  padding: '14px 34px',
                  boxShadow: '0 8px 24px rgba(123, 15, 36, 0.25)'
                }}
              >
                OPEN CELEBRATION 🎀
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
