import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useHeroScroll } from '../../contexts/HeroScrollContext';

/**
 * VolumetricBeam — Renders a soft, architectural light beam.
 * Simulates a high-performance spotlight projecting a warm amber light cone.
 */
export default function VolumetricBeam({ animateState = 'hidden', isMobile = false, introPhase = "completed" }) {
  const sceneProgress = useHeroScroll();
  // Fade out spotlight between scroll progress 0 (start) and 0.45 (before About slides in)
  const beamScrollOpacity = useTransform(sceneProgress, [0, 0.45], [1, 0]);

  const [isTransitionCompleted] = useState(() => typeof window !== 'undefined' && window.__introTransitionComplete && !window.__startCinematic);

  const beamVariants = {
    hidden: { opacity: 0, scaleX: 0.90, scaleY: 0 },
    fadeout: { opacity: 0, scaleX: 0.90, scaleY: 0 },
    beam: {
      opacity: 0.90,
      scaleY: 1.0,
      scaleX: 1.0,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
    gold_entry: { opacity: 0.95, scaleY: 1.05, scaleX: 1.05, y: 0 },
    retract_anchor: {
      opacity: 0.70,
      scaleY: 0.88,
      scaleX: 0.88,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    },
    bg_unveil: { opacity: 0.75, scaleY: 0.90, scaleX: 0.90, y: 0 },
    badges_particles: { opacity: 0.75, scaleY: 0.90, scaleX: 0.90, y: 0 },
    reexpand_morph: {
      opacity: 0.85,
      scaleY: 1.0,
      scaleX: 1.0,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    },
    final_cta: { opacity: 0.85, scaleX: 1.0, scaleY: 1.0 },
    completed: { opacity: 0.85, scaleX: 1.0, scaleY: 1.0, transition: { duration: 0 } },
    visible: { opacity: 0.85, scaleX: 1.0, scaleY: 1.0, transition: { duration: 0 } },

    refresh_bg: { opacity: 0, scaleX: 0.9, scaleY: 0 },
    refresh_beam: { opacity: 0.85, scaleX: 1.0, scaleY: 1.0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    refresh_particles: { opacity: 0.85, scaleX: 1.0, scaleY: 1.0 },
    refresh_title: { opacity: 0.85, scaleX: 1.0, scaleY: 1.0 },
    refresh_settle: { opacity: 0.85, scaleX: 1.0, scaleY: 1.0 }
  };

  return (
    <motion.div
      variants={beamVariants}
      initial={isTransitionCompleted && introPhase === "completed" ? "visible" : "hidden"}
      animate={introPhase !== "completed" ? introPhase : animateState}
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        transformOrigin: 'top center',
        mixBlendMode: 'screen',
        opacity: beamScrollOpacity,
      }}
    >
      {/* Rotating, Breathing, and Floating spotlight cone */}
        <motion.div
          className={
            isMobile
              ? "absolute top-[-15vh] left-1/2 w-[170vw] h-[140vh] pointer-events-none"
              : "absolute top-[-15vh] left-1/2 w-[45vw] md:w-[60vw] lg:w-[70vw] h-[150vh] pointer-events-none"
          }
          style={{
            x: '-50%',
            transformOrigin: 'top center',
            rotate: isMobile || introPhase !== "completed" ? '0deg' : 'var(--tv-beam-angle, 0deg)',
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0.93, 1.07, 0.93],
            scale: [0.998, 1.002, 0.998],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className={
              isMobile
                ? "w-full h-full opacity-[0.38]"
                : "w-full h-full opacity-[0.38] md:opacity-[0.44] lg:opacity-[0.48]"
            }
            style={{
              filter: isMobile ? 'blur(15px)' : 'blur(18px)',
            }}
          >
            <defs>
              {/* Horizontal gradient: warm amber core to Soul Orange sides to transparency */}
              <linearGradient id="beamHorizontal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff7300" stopOpacity="0" />
                <stop offset="36%" stopColor="#ff7300" stopOpacity="0.25" />
                <stop offset="43%" stopColor="#f59e0b" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.90" /> {/* Warm Amber Core */}
                <stop offset="57%" stopColor="#f59e0b" stopOpacity="0.65" />
                <stop offset="64%" stopColor="#ff7300" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ff7300" stopOpacity="0" />
              </linearGradient>

              {/* Vertical gradient mask: refined vertical fade to prevent abrupt endings */}
              <linearGradient id="beamVertical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1.0" />
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0.80" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.50" />
                <stop offset="80%" stopColor="#ffffff" stopOpacity="0.20" />
                <stop offset="92%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              
              <mask id="beamMask">
                <rect x="0" y="0" width="100" height="100" fill="url(#beamVertical)" />
              </mask>
            </defs>

            {/* Narrower tapered spotlight path: reduced angle (widened on mobile) */}
            <path
              d={isMobile ? "M 46 0 L 54 0 L 130 100 L -30 100 Z" : "M 46 0 L 54 0 L 86 100 L 14 100 Z"}
              fill="url(#beamHorizontal)"
              mask="url(#beamMask)"
            />
          </svg>
        </motion.div>
    </motion.div>
  );
}
