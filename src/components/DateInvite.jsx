import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function DateInvite({ gfName, dateLocation }) {
  const [showTicket, setShowTicket] = useState(false);

  const handleAccept = () => {
    sound.playSparkle();
    setShowTicket(true);

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#c9182b', '#7b0f24', '#fcecef', '#fbd5c5', '#c4d4f8', '#ffffff']
    });
  };

  return (
    <section 
      id="section-date-invite"
      style={{ padding: '30px 0 20px 0', width: '100%' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="clean-scrapbook-card" 
        style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #ffffff 0%, #fff7f9 100%)',
          border: '2px solid #f2d6dc',
          width: '100%'
        }}
      >
        <div className="washi-tape-strip washi-tape-red" />

        <span className="editorial-tag">
          STEP 7: GRAND FINALE
        </span>
        <h3 
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(26px, 4.5vw, 40px)', 
            color: 'var(--bordeaux)', 
            fontWeight: 600,
            marginBottom: '8px' 
          }}
        >
          Will you be my date tonight? 🌸
        </h3>

        <p 
          style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: 'clamp(15px, 2.5vw, 18px)', 
            color: 'var(--text-muted)', 
            marginBottom: '26px',
            maxWidth: '520px',
            margin: '0 auto 26px auto'
          }}
        >
          Dress up cute, dinner is on me, and sweet treats are guaranteed! 🥰
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '340px', margin: '0 auto', width: '100%' }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAccept}
            className="retro-pill-btn retro-pill-bordeaux"
            style={{ fontSize: '16px', padding: '14px 28px' }}
          >
            YES! I'D LOVE TO! 💖
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAccept}
            className="retro-pill-btn retro-pill-pink"
            style={{ fontSize: '15px', padding: '12px 28px' }}
          >
            1000% YES, LET'S GO! 🥰✨
          </motion.button>
        </div>

        {/* VIP Date Night Boarding Pass Ticket Modal */}
        <AnimatePresence>
          {showTicket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTicket(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(74, 13, 24, 0.65)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99999,
                padding: '16px'
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: '#ffffff',
                  borderRadius: '26px',
                  padding: '28px 20px',
                  maxWidth: '400px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  border: '3px solid var(--cherry-red)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <div className="washi-tape-strip washi-tape-red" />

                <div
                  style={{
                    background: '#fff8fa',
                    border: '2px dashed var(--cherry-red)',
                    borderRadius: '20px',
                    padding: '20px 16px',
                    position: 'relative',
                    marginTop: '8px'
                  }}
                >
                  <div style={{ fontSize: '36px', marginBottom: '4px' }}>🎟️</div>
                  <span 
                    style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '11px', 
                      fontWeight: 700, 
                      letterSpacing: '1.5px', 
                      color: 'var(--cherry-red)',
                      textTransform: 'uppercase'
                    }}
                  >
                    OFFICIAL BOARDING PASS
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--bordeaux)', marginBottom: '4px', fontWeight: 600 }}>
                    VIP Birthday Date Night
                  </h3>
                  <p style={{ fontFamily: 'var(--font-love)', fontSize: '20px', color: 'var(--cherry-red)', marginBottom: '14px' }}>
                    Reserved exclusively for the birthday princess 💖
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontFamily: 'var(--font-sans)', fontSize: '13px', borderBottom: '1px dotted #f2d6dc', paddingBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Guest of Honor:</span>
                    <strong style={{ color: 'var(--bordeaux)' }}>{gfName || 'My Cutie'}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontFamily: 'var(--font-sans)', fontSize: '13px', borderBottom: '1px dotted #f2d6dc', paddingBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Destination:</span>
                    <strong style={{ color: 'var(--bordeaux)' }}>{dateLocation || 'Our Favorite Spot ✨'}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontFamily: 'var(--font-sans)', fontSize: '13px', borderBottom: '1px dotted #f2d6dc', paddingBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Perks:</span>
                    <span style={{ color: 'var(--bordeaux)', fontWeight: 600 }}>Unlimited desserts & cuddles</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontFamily: 'var(--font-sans)', fontSize: '13px', borderBottom: '1px dotted #f2d6dc', paddingBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Dress Code:</span>
                    <span style={{ color: 'var(--bordeaux)', fontWeight: 600 }}>Whatever makes you feel cute!</span>
                  </div>

                  <div style={{ fontFamily: 'monospace', letterSpacing: '4px', fontSize: '16px', color: 'var(--bordeaux)', marginTop: '16px' }}>
                    ||| | |||| | || ||||| | |||
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    TICKET ID: BDAY-LOVE-SWEETHEART-01
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    sound.playPop(480);
                    setShowTicket(false);
                  }}
                  className="retro-pill-btn retro-pill-bordeaux"
                  style={{ marginTop: '18px', width: '100%', fontSize: '15px' }}
                >
                  🥰 SEE YOU TONIGHT, LOVE!
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
