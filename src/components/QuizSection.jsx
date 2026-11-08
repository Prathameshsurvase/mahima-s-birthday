import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function QuizSection({ onReadySuccess }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [showCatModal, setShowCatModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [wishInput, setWishInput] = useState('');
  const [wishSubmitted, setWishSubmitted] = useState(false);

  // Exact 7-column calendar lineup from Pinterest!
  const calendarDays = [
    { day: '09:00 AM', tag: '(MON)', type: 'solid', label: 'Morning Kisses & Coffee', icon: '☕', sub: 'Cuddles in Bed', time: '9:00-10:00am' },
    { day: '11:00 AM', tag: '(TUE)', type: 'item', label: 'Sweet Treats Cart', icon: '🍭', sub: 'Sugar Rush', time: '11:00-12:00pm' },
    { day: '01:30 PM', tag: '(WED)', type: 'item', label: 'Birthday Wish & Cake', icon: '🧸', sub: 'Blow 3 Wishes', time: '1:30-2:30pm', isCircled: true },
    { day: '03:30 PM', tag: '(THU)', type: 'item', label: 'Vinyl Chimes & Dance', icon: '🍬', sub: 'Our Love Tracks', time: '3:30-4:30pm' },
    { day: '05:30 PM', tag: '(FRI)', type: 'item', label: 'Photo Memory Vault', icon: '🍒', sub: 'Secret Notes', time: '5:30-6:30pm' },
    { day: '07:30 PM', tag: '(SAT)', type: 'item', label: 'Scratch Secret Coupon', icon: '🎀', sub: 'Free Pampering', time: '7:30-8:30pm' },
    { day: '09:00 PM', tag: '(SUN)', type: 'item', label: 'VIP Candlelit Dinner', icon: '🍾', sub: 'Treats on Me', time: '9:00-11:00pm' }
  ];

  const dodge = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    sound.playBoing();
    const newCount = dodgeCount + 1;
    setDodgeCount(newCount);

    if (newCount > 3) {
      setShowCatModal(true);
      setDodgeCount(0);
      return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const rangeX = isMobile ? 70 : 160;
    const rangeY = isMobile ? 45 : 85;
    setNoPos({
      x: (Math.random() - 0.5) * rangeX,
      y: (Math.random() - 0.5) * rangeY
    });
  };

  const handleYes = () => {
    sound.playSparkle();
    setIsSuccess(true);
    confetti({
      particleCount: 85,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#c9182b', '#780d21', '#fcecee', '#fbd6c6', '#ffffff']
    });
    if (onReadySuccess) onReadySuccess();
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!wishInput.trim()) return;
    sound.playSparkle();
    setWishSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#fbd6c6', '#fad5df', '#ffffff']
    });
  };

  return (
    <section id="section-calendar" className="stage-section section-red-binder">
      <div className="candy-container">
        {/* White Perforated Notebook Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65 }}
          className="notebook-sheet-card"
        >
          {/* 14 Binder Holes Row (Pinterest Match!) */}
          <div className="notebook-binder-holes-strip">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="notebook-binder-hole-circle" />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1.8px',
                textTransform: 'uppercase',
                color: 'var(--cherry-red)',
                display: 'inline-block',
                marginBottom: '4px'
              }}
            >
              WHERE TO CATCH THE BIRTHDAY LOVE
            </span>
            <h2
              className="editorial-serif-headline"
              style={{
                fontSize: 'clamp(28px, 4.5vw, 42px)',
                color: 'var(--bordeaux-frame)',
                marginBottom: '26px'
              }}
            >
              THIS WEEK
            </h2>

            {/* Exact 7-Column Calendar Grid matching Pinterest */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
                gap: '8px',
                marginBottom: '32px'
              }}
            >
              {calendarDays.map((col, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1.5px solid #f2cfd7',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    position: 'relative',
                    textAlign: 'center',
                    boxShadow: col.isCircled ? '0 4px 14px rgba(120, 13, 33, 0.12)' : 'none'
                  }}
                >
                  {/* Column Header (e.g. MAR 02 (TUE)) */}
                  <div
                    style={{
                      background: col.type === 'solid' ? '#780d21' : '#ffffff',
                      color: col.type === 'solid' ? '#ffffff' : 'var(--bordeaux-frame)',
                      borderBottom: '1px solid #f2cfd7',
                      padding: '8px 4px',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span>{col.day}</span>
                    <span style={{ color: col.type === 'solid' ? '#fad5df' : 'var(--text-muted)' }}>{col.tag}</span>
                  </div>

                  {/* Column Body */}
                  <div
                    style={{
                      padding: '14px 6px',
                      minHeight: '130px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: col.type === 'solid' ? '#780d21' : '#ffffff',
                      color: col.type === 'solid' ? '#ffffff' : 'var(--berry-text)',
                      position: 'relative'
                    }}
                  >
                    {/* Hand-drawn Purple / Blue Highlighter Circle around Today (Pinterest match!) */}
                    {col.isCircled && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: '-4px',
                          border: '2.5px solid rgba(138, 92, 196, 0.65)',
                          borderRadius: '16px',
                          pointerEvents: 'none',
                          transform: 'rotate(-2deg)'
                        }}
                      />
                    )}

                    {col.type === 'solid' ? (
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700 }}>
                        {col.label}
                      </span>
                    ) : (
                      <>
                        <div style={{ fontSize: '28px', marginBottom: '8px' }}>{col.icon}</div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 800, color: 'var(--bordeaux-frame)', lineHeight: 1.25, marginBottom: '4px' }}>
                          {col.label}
                        </div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: 'var(--text-muted)' }}>
                          {col.time}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Button inside Notebook Card: "FIND US TODAY" -> "VERIFY READINESS 💖" */}
            <div style={{ borderTop: '1px dashed #f6ccd5', paddingTop: '24px' }}>
              {!isSuccess ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '14px', minHeight: '60px', position: 'relative' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYes}
                    className="boutique-pill-btn boutique-pill-bordeaux"
                    style={{ fontSize: '14px', padding: '13px 30px' }}
                  >
                    FIND US TODAY & UNWRAP SURPRISE 💖
                  </motion.button>

                  <motion.button
                    animate={{ x: noPos.x, y: noPos.y }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    onMouseEnter={dodge}
                    onClick={dodge}
                    onTouchStart={dodge}
                    className="boutique-pill-btn boutique-pill-blue"
                    style={{ fontSize: '13px', padding: '10px 22px' }}
                  >
                    {dodgeCount === 0 ? "Not yet... 😜" : dodgeCount === 1 ? "Catch me! 🏃‍♀️" : "Nope! 🙈"}
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring' }}
                  style={{
                    background: '#fdeef1',
                    border: '1.5px solid #f6ccd5',
                    borderRadius: '18px',
                    padding: '14px 22px',
                    display: 'inline-block',
                    maxWidth: '460px'
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: 'var(--bordeaux-frame)' }}>
                    ✨ Readiness Confirmed! You're booked for unlimited love & treats all week long! 👑
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom Pill Bar matching "PSST! GET THE SCHEDULE IN YOUR INBOX EVERY WEEK!" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            maxWidth: '780px',
            margin: '24px auto 0 auto',
            backgroundColor: '#fdeef1',
            borderRadius: '999px',
            padding: '8px 18px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--bordeaux-frame)'
            }}
          >
            PSST! SPOILING YOU ALL DAY & NIGHT WITH ENDLESS LOVE! 🍓
          </span>

          <form onSubmit={handleWishSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {!wishSubmitted ? (
              <>
                <input
                  type="text"
                  value={wishInput}
                  onChange={(e) => setWishInput(e.target.value)}
                  placeholder="Enter a birthday wish..."
                  style={{
                    background: '#ffffff',
                    border: '1px solid #f6ccd5',
                    borderRadius: '999px',
                    padding: '8px 14px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                    outline: 'none',
                    width: '180px'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--bordeaux-frame)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '8px 16px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase'
                  }}
                >
                  WISH ✨
                </button>
              </>
            ) : (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, color: 'var(--cherry-red)' }}>
                💌 Wish sent to cupid!
              </span>
            )}
          </form>
        </motion.div>
      </div>

      {/* Cat Modal for Excessive No Clicks */}
      <AnimatePresence>
        {showCatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCatModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(74, 13, 24, 0.65)',
              backdropFilter: 'blur(6px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '28px 20px',
                maxWidth: '360px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                border: '2.5px solid var(--cherry-red)'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>😿</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--bordeaux-frame)', marginBottom: '6px' }}>
                How dare you tap No?!
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '18px' }}>
                The birthday council does not recognize the word "No" on your special day. Try again cutie!
              </p>
              <button
                onClick={() => setShowCatModal(false)}
                className="boutique-pill-btn boutique-pill-bordeaux"
                style={{ width: '100%' }}
              >
                Okay, I'm ready! 💖
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
