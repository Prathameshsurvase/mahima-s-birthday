import React from 'react';
import FolioFlow from './FolioFlow';

const MAHIMA_ALBUM_PAGES = [
  {
    title: "Festival Magic 🪔",
    note: "Dressed in vibrant colors, outshining every single light in the palace grounds.",
    date: "Garba Night ✨",
    video: "./assets/videos/mahima_video_01.mp4",
    image: { src: "./assets/images/gf_garba_smile.jpg", alt: "Mahima smiling brightly" }
  },
  {
    title: "Peace & Perfection ✌️",
    note: "That iconic peace sign and the sparkle in your eyes that always melts my heart.",
    date: "Sweetest Pose 💕",
    video: "./assets/videos/mahima_video_02.mp4",
    image: { src: "./assets/images/gf_peace_closeup.jpg", alt: "Mahima peace sign" }
  },
  {
    title: "Golden Hour Glow 🌸",
    note: "Sunlight hitting your face, effortless grace and the sweetest smile ever.",
    date: "Unforgettable ✨",
    image: { src: "./assets/images/mahima_01.jpg", alt: "Mahima golden glow" }
  },
  {
    title: "Radiant & Playful 🍓",
    note: "Every laugh with you feels like pure sunshine. You bring so much joy into my life.",
    date: "Pure Joy 🥰",
    image: { src: "./assets/images/mahima_02.jpg", alt: "Mahima laughing" }
  },
  {
    title: "Twin Souls 💖",
    note: "Standing right beside you, right where I always want to be. My happiest moments are with you.",
    date: "Together Forever 🍒",
    image: { src: "./assets/images/mahima_05.jpg", alt: "Mahima and me" }
  },
  {
    title: "Festive Vibes 💃",
    note: "The rhythm of the music, the swirling colors, and my eyes couldn't leave you.",
    date: "Garba Celebration ✨",
    video: "./assets/videos/mahima_video_03.mp4",
    image: { src: "./assets/images/gf_garba_laugh.jpg", alt: "Mahima garba celebration" }
  },
  {
    title: "The Cutest Stare 👀",
    note: "Caught in the moment. Just looking at you makes any bad day disappear instantly.",
    date: "My Favorite View 🎀",
    image: { src: "./assets/images/mahima_08.jpg", alt: "Mahima cute gaze" }
  },
  {
    title: "Candid Perfection 📸",
    note: "No filters, no posing, just natural beauty that leaves me speechless every time.",
    date: "Naturally Gorgeous ✨",
    image: { src: "./assets/images/mahima_10.jpg", alt: "Mahima candid" }
  },
  {
    title: "Side Profile Elegance ✨",
    note: "Grace in every turn, magic in every heartbeat. Truly the girl of my dreams.",
    date: "Timeless Beauty 🕊️",
    image: { src: "./assets/images/gf_garba_side.jpg", alt: "Mahima side profile" }
  },
  {
    title: "Playful Heart 🎀",
    note: "The silly expressions, the giggles, the cutest girl in the entire universe.",
    date: "My Cutie Forever 💖",
    image: { src: "./assets/images/gf_pink_playful.jpg", alt: "Mahima playful moment" }
  },
  {
    title: "Cherished Moments 🍒",
    note: "Every picture holds a thousand memories and a promise of millions more to come.",
    date: "Happy Birthday Mahima 🎂",
    image: { src: "./assets/images/mahima_12.jpg", alt: "Mahima special moment" }
  },
  {
    title: "Infinite Love 💫",
    note: "Another year more beautiful, more kind, and more loved than ever before.",
    date: "Forever Yours 💕",
    image: { src: "./assets/images/mahima_15.jpg", alt: "Mahima birthday love" }
  }
];

export default function PinkStripedSection({ gfName, nickName, isMusicPlaying, onToggleMusic }) {
  return (
    <>
      <section id="section-treats" className="stage-section section-pink-stripes">
        <div className="candy-container" style={{ maxWidth: '1180px' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="editorial-parentheses-tag">
              OUR SWEETEST MEMORIES · STORYBOOK OF US
            </span>

            <h2
              className="editorial-serif-headline"
              style={{
                fontSize: 'clamp(32px, 5vw, 54px)',
                color: 'var(--bordeaux-frame)',
                margin: '14px 0 8px 0',
                lineHeight: 1.15
              }}
            >
              {gfName}'s Storybook Album 📖✨
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(14px, 2vw, 17px)',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                maxWidth: '560px',
                margin: '0 auto'
              }}
            >
              Flip through our favourite memories, smiles, and celebrations together.
              Drag or click the pages to turn them like a real storybook!
            </p>
          </div>

          {/* Interactive 3D FolioFlow Book / Album Component */}
          <div
            style={{
              width: '100%',
              maxWidth: '1140px',
              height: 'clamp(460px, 68vh, 680px)',
              margin: '0 auto 24px auto',
              position: 'relative'
            }}
          >
            <FolioFlow
              items={MAHIMA_ALBUM_PAGES}
              layout="auto"
              singleBelow={720}
              startPage={1}
              bookSize={100}
              paperColor="#FFFDF8"
              endpaperColor="#FCECEE"
              inkColor="#780d21"
              accentColor="#c9182b"
              showControls={false}
              draggable={true}
              wheel={true}
            />
          </div>
        </div>
      </section>

      {/* Burgundy & White Checkered Sawtooth Ribbon Divider */}
      <div className="checkered-sawtooth-divider" />
    </>
  );
}
