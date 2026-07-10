import React, { useMemo, useRef } from 'react';
import { motion, useTransform, useAnimationFrame } from 'framer-motion';
import { GOLDEN_EASE } from '../../animations/variants';
import { useHeroScroll } from '../../contexts/HeroScrollContext';

/**
 * HeroParticles — Tiny glowing nodes that fill empty space.
 */
export default function HeroParticles({
  mouseX = 0,
  mouseY = 0,
  isTouch = false,
  viewportTier = 'desktop',
  accent = '#ffffff',
  delay = 0.7,
  animateState = 'hidden',
}) {
  const counts = { desktop: 45, tablet: 25, mobile: 12 };
  const count = counts[viewportTier] || counts.desktop;

  const sceneProgress = useHeroScroll();

  const seed = useMemo(() => Math.floor(Math.random() * 100000), []);

  const particles = useMemo(() => {
    let s = seed;
    const rand = () => {
      s = (s * 16807 + 0) % 2147483647;
      return (s % 10000) / 10000;
    };

    // Helper to generate coordinates outside the main hero text zone to prevent overlaps
    const generateSafeCoordinates = () => {
      let x, y;
      let attempts = 0;
      while (attempts < 150) {
        x = 2 + rand() * 96; // 2% to 98%
        y = 2 + rand() * 96; // 2% to 98%
        const isInsideUnsafeX = x > 20 && x < 80;
        const isInsideUnsafeY = y > 18 && y < 82;
        if (!(isInsideUnsafeX && isInsideUnsafeY)) {
          return { x, y };
        }
        attempts++;
      }
      return rand() > 0.5 ? { x: 5, y: rand() * 90 } : { x: 95, y: rand() * 90 };
    };

    return Array.from({ length: count }, (_, i) => {
      const { x, y } = generateSafeCoordinates();
      const size = 2.5 + rand() * 3.5; // 2.5–6.0px diameter
      const opacity = 0.45 + rand() * 0.25; // 0.45-0.70 opacity
      const depth = rand(); // 0 to 1 normalized depth
      const floatDuration = 22 + rand() * 14; // slower, smoother drift
      const floatDelay = rand() * 10;
      
      const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

      const tx1 = Math.round(rand() * width - width / 2);
      const ty1 = Math.round(rand() * height - height / 2);
      const tx2 = Math.round(rand() * width - width / 2);
      const ty2 = Math.round(rand() * height - height / 2);
      const tx3 = Math.round(rand() * width - width / 2);
      const ty3 = Math.round(rand() * height - height / 2);

      const survivor = rand() < 0.3; // Stable ~30% survivor flag
      const exitVector = {
        x: rand() * 2.0 - 1.0, // range [-1.0, 1.0]
        y: rand() * 2.0 - 1.8, // range [-1.8, 0.2] (mostly upwards)
      };

      const roll = rand();
      let color = 'rgba(250, 246, 233, 0.65)';
      let glow = 'rgba(250, 246, 233, 0.25)';
      if (roll < 0.15) {
        // Muted orange (15%)
        color = 'rgba(255, 130, 45, 0.55)';
        glow = 'rgba(255, 130, 45, 0.25)';
      } else if (roll < 0.20) {
        // Muted red (5%)
        color = 'rgba(220, 55, 55, 0.55)';
        glow = 'rgba(220, 55, 55, 0.25)';
      }

      return {
        x, y, size, opacity, depth, floatDuration, floatDelay,
        tx1, ty1, tx2, ty2, tx3, ty3,
        survivor, exitVector, color, glow
      };
    });
  }, [seed, count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <ParticleItem
          key={`particle-${i}`}
          p={p}
          index={i}
          sceneProgress={sceneProgress}
          mouseX={mouseX}
          mouseY={mouseY}
          isTouch={isTouch}
          accent={accent}
          delay={delay}
          animateState={animateState}
        />
      ))}
    </div>
  );
}

/**
 * ParticleItem — Isolated particle item that safely consumes scroll context hooks
 * and layers animations to keep floating behavior while exiting.
 */
function ParticleItem({
  p,
  index,
  sceneProgress,
  mouseX,
  mouseY,
  isTouch,
  accent,
  delay,
  animateState
}) {
  const elRef = useRef(null);

  // Exit progress mapping (starts at 0.0, ends at 0.85)
  const exitProgress = useTransform(sceneProgress, [0, 0.85], [0, 1]);

  const exitX = useTransform(exitProgress, (v) => p.survivor ? 0 : p.exitVector.x * 600 * v);
  const exitY = useTransform(exitProgress, (v) => p.survivor ? 0 : p.exitVector.y * 1000 * v);

  // Opacity: fades from base to 0 (or survivor lower background level) from 0.45 to 0.85
  const scrollOpacity = useTransform(
    sceneProgress,
    [0, 0.45, 0.85],
    [p.opacity, p.opacity, p.survivor ? p.opacity * 0.45 : 0]
  );

  // Parallax offsets
  const multiplier = 0.15 + p.depth * 0.05;
  const px = isTouch ? 0 : mouseX * multiplier;
  const py = isTouch ? 0 : mouseY * multiplier;

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: (custom) => ({
      opacity: custom.opacity,
      transition: {
        duration: 2.0,
        delay: custom.delay,
        ease: GOLDEN_EASE,
      },
    }),
  };

  // Gentle cursor repulsion logic running inside animation frame loop (ultra high performance)
  useAnimationFrame(() => {
    if (!elRef.current || isTouch) return;
    const mx = window.__tv_raw_mx;
    const my = window.__tv_raw_my;
    if (mx === undefined || my === undefined) return;

    const rect = elRef.current.getBoundingClientRect();
    const pxCenter = rect.left + rect.width / 2;
    const pyCenter = rect.top + rect.height / 2;

    const dx = pxCenter - mx;
    const dy = pyCenter - my;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let rx = 0;
    let ry = 0;
    const threshold = 110; // Active mouse distance threshold (pixels)
    if (dist < threshold && dist > 0.1) {
      const force = (threshold - dist) / threshold;
      const push = force * 12; // Gentle repulsion offset up to 12 pixels
      rx = (dx / dist) * push;
      ry = (dy / dist) * push;
    }

    elRef.current.style.setProperty('--repulsion-x', `${rx}px`);
    elRef.current.style.setProperty('--repulsion-y', `${ry}px`);
  });

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        x: exitX,
        y: exitY,
        opacity: scrollOpacity,
      }}
    >
      <motion.div
        variants={itemVariants}
        custom={{ opacity: 1.0, delay: delay + index * 0.03 }}
        initial="hidden"
        animate={animateState}
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: p.color,
          boxShadow: `0 0 ${p.size * 2}px ${p.glow}`,
          willChange: 'opacity',
          transition: 'background-color 0.8s ease, box-shadow 0.8s ease',
        }}
      >
        {/* Parallax and floating container */}
        <div
          ref={elRef}
          style={{
            transform: `translate(calc(${px}px + var(--repulsion-x, 0px)), calc(${py}px + var(--repulsion-y, 0px)))`,
            willChange: 'transform',
            transition: 'transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)', // Smooth return physics
          }}
          className="w-full h-full"
        >
          <motion.div
            animate={{
              x: [0, p.tx1, p.tx2, p.tx3, 0],
              y: [0, p.ty1, p.ty2, p.ty3, 0],
              scale: [1, 1.35, 0.75, 1.2, 1],
              opacity: [0.45, 1.0, 0.35, 0.9, 0.45],
            }}
            transition={{
              duration: p.floatDuration,
              delay: p.floatDelay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-full rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
