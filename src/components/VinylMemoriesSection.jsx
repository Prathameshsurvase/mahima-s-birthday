import React from 'react';
import { motion } from 'framer-motion';
import VinylPlayer from './VinylPlayer';
import PolaroidGallery from './PolaroidGallery';

export default function VinylMemoriesSection({ isMusicPlaying, onToggleMusic, nickName }) {
  return (
    <section id="section-vinyl-memories" className="stage-section section-plain-blush">
      <div className="candy-container">
        {/* Stage Header with Ample Breathing Room */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '44px' }}
        >
          <span className="editorial-parentheses-tag">
            TRACKS & CAPTURED MOMENTS
          </span>
          <h2
            className="editorial-serif-headline"
            style={{
              fontSize: 'clamp(32px, 5vw, 50px)',
              color: 'var(--bordeaux-frame)',
              marginBottom: '10px'
            }}
          >
            Songs That Sound Like You
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 2vw, 17px)',
              color: 'var(--text-muted)',
              maxWidth: '520px',
              margin: '0 auto'
            }}
          >
            Every melody has your smile written all over it. Spin the record, dance along, and flip through our sweetest memories.
          </p>
        </motion.div>

        {/* Spacious 2-Column Duo Grid: Vinyl Turntable & Polaroid Vault */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'start'
          }}
        >
          {/* Turntable Player */}
          <VinylPlayer
            isPlaying={isMusicPlaying}
            onTogglePlay={onToggleMusic}
            nickName={nickName}
          />

          {/* Polaroid Memories */}
          <PolaroidGallery />
        </div>
      </div>
    </section>
  );
}

