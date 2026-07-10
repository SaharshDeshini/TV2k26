import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useHeroScroll } from '../../contexts/HeroScrollContext';

/**
 * VolumetricBeam — Renders a soft, architectural light beam.
 * Simulates a high-performance spotlight projecting a warm amber light cone.
 */
export default function VolumetricBeam({ animateState = 'hidden' }) {
  const sceneProgress = useHeroScroll();
  // Fade out spotlight between scroll progress 0 (start) and 0.45 (before About slides in)
  const beamScrollOpacity = useTransform(sceneProgress, [0, 0.45], [1, 0]);

  const beamVariants = {
    hidden: {
      opacity: 0,
      scaleX: 0.98,
      scaleY: 0.98,
    },
    visible: {
      opacity: 1,
      scaleX: 1.0,
      scaleY: 1.0,
      transition: {
        duration: 2.5, // Slow, extremely smooth fade
        delay: 1.2,    // Reveal begins after text reveals
        ease: 'easeInOut', // Soft ease-in and ease-out to prevent popping
      }
    }
  };

  return (
    <motion.div
      variants={beamVariants}
      initial="hidden"
      animate={animateState}
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        transformOrigin: 'top center',
        mixBlendMode: 'screen',
      }}
    >
      {/* Scroll-linked fadeout wrapper */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: beamScrollOpacity,
        }}
      >
        {/* Rotating, Breathing, and Floating spotlight cone */}
        <motion.div
          className="absolute top-[-15vh] left-1/2 w-[45vw] md:w-[60vw] lg:w-[70vw] h-[150vh] pointer-events-none"
          style={{
            x: '-50%',
            transformOrigin: 'top center',
            rotate: 'var(--tv-beam-angle, 0deg)',
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0.86, 1.14, 0.86], // Breathing opacity scaling factor
            scale: [0.995, 1.005, 0.995], // Breathing scale
          }}
          transition={{
            duration: 5, // Breathing period (12-18s)
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full opacity-[0.25] md:opacity-[0.3] lg:opacity-[0.4]"
            style={{
              filter: 'blur(8px)', // Midway blur value for defined but smooth edges
            }}
          >
            <defs>
              {/* Horizontal gradient: warm amber core to Soul Orange sides to transparency */}
              <linearGradient id="beamHorizontal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff7300" stopOpacity="0" />
                <stop offset="36%" stopColor="#ff7300" stopOpacity="0.3" />
                <stop offset="43%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="1.0" /> {/* Warm Amber Core */}
                <stop offset="57%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="64%" stopColor="#ff7300" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff7300" stopOpacity="0" />
              </linearGradient>

              {/* Vertical gradient mask: midway fadeout length */}
              <linearGradient id="beamVertical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1.0" />
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="68%" stopColor="#ffffff" stopOpacity="0.65" />
                <stop offset="90%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              
              <mask id="beamMask">
                <rect x="0" y="0" width="100" height="100" fill="url(#beamVertical)" />
              </mask>
            </defs>

            {/* Narrower tapered spotlight path: reduced angle */}
            <path
              d="M 46 0 L 54 0 L 86 100 L 14 100 Z"
              fill="url(#beamHorizontal)"
              mask="url(#beamMask)"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
