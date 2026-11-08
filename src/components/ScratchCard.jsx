import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function ScratchCard({ gfName }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    const initCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Draw shimmering bordeaux & cherry foil cover
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#c9182b');
      grad.addColorStop(0.4, '#fad5df');
      grad.addColorStop(0.7, '#c9182b');
      grad.addColorStop(1, '#7b0f24');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cute dots pattern on foil
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      for (let x = 12; x < canvas.width; x += 22) {
        for (let y = 12; y < canvas.height; y += 22) {
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Title & Instruction
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px "Fraunces", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✨ Scratch for a Secret Treat ✨', canvas.width / 2, canvas.height / 2 - 10);

      ctx.font = '13px "Outfit", sans-serif';
      ctx.fillText('( rub with your finger 🐾 )', canvas.width / 2, canvas.height / 2 + 18);
    };

    initCanvas();

    const scratchAt = (clientX, clientY) => {
      if (isRevealed) return;
      const r = canvas.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      // Check scratched percentage periodically
      if (Math.random() > 0.6) {
        checkPercentage();
      }
    };

    const checkPercentage = () => {
      if (isRevealed) return;
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imgData.data;
        let transparent = 0;
        const total = pixels.length / 4;

        for (let i = 3; i < pixels.length; i += 16) {
          if (pixels[i] === 0) transparent += 4;
        }

        if (transparent / total > 0.45) {
          revealAll();
        }
      } catch (err) {
        // Fallback
      }
    };

    const revealAll = () => {
      if (isRevealed) return;
      setIsRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sound.playSparkle();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#c9182b', '#7b0f24', '#fcecef', '#fbd5c5', '#c4d4f8']
      });
    };

    // Mouse Events
    const onMouseDown = (e) => {
      isDrawing.current = true;
      scratchAt(e.clientX, e.clientY);
    };

    const onMouseMove = (e) => {
      if (!isDrawing.current) return;
      scratchAt(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      isDrawing.current = false;
      checkPercentage();
    };

    // Touch Events (Mobile Optimized with touch-action none)
    const onTouchStart = (e) => {
      isDrawing.current = true;
      const touch = e.touches[0];
      scratchAt(touch.clientX, touch.clientY);
    };

    const onTouchMove = (e) => {
      if (!isDrawing.current) return;
      const touch = e.touches[0];
      scratchAt(touch.clientX, touch.clientY);
    };

    const onTouchEnd = () => {
      isDrawing.current = false;
      checkPercentage();
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });

    window.addEventListener('resize', initCanvas);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', initCanvas);
    };
  }, [isRevealed]);

  const instantReveal = () => {
    setIsRevealed(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    sound.playSparkle();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c9182b', '#7b0f24', '#fcecef', '#fbd5c5']
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="clean-scrapbook-card"
      style={{ textAlign: 'center', width: '100%' }}
    >
      <div className="washi-tape-strip washi-tape-red" />

      <span className="editorial-tag">
        STEP 6: SECRET COUPON
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
        Scratch-To-Reveal Prize ✨
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '18px' }}>
        Rub the metallic card to uncover your VIP girlfriend voucher!
      </p>

      {/* Card Wrapper with Canvas Overlay */}
      <div
        ref={containerRef}
        style={{
          maxWidth: '360px',
          width: '100%',
          height: '175px',
          margin: '0 auto 16px auto',
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
          border: '2px solid #f2d6dc'
        }}
      >
        {/* Hidden Prize Message Underneath */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #fff5f7 0%, #fae6ec 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            textAlign: 'center',
            border: '2px dashed var(--cherry-red)',
            borderRadius: '18px'
          }}
        >
          <span style={{ fontSize: '28px', marginBottom: '4px' }}>🎟️</span>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', color: 'var(--bordeaux)', fontWeight: 600 }}>
            LIFETIME HUG & KISS PASS
          </h4>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, color: 'var(--cherry-red)', marginTop: '4px' }}>
            VALID FOR: {gfName ? gfName.toUpperCase() : 'MY CUTIE'} · NEVER EXPIRES
          </p>
          <p style={{ fontFamily: 'var(--font-note)', fontSize: '15px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Redeemable anytime for forehead kisses, sweet snacks, or a big warm hug!
          </p>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            cursor: isRevealed ? 'default' : 'crosshair',
            touchAction: 'none' // Crucial for mobile smooth scratching without page scrolling!
          }}
        />
      </div>

      {/* Scratch Help or Reveal Button */}
      <div style={{ minHeight: '36px' }}>
        {!isRevealed ? (
          <button
            onClick={instantReveal}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--cherry-red)',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '6px'
            }}
          >
            Can't scratch? Tap here to reveal! ✨
          </button>
        ) : (
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--bordeaux)' }}>
            🎉 Prize Unlocked & Saved to your Birthday Bag!
          </span>
        )}
      </div>
    </motion.div>
  );
}
