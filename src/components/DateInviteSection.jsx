import React from 'react';
import { motion } from 'framer-motion';
import DateInvite from './DateInvite';

export default function DateInviteSection({ gfName, dateLocation }) {
  return (
    <section id="section-vip-pass" className="stage-section section-plain-cream">
      <div className="candy-container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '640px', margin: '0 auto' }}
        >
          <DateInvite gfName={gfName} dateLocation={dateLocation} />
        </motion.div>
      </div>
    </section>
  );
}

