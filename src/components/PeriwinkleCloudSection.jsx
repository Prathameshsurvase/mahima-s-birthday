import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CatCompliments from './CatCompliments';
import ScratchCard from './ScratchCard';
import DateInvite from './DateInvite';

export default function PeriwinkleCloudSection({ gfName, nickName, dateLocation }) {
  return (
    <section id="section-cloud-club" className="stage-section section-periwinkle-cloud">
      {/* Scattered Candy Stickers (Matching Pinterest Bottom Section) */}
      <span className="floating-candy-sticker" style={{ top: '12%', left: '8%', fontSize: '32px' }}>🧸</span>
      <span className="floating-candy-sticker" style={{ bottom: '15%', left: '10%', fontSize: '32px', animationDelay: '1.4s' }}>🐟</span>
      <span className="floating-candy-sticker" style={{ top: '22%', right: '10%', fontSize: '30px', animationDelay: '0.8s' }}>🍒</span>
      <span className="floating-candy-sticker" style={{ bottom: '12%', right: '8%', fontSize: '34px', animationDelay: '2s' }}>🍬</span>

      <div className="candy-container">
        {/* Authentic Scalloped / Wavy Cloud Sheet Card (Pinterest Match!) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="scalloped-wavy-cloud-sheet"
        >
          {/* Top-Right Tilted Red Heart Sticker: "Just a lil something sweet" (Pinterest Match!) */}
          <div
            style={{
              position: 'absolute',
              top: '-24px',
              right: '24px',
              background: '#c9182b',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: '999px',
              fontFamily: 'var(--font-love)',
              fontSize: '19px',
              fontWeight: 700,
              transform: 'rotate(8deg)',
              boxShadow: '0 4px 14px rgba(120, 13, 33, 0.25)',
              zIndex: 15,
              border: '2px solid #ffffff'
            }}
          >
            Just a lil something sweet 💖
          </div>

          {/* Top Center Pill Tag: MONTHLY CANDY SUBSCRIPTION (Pinterest Match!) */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#fdeef1',
                color: 'var(--cherry-red)',
                border: '1px solid #f6ccd5',
                padding: '4px 18px',
                borderRadius: '999px',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              MONTHLY CANDY & LOVE SUBSCRIPTION
            </span>

            {/* Headline matching "Join the Nectar Candy Club" */}
            <h2
              className="editorial-serif-headline"
              style={{
                fontSize: 'clamp(32px, 5vw, 54px)',
                color: 'var(--bordeaux-frame)',
                marginBottom: '6px'
              }}
            >
              Join the Sweetheart Candy Club
            </h2>

            {/* Subhead Price matching "$25/month" */}
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(24px, 3.5vw, 32px)',
                color: 'var(--bordeaux-frame)',
                fontWeight: 600,
                marginBottom: '14px'
              }}
            >
              $0/forever · UNLIMITED LOVE
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(14px, 2vw, 17px)',
                color: 'var(--text-muted)',
                lineHeight: 1.55,
                maxWidth: '600px',
                margin: '0 auto 36px auto'
              }}
            >
              Candy concierge-guided tastings, a mix-your-own treats bag for every celebration, and a lifetime love subscription reserved exclusively for <strong style={{ color: 'var(--cherry-red)' }}>{gfName || 'My Cutie'}</strong>.
            </p>

            {/* Responsive Duo Grid inside Cloud Card: Cat Compliments & Scratch Coupon */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '28px'
              }}
            >
              <CatCompliments />
              <ScratchCard gfName={gfName} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

