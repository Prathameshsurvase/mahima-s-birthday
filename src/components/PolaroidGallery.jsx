import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';

export default function PolaroidGallery() {
  const [flippedCards, setFlippedCards] = useState({});
  const [customPhotos, setCustomPhotos] = useState(() => {
    return {
      card1: localStorage.getItem('custom_photo_card1') || '/assets/images/gf_garba_smile.jpg',
      card2: localStorage.getItem('custom_photo_card2') || '/assets/images/gf_peace_closeup.jpg',
      card3: localStorage.getItem('custom_photo_card3') || '/assets/images/gf_pink_playful.jpg'
    };
  });

  const cards = [
    {
      id: 'card1',
      title: 'Your Radiance ✨',
      tapeClass: 'washi-tape-strip',
      rotation: -1,
      note: '“You make my world brighter and my heart so much fuller. I hope you always see yourself through my eyes: strong, radiant, breathtaking, and irreplaceable.”'
    },
    {
      id: 'card2',
      title: 'My Favorite Person 🌸',
      tapeClass: 'washi-tape-strip washi-tape-red',
      rotation: 1,
      note: '“I love how we can do absolutely nothing together and it somehow turns into the best part of my entire week. Being with you is my happy place.”'
    },
    {
      id: 'card3',
      title: 'Endlessly In Love 💖',
      tapeClass: 'washi-tape-strip',
      rotation: -1,
      note: '“Every day I discover something new to love about you: the way you laugh, the warmth you give to everyone, and your sweet, comforting hugs.”'
    }
  ];

  const toggleFlip = (id) => {
    sound.playPop(620);
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePhotoUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setCustomPhotos(prev => ({ ...prev, [id]: dataUrl }));
        localStorage.setItem(`custom_photo_${id}`, dataUrl);
        sound.playSparkle();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section
      id="section-photos"
      style={{ padding: '20px 0', width: '100%' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="clean-scrapbook-card"
        style={{ width: '100%' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="editorial-tag">
            STEP 4: CAPTURED MEMORIES
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(24px, 4vw, 36px)',
              color: 'var(--bordeaux)',
              fontWeight: 600,
              marginBottom: '6px'
            }}
          >
            Reasons I'm Obsessed With You 📸
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)' }}>
            ( 👆 Tap any polaroid to flip & read the secret message! )
          </p>
        </div>

        {/* Fully Responsive Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="polaroid-responsive-grid">
          {cards.map(card => {
            const isFlipped = !!flippedCards[card.id];

            return (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                onClick={() => toggleFlip(card.id)}
                style={{
                  perspective: '1000px',
                  cursor: 'pointer',
                  position: 'relative',
                  width: '100%'
                }}
              >
                <div className={card.tapeClass} />

                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position: 'relative',
                    width: '100%',
                    transformStyle: 'preserve-3d',
                    borderRadius: '20px',
                    boxShadow: 'var(--shadow-card)',
                    background: '#ffffff',
                    border: '1.5px solid #f2d6dc',
                    padding: '12px 12px 18px 12px',
                    touchAction: 'manipulation'
                  }}
                >
                  {/* Front Side */}
                  <div style={{ backfaceVisibility: 'hidden' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '210px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        position: 'relative',
                        background: '#f8e8ec',
                        border: '1px solid #f0d5dd'
                      }}
                    >
                      <img
                        src={customPhotos[card.id]}
                        alt={card.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />

                      {/* Swap Photo Button */}
                      <label
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '8px',
                          background: 'rgba(255, 255, 255, 0.94)',
                          border: '1px solid var(--border-delicate)',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          padding: '4px 10px',
                          color: 'var(--bordeaux)',
                          cursor: 'pointer',
                          zIndex: 15,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                        }}
                      >
                        📷 Swap
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(card.id, e)}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: 'var(--bordeaux)',
                        textAlign: 'center',
                        marginTop: '12px',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {card.title}
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: '#fffdfa',
                      border: '2px dashed #f2d6dc',
                      borderRadius: '20px',
                      padding: '20px 16px',
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <p style={{ fontFamily: 'var(--font-love)', fontSize: '22px', fontWeight: 700, color: 'var(--bordeaux)', lineHeight: 1.45 }}>
                      {card.note}
                    </p>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, color: 'var(--cherry-red)', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Tap to flip back 🔄
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
