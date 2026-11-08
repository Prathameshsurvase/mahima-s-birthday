import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/audio';

export default function CatCompliments() {
  const [loveCount, setLoveCount] = useState(999);
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);

  const compliments = [
    "You are literally the prettiest girl in the world, especially when you think no one is looking! 🥺💖",
    "My absolute favorite place in the entire galaxy is right beside you holding your hand. 🌸",
    "That cute little laugh you do when you're shy? It makes my heart do backflips every single time! ✨",
    "I'm the luckiest guy alive to celebrate another year of your beautiful life. Happy Birthday angel! 🎂",
    "You make ordinary errands, car rides, and quiet moments feel like pure magic. 🎀",
    "Reminder: You are brilliant, deeply kind, ridiculously funny, and dangerously cute! 🐾",
    "Every love song suddenly makes complete sense whenever I look at your gorgeous face. 🎶",
    "I promise to always bring you your favorite snacks, give you forehead kisses, and never let go. 🍓",
    "Being loved by you is the greatest gift I have ever received in my life. 💕",
    "If cuteness was a crime, you would be serving a life sentence without parole! 😾👮",
    "I fall more in love with you with every sunrise, every conversation, and every hug. 🥰",
    "You have the warmest heart and the most gentle soul. Never forget how special you are! 🌟"
  ];

  const handlePoke = () => {
    setLoveCount(prev => prev + Math.floor(Math.random() * 50) + 25);
    setComplimentIndex(prev => (prev + 1) % compliments.length);

    if (Math.random() > 0.4) {
      sound.playMeow();
    } else {
      sound.playPop(580);
    }

    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="clean-scrapbook-card"
      style={{ textAlign: 'center', width: '100%' }}
    >
      <div className="washi-tape-strip" />

      <span className="editorial-tag">
        STEP 5: SWEET PRAISES
      </span>
      <h3 
        style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '26px', 
          color: 'var(--bordeaux)', 
          fontWeight: 600,
          marginBottom: '8px' 
        }}
      >
        Pip's Compliment Corner 🐾
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '18px' }}>
        Tap Pip the kitten to generate infinite reasons why you're adored!
      </p>

      {/* Speech Bubble - Mobile Responsive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={complimentIndex}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          style={{
            maxWidth: '480px',
            width: '100%',
            margin: '0 auto 18px auto',
            background: '#ffffff',
            border: '2px solid #f2d6dc',
            borderRadius: '20px',
            padding: '16px 18px',
            fontFamily: 'var(--font-note)',
            fontSize: 'clamp(17px, 3.2vw, 20px)',
            color: 'var(--berry-text)',
            lineHeight: 1.45,
            boxShadow: '0 4px 14px rgba(123, 15, 36, 0.05)',
            position: 'relative'
          }}
        >
          {compliments[complimentIndex]}
          {/* Bubble tail */}
          <div
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '10px solid #ffffff'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Interactive Cat Avatar */}
      <div style={{ margin: '14px 0' }}>
        <motion.div
          animate={isBouncing ? { y: [-15, 0], scale: [1.15, 1] } : { y: [0, -4, 0] }}
          transition={isBouncing ? { duration: 0.4 } : { repeat: Infinity, duration: 2.2 }}
          onClick={handlePoke}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'inline-block',
            cursor: 'pointer',
            fontSize: '64px',
            filter: 'drop-shadow(0 6px 12px rgba(123, 15, 36, 0.15))',
            userSelect: 'none',
            touchAction: 'manipulation'
          }}
          title="Poke Pip!"
        >
          🐱
        </motion.div>
      </div>

      {/* Love Meter & Poke Button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handlePoke}
          className="retro-pill-btn retro-pill-bordeaux"
          style={{ fontSize: '14px', padding: '10px 24px' }}
        >
          🐾 Poke Pip for Sweet Love!
        </motion.button>

        <div 
          style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '13px', 
            fontWeight: 700, 
            color: 'var(--cherry-red)',
            background: '#fcecef',
            padding: '4px 14px',
            borderRadius: '999px',
            border: '1px solid var(--pink-accent)'
          }}
        >
          💖 Love Score: {loveCount.toLocaleString()} pts
        </div>
      </div>
    </motion.div>
  );
}
