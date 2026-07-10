import React from 'react';
import { motion } from 'framer-motion';
import { GOLDEN_EASE } from '../../animations/variants';

/**
 * HeroBackground — Unified, premium reconstructed background.
 * Uses a clean dark base with warm yellowish-white blueprint details and radial lighting glows.
 */
export default function HeroBackground({ delay = 0.3, accent, animateState = 'hidden' }) {
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.8,
        delay,
        ease: GOLDEN_EASE,
        staggerChildren: 0.1,
      },
    },
  };

  const childDotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 18 },
    },
  };

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      animate={animateState}
      className="relative w-full h-full bg-background overflow-hidden pointer-events-none select-none"
    >
      {/* 1. Ambient Lighting Gradients (Low Opacity, Large Blurs) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top Left: One very large Reality Red radial gradient */}
        <div 
          className="absolute -top-[35%] -left-[25%] w-[110vw] h-[110vw] rounded-full blur-[180px] opacity-100 mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(200, 0, 0, 0.18) 0%, rgba(200, 0, 0, 0) 75%)' }}
        />

        {/* Top Right: Very soft Red ambient glow */}
        <div 
          className="absolute -top-[25%] -right-[15%] w-[80vw] h-[80vw] rounded-full blur-[160px] opacity-100 mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(217, 4, 11, 0.08) 0%, rgba(217, 4, 11, 0) 75%)' }}
        />

        {/* Center Focal Backing: Soft, warm brand red ambient backlight */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vh] rounded-full blur-[120px] opacity-80 mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(217, 4, 11, 0.08) 0%, rgba(217, 4, 11, 0) 70%)' }}
        />

        {/* Bottom: Subtle blend gradient Reality Red -> Power Purple -> Mind Blue */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[45vh] pointer-events-none opacity-[0.06]"
          style={{ background: 'linear-gradient(to right, rgba(200, 0, 0, 0.8), rgba(147, 51, 234, 0.8), rgba(0, 110, 255, 0.8))' }}
        />
      </div>

      {/* 2. Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* 3. Grid Blueprint overlay (barely visible warm yellowish white lines) */}
      <div className="absolute inset-0 grid-overlay opacity-[0.065] pointer-events-none z-10" />

      {/* 4. Interactive SVG Blueprint Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d9040b" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Large Blueprint Radial Backing */}
        <circle cx="50%" cy="50%" r="48%" fill="url(#centerGlow)" className="transition-all duration-[1000ms]" />

        {/* Grid intersections Crosshairs (4 anchors, brand red) */}
        {[
          { x: '20%', y: '20%' },
          { x: '80%', y: '20%' },
          { x: '20%', y: '80%' },
          { x: '80%', y: '80%' },
        ].map((pt, i) => (
          <motion.g
            key={`cross-${i}`}
            variants={childDotVariants}
            stroke="rgba(217, 4, 11, 0.28)"
            strokeWidth="0.8"
            strokeOpacity="0.28"
            className="transition-colors duration-[1000ms]"
          >
            <line x1={`calc(${pt.x} - 8px)`} y1={pt.y} x2={`calc(${pt.x} + 8px)`} y2={pt.y} />
            <line x1={pt.x} y1={`calc(${pt.y} - 8px)`} x2={pt.x} y2={`calc(${pt.y} + 8px)`} />
            <circle cx={pt.x} cy={pt.y} r="2" fill="none" />
          </motion.g>
        ))}
      </svg>

      {/* Radial vignette for depth (dark vignette instead of white to match background and prevent wash-out) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 0%, rgba(9, 11, 16, 0.65) 100%)',
        }}
      />
    </motion.div>
  );
}
