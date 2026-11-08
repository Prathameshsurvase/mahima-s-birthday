import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function SecretLetterSection({ gfName }) {
  const [passwordInput, setPasswordInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hugsCount, setHugsCount] = useState(0);

  const handleUnlock = (e) => {
    if (e) e.preventDefault();
    const cleanPass = passwordInput.trim();

    // Easter Egg: If she enters her own password "242124"
    if (cleanPass === '242124') {
      sound.playBoing();
      setErrorMessage('Not your password dumb, MY phone password! 😂❤️');
      triggerShake();
      return;
    }

    // Correct Password: "7550"
    if (cleanPass === '7550') {
      sound.playSparkle();
      setIsUnlocked(true);
      setErrorMessage('');

      // Sweet celebratory confetti burst
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#c9182b', '#780d21', '#ffccd5', '#ffe5ec', '#ffd166', '#ffffff']
      });
      return;
    }

    // Any other incorrect password
    sound.playBoing();
    setErrorMessage('Incorrect password silly! Hint: Password is my phone password 🙈🔑');
    triggerShake();
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 550);
  };

  const handleLockAgain = () => {
    sound.playPop(380);
    setIsUnlocked(false);
    setPasswordInput('');
    setErrorMessage('');
  };

  const sendHugs = () => {
    sound.playSparkle();
    setHugsCount(prev => prev + 1);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#ff4d6d', '#ff758c', '#ffccd5', '#ffffff']
    });
  };

  return (
    <section id="section-secret-letter" className="stage-section" style={{ backgroundColor: '#fff9fa', padding: '60px 16px 80px 16px' }}>
      <div className="candy-container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#fad5df',
              color: '#780d21',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              padding: '6px 14px',
              borderRadius: '999px',
              marginBottom: '12px',
              textTransform: 'uppercase'
            }}
          >
            <span>🔒</span>
            <span>CONFIDENTIAL · FOR {gfName ? gfName.toUpperCase() : 'MAHIMA'}'S EYES ONLY</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 5.5vw, 42px)',
              color: '#780d21',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '8px'
            }}
          >
            A Secret Love Letter 💌
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 3vw, 16px)',
              color: '#7d3e4d',
              maxWidth: '460px',
              margin: '0 auto 32px auto'
            }}
          >
            Locked with infinite love. Enter the secret code to open and read what's truly in my heart.
          </p>
        </motion.div>

        {/* Lockbox / Unlocked Letter Card */}
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* LOCKED STATE */
            <motion.div
              key="locked-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: isShaking ? [-10, 10, -8, 8, -4, 4, 0] : 0
              }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #f6ccd5',
                borderRadius: '24px',
                padding: 'clamp(28px, 6vw, 44px) clamp(20px, 5vw, 36px)',
                boxShadow: '0 16px 38px rgba(120, 13, 33, 0.1)',
                position: 'relative'
              }}
            >
              {/* Lock Icon with Floating Heart */}
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #fcecef 60%, #fad5df 100%)',
                  border: '2px solid #ffffff',
                  boxShadow: '0 8px 20px rgba(120, 13, 33, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '34px',
                  margin: '0 auto 18px auto'
                }}
              >
                🔐
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(20px, 4vw, 24px)',
                  color: '#780d21',
                  fontWeight: 700,
                  marginBottom: '8px'
                }}
              >
                Unlock My Personal Letter
              </h3>

              {/* Password Clue / Label */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#fff2f5',
                  border: '1px dashed #f6ccd5',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  color: '#c9182b',
                  marginBottom: '24px'
                }}
              >
                <span>📱</span>
                <span>Password is phone password</span>
                <span>🔐</span>
              </div>

              {/* Password Input Form */}
              <form onSubmit={handleUnlock} style={{ maxWidth: '340px', margin: '0 auto' }}>
                <div style={{ position: 'relative', marginBottom: '14px' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Enter password..."
                    style={{
                      width: '100%',
                      padding: '14px 44px 14px 18px',
                      borderRadius: '16px',
                      border: errorMessage ? '2px solid #c9182b' : '2px solid #fad5df',
                      backgroundColor: '#fffdfd',
                      fontSize: '18px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      textAlign: 'center',
                      letterSpacing: '2px',
                      color: '#780d21',
                      outline: 'none',
                      transition: 'border 0.2s',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: '4px',
                      color: '#780d21'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>

                {/* Error / Easter Egg Message */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        color: errorMessage.includes('dumb') ? '#780d21' : '#c9182b',
                        backgroundColor: errorMessage.includes('dumb') ? '#fff0f3' : '#fef2f2',
                        border: '1.5px solid #f6ccd5',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        fontSize: '14px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        marginBottom: '16px',
                        lineHeight: 1.35
                      }}
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Unlock Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #c9182b 0%, #780d21 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '14px 24px',
                    fontSize: '16px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(120, 13, 33, 0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>UNLOCK LETTER</span>
                  <span>💌</span>
                </motion.button>
              </form>
            </motion.div>
          ) : (
            /* UNLOCKED LETTER STATE */
            <motion.div
              key="unlocked-letter"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: '#fffcf7',
                border: '2px solid #f4c2cc',
                borderRadius: '24px',
                padding: 'clamp(28px, 6vw, 48px) clamp(20px, 6vw, 42px)',
                boxShadow: '0 24px 50px rgba(120, 13, 33, 0.15)',
                position: 'relative',
                textAlign: 'left',
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #fde4e9 31px, #fde4e9 32px)',
                backgroundPosition: '0 40px'
              }}
            >
              {/* Vintage Washi Tape Corners */}
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '30px',
                  width: '90px',
                  height: '24px',
                  backgroundColor: 'rgba(250, 213, 223, 0.85)',
                  transform: 'rotate(-4deg)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '30px',
                  width: '90px',
                  height: '24px',
                  backgroundColor: 'rgba(250, 213, 223, 0.85)',
                  transform: 'rotate(5deg)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}
              />

              {/* Wax Seal Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#780d21',
                  border: '2px solid #ffffff',
                  boxShadow: '0 4px 12px rgba(120, 13, 33, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: '#ffffff'
                }}
                title="Sealed with love"
              >
                ❤️
              </div>

              {/* Letter Greeting */}
              <h3
                style={{
                  fontFamily: 'var(--font-love)',
                  fontSize: 'clamp(32px, 6vw, 42px)',
                  color: '#780d21',
                  fontWeight: 700,
                  marginBottom: '20px',
                  lineHeight: 1.1
                }}
              >
                Dearest {gfName || 'Mahima'},
              </h3>

              {/* Letter Body */}
              <div
                style={{
                  fontFamily: 'var(--font-note)',
                  fontSize: 'clamp(18px, 4.2vw, 22px)',
                  lineHeight: '32px',
                  color: '#4a0d18'
                }}
              >
                <p style={{ marginBottom: '16px' }}>
                  Happy 22nd Birthday to the girl who made my whole world softer, brighter, and infinitely more beautiful. 🎂✨
                </p>

                <p style={{ marginBottom: '16px' }}>
                  From the random late-night talks that turned into my favorite hours of the day, to the way your eyes sparkle whenever you laugh, you have become my favorite place to be. Every quiet moment with you feels like home, and every adventure is ten times sweeter just because you're by my side.
                </p>

                <p style={{ marginBottom: '16px' }}>
                  You are funny, ridiculously cute, endlessly caring, and somehow you manage to get more gorgeous every single day. I created this entire surprise website just to see that magical smile on your face today.
                </p>

                <p style={{ marginBottom: '24px' }}>
                  May this year bring you all the warmth, happiness, and big dreams you truly deserve. I promise to always be here cheering you on, stealing bites of your treats, loving you through every mood, and holding your hand through it all.
                </p>

                <p style={{ fontFamily: 'var(--font-love)', fontSize: '26px', color: '#c9182b', fontWeight: 700 }}>
                  Happy Birthday, my favorite human in the whole universe. I love you more than words could ever explain.
                </p>

                <p style={{ marginTop: '20px', fontFamily: 'var(--font-love)', fontSize: '24px', color: '#780d21' }}>
                  Forever & always yours, <br />
                  With all my heart ❤️
                </p>
              </div>

              {/* Bottom Actions inside the Letter */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginTop: '32px',
                  paddingTop: '20px',
                  borderTop: '1px dashed #fad5df'
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendHugs}
                  style={{
                    background: '#fcecee',
                    color: '#780d21',
                    border: '1.5px solid #fad5df',
                    borderRadius: '999px',
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>🫂</span>
                  <span>Send Infinite Hugs {hugsCount > 0 && `(${hugsCount})`}</span>
                </motion.button>

                <button
                  onClick={handleLockAgain}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#7d3e4d',
                    fontSize: '12px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  🔒 Lock letter again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
