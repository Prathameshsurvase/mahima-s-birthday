import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

export default function StageNavDots() {
  const [activeSection, setActiveSection] = useState('section-hero');

  const stages = [
    { id: 'section-hero', title: 'The Candy Cart 🍒' },
    { id: 'section-calendar', title: 'Photobooth Memories 📸' },
    { id: 'section-treats', title: 'Storybook Album 📖' },
    { id: 'section-vip-pass', title: 'VIP Date Night 🎟️' },
    { id: 'section-secret-letter', title: 'Secret Love Letter 💌' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = stages.length - 1; i >= 0; i--) {
        const el = document.getElementById(stages[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(stages[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    sound.playPop(520);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="side-stage-dots">
      {stages.map((stage) => {
        const isActive = activeSection === stage.id;
        return (
          <button
            key={stage.id}
            onClick={() => scrollToSection(stage.id)}
            title={stage.title}
            className={`stage-dot-btn ${isActive ? 'active' : ''}`}
            style={{
              outline: 'none',
              position: 'relative'
            }}
          />
        );
      })}
    </div>
  );
}

