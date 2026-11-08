import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function BirthdayCake() {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);
    sound.playCandleBlow();

    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#c9182b', '#7b0f24', '#fcecef', '#fbd5c5', '#c4d4f8', '#ffffff']
    });
  };

  const handleRelight = () => {
    setIsBlown(false);
    sound.playSparkle();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="clean-scrapbook-card"
      style={{ textAlign: 'center' }}
    >
      <div className="washi-tape-strip" />

      <span className="editorial-tag">
        STEP 2: CELEBRATION TRADITION
      </span>
      <h3 
        style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '28px', 
          color: 'var(--bordeaux)', 
          fontWeight: 600,
          marginBottom: '8px' 
        }}
      >
        Make A Birthday Wish! 🎂
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--text-muted)', marginBottom: '18px' }}>
        Close your eyes, think of the happiest dream, and tap the candle flame!
      </p>

      {/* Interactive Cake Illustration */}
      <div
        onClick={handleBlow}
        style={{
          position: 'relative',
          width: '240px',
          height: '210px',
          margin: '0 auto 16px auto',
          cursor: isBlown ? 'default' : 'pointer'
        }}
        title="Tap candle to blow it out!"
      >
        {/* Candle */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '52px',
            background: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 6px, #c9182b 6px, #c9182b 12px)',
            borderRadius: '6px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.12)',
            zIndex: 20
          }}
        >
          {/* Wick */}
          <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '8px', background: '#333' }} />

          {/* Flickering Flame */}
          <AnimatePresence>
            {!isBlown && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 0.95, 1], rotate: [-3, 3, -2, 0] }}
                exit={{ scale: 0.1, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                style={{
                  position: 'absolute',
                  top: '-32px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px',
                  height: '28px',
                  background: 'radial-gradient(ellipse at 50% 80%, #ffffff 0%, #ffdf00 35%, #ff5400 70%, transparent 100%)',
                  borderRadius: '50% 50% 35% 35%',
                  filter: 'drop-shadow(0 0 10px rgba(255, 180, 0, 0.85))',
                  animation: 'flameFlicker 0.6s infinite alternate'
                }}
              />
            )}
          </AnimatePresence>

          {/* Smoke on Extinguish */}
          <AnimatePresence>
            {isBlown && (
              <motion.div
                initial={{ opacity: 0.9, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -45, scale: 1.8 }}
                transition={{ duration: 1.4 }}
                style={{
                  position: 'absolute',
                  top: '-25px',
                  left: '50%',
                  width: '14px',
                  height: '14px',
                  background: 'radial-gradient(circle, rgba(160,160,160,0.8), transparent)',
                  borderRadius: '50%'
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Top Cake Tier */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '160px',
            height: '65px',
            background: 'linear-gradient(180deg, #ffffff 0%, #fae6ec 100%)',
            borderRadius: '20px 20px 10px 10px',
            border: '2px solid #f2d6dc',
            boxShadow: '0 4px 10px rgba(123, 15, 36, 0.08)',
            zIndex: 10,
            overflow: 'hidden'
          }}
        >
          {/* Icing Swag */}
          <div
            style={{
              width: '100%',
              height: '16px',
              background: '#c9182b',
              borderRadius: '0 0 14px 14px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: '10px', color: '#fff' }}>🍓</span>
            <span style={{ fontSize: '10px', color: '#fff' }}>🍒</span>
            <span style={{ fontSize: '10px', color: '#fff' }}>🍓</span>
          </div>
        </div>

        {/* Bottom Cake Tier */}
        <div
          style={{
            position: 'absolute',
            bottom: '22px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '210px',
            height: '75px',
            background: 'linear-gradient(180deg, #fbe8ec 0%, #fad5df 100%)',
            borderRadius: '24px 24px 12px 12px',
            border: '2px solid #f2d6dc',
            boxShadow: '0 6px 14px rgba(123, 15, 36, 0.12)',
            zIndex: 5
          }}
        >
          {/* Bottom Pearls & Sprinkles */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '12px' }}>
            <span style={{ fontSize: '12px' }}>✨</span>
            <span style={{ fontSize: '12px' }}>💖</span>
            <span style={{ fontSize: '12px' }}>✨</span>
            <span style={{ fontSize: '12px' }}>💖</span>
            <span style={{ fontSize: '12px' }}>✨</span>
          </div>
        </div>

        {/* Vintage Cake Stand */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '235px',
            height: '14px',
            background: '#ffffff',
            borderRadius: '8px',
            border: '2px solid #e0c2ca',
            boxShadow: '0 4px 8px rgba(0,0,0,0.06)'
          }}
        />
      </div>

      {/* Status & Relight Controls */}
      <div>
        {!isBlown ? (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'var(--cherry-red)' }}>
            ( 👆 Tap the candle to blow out the flame! )
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--bordeaux)', marginBottom: '10px' }}>
              ✨ Wish Granted! May this year be your sweetest yet! 💖
            </p>
            <button
              onClick={handleRelight}
              className="retro-pill-btn retro-pill-pink"
              style={{ fontSize: '13px', padding: '8px 20px' }}
            >
              Relight Candle 🔥
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
