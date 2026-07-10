import React, { useState, useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useHeroScroll } from '../../contexts/HeroScrollContext';
import { useFestival } from '../../hooks/useFestival';
import Container from '../ui/Container';
import clubLogo from '../../assets/logos/logo.png';

/**
 * AboutSection — Premium redesigned editorial About section for TechnoVista.
 * Consists of three clear visual levels:
 *  1. Introduction & Primary Statistic (500+ Participants)
 *  2. Divider & Brand Section flanked by supporting stats (8 Events & 10+ Colleges)
 *  3. Philosophy Strip (Explore • Create • Celebrate)
 * 
 * Spacings are optimized to fit within a ~560px vertical frame on desktop (zero-clipping).
 * Desktop backdrop is kept transparent to let the Hero background blueprint shine through.
 */
export default function AboutSection({ isMobile = false }) {
  const sceneProgress = useHeroScroll();
  const { accent } = useFestival();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 1. Desktop parent container scroll transforms
  // Stretches the entrance from 0.45 to 0.95 scroll progress to make it slower, smoother, and less sudden
  const y = useTransform(sceneProgress, [0.45, 0.95], ['100%', '0%']);
  const opacity = useTransform(sceneProgress, [0.45, 0.75], [0, 1]);
  const scale = useTransform(sceneProgress, [0.45, 0.95], [0.98, 1]);

  // 2. Desktop children scroll-linked staggered parallax transforms (reversible)
  const introY = useTransform(sceneProgress, [0.55, 0.80], [30, 0]);
  const introOpacity = useTransform(sceneProgress, [0.55, 0.80], [0, 1]);

  const primaryStatY = useTransform(sceneProgress, [0.60, 0.85], [35, 0]);
  const primaryStatOpacity = useTransform(sceneProgress, [0.60, 0.85], [0, 1]);

  const logoY = useTransform(sceneProgress, [0.65, 0.90], [35, 0]);
  const logoOpacity = useTransform(sceneProgress, [0.65, 0.90], [0, 1]);

  const leftStatY = useTransform(sceneProgress, [0.70, 0.95], [25, 0]);
  const leftStatOpacity = useTransform(sceneProgress, [0.70, 0.95], [0, 1]);

  const rightStatY = useTransform(sceneProgress, [0.70, 0.95], [25, 0]);
  const rightStatOpacity = useTransform(sceneProgress, [0.70, 0.95], [0, 1]);

  // Faint floating background dots (15-20 count, opacity < 0.1, slow drift)
  const dotsCount = 16;
  const dots = useMemo(() => {
    let s = 98765;
    const rand = () => {
      s = (s * 16807 + 0) % 2147483647;
      return (s % 10000) / 10000;
    };
    return Array.from({ length: dotsCount }, (_, i) => {
      const size = 3 + rand() * 4; // 3-7px
      const x = rand() * 100; // 0-100%
      const y = rand() * 100; // 0-100%
      const dotOpacity = 0.02 + rand() * 0.03;
      const duration = 20 + rand() * 20;
      const delay = rand() * -20;
      const dx1 = rand() * 60 - 30;
      const dy1 = rand() * 60 - 30;
      const dx2 = rand() * 60 - 30;
      const dy2 = rand() * 60 - 30;
      const roll = rand();
      let color = 'rgba(255, 255, 255, 0.4)';
      if (roll < 0.12) {
        color = 'rgba(217, 4, 11, 0.4)';
      } else if (roll < 0.16) {
        color = 'rgba(133, 3, 7, 0.4)';
      }
      return { id: `about-dot-${i}`, size, x, y, opacity: dotOpacity, duration, delay, dx1, dy1, dx2, dy2, color };
    });
  }, []);

  if (isMobile) {
    return (
      <motion.div
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative w-full h-auto flex flex-col items-center px-6 py-10 pointer-events-auto select-none z-10 bg-background border-t border-neutral-200/10 dark:border-neutral-800/10"
      >
        <Container size="lg" className="flex flex-col gap-6 w-full text-left">
          {/* Header & Simplified Narrative */}
          <div className="w-full">
            <span className="text-xs font-mono tracking-[0.25em] font-semibold uppercase mb-1 block text-text-secondary">
              ABOUT
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-text-primary font-heading mb-3 leading-tight">
              A Data Science Tech Carnival
            </h2>
            <p className="text-xs text-text-secondary font-sans leading-[1.6] font-light">
              TechnoVista is the flagship annual technology festival organized by VJ Data Questers, the official Data Science and AI community of VNR VJIET. Designed as an immersive tech carnival, it serves as a catalyst for innovation, bringing creative minds together to compete, collaborate, and shape the future of digital engineering.
            </p>
          </div>

          {/* Unified Horizontal Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 w-full border-t border-b border-neutral-200/10 dark:border-neutral-800/10 py-5 text-center mt-2">
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-black font-heading text-text-primary tracking-tight leading-none mb-1">
                800+
              </span>
              <span className="text-[8px] font-mono tracking-widest text-text-secondary uppercase font-semibold">
                Participants
              </span>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-r border-neutral-200/10 dark:border-neutral-800/10">
              <span className="text-2xl font-black font-heading text-text-primary tracking-tight leading-none mb-1">
                8
              </span>
              <span className="text-[8px] font-mono tracking-widest text-text-secondary uppercase font-semibold">
                Events
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl font-black font-heading text-text-primary tracking-tight leading-none mb-1">
                15+
              </span>
              <span className="text-[8px] font-mono tracking-widest text-text-secondary uppercase font-semibold">
                Colleges
              </span>
            </div>
          </div>
        </Container>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="about"
      style={{ y, opacity, scale, willChange: 'transform, opacity' }}
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 sm:px-12 py-6 sm:py-8 overflow-y-auto pointer-events-auto select-none z-10"
    >
      {/* 1. Subtle Background Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-current"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
              color: dot.color,
              willChange: 'transform',
            }}
            animate={{
              x: [0, dot.dx1, dot.dx2, 0],
              y: [0, dot.dy1, dot.dy2, 0],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <Container size="lg" className="relative z-10 flex flex-col justify-center max-w-5xl w-full">
        
        {/* Tier 1: Introduction & Primary Statistic */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start w-full text-left">
          
          {/* Left Side: Introduction Narrative */}
          <motion.div
            style={{ y: introY, opacity: introOpacity }}
            className="md:col-span-7 flex flex-col text-left"
          >
            <span className="text-xs font-mono tracking-[0.25em] font-semibold uppercase mb-2 block transition-colors duration-300 text-text-secondary">
              ABOUT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.2rem] font-bold tracking-tight text-text-primary font-heading mb-4 leading-tight">
              A Data Science<br />Tech Carnival
            </h2>
            
            <div className="flex flex-col gap-3 max-w-xl text-xs sm:text-sm md:text-[14px] text-text-secondary font-sans leading-[1.6] font-light">
              <p>
                TechnoVista is the flagship annual technology festival organized by VJ Data Questers, the official Data Science and Artificial Intelligence community of VNR VJIET. Designed as an immersive tech carnival, it brings together creative minds, developers, and data enthusiasts to push the boundaries of technology and intelligence.
              </p>
              <p>
                Through practical competitions, hands-on hackathons, and immersive technical experiences, TechnoVista serves as a catalyst for innovation. It is a space where students transform theoretical concepts into real-world applications, collaborate on new ideas, and shape the future of digital engineering.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Primary Statistic */}
          <motion.div
            style={{ y: primaryStatY, opacity: primaryStatOpacity }}
            className="md:col-span-5 flex flex-col items-start md:items-center text-left md:text-center justify-center md:border-l border-neutral-200/20 dark:border-neutral-800/20 md:pl-10 md:pt-6"
          >
            <span className="text-6xl sm:text-7xl font-black font-heading text-text-primary tracking-tighter leading-none mb-1 select-none">
              800+
            </span>
            <span className="text-xs font-mono tracking-widest text-text-secondary uppercase font-semibold block mb-2">
              Participants
            </span>
            <p className="text-xs text-text-secondary font-sans leading-relaxed max-w-[240px]">
              Students from leading engineering colleges collaborating, learning, and competing together.
            </p>
          </motion.div>

        </div>

        {/* Horizontal Divider */}
        <motion.div
          style={{ opacity: logoOpacity }}
          className="w-full my-6 md:my-7 border-t border-neutral-200/40 dark:border-neutral-800/40"
        />

        {/* Tier 2: Brand & Supporting Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full text-center">
          
          {/* Left Column: Event Stat */}
          <motion.div
            style={{ y: leftStatY, opacity: leftStatOpacity }}
            className="md:col-span-3 order-2 md:order-1 flex flex-col items-center md:items-end text-center md:text-right py-2 md:border-r border-neutral-200/20 dark:border-neutral-800/20 md:pr-8"
          >
            <span className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary tracking-tight mb-1 select-none">
              8
            </span>
            <span className="text-[11px] font-mono tracking-wider text-text-secondary uppercase font-semibold mb-1 block">
              Signature Events
            </span>
            <p className="text-[11px] text-text-secondary font-sans leading-relaxed max-w-[180px]">
              Competitions, AI Challenges, Hackathons, and Workshops.
            </p>
          </motion.div>

          {/* Center Column: Brand Identity */}
          <motion.div
            style={{ y: logoY, opacity: logoOpacity }}
            className="md:col-span-6 order-1 md:order-2 flex flex-col items-center text-center px-4"
          >
            {/* Logo container with pulse scan effect */}
            <div className="relative flex items-center justify-center w-20 h-20 mb-3 select-none">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16 rounded-full border border-current bg-current pointer-events-none"
                  style={{
                    color: 'rgba(255, 255, 255, 0.08)',
                    willChange: 'transform, opacity',
                  }}
                  initial={{ scale: 0.5, opacity: 0.08 }}
                  animate={{
                    scale: [0.5, 2.2],
                    opacity: [0.08, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 1.0,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}
              
              <img
                src={clubLogo}
                alt="VJ Data Questers Logo"
                className="relative w-16 h-16 object-contain"
                draggable={false}
              />
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-heading text-text-primary mb-1">
              VJ Data Questers
            </h3>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-text-secondary uppercase font-semibold mb-2 block">
              Official Data Science &amp; AI Community
            </span>
            <p className="text-[11px] sm:text-xs text-text-secondary font-sans leading-relaxed max-w-[340px] font-light">
              The official student community dedicated to fostering innovation in Data Science, Machine Learning, and Artificial Intelligence at VNR VJIET.
            </p>
          </motion.div>

          {/* Right Column: College Stat */}
          <motion.div
            style={{ y: rightStatY, opacity: rightStatOpacity }}
            className="md:col-span-3 order-3 md:order-3 flex flex-col items-center md:items-start text-center md:text-left py-2 md:border-l border-neutral-200/20 dark:border-neutral-800/20 md:pl-8"
          >
            <span className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary tracking-tight mb-1 select-none">
              15+
            </span>
            <span className="text-[11px] font-mono tracking-wider text-text-secondary uppercase font-semibold mb-1 block">
              Participating Colleges
            </span>
            <p className="text-[11px] text-text-secondary font-sans leading-relaxed max-w-[180px]">
              Bringing together students from leading engineering institutions.
            </p>
          </motion.div>

        </div>

      </Container>
    </motion.div>
  );
}
