import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

// Curated 15 photos of Mahima - Optimal photobooth reel length
const MAHIMA_PHOTOS_15 = [
  { id: 1, url: './assets/images/mahima_01.jpg', caption: 'The prettiest smile in the universe ✨', tag: 'MAHIMA · QUEEN' },
  { id: 2, url: './assets/images/mahima_02.jpg', caption: 'Festival radiance & pure joy 🌸', tag: 'PURE MAGIC' },
  { id: 3, url: './assets/images/mahima_03.jpg', caption: 'Candid laughter that lights my world 💕', tag: 'SWEETEST LAUGH' },
  { id: 4, url: './assets/images/mahima_04.jpg', caption: 'Forever my favorite view 👑', tag: 'PERFECT' },
  { id: 5, url: './assets/images/mahima_05.jpg', caption: 'Effortless beauty in every glance 🍒', tag: 'IRREPLACEABLE' },
  { id: 6, url: './assets/images/mahima_06.jpg', caption: 'Little moments, endless love 💖', tag: 'MY HAPPINESS' },
  { id: 7, url: './assets/images/mahima_07.jpg', caption: 'Your happiness is my favorite thing 🎀', tag: 'ENDLESS LOVE' },
  { id: 8, url: './assets/images/mahima_08.jpg', caption: 'Every smile of yours is treasure 🌸', tag: 'MY SWEETHEART' },
  { id: 9, url: './assets/images/mahima_09.jpg', caption: 'Golden glow & warmest heart ✨', tag: 'RADIANT' },
  { id: 10, url: './assets/images/mahima_10.jpg', caption: 'Cutest energy always 🧸', tag: 'PRECIOUS' },
  { id: 11, url: './assets/images/mahima_11.jpg', caption: 'Dancing through life with you 💃', tag: 'SO IN LOVE' },
  { id: 12, url: './assets/images/mahima_12.jpg', caption: 'Forever and always yours 💕', tag: 'ETERNAL' },
  { id: 13, url: './assets/images/mahima_13.jpg', caption: 'Eyes full of stars & kindness ✨', tag: 'STARRY EYES' },
  { id: 14, url: './assets/images/mahima_14.jpg', caption: 'My peace, my warmth, my home 🏡', tag: 'MY HOME' },
  { id: 15, url: './assets/images/mahima_15.jpg', caption: 'Special Birthday Edition for Mahima 🎀', tag: 'BIRTHDAY QUEEN' }
];

