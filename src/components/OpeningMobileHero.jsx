"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { GOLDEN_EASE } from "@/animations/variants";

function MobileAmbientBackground() {
  const backgroundElements = useMemo(() => {
    const particles = [];
    const stars = [];
    const embers = [];

    // Slow-moving dust/glowing particles (22 items)
    for (let i = 0; i < 22; i++) {
      particles.push({
        id: `p-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * -10, // Start animation in past so it starts immediately
        duration: 20 + Math.random() * 14,
        opacity: 0.15 + Math.random() * 0.4,
        isGold: Math.random() > 0.65,
      });
    }

    // Twinkling stars (14 items)
    for (let i = 0; i < 14; i++) {
      stars.push({
        id: `s-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 85, // concentrate higher up
        size: 0.8 + Math.random() * 1.5,
        delay: Math.random() * -5,
        duration: 3 + Math.random() * 4,
      });
    }

    // Upward drifting embers (14 items)
    for (let i = 0; i < 14; i++) {
      embers.push({
        id: `e-${i}`,
        x: Math.random() * 100,
        y: 75 + Math.random() * 25, // start near bottom
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * -15,
        duration: 8 + Math.random() * 8,
      });
    }

    return { particles, stars, embers };
  }, []);

  const streaks = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: 12 + i * 22,
        delay: i * -3, // Start in past
        duration: 16 + i * 4,
      })),
    []
  );

  return (
    <div
      className="opening-mobile-ambient pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="opening-mobile-vignette" />
      <div className="opening-mobile-circuit-grid" />
      <div className="opening-mobile-ambient__glow" />
      <div className="opening-mobile-ambient__radial opening-mobile-ambient__radial--top" />
      <div className="opening-mobile-ambient__radial opening-mobile-ambient__radial--bottom" />

      {/* Twinkling Stars */}
      {backgroundElements.stars.map((star) => (
        <span
          key={star.id}
          className="opening-mobile-ambient__star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Floating Embers */}
      {backgroundElements.embers.map((ember) => (
        <span
          key={ember.id}
          className="opening-mobile-ambient__ember"
          style={{
            left: `${ember.x}%`,
            top: `${ember.y}%`,
            width: ember.size,
            height: ember.size,
            animationDelay: `${ember.delay}s`,
            animationDuration: `${ember.duration}s`,
          }}
        />
      ))}

      {/* Glowing Dust Particles */}
      {backgroundElements.particles.map((p) => (
        <span
          key={p.id}
          className={`opening-mobile-ambient__particle ${p.isGold ? "opening-mobile-ambient__particle--gold" : ""}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Streak details */}
      {streaks.map((s) => (
        <span
          key={s.id}
          className="opening-mobile-ambient__streak"
          style={{
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function OpeningMobileHero({ onEnter, isEntered = false }) {
  return (
    <section
      id="hero"
      className="opening-mobile-hero relative flex h-[100svh] w-full flex-col overflow-hidden select-none lg:hidden"
    >
      <MobileAmbientBackground />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 sm:gap-6 -mt-2">
          
          {/* Logo / Poster - Increased visual importance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: GOLDEN_EASE }}
            className="opening-mobile-logo-wrap relative w-full max-w-[85vw] sm:max-w-[420px]"
          >
            <motion.div
              animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.04, 0.95] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="opening-mobile-logo-wrap__aura absolute inset-0 -z-10 rounded-2xl"
            />
            <motion.div
              animate={{
                y: [0, -4, 0],
                rotate: [0, 0.4, -0.4, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="opening-mobile-logo-wrap__panel p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              <img
                src="/events/technovista-banner.png"
                alt="TechnoVista 18th Edition"
                className="opening-mobile-logo-wrap__img w-full h-auto rounded-[14px] filter brightness-[1.05]"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* Subtitle & Dates Stack */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: GOLDEN_EASE }}
            className="flex flex-col items-center text-center gap-2"
          >
            <p className="font-switzer font-light text-[0.75rem] sm:text-[0.9rem] tracking-wide text-[#eae3d2b3] leading-[1.65]">
              National Level Tech Symposium<br />Hosted at VNR VJIET
            </p>
            
            <p className="font-heading font-medium text-[0.8rem] sm:text-[0.9rem] tracking-[0.16em] uppercase"
               style={{ color: '#F5E6B3' }}>
              31 JULY <span className="opacity-50 mx-3 sm:mx-4 text-[0.65rem] align-middle">•</span> 1 AUG <span className="opacity-50 mx-3 sm:mx-4 text-[0.65rem] align-middle">•</span> 2 AUG
            </p>
          </motion.div>

          {/* CTA Button */}
          {!isEntered && onEnter && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: GOLDEN_EASE }}
            >
              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="group relative px-8 py-2.5 border font-heading font-semibold uppercase text-[11px] sm:text-xs rounded-full cursor-pointer overflow-hidden text-center shrink-0"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #E6B94A 50%, #C49021 100%)', // Premium champagne metallic gradient
                  borderColor: 'rgba(255, 230, 160, 0.45)', // Thin gold border
                  color: '#170709', // Dark contrast text
                  letterSpacing: '0.16em', // Same as hero
                  boxShadow: '0 4px 20px rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.40)', // Soft glow beneath, subtle inner highlight, no heavy shadows
                }}
              >
                <span className="relative z-10">ENTER THE EXPERIENCE</span>
                <motion.span
                  aria-hidden="true"
                  className="opening-mobile-cta__sweep absolute inset-0 pointer-events-none"
                  animate={{ x: ["-180%", "180%"] }}
                  transition={{
                    duration: 1.3,
                    repeat: Infinity,
                    repeatDelay: 4.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.30) 50%, transparent 100%)',
                    transform: 'skewX(-25deg)',
                  }}
                />
              </motion.button>
            </motion.div>
          )}

          {/* Information Strip (Premium Editorial Footer) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: GOLDEN_EASE }}
            className="mt-4 sm:mt-8 w-full flex flex-col items-center"
          >
            <div className="w-[88%] max-w-[420px] sm:max-w-[680px] h-[1px] bg-gradient-to-r from-transparent via-[#F5E6B3] to-transparent opacity-15 mb-3" />
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-0">
              <p className="font-mono font-semibold text-[0.75rem] sm:text-[0.85rem] uppercase tracking-[0.25em] text-[#eae3d2c0] text-center flex items-center justify-center">
                4th EDITION 
                <span className="opacity-40 mx-3 sm:mx-4 font-light text-[0.8rem] mb-[2px]">│</span> 
                8 EVENTS
                <span className="hidden sm:inline-block opacity-40 mx-3 sm:mx-4 font-light text-[0.8rem] mb-[2px]">│</span>
              </p>
              <p className="font-mono font-semibold text-[0.75rem] sm:text-[0.85rem] uppercase tracking-[0.25em] text-[#eae3d2c0] text-center">
                ₹1 LAKH+ PRIZE POOL
              </p>
            </div>
            
            <div className="w-[88%] max-w-[420px] sm:max-w-[680px] h-[1px] bg-gradient-to-r from-transparent via-[#F5E6B3] to-transparent opacity-15 mt-3" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
