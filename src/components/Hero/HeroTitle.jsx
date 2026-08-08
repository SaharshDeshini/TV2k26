import React, { useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { GOLDEN_EASE } from '../../animations/variants';
import { useHeroScroll } from '../../contexts/HeroScrollContext';
import { playTactileSound } from '../../utils/sound';

const GRADIENT_MAP = {
  explore: ['#FAFAFA', '#E7E7E7', '#CFCFCF'],
  create: ['#FAFAFA', '#E7E7E7', '#CFCFCF'],
  celebrate: ['#FAFAFA', '#E7E7E7', '#CFCFCF'],
};

/**
 * HeroTitle — TECHNOVISTA heading with accent gradient, subtle float,
 * supporting text, and redesigned CTA buttons.
 */
export default function HeroTitle({
  isMobile = false,
  themeName = 'explore',
  accent,
  delayTitle = 1.35,
  delayText = 1.55,
  delayButtons = 1.70,
  animateState = 'hidden',
  isTransitioning = false, // Intercept day transition states
  introPhase = "completed"
}) {
  const colors = GRADIENT_MAP[themeName] || GRADIENT_MAP.explore;
  const gradientText = `linear-gradient(135deg, ${colors[0]} 15%, ${colors[1]} 55%, ${colors[2]} 100%)`;

  const sceneProgress = useHeroScroll();

  // Scroll scene transforms (adjusted for both desktop and mobile)
  const titleY = useTransform(sceneProgress, [0, 0.36], [0, isMobile ? -40 : -150]);
  const titleScale = useTransform(sceneProgress, [0, 0.36], [1, isMobile ? 0.96 : 0.90]);
  const titleOpacity = useTransform(sceneProgress, [0, 0.10, 0.36], [1, 1, 0]);
  const titlePointerEvents = useTransform(sceneProgress, (p) => p > 0.36 ? 'none' : 'auto');

  // Supporting Text: Y and fade with proportional mobile distances
  const textY = useTransform(sceneProgress, [0, 0.30], [0, isMobile ? -25 : -85]);
  const textOpacity = useTransform(sceneProgress, [0, 0.08, 0.30], [1, 1, 0]);
  const textPointerEvents = useTransform(sceneProgress, (p) => p > 0.30 ? 'none' : 'auto');

  // CTA Buttons: Y and fade with proportional mobile distances
  const buttonsY = useTransform(sceneProgress, [0, 0.30], [0, isMobile ? -30 : -100]);
  const buttonsOpacity = useTransform(sceneProgress, [0, 0.08, 0.30], [1, 1, 0]);
  const buttonsPointerEvents = useTransform(sceneProgress, (p) => p > 0.30 ? 'none' : 'auto');

  const [isTransitionCompleted] = useState(() => typeof window !== 'undefined' && window.__introTransitionComplete && !window.__startCinematic);

  const titleVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    fadeout: { opacity: 0, scale: 1.05 },
    beam: { opacity: 0, scale: 1.05 },
    gold_entry: {
      opacity: 1,
      scale: 1.0,
      transition: {
        opacity: { duration: 1.2, ease: "easeOut" },
        scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
      }
    },
    retract_anchor: { opacity: 1, scale: 0.92, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
    bg_unveil: { opacity: 1, scale: 0.92 },
    badges_particles: { opacity: 1, scale: 0.92 },
    reexpand_morph: { opacity: 1, scale: 1.0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } },
    final_cta: { opacity: 1, scale: 1.0 },
    completed: { opacity: 1, scale: 1.0, transition: { duration: 0 } },
    visible: { opacity: 1, scale: 1.0, transition: { duration: 0 } },

    refresh_bg: { opacity: 0, scale: 0.96 },
    refresh_beam: { opacity: 0, scale: 0.96 },
    refresh_particles: { opacity: 0, scale: 0.96 },
    refresh_title: { opacity: 1, scale: 1.0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    refresh_settle: { opacity: 1, scale: 1.0 }
  };

  const goldOpacityVariants = {
    hidden: { opacity: 0 },
    fadeout: { opacity: 0 },
    beam: { opacity: 0 },
    gold_entry: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
    retract_anchor: { opacity: 1 },
    bg_unveil: { opacity: 1 },
    badges_particles: { opacity: 1 },
    reexpand_morph: { opacity: 0, transition: { duration: 1.4, ease: "easeInOut" } },
    final_cta: { opacity: 0 },
    completed: { opacity: 0 },
    visible: { opacity: 0 },

    refresh_bg: { opacity: 0 },
    refresh_beam: { opacity: 0 },
    refresh_particles: { opacity: 0 },
    refresh_title: { opacity: 0 },
    refresh_settle: { opacity: 0 }
  };

  const silverOpacityVariants = {
    hidden: { opacity: 0 },
    fadeout: { opacity: 0 },
    beam: { opacity: 0 },
    gold_entry: { opacity: 0 },
    retract_anchor: { opacity: 0 },
    bg_unveil: { opacity: 0 },
    badges_particles: { opacity: 0 },
    reexpand_morph: { opacity: 1, transition: { duration: 1.4, ease: "easeInOut" } },
    final_cta: { opacity: 1 },
    completed: { opacity: 1, transition: { duration: 0 } },
    visible: { opacity: 1, transition: { duration: 0 } },

    refresh_bg: { opacity: 0 },
    refresh_beam: { opacity: 0 },
    refresh_particles: { opacity: 0 },
    refresh_title: { opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    refresh_settle: { opacity: 1 }
  };

  const letterVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    fadeout: { opacity: 0, y: 15 },
    beam: { opacity: 0, y: 15 },
    gold_entry: { opacity: 0, y: 15 },
    retract_anchor: { opacity: 0, y: 15 },
    bg_unveil: { opacity: 0, y: 15 },
    badges_particles: { opacity: 0, y: 15 },
    reexpand_morph: { opacity: 0, y: 15 },
    final_cta: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
    completed: { opacity: 1, y: 0, transition: { duration: 0 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0 } },

    refresh_bg: { opacity: 0, y: 15 },
    refresh_beam: { opacity: 0, y: 15 },
    refresh_particles: { opacity: 0, y: 15 },
    refresh_title: { opacity: 0, y: 15 },
    refresh_settle: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 12 },
    fadeout: { opacity: 0, y: 12 },
    beam: { opacity: 0, y: 12 },
    gold_entry: { opacity: 0, y: 12 },
    retract_anchor: { opacity: 0, y: 12 },
    bg_unveil: { opacity: 0, y: 12 },
    badges_particles: { opacity: 0, y: 12 },
    reexpand_morph: { opacity: 0, y: 12 },
    final_cta: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] } },
    completed: { opacity: 1, y: 0, transition: { duration: 0 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0 } },

    refresh_bg: { opacity: 0, y: 12 },
    refresh_beam: { opacity: 0, y: 12 },
    refresh_particles: { opacity: 0, y: 12 },
    refresh_title: { opacity: 0, y: 12 },
    refresh_settle: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] } }
  };

  const titleLetters = Array.from("TECHNOVISTA");
  const isVisible = animateState === 'visible';

  const handleExploreClick = (e) => {
    e.preventDefault();
    playTactileSound('click');
    const isMobile = window.innerWidth < 768;
    const vh = window.innerHeight;
    if (isMobile) {
      const el = document.getElementById('about');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({
        top: vh * 0.95,
        behavior: 'smooth'
      });
    }
  };

  const glowOpacity = ["gold_entry", "retract_anchor", "bg_unveil", "badges_particles", "reexpand_morph", "final_cta", "completed", "refresh_title", "refresh_settle"].includes(introPhase) || isTransitionCompleted ? 0.08 : 0;

  return (
    <div className="flex flex-col items-center text-center relative z-10 w-full">
      {/* Soft circular ambient radial glow centered behind the logo (zero box clipping) */}
      <motion.div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 rounded-full blur-xl aspect-square ${isMobile ? 'w-[240px] h-[240px]' : 'w-[380px] h-[380px]'}`}
        style={{
          background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.02) 45%, transparent 65%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: glowOpacity }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Single Gradient-Clipped Heading with scroll transform */}
      <motion.div style={{ y: titleY, scale: titleScale, opacity: titleOpacity, pointerEvents: titlePointerEvents }}>
        <motion.div
          variants={titleVariants}
          initial={isTransitionCompleted && introPhase === "completed" ? "visible" : "hidden"}
          animate={introPhase === "completed" ? animateState : introPhase}
        >
          <style>{`
            @keyframes cinematic-shimmer {
              0% { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
          `}</style>
          <motion.h1
            className={`editorial-title-lg tv-hero-title max-w-5xl select-none text-center ${isMobile ? 'mb-8' : 'mb-6'}`}
            style={{
              fontWeight: 800, // ExtraBold weight
            }}
            initial={{ letterSpacing: '-0.04em', scale: 1 }}
            animate={{
              letterSpacing: isTransitioning ? '-0.24em' : '-0.04em',
              scale: isTransitioning ? 0.94 : (introPhase === "retract_anchor" ? 0.92 : 1),
            }}
            transition={
              introPhase === "completed" ? undefined : {
                duration: isTransitioning ? 0.8 : (introPhase === "retract_anchor" ? 1.0 : (introPhase === "reexpand_morph" ? 1.4 : 1.0)),
                ease: [0.16, 1, 0.3, 1]
              }
            }
          >
            {/* Top-to-Bottom Feathered Mask Reveal Container */}
            <motion.div
              initial={
                isTransitionCompleted && introPhase === "completed"
                  ? { WebkitMaskImage: 'none', maskImage: 'none' }
                  : {
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) -40%, rgba(0,0,0,0) -10%)',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) -40%, rgba(0,0,0,0) -10%)'
                    }
              }
              animate={
                !["fadeout", "beam", "hidden", "refresh_bg", "refresh_beam"].includes(introPhase) || isTransitionCompleted
                  ? {
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 110%, rgba(0,0,0,0) 140%)',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 110%, rgba(0,0,0,0) 140%)'
                    }
                  : {
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) -40%, rgba(0,0,0,0) -10%)',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) -40%, rgba(0,0,0,0) -10%)'
                    }
              }
              transition={{
                duration: 2.0,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative inline-flex select-none"
            >
              {/* Theme Yellow Amber Layer */}
              {(introPhase !== "completed" || !isTransitionCompleted) && (
                <motion.span
                  variants={goldOpacityVariants}
                  className="absolute left-0 top-0 w-full inline-flex select-none text-clip-gradient"
                  style={{
                    backgroundImage: `linear-gradient(120deg, #D97706 0%, #F59E0B 18%, #FBBF24 35%, #FFE899 50%, #FBBF24 65%, #F59E0B 82%, #D97706 100%)`,
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                    animation: introPhase === "hold" ? 'none' : 'cinematic-shimmer 6s linear infinite',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))',
                  }}
                >
                  {titleLetters.map((char, index) => (
                    <span
                      key={index}
                      className="inline-block cursor-default text-clip-gradient"
                      style={{
                        display: 'inline-block',
                        backgroundImage: 'inherit',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </motion.span>
              )}

              {/* Silver Layer */}
              <motion.span 
                variants={silverOpacityVariants}
                className="inline-flex select-none"
              >
              {titleLetters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block cursor-default text-clip-gradient transition-all duration-300"
                  style={{
                    display: 'inline-block',
                    backgroundImage: 'linear-gradient(110deg, #7a8089 0%, #c4cbcf 25%, #faedd0 48%, #ffffff 50%, #faedd0 52%, #c4cbcf 75%, #7a8089 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {char}
                </motion.span>
              ))}
              </motion.span>
            </motion.div>
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* Supporting subtitle with scroll transform */}
      <motion.div style={{ y: textY, opacity: textOpacity, pointerEvents: textPointerEvents }} className="w-full flex justify-center">
        <motion.p
          variants={textVariants}
          initial={isTransitionCompleted && introPhase === "completed" ? "visible" : "hidden"}
          animate={
            introPhase !== "completed" ? introPhase : (isTransitioning
              ? { opacity: 0.15, y: 5 }
              : (isVisible ? 'visible' : 'hidden'))
          }
          transition={
            introPhase === "completed" ? undefined : {
              duration: isTransitioning ? 0.7 : 1.0,
              ease: 'easeInOut'
            }
          }
          className={`text-[11px] sm:text-xs font-sans tracking-widest leading-relaxed uppercase max-w-xl select-none font-normal px-6 text-center ${isMobile ? 'mb-12' : 'mb-10'}`}
          style={{ color: 'rgba(255, 255, 255, 0.45)' }}
        >
          A High-Fidelity National Level Tech Symposium hosted by Department of Data Science at VNR VJIET.
        </motion.p>
      </motion.div>

      {/* CTA Buttons with scroll transform */}
      <motion.div style={{ y: buttonsY, opacity: buttonsOpacity, pointerEvents: buttonsPointerEvents }}>
        <motion.div
          variants={buttonVariants}
          initial={isTransitionCompleted && introPhase === "completed" ? "visible" : "hidden"}
          animate={
            introPhase !== "completed" ? introPhase : (isTransitioning
              ? { opacity: 0.15, scale: 0.93, y: 10 }
              : (isVisible ? 'visible' : 'hidden'))
          }
          transition={
            introPhase === "completed" ? undefined : {
              duration: isTransitioning ? 0.7 : 1.0,
              ease: 'easeInOut'
            }
          }
          className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} items-center justify-center ${isMobile ? 'gap-3.5 w-full px-6' : 'gap-4 sm:gap-6'}`}
        >
          {/* Primary CTA — Register Now (Opaque Metallic Champagne Gold Gradient with Layered Shadows) */}
          <motion.a
            href="https://forms.gle/technovista2026-register" // Placeholder registration link
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            whileTap={{ scale: 0.97, y: 0 }}
            className={`group relative border font-heading font-semibold tracking-[0.16em] uppercase text-[11px] sm:text-xs rounded-full cursor-pointer overflow-hidden text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${isMobile ? 'w-full px-6 py-4 min-h-[50px]' : 'px-8.5 py-3.5'}`}
            style={{
              background: 'linear-gradient(135deg, #f3e5ca 0%, #d8b26e 50%, #9a7538 100%)', // Rich metallic champagne gold
              borderColor: 'rgba(243, 229, 202, 0.35)', // Light champagne gold outline
              color: '#080604', // Dark charcoal text
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.20), 0 8px 18px rgba(154, 117, 56, 0.25), inset 0 1px 1.5px rgba(255, 255, 255, 0.60)',
              transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, color 0.4s ease',
            }}
            variants={{
              hover: {
                y: -2, // Lift by exactly 2px
                borderColor: '#ffffff', // High-visibility white border on hover
                background: 'linear-gradient(135deg, #f6ebd7 0%, #e0c286 50%, #ad8444 100%)', // Slightly brighter champagne sheen
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25), 0 14px 28px rgba(154, 117, 56, 0.40), inset 0 1px 2px rgba(255, 255, 255, 0.80)',
              }
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Register Now
              <svg
                className="w-4 h-4 transform group-hover:scale-105 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
              </svg>
            </span>
            
            {/* Beam ambient reflection glow */}
            <div className="tv-hero-btn-glow" />

            {/* Amber Shimmer light sweep */}
            <motion.div
              variants={{
                hover: { x: '150%' }
              }}
              initial={{ x: '-150%', skewX: -25 }}
              transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 201, 88, 0.25) 50%, transparent 100%)',
              }}
            />
          </motion.a>

          {/* Secondary CTA — Conclave Info (Translucent Glass Panel treatment) */}
          {!isMobile && (
            <motion.a
              href="#about"
              onClick={handleExploreClick}
              whileHover="hover"
              whileTap={{ scale: 0.97, y: 0 }}
              className={`group relative border font-heading font-semibold uppercase text-[11px] sm:text-xs rounded-full cursor-pointer overflow-hidden text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${isMobile ? 'w-full px-6 py-4 min-h-[50px]' : 'px-8.5 py-3.5'}`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)', // Translucent glass
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderColor: 'rgba(255, 248, 235, 0.08)', // Faint warm inner border
                color: '#ffffff', // White text
                letterSpacing: '0.16em', // Base spacing
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.20), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, color 0.4s ease',
              }}
              variants={{
                hover: {
                  y: -2, // Lift by exactly 2px
                  borderColor: 'rgba(243, 229, 202, 0.25)', // Subtle warm border highlight
                  backgroundColor: 'rgba(255, 255, 255, 0.08)', // Brighter glass
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(243, 229, 202, 0.05), 0 8px 24px rgba(0, 0, 0, 0.30), inset 0 1px 1px rgba(255, 255, 255, 0.12)',
                }
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Conclave Info
                <svg
                  className="w-3.5 h-3.5 transform group-hover:translate-x-[5.5px] transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
              
              {/* Beam ambient reflection glow */}
              <div className="tv-hero-btn-glow" />

              {/* Amber Shimmer light sweep */}
              <motion.div
                variants={{
                  hover: { x: '150%' }
                }}
                initial={{ x: '-150%', skewX: -25 }}
                transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 201, 88, 0.15) 50%, transparent 100%)',
                }}
              />
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
