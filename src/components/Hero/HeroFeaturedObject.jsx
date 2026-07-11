import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOLDEN_EASE } from '../../animations/variants';

// Featured object assets per day
import waypoints from '../../assets/hero/waypoints.svg';
import aiChip from '../../assets/hero/ai-chip.webp';
import bot from '../../assets/hero/bot.svg';

const FEATURED_MAP = {
  explore: { src: waypoints, alt: 'Explore — Waypoints' },
  create: { src: aiChip, alt: 'Create — AI Chip' },
  celebrate: { src: bot, alt: 'Celebrate — Achievement' },
};

/**
 * HeroFeaturedObject — A single larger (1.5×) object near the title.
 * Changes based on active day theme. Stronger glow + parallax.
 */
export default function HeroFeaturedObject({
  isMobile = false,
  themeName,
  accent,
  mouseX = 0,
  mouseY = 0,
  isTouch = false,
  delay = 0.6,
  animateState = 'hidden',
}) {
  const featured = FEATURED_MAP[themeName] || FEATURED_MAP.explore;

  const depth = 0.8;
  const px = isTouch ? 0 : mouseX * depth * 2.5;
  const py = isTouch ? 0 : mouseY * depth * 2.5;
  const shadowX = isTouch ? 0 : -mouseX * depth * 0.5;
  const shadowY = isTouch ? 0 : -mouseY * depth * 0.5;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.8, delay, ease: GOLDEN_EASE }
    }
  };

  const rotMouse = isTouch ? 0 : (mouseX - mouseY) * depth * 0.22;
  const scaleMouse = isTouch ? 1 : 1 + Math.abs(mouseX + mouseY) * 0.0008;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={animateState}
      className="absolute z-[2] pointer-events-none"
      style={{
        left: isMobile ? '50%' : 'auto',
        right: isMobile ? 'auto' : '14%',
        top: isMobile ? '81%' : '40%',
        x: isMobile ? '-50%' : px,
        y: isMobile ? '-50%' : py,
        rotate: isMobile ? 0 : rotMouse,
        scale: isMobile ? 1 : scaleMouse,
        willChange: 'transform',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={themeName}
          src={featured.src}
          alt={featured.alt}
          draggable={false}
          initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
          animate={{
            opacity: [0.32, 0.42, 0.32],
            scale: [1, 1.03, 1],
            y: [0, -15, 0],
            rotate: [-1.5, 1.5, -1.5],
          }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
          transition={{
            opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="select-none"
          style={{
            width: isMobile ? '55px' : '80px',
            height: isMobile ? '55px' : '80px',
            filter: `
              drop-shadow(${shadowX}px ${shadowY}px 12px rgba(0,0,0,0.06))
              drop-shadow(0 0 28px ${accent}45)
            `,
            transition: 'filter 0.8s ease',
          }}
        />
      </AnimatePresence>
    </motion.div>
  );
}
