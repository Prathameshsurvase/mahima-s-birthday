import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

export default function PersonalizerModal({ gfName, nickName, dateLocation, onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(gfName);
  const [nick, setNick] = useState(nickName);
  const [loc, setLoc] = useState(dateLocation);

  const handleOpen = () => {
    sound.playPop(500);
    setName(gfName);
    setNick(nickName);
    setLoc(dateLocation);
    setIsOpen(true);
  };

  const handleSave = () => {
    sound.playSparkle();
    onSave({
      gfName: name.trim() || 'My Cutie',
      nickName: nick.trim() || 'Princess',
      dateLocation: loc.trim() || 'Our Favorite Spot ✨'
    });
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleOpen}
        title="Personalize girlfriend name and details"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '16px',
          background: '#ffffff',
          border: '1.5px solid var(--border-delicate)',
          borderRadius: '999px',
          padding: '10px 18px',
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          fontWeight: 700,
          color: 'var(--bordeaux)',
          boxShadow: 'var(--shadow-lift)',
          cursor: 'pointer',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          touchAction: 'manipulation'
        }}
      >
        <span>✏️</span> Personalize
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(74, 13, 24, 0.6)',
              backdropFilter: 'blur(6px)',
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: '26px',
                padding: '28px 20px',
                maxWidth: '420px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                border: '2.5px solid var(--cherry-red)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                position: 'relative'
              }}
            >
              <div className="washi-tape-strip washi-tape-red" />

              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <span className="editorial-tag" style={{ color: 'var(--cherry-red)' }}>
                  CUSTOMIZE SURPRISE
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--bordeaux)', fontWeight: 600 }}>
                  Personalize Her Website ✨
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)' }}>
                  Updates her name, nicknames, and date spot across all cards!
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, color: 'var(--bordeaux)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                    Her Name / Pet Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya, My Cutie"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #f2d6dc',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      outline: 'none',
                      backgroundColor: '#fffdfa'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, color: 'var(--bordeaux)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                    Sweet Nickname:
                  </label>
                  <input
                    type="text"
                    value={nick}
                    onChange={(e) => setNick(e.target.value)}
                    placeholder="e.g. Princess, Sweetheart, Angel"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #f2d6dc',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      outline: 'none',
                      backgroundColor: '#fffdfa'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, color: 'var(--bordeaux)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                    Date Night Destination:
                  </label>
                  <input
                    type="text"
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    placeholder="e.g. That Italian Place by the Lake ✨"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1.5px solid #f2d6dc',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      outline: 'none',
                      backgroundColor: '#fffdfa'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="retro-pill-btn retro-pill-pink"
                  style={{ flex: 1, fontSize: '14px' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="retro-pill-btn retro-pill-bordeaux"
                  style={{ flex: 1, fontSize: '14px' }}
                >
                  Save & Apply 💖
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
