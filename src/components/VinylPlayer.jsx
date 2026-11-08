import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/audio';

export default function VinylPlayer({ isPlaying, onTogglePlay, nickName }) {
  const [activeTrack, setActiveTrack] = useState(0);

  const playlist = [
    {
      title: '1. Happy Birthday Music Box ✨',
      desc: 'The nostalgic chime melody composed just for your day',
      icon: '🎵'
    },
    {
      title: '2. That Shy Laugh of Yours 🍓',
      desc: 'My favorite sound in the universe on infinite repeat',
      icon: '💕'
    },
    {
      title: '3. Midnight Talks & Cozy Hugs 🌙',
      desc: 'When the whole world is asleep and it’s just you and me',
      icon: '✨'
    }
  ];

  const handleTrackChange = (index) => {
    sound.playPop(520);
    setActiveTrack(index);
    if (!isPlaying) {
      onTogglePlay();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="clean-scrapbook-card"
      style={{ textAlign: 'center' }}
    >
      <div className="washi-tape-strip washi-tape-red" />

      <span className="editorial-tag">
        STEP 3: NOSTALGIC SOUNDTRACK
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
        Songs That Sound Like You 💿
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--text-muted)', marginBottom: '18px' }}>
        Every melody in my head has your smile written all over it 🎶
      </p>

      {/* Turntable Box - 100% Fluid on Mobile */}
      <div
        style={{
          background: '#fbe8ec',
          borderRadius: '24px',
          padding: '20px 14px',
          maxWidth: '340px',
          width: '100%',
          margin: '0 auto 18px auto',
          border: '2px solid #f2d6dc',
          position: 'relative',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.03)'
        }}
      >
        {/* Tonearm */}
        <motion.div
          animate={{ rotate: isPlaying ? 6 : -30 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '24px',
            width: '24px',
            height: '80px',
            borderRight: '3.5px solid #824753',
            borderTop: '3.5px solid #824753',
            borderRadius: '0 14px 0 0',
            transformOrigin: 'top right',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <div style={{ position: 'absolute', bottom: 0, right: '-6px', width: '12px', height: '16px', background: 'var(--cherry-red)', borderRadius: '3px' }} />
        </motion.div>

        {/* Vinyl Disc */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
          onClick={onTogglePlay}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '170px',
            height: '170px',
            background: 'radial-gradient(circle, #c9182b 0%, #c9182b 28%, #1f1f23 29%, #2d2d34 50%, #151518 75%, #25252b 100%)',
            borderRadius: '50%',
            margin: '0 auto',
            position: 'relative',
            boxShadow: '0 8px 22px rgba(0, 0, 0, 0.24)',
            cursor: 'pointer',
            border: '3px solid #222'
          }}
        >
          {/* Center Label */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60px',
              height: '60px',
              background: '#ffffff',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 700,
              color: 'var(--bordeaux)',
              border: '2px solid var(--cherry-red)'
            }}
          >
            <span>FOR {nickName ? nickName.toUpperCase() : 'YOU'}</span>
            <span style={{ fontSize: '8px', color: 'var(--cherry-red)' }}>SIDE A</span>
            <div style={{ width: '10px', height: '10px', background: '#111', borderRadius: '50%', marginTop: '2px' }} />
          </div>
        </motion.div>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--bordeaux)', marginTop: '14px' }}>
          {isPlaying ? `Playing: ${playlist[activeTrack].title}` : 'Tap record to spin & play melody 💿'}
        </p>
      </div>

      {/* Playlist Track Selection - Mobile Touch Friendly */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '340px', margin: '0 auto', textAlign: 'left' }}>
        {playlist.map((track, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTrackChange(i)}
            style={{
              padding: '10px 14px',
              borderRadius: '14px',
              background: activeTrack === i ? '#fcecef' : '#ffffff',
              border: activeTrack === i ? '1.5px solid var(--cherry-red)' : '1px solid #f2d6dc',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              minHeight: '44px'
            }}
          >
            <span style={{ fontSize: '18px' }}>{track.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--bordeaux)' }}>
                {track.title}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--text-muted)' }}>
                {track.desc}
              </div>
            </div>
            {activeTrack === i && isPlaying && (
              <span style={{ fontSize: '12px', color: 'var(--cherry-red)' }}>▶</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
