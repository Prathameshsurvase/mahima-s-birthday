import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import LoaderScreen from './components/LoaderScreen';
import ScrollProgressBar from './components/ScrollProgressBar';
import StageNavDots from './components/StageNavDots';
import HeroEnvelope from './components/HeroEnvelope';
import PhotoboothSection from './components/PhotoboothSection';
import PinkStripedSection from './components/PinkStripedSection';
import DateInviteSection from './components/DateInviteSection';
import SecretLetterSection from './components/SecretLetterSection';
import PersonalizerModal from './components/PersonalizerModal';
import { sound } from './utils/audio';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [gfName, setGfName] = useState(() => localStorage.getItem('bday_gf_name') || 'Mahima');
  const [nickName, setNickName] = useState(() => localStorage.getItem('bday_nick_name') || 'Mahima');
  const [dateLocation, setDateLocation] = useState(() => localStorage.getItem('bday_date_location') || 'Our Favorite Spot ✨');

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMusic = () => {
    const playing = sound.toggleMusicBox();
    setIsMusicPlaying(playing);
  };

  const toggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (muted && isMusicPlaying) {
      setIsMusicPlaying(false);
    }
  };

  const handleSavePersonalization = (data) => {
    setGfName(data.gfName);
    setNickName(data.nickName);
    setDateLocation(data.dateLocation);
    localStorage.setItem('bday_gf_name', data.gfName);
    localStorage.setItem('bday_nick_name', data.nickName);
    localStorage.setItem('bday_date_location', data.dateLocation);
  };

  // Tap sweet particles anywhere on the screen
  useEffect(() => {
    const emojis = ['🍒', '💖', '🧸', '✨', '🍬', '🌸', '🎀', '🍓', '🥰'];

    const handleTap = (e) => {
      if (
        e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'CANVAS'
      ) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      if (!clientX && !clientY) return;

      const el = document.createElement('div');
      el.className = 'floating-tap-emoji';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${clientX - 14}px`;
      el.style.top = `${clientY - 14}px`;
      document.body.appendChild(el);

      if (Math.random() > 0.45) {
        sound.playPop(520 + Math.random() * 200);
      }

      setTimeout(() => el.remove(), 1100);
    };

    window.addEventListener('click', handleTap, { passive: true });
    window.addEventListener('touchstart', handleTap, { passive: true });

    return () => {
      window.removeEventListener('click', handleTap);
      window.removeEventListener('touchstart', handleTap);
    };
  }, []);

  return (
    <div className="editorial-frame-wrapper">
      {/* Intro Loader Animation Screen */}
      <AnimatePresence>
        {showLoader && (
          <LoaderScreen
            gfName={gfName}
            setIsMusicPlaying={setIsMusicPlaying}
            onComplete={() => {
              setIsMusicPlaying(true);
              setShowLoader(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Candy Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Side Stage Indicator Dots for Clean Section-by-Section Navigation */}
      <StageNavDots />

      {/* Running Vertical Labels for Desktop Editorial Frame (Pinterest Match!) */}
      <div className="vertical-side-label-left">
        Website Design for {gfName || 'My Sweetheart'} · Special Birthday Edition
      </div>
      <div className="vertical-side-label-right">
        Swedish Candy Boutique Celebration · Sweetheart Studio
      </div>

      {/* Section 0: Exact Header from Screenshot (FIND THE CART, BOOK AN EVENT, nectar, CANDY CLUB, BUY CANDY, Bag 0, Scallops) */}
      <Header />

      {/* STAGE 1: Hero Section (The Swedish Candy Cart of Your Dreams) */}
      <HeroEnvelope gfName={gfName} nickName={nickName} />

      {/* STAGE 2: Vintage Photobooth Strip Dispenser Animation */}
      <PhotoboothSection gfName={gfName} nickName={nickName} />

      {/* STAGE 3: Pink Vertical Candy Stripes Section (Mahima's Storybook Album) */}
      <PinkStripedSection
        gfName={gfName}
        nickName={nickName}
      />

      {/* STAGE 4: Grand Finale Date Night Invitation & VIP Boarding Pass */}
      <DateInviteSection
        gfName={gfName}
        dateLocation={dateLocation}
      />

      {/* STAGE 5: Secret Personal Love Letter (Locked with Passcode 7550) */}
      <SecretLetterSection gfName={gfName} />

      {/* Sweet Boutique Editorial Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '44px 16px 28px 16px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #f6ccd5',
          color: 'var(--bordeaux-frame)'
        }}
      >
        <div style={{ fontSize: '24px', marginBottom: '6px' }}>🎀 🍒 🎀</div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600 }}>
          Made with all my heart & soul for {gfName || 'My Cutie'}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px', letterSpacing: '0.5px' }}>
          Best Girlfriend in the Whole Galaxy · Forever & Always ✨
        </p>
      </footer>

      {/* Floating Personalizer Modal (bottom-right) */}
      <PersonalizerModal
        gfName={gfName}
        nickName={nickName}
        dateLocation={dateLocation}
        onSave={handleSavePersonalization}
      />

      {/* Floating Music Box Pill (bottom-left) so Header stays 100% clean and authentic */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid #f6ccd5',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 18px rgba(112, 9, 29, 0.12)',
          zIndex: 900
        }}
      >
        <button
          onClick={toggleMusic}
          title={isMusicPlaying ? 'Pause Melody' : 'Play Birthday Music Box'}
          style={{
            background: isMusicPlaying ? '#70091d' : 'transparent',
            color: isMusicPlaying ? '#ffffff' : '#70091d',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          {isMusicPlaying ? '⏸️' : '🎶'}
        </button>

        <span
          onClick={toggleMusic}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 800,
            color: '#70091d',
            cursor: 'pointer',
            letterSpacing: '0.5px'
          }}
        >
          {isMusicPlaying ? 'MUSIC BOX: ON' : 'PLAY MUSIC BOX'}
        </span>

        <button
          onClick={toggleMute}
          title={isMuted ? 'Unmute' : 'Mute'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            color: '#70091d'
          }}
        >
          {isMuted ? '🔇' : '🔔'}
        </button>
      </motion.div>
    </div>
  );
}
