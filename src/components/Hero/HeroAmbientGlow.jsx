import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GOLDEN_EASE } from '../../animations/variants';

/**
 * HeroAmbientGlow — Large breathing radial glow behind the TECHNOVISTA title.
 * Color syncs to the active day theme accent.
 * Responds slightly to mouse movement for depth.
 */
export default function HeroAmbientGlow({
  accent,
  mouseX = 0,
  mouseY = 0,
  isTouch = false,
  isMobile = false,
  delay = 0.4,
  animateState = 'hidden',
  introPhase = "completed"
}) {
  const px = isTouch ? 0 : mouseX * 0.15;
  const py = isTouch ? 0 : mouseY * 0.15;

  const [isTransitionCompleted] = useState(() => typeof window !== 'undefined' && window.__introTransitionComplete && !window.__startCinematic);

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    fadeout: { opacity: 0, scale: 0.9 },
    beam: { opacity: 0, scale: 0.9 },
    gold_entry: { opacity: 0, scale: 0.9 },
    retract_anchor: { opacity: 0, scale: 0.9 },
    bg_unveil: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } },
    badges_particles: { opacity: 1, scale: 1 },
    reexpand_morph: { opacity: 1, scale: 1 },
    final_cta: { opacity: 1, scale: 1 },
    completed: { opacity: 1, scale: 1, transition: { duration: 0 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0 } },

    refresh_bg: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    refresh_beam: { opacity: 1, scale: 1 },
    refresh_particles: { opacity: 1, scale: 1 },
    refresh_title: { opacity: 1, scale: 1 },
    refresh_settle: { opacity: 1, scale: 1 }
  };
  const glowSize = isMobile ? '400px' : '750px';
  const glowBlur = isMobile ? 'blur(50px)' : 'blur(75px)';

  return (
    <motion.div
      variants={glowVariants}
      initial={isTransitionCompleted && introPhase === "completed" ? "visible" : "hidden"}
      animate={introPhase !== "completed" ? introPhase : animateState}
      className="absolute pointer-events-none z-[1]"
      style={{
        left: '50%',
        top: '48%',
        transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
        willChange: 'transform',
      }}
    >
      <motion.div
        animate={{
          opacity: [0.24, 0.48, 0.24],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: glowSize,
          height: glowSize,
          background: `radial-gradient(circle, ${accent}65 0%, ${accent}25 35%, ${accent}06 70%, transparent 100%)`,
          filter: glowBlur,
          borderRadius: '50%',
          transition: 'background 0.8s ease',
        }}
      />
    </motion.div>
  );
}
