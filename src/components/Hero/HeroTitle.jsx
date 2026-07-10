import React from 'react';
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
  delayTitle = 1.5,
  delayText = 1.8,
  delayButtons = 2.1,
  animateState = 'hidden',
  isTransitioning = false, // Intercept day transition states
}) {
  const colors = GRADIENT_MAP[themeName] || GRADIENT_MAP.explore;
  const gradientText = `linear-gradient(135deg, ${colors[0]} 15%, ${colors[1]} 55%, ${colors[2]} 100%)`;

  const sceneProgress = useHeroScroll();

  // Scroll scene transforms
  // Title: TranslateY 0 -> -150px, Scale 1 -> 0.90, Opacity 1 -> 0.95 until 70% progress, then 0.95 -> 0 from 70% to 85%.
  const titleY = useTransform(sceneProgress, [0, 0.85], [0, isMobile ? 0 : -150]);
  const titleScale = useTransform(sceneProgress, [0, 0.85], [1, isMobile ? 1 : 0.90]);
  const titleOpacity = useTransform(sceneProgress, [0, 0.65, 0.85], [1, 1, isMobile ? 1 : 0]);
  const titlePointerEvents = useTransform(sceneProgress, (p) => p > 0.85 ? (isMobile ? 'auto' : 'none') : 'auto');

  // Supporting Text: Y 0 -> -85px, Opacity 1 -> 0 (between 0 and 0.80), starts fading at 0.55
  const textY = useTransform(sceneProgress, [0, 0.80], [0, isMobile ? 0 : -85]);
  const textOpacity = useTransform(sceneProgress, [0, 0.55, 0.80], [1, 1, isMobile ? 1 : 0]);
  const textPointerEvents = useTransform(sceneProgress, (p) => p > 0.80 ? (isMobile ? 'auto' : 'none') : 'auto');

  // CTA Buttons: Y 0 -> -100px, Opacity 1 -> 0 (between 0 and 0.80), starts fading at 0.55
  const buttonsY = useTransform(sceneProgress, [0, 0.80], [0, isMobile ? 0 : -100]);
  const buttonsOpacity = useTransform(sceneProgress, [0, 0.55, 0.80], [1, 1, isMobile ? 1 : 0]);
  const buttonsPointerEvents = useTransform(sceneProgress, (p) => p > 0.80 ? (isMobile ? 'auto' : 'none') : 'auto');

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delayTitle,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: GOLDEN_EASE }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, delay: delayText, ease: GOLDEN_EASE }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, delay: delayButtons, ease: GOLDEN_EASE }
    }
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
        top: vh * 1.42,
        behavior: 'smooth'
      });
    }
  };



  return (
    <div className="flex flex-col items-center text-center relative z-10 w-full">
      {/* Subtle background colored glow matching active day theme */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 w-[450px] sm:w-[650px] h-[130px] rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${accent}25 0%, transparent 80%)`,
          opacity: 0.75,
          transition: 'background 0.8s ease',
        }}
      />

      {/* Single Gradient-Clipped Heading with scroll transform */}
      <motion.div style={{ y: titleY, scale: titleScale, opacity: titleOpacity, pointerEvents: titlePointerEvents }}>
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={animateState}
        >
          <motion.h1
            className="editorial-title-lg tv-hero-title mb-4 sm:mb-6 max-w-5xl select-none text-center"
            style={{
              fontWeight: 800, // ExtraBold weight
            }}
            animate={{
              letterSpacing: isTransitioning 
                ? '-0.24em' // Tight compression during shifting
                : (isVisible ? '-0.04em' : '-0.08em'), // Original Outfit ExtraBold negative tracking
              scale: isTransitioning ? 0.94 : 1,
            }}
            transition={{
              duration: isTransitioning ? 0.8 : 1.8,
              ease: GOLDEN_EASE
            }}
          >
            <span className="inline-flex select-none tv-sweep">
              {titleLetters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  whileHover={{
                    y: -6,
                    scale: 1.12,
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 14
                  }}
                  className="inline-block cursor-default text-clip-gradient"
                  style={{
                    display: 'inline-block',
                    backgroundImage: 'inherit',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* Supporting subtitle with scroll transform */}
      <motion.div style={{ y: textY, opacity: textOpacity, pointerEvents: textPointerEvents }} className="w-full flex justify-center">
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate={
            isTransitioning
              ? { opacity: 0.15, y: 5 }
              : (isVisible ? 'visible' : 'hidden')
          }
          transition={{
            duration: isTransitioning ? 0.7 : 1.0,
            ease: 'easeInOut'
          }}
          className="text-[11px] sm:text-xs font-sans tracking-widest leading-relaxed uppercase max-w-xl mb-8 sm:mb-10 select-none font-semibold px-4 text-center"
          style={{ color: '#C8D0DF' }}
        >
          A High-Fidelity National Level Tech Symposium hosted by Department of Information Technology at VNR VJIET.
        </motion.p>
      </motion.div>

      {/* CTA Buttons with scroll transform */}
      <motion.div style={{ y: buttonsY, opacity: buttonsOpacity, pointerEvents: buttonsPointerEvents }}>
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate={
            isTransitioning
              ? { opacity: 0.15, scale: 0.93, y: 10 }
              : (isVisible ? 'visible' : 'hidden')
          }
          transition={{
            duration: isTransitioning ? 0.7 : 1.0,
            ease: 'easeInOut'
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {/* Primary CTA — Register Now (Opaque Metallic Brass Gradient with White/Amber highlights) */}
          <motion.a
            href="https://forms.gle/technovista2026-register" // Placeholder registration link
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            className="group relative px-8.5 py-3.5 border font-heading font-semibold tracking-[0.16em] uppercase text-[11px] sm:text-xs rounded-full cursor-pointer overflow-hidden text-center"
            style={{
              background: 'linear-gradient(135deg, #d4b26f 0%, #a37c3f 100%)', // Polished brass gradient (low saturation gold)
              borderColor: 'rgba(255, 201, 88, 0.40)', // Amber border outline
              color: '#0a0805', // High-contrast dark charcoal text
              boxShadow: '0 4px 14px rgba(163, 124, 63, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.40)',
              transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, color 0.4s ease',
            }}
            variants={{
              hover: {
                y: -2, // Lift by exactly 2px
                borderColor: '#ffffff', // High-visibility white border on hover
                background: 'linear-gradient(135deg, #e5c483 0%, #b88d4c 100%)', // Elevated polished brass
                boxShadow: '0 8px 22px rgba(163, 124, 63, 0.35), inset 0 1px 1.5px rgba(255, 255, 255, 0.50)',
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

          {/* Secondary CTA — Conclave Info (Secondary: Dark glass, thin border, minimal hover lighting) */}
          <motion.a
            href="#about"
            onClick={handleExploreClick}
            whileHover="hover"
            className="group relative px-8.5 py-3.5 border font-heading font-semibold uppercase text-[11px] sm:text-xs rounded-full cursor-pointer overflow-hidden text-center"
            style={{
              backgroundColor: 'rgba(31, 24, 20, 0.55)', // Espresso-smoked glass matching logos
              borderColor: 'rgba(255, 255, 255, 0.05)', // Subtle border outline
              color: '#ffffff', // White text
              letterSpacing: '0.16em', // Base spacing
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
              transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, color 0.4s ease',
            }}
            variants={{
              hover: {
                y: -2, // Lift by exactly 2px
                letterSpacing: '0.21em', // Slowly increase letter spacing on hover
                borderColor: 'rgba(255, 201, 88, 0.35)', // Tint with soft amber outline
                backgroundColor: 'rgba(31, 24, 20, 0.30)', // Smoked glass clarity hover
                color: '#ffffff',
                boxShadow: '0 8px 20px rgba(255, 201, 88, 0.08), 0 10px 24px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
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
        </motion.div>
      </motion.div>
    </div>
  );
}