export default function PhotoboothSection({ gfName = 'Mahima', nickName = 'Princess' }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [hasPrinted, setHasPrinted] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printKey, setPrintKey] = useState(0);

  // Trigger print sequence with mechanical stepper audio & confetti
  const handlePrint = () => {
    if (isPrinting) return;
    setIsPrinting(true);
    setHasPrinted(true);
    setPrintKey(prev => prev + 1);

    let tick = 0;
    const interval = setInterval(() => {
      sound.playPop(680 + (tick % 5) * 45);
      tick++;
      if (tick >= 16) {
        clearInterval(interval);
        setTimeout(() => {
          sound.playSparkle();
          confetti({
            particleCount: 95,
            spread: 90,
            origin: { y: 0.45 },
            colors: ['#c9182b', '#780d21', '#fbd6c6', '#fad5df', '#ffffff']
          });
          setIsPrinting(false);
        }, 300);
      }
    }, 125);
  };

  return (
    <section
      id="section-calendar"
      className="stage-section section-red-binder"
      style={{
        position: 'relative',
        backgroundColor: '#c9182b',
        width: '100%',
        padding: '70px 16px 90px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden'
      }}
    >
      <div className="candy-container" style={{ textAlign: 'center', position: 'relative', zIndex: 10, width: '100%' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '680px', margin: '0 auto 24px auto', textAlign: 'center' }}>
          <span
            className="editorial-parentheses-tag"
            style={{ color: '#ffffff', opacity: 0.9, marginBottom: '6px', fontSize: '11px' }}
          >
            VINTAGE PHOTOBOOTH · 15 MEMORIES
          </span>

          <h2
            className="editorial-serif-headline"
            style={{
              fontSize: 'clamp(28px, 4.5vw, 46px)',
              color: '#ffffff',
              marginBottom: '10px',
              lineHeight: 1.15
            }}
          >
            {hasPrinted ? `Freshly Printed for ${gfName} 💕` : `${gfName}'s Vintage Photobooth`}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(13px, 1.8vw, 16px)',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '560px',
              margin: '0 auto 18px auto',
              lineHeight: 1.5
            }}
          >
            {hasPrinted
              ? `Scroll down through the photobooth strip to see all 15 sweet memories of ${gfName}! Tap any photo to enlarge.`
              : `Click the print button below to dispense ${gfName}'s photobooth strip from the machine! 🖨️`}
          </p>

          {/* Action Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={!hasPrinted ? { scale: [1, 1.04, 1] } : undefined}
              transition={!hasPrinted ? { repeat: Infinity, duration: 2, ease: 'easeInOut' } : undefined}
              onClick={handlePrint}
              disabled={isPrinting}
              className="boutique-pill-btn boutique-pill-blue"
              style={{
                fontSize: '13px',
                padding: '11px 24px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: !hasPrinted ? '0 8px 25px rgba(255, 255, 255, 0.35)' : '0 6px 20px rgba(0, 0, 0, 0.25)',
                cursor: 'pointer'
              }}
            >
              <span>🖨️</span> {isPrinting ? 'DISPENSING PHOTO STRIP...' : hasPrinted ? 'PRINT AGAIN ✨' : 'PRINT PHOTO STRIP ✨'}
            </motion.button>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                padding: '8px 18px',
                borderRadius: '999px',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '1px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: hasPrinted ? '#2ec4b6' : '#ffd166',
                  boxShadow: hasPrinted ? '0 0 8px #2ec4b6' : '0 0 8px #ffd166',
                  display: 'inline-block'
                }}
              />
              <span>{hasPrinted ? 'ALL 15 PHOTOS PRINTED 🎞️' : 'READY TO PRINT 🖨️'}</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            THE WIDE, FULL-WIDTH PHOTOBOOTH DISPENSER MACHINE
            Layer 1 (Z-index 5): Base plate with dark slit opening
            Layer 2 (Z-index 15): Continuous paper strip with ALL 15 photos
            Layer 3 (Z-index 25): Top hood hiding paper above the slit
            ======================================================== */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(340px, 94vw, 560px)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* LAYER 1: BASE BEZEL PLATE WITH DARK SLIT OPENING (Z-INDEX: 5) */}
          <div
            style={{
              width: '100%',
              height: '52px',
              background: 'linear-gradient(180deg, #ffffff 0%, #f6ece7 100%)',
              border: '2px solid #ecdcd6',
              borderRadius: '18px',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35), inset 0 2px 3px rgba(255, 255, 255, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
              position: 'relative',
              zIndex: 5
            }}
          >
            {/* Left Screw Rivet */}
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#d1c2bc',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
                border: '1px solid #bba8a0'
              }}
            />

            {/* The Black Slit Cavity (Behind paper) */}
            <div
              style={{
                flex: 1,
                height: '16px',
                margin: '0 16px',
                background: '#0d0d0d',
                borderRadius: '8px',
                boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.95)',
                position: 'relative'
              }}
            />

            {/* Right Screw Rivet */}
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#d1c2bc',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
                border: '1px solid #bba8a0'
              }}
            />
          </div>

          {/* LAYER 2: THE EMERGING PHOTO STRIP (Z-INDEX: 15) */}
          {/* Top edge starts at y = 26px (inside the slit). Overflow: hidden strictly clips anything above! */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              marginTop: '-34px', // Aligns top of viewport with the top edge of the slit
              overflow: 'hidden',  // CRITICAL: CLIPS ALL PAPER ABOVE THE SLIT LINE!
              zIndex: 15,
              paddingTop: '8px',
              paddingBottom: '20px'
            }}
          >
            {!hasPrinted ? (
              /* Starter Ticket Slip Peeking Out of the Slit Before Print */
              <motion.div
                onClick={handlePrint}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: 'clamp(280px, 80vw, 440px)',
                  background: '#ffffff',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)',
                  position: 'relative',
                  padding: '16px 20px 22px 20px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  userSelect: 'none'
                }}
                title="Click to print the photobooth strip!"
              >
                {/* Left Stamp Scallop Perforations */}
                <svg
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: '10px',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 10
                  }}
                >
                  <defs>
                    <pattern id="stampCutoutLeftStarter" width="10" height="22" patternUnits="userSpaceOnUse">
                      <circle cx="0" cy="11" r="5" fill="#c9182b" />
                    </pattern>
                  </defs>
                  <rect width="10" height="100%" fill="url(#stampCutoutLeftStarter)" />
                </svg>

                {/* Right Stamp Scallop Perforations */}
                <svg
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 10
                  }}
                >
                  <defs>
                    <pattern id="stampCutoutRightStarter" width="10" height="22" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="11" r="5" fill="#c9182b" />
                    </pattern>
                  </defs>
                  <rect width="10" height="100%" fill="url(#stampCutoutRightStarter)" />
                </svg>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px' }}>🖨️</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: 'var(--cherry-red)',
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase'
                    }}
                  >
                    CLICK "PRINT" TO DISPENSE 15 PHOTOS 🎞️
                  </span>
                </div>

                {/* Serrated Bottom Tear Edge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: 0,
                    right: 0,
                    height: '10px',
                    background: 'linear-gradient(135deg, transparent 5px, #ffffff 5px), linear-gradient(-135deg, transparent 5px, #ffffff 5px)',
                    backgroundSize: '16px 10px',
                    backgroundRepeat: 'repeat-x'
                  }}
                />
              </motion.div>
            ) : (
              /* Animated Photobooth Film Strip - Containing ALL 15 PHOTOS */
              <motion.div
                key={printKey}
                initial={{ y: -800, opacity: 0.3 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: 'clamp(310px, 88vw, 510px)',
                  background: '#ffffff',
                  boxShadow: '0 24px 55px rgba(0, 0, 0, 0.38)',
                  position: 'relative',
                  padding: '18px 18px 30px 18px',
                  userSelect: 'none'
                }}
              >
                {/* Left Stamp Scallop Perforation Cutouts */}
                <svg
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: '10px',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 10
                  }}
                >
                  <defs>
                    <pattern id="stampCutoutLeft" width="10" height="22" patternUnits="userSpaceOnUse">
                      <circle cx="0" cy="11" r="5" fill="#c9182b" />
                    </pattern>
                  </defs>
                  <rect width="10" height="100%" fill="url(#stampCutoutLeft)" />
                </svg>

                {/* Right Stamp Scallop Perforation Cutouts */}
                <svg
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 10
                  }}
                >
                  <defs>
                    <pattern id="stampCutoutRight" width="10" height="22" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="11" r="5" fill="#c9182b" />
                    </pattern>
                  </defs>
                  <rect width="10" height="100%" fill="url(#stampCutoutRight)" />
                </svg>

                {/* Top Strip Header Tag */}
                <div
                  style={{
                    borderBottom: '1.5px dashed #f2cfd7',
                    paddingBottom: '8px',
                    marginBottom: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '1.5px',
                      color: 'var(--cherry-red)',
                      textTransform: 'uppercase'
                    }}
                  >
                    MAHIMA'S PHOTOBOOTH · 15 SWEET MEMORIES
                  </span>
                  <span style={{ fontSize: '14px' }}>🎞️</span>
                </div>

                {/* ALL 15 PHOTO FRAMES IN ONE CONTINUOUS REEL */}
                {MAHIMA_PHOTOS_15.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => {
                    sound.playPop(650);
                    setSelectedPhoto(photo);
                  }}
                  style={{
                    background: '#fcf8f6',
                    border: '1.5px solid #f2dbdc',
                    borderRadius: '6px',
                    padding: '6px',
                    marginBottom: '18px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  title="Click to view memory in full resolution 💕"
                >
                  {/* Photo Container - Large & prominent! */}
                  <div
                    style={{
                      width: '100%',
                      height: 'clamp(240px, 48vw, 400px)',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      position: 'relative',
                      backgroundColor: '#f2dbdc'
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      loading="lazy"
                      onError={(e) => {
                        if (!e.target.dataset.triedFallback) {
                          e.target.dataset.triedFallback = '1';
                          e.target.src = `./assets/images/MAHIMA/mahima_${String(photo.id).padStart(2, '0')}.jpg`;
                        } else if (e.target.dataset.triedFallback === '1') {
                          e.target.dataset.triedFallback = '2';
                          e.target.src = './assets/images/gf_garba_smile.jpg';
                        }
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 20%',
                        display: 'block'
                      }}
                    />
                    {/* Subtle Vintage Photo Reflection */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
                        pointerEvents: 'none'
                      }}
                    />
                    {/* Frame Number Tag Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(6px)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '10px',
                        fontWeight: 800,
                        color: 'var(--cherry-red)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    >
                      #{index + 1} OF 15
                    </div>
                  </div>

                  {/* Caption & Tag beneath photo */}
                  <div
                    style={{
                      padding: '8px 6px 4px 6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '10px',
                          fontWeight: 800,
                          color: 'var(--cherry-red)',
                          letterSpacing: '0.8px',
                          display: 'block',
                          textTransform: 'uppercase'
                        }}
                      >
                        {photo.tag}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-note)',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'var(--bordeaux-frame)',
                          display: 'block',
                          marginTop: '2px'
                        }}
                      >
                        {photo.caption}
                      </span>
                    </div>
                    <span style={{ fontSize: '14px' }}>💖</span>
                  </div>
                </motion.div>
              ))}

              {/* Strip Footer: Script "Photo Dump" & Hearts */}
              <div style={{ textAlign: 'center', marginTop: '16px', paddingBottom: '8px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-love)',
                    fontSize: 'clamp(32px, 6vw, 42px)',
                    color: 'var(--bordeaux-frame)',
                    transform: 'rotate(-2deg)',
                    lineHeight: 1.1,
                    textShadow: '0 1px 2px rgba(120, 13, 33, 0.1)'
                  }}
                >
                  Photo Dump ✨
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: 'var(--cherry-red)',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginTop: '4px'
                  }}
                >
                  Forever & Always · {gfName} 💕
                </div>
              </div>

              {/* Serrated Bottom Tear Edge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: 0,
                  right: 0,
                  height: '10px',
                  background: 'linear-gradient(135deg, transparent 5px, #ffffff 5px), linear-gradient(-135deg, transparent 5px, #ffffff 5px)',
                  backgroundSize: '16px 10px',
                  backgroundRepeat: 'repeat-x'
                }}
              />
            </motion.div>
          )}
        </div>

        {/* LAYER 3: TOP HOOD / TOP LIP OF THE MACHINE BEZEL (Z-INDEX: 25) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '26px',
            background: 'linear-gradient(180deg, #ffffff 0%, #f6ece7 100%)',
            borderTop: '2px solid #ecdcd6',
            borderLeft: '2px solid #ecdcd6',
            borderRight: '2px solid #ecdcd6',
            borderTopLeftRadius: '18px',
            borderTopRightRadius: '18px',
            borderBottom: '1px solid #1a1a1a',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.18)',
            pointerEvents: 'none',
            zIndex: 25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px'
          }}
        >
          {/* Top half of Left Screw */}
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#d1c2bc',
              border: '1px solid #bba8a0'
            }}
          />

          {/* Slit Top Lip Shadow Cast Downwards onto Emerging Paper */}
          <div
            style={{
              flex: 1,
              margin: '0 16px',
              height: '2px',
              background: 'rgba(0, 0, 0, 0.7)'
            }}
          />

          {/* Top half of Right Screw */}
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#d1c2bc',
              border: '1px solid #bba8a0'
            }}
          />
        </div>
      </div>

      {/* Teaser note when not printed yet */}
      {!hasPrinted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            marginTop: '32px',
            color: '#ffffff',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-love)',
              fontSize: 'clamp(24px, 3.8vw, 32px)',
              margin: '0 0 8px 0',
              transform: 'rotate(-1deg)',
              textShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            Click "PRINT PHOTO STRIP" to dispense her memories! 💖
          </p>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '1.2px',
              opacity: 0.9,
              textTransform: 'uppercase'
            }}
          >
            15 SPECIAL MOMENTS WAITING INSIDE THE VINTAGE MACHINE 🎞️
          </span>
        </motion.div>
      )}
    </div>

      {/* Lightbox Modal for Photo Inspection */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(50, 5, 15, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '460px',
                width: '100%',
                background: '#ffffff',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '16px',
                  background: '#fdeef1',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontWeight: 800,
                  color: 'var(--cherry-red)'
                }}
              >
                ✕
              </button>

              <div
                style={{
                  width: '100%',
                  maxHeight: '380px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  backgroundColor: '#fdeef1'
                }}
              >
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  onError={(e) => {
                    e.target.src = './assets/images/gf_garba_smile.jpg';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  color: 'var(--cherry-red)',
                  textTransform: 'uppercase'
                }}
              >
                {selectedPhoto.tag}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '22px',
                  color: 'var(--bordeaux-frame)',
                  margin: '8px 0 6px 0'
                }}
              >
                {selectedPhoto.caption}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-note)',
                  fontSize: '16px',
                  color: 'var(--berry-text)',
                  lineHeight: 1.5
                }}
              >
                “Every moment spent with you becomes a treasured memory I replay with a smile.”
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
