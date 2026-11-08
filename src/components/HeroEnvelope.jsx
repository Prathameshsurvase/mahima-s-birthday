import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function HeroEnvelope({ gfName, nickName, onEnvelopeOpened }) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [heartsCount, setHeartsCount] = useState(0);
  const [catSpeech, setCatSpeech] = useState('cake for you! 🎂');
  const [catMeows, setCatMeows] = useState(0);

  const handleCatTap = (e) => {
    e.stopPropagation();
    sound.playMeow();
    setTimeout(() => sound.playSparkle(), 180);
    setCatMeows(prev => prev + 1);

    const speechOptions = [
      'meow! happy birthday! 🐾',
      'make a wish! 🕯️',
      'you are the prettiest! 💖',
      'more cake for queen! 🎂',
      'purrrr... so sweet! ✨'
    ];
    setCatSpeech(speechOptions[Math.floor(Math.random() * speechOptions.length)]);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ff8da1', '#ffccd5', '#ffe5ec', '#ff4d6d', '#ffd166', '#ffffff']
    });
  };

  const handleGirlTap = (e) => {
    sound.playSparkle();
    setHeartsCount(prev => prev + 1);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#c9182b', '#780d21', '#fcecee', '#fbd6c6', '#ffffff']
    });

    if (onEnvelopeOpened) onEnvelopeOpened();
  };

  const toggleLetter = () => {
    sound.playSparkle();
    setIsLetterOpen(prev => !prev);
    if (!isLetterOpen) {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#c9182b', '#780d21', '#fbd6c6', '#fad5df', '#ffffff']
      });
    }
  };

  return (
    <section id="section-hero" className="stage-section section-hero-grid">
      {/* Scattered Candy Stickers (Pinterest Match) */}
      <span className="floating-candy-sticker" style={{ top: '8%', right: '12%', fontSize: '28px' }}>🍒</span>
      <span className="floating-candy-sticker" style={{ top: '38%', left: '44%', fontSize: '24px', animationDelay: '1s' }}>🧸</span>
      <span className="floating-candy-sticker" style={{ bottom: '14%', left: '8%', fontSize: '26px', animationDelay: '1.8s' }}>🍬</span>
      <span className="floating-candy-sticker" style={{ bottom: '12%', right: '14%', fontSize: '24px', animationDelay: '0.6s' }}>🍓</span>

      <div className="candy-container">
        {/* Two-Column Grid: Text on Left, Birthday Girl on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            alignItems: 'center',
            gap: '40px',
            position: 'relative'
          }}
        >
          {/* Left Column: Typography, Tag, Button, Doodle Arrow */}
          <div className="hero-text-col">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="editorial-serif-headline"
              style={{
                fontSize: 'clamp(36px, 5.5vw, 62px)',
                color: 'var(--bordeaux-frame)',
                marginBottom: '32px',
                lineHeight: 1.12
              }}
            >
              The Sweetest Birthday Girl of My Dreams
            </motion.h1>

            {/* Pill Button + Looping Maroon Doodle Arrow pointing to her */}
            <div className="hero-btn-wrap" style={{ position: 'relative', display: 'inline-block' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLetter}
                className="boutique-pill-btn boutique-pill-blue"
              >
                {isLetterOpen ? 'CLOSE LOVE LETTER 💌' : 'READ HER LOVE LETTER 💌'}
              </motion.button>

              {/* Looping Maroon Doodle Arrow pointing to her */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '100%',
                  marginLeft: '14px',
                  width: '120px',
                  pointerEvents: 'none'
                }}
                className="doodle-arrow-desktop"
              >
                <svg width="110" height="60" viewBox="0 0 120 60" fill="none">
                  <path
                    d="M 10 15 C 40 45, 60 55, 75 35 C 85 20, 65 10, 60 25 C 55 42, 85 45, 108 40"
                    stroke="#780d21"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 100 32 L 110 40 L 102 48"
                    stroke="#780d21"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Birthday Girl Cutout Image */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Script Text Annotation near her: "the prettiest smile! 🍒" */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '10px',
                fontFamily: 'var(--font-love)',
                fontSize: '26px',
                color: 'var(--bordeaux-frame)',
                fontWeight: 700,
                transform: 'rotate(6deg)',
                zIndex: 10
              }}
            >
              look at that smile! 🍒
            </div>

            {/* Soft Blended Radial Glow Aura Behind Her */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* Deeply blurred, smoothly blended ambient glow halo */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '360px',
                  height: '360px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(254, 219, 228, 0.95) 0%, rgba(251, 214, 198, 0.75) 38%, rgba(247, 186, 199, 0.35) 62%, transparent 72%)',
                  zIndex: 1,
                  filter: 'blur(38px)',
                  pointerEvents: 'none'
                }}
              />

              {/* Birthday Girl Cutout Image - Slightly larger size & soft drop shadow */}
              <motion.img
                src="./assets/images/birthday_girl_hero.png"
                alt="Birthday Girl"
                onClick={handleGirlTap}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                animate={{ y: [0, -7, 0] }}
                transition={{
                  y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut' }
                }}
                style={{
                  width: '100%',
                  maxWidth: '410px',
                  height: 'auto',
                  objectFit: 'contain',
                  zIndex: 5,
                  cursor: 'pointer',
                  filter: 'drop-shadow(0 18px 32px rgba(120, 13, 33, 0.16))',
                  userSelect: 'none'
                }}
                title="Tap to shower with love!"
              />

              {/* Floating Crown Badge */}
              <motion.div
                animate={{ rotate: [-4, 4, -4], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid #f6ccd5',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: 'var(--bordeaux-frame)',
                  boxShadow: '0 4px 16px rgba(120, 13, 33, 0.12)',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>👑</span> BIRTHDAY QUEEN
              </motion.div>

              {/* Adorable Party Kitty Holding Birthday Cake */}
              <motion.div
                onClick={handleCatTap}
                whileHover={{ scale: 1.08, rotate: -2 }}
                whileTap={{ scale: 0.92 }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  y: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                }}
                style={{
                  position: 'absolute',
                  bottom: '-22px',
                  left: 'clamp(-35px, -4vw, -12px)',
                  zIndex: 8,
                  cursor: 'pointer',
                  userSelect: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                title="Tap the party kitty for a meow & treats!"
              >
                {/* Speech Bubble */}
                <motion.div
                  key={catSpeech}
                  initial={{ scale: 0.8, opacity: 0, y: 4 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: '#ffffff',
                    color: 'var(--bordeaux-frame)',
                    fontFamily: 'var(--font-love)',
                    fontSize: 'clamp(15px, 2.2vw, 18px)',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '14px',
                    boxShadow: '0 4px 12px rgba(120, 13, 33, 0.14)',
                    border: '1.5px solid #f6ccd5',
                    marginBottom: '3px',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    pointerEvents: 'none'
                  }}
                >
                  {catSpeech}
                  {/* Little speech tail */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: '42%',
                      width: 0,
                      height: 0,
                      borderLeft: '5px solid transparent',
                      borderRight: '5px solid transparent',
                      borderTop: '5px solid #ffffff'
                    }}
                  />
                </motion.div>

                {/* Party Cat Image */}
                <img
                  src="./assets/images/birthday_cat.png"
                  alt="Party Cat Holding Cake"
                  style={{
                    width: 'clamp(115px, 19vw, 150px)',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 20px rgba(120, 13, 33, 0.22))'
                  }}
                />
              </motion.div>
            </div>

            {/* Tap Instruction / Shower Counter */}
            <motion.p
              whileTap={{ scale: 0.95 }}
              onClick={handleGirlTap}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--cherry-red)',
                textAlign: 'center',
                marginTop: '16px',
                cursor: 'pointer',
                background: '#fdeef1',
                padding: '6px 16px',
                borderRadius: '999px',
                border: '1px solid #f6ccd5',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>💖</span> Tap on her or the kitty! ({heartsCount + catMeows})
            </motion.p>
          </div>
        </div>

        {/* Slide-out Love Letter */}
        <AnimatePresence>
          {isLetterOpen && (
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.6, type: 'spring' }}
              style={{
                maxWidth: '680px',
                width: '100%',
                margin: '40px auto 0 auto',
                background: '#ffffff',
                border: '2px solid #f6ccd5',
                borderRadius: '26px',
                padding: '36px 28px',
                boxShadow: 'var(--shadow-lift)',
                position: 'relative',
                textAlign: 'left'
              }}
            >
              <div className="tape-strip-accent" />

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(26px, 4vw, 34px)',
                  fontWeight: 600,
                  color: 'var(--bordeaux-frame)',
                  marginBottom: '16px',
                  textAlign: 'center',
                  letterSpacing: '-0.01em'
                }}
              >
                Happy Birthday, {nickName || 'Princess'}! 🌸
              </h2>

              <div style={{ fontFamily: 'var(--font-note)', fontSize: 'clamp(18px, 3vw, 21px)', lineHeight: 1.6, color: 'var(--berry-text)' }}>
                <p>Today is all about celebrating the most incredible, gorgeous, and precious girl in existence.</p>
                <br />
                <p>From the moment you walked into my life, everything became sweeter, warmer, and filled with effortless laughter. You are my peace, my happiest thought, and my sweetest dream come true.</p>
                <br />
                <p>I crafted this surprise Swedish candy-cart celebration space just for you! Scroll down to see today's lineup, make your wish, and claim your lifetime love subscription...</p>
              </div>

              <div style={{ fontFamily: 'var(--font-love)', fontSize: 'clamp(24px, 4vw, 28px)', color: 'var(--cherry-red)', textAlign: 'right', marginTop: '20px' }}>
                Forever & Always Yours, 💕
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .hero-text-col {
          text-align: left;
          position: relative;
        }

        @media (max-width: 900px) {
          .hero-text-col {
            text-align: center !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-text-col .editorial-serif-headline {
            text-align: center !important;
          }
          .hero-btn-wrap {
            margin: 0 auto;
          }
          .doodle-arrow-desktop {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
