import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import { useHeroScroll } from '../../contexts/HeroScrollContext';
import { useFestival } from '../../hooks/useFestival';
import Container from '../ui/Container';
import clubLogo from '../../assets/logos/logo.png';

// Premium animated count-up component triggering once on viewport enter
function CountUp({ to, duration = 1.6, delay = 0.1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const countValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const controls = animate(countValue, to, {
        duration,
        ease: [0.16, 1, 0.3, 1], // Custom ultra-premium cubic bezier
        onUpdate: (latest) => setDisplayValue(Math.floor(latest))
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, to, duration, delay, countValue]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function AboutSection({ isMobile = false }) {
  const sceneProgress = useHeroScroll();
  const { accent } = useFestival();

  // 1. Desktop parent container scroll transforms (entrance, rest, and exit phases for seamless scrolling)
  const y = useTransform(sceneProgress, [0.20, 0.45, 0.70, 1.0], ['100%', '0%', '0%', '-40vh']);
  const opacity = useTransform(sceneProgress, [0.20, 0.40, 0.70, 1.0], [0, 1, 1, 0]);
  const scale = useTransform(sceneProgress, [0.20, 0.45, 0.70, 1.0], [0.98, 1, 1, 0.96]);

  // 2. Desktop children scroll-linked staggered parallax transforms (entrance, rest, exit)
  const introY = useTransform(sceneProgress, [0.24, 0.42, 0.72, 0.95], [30, 0, 0, -30]);
  const introOpacity = useTransform(sceneProgress, [0.24, 0.42, 0.72, 0.95], [0, 1, 1, 0]);

  const primaryStatY = useTransform(sceneProgress, [0.26, 0.44, 0.74, 0.96], [35, 0, 0, -35]);
  const primaryStatOpacity = useTransform(sceneProgress, [0.26, 0.44, 0.74, 0.96], [0, 1, 1, 0]);

  const logoY = useTransform(sceneProgress, [0.28, 0.46, 0.76, 0.97], [35, 0, 0, -35]);
  const logoOpacity = useTransform(sceneProgress, [0.28, 0.46, 0.76, 0.97], [0, 1, 1, 0]);

  const leftStatY = useTransform(sceneProgress, [0.30, 0.48, 0.78, 0.98], [25, 0, 0, -25]);
  const leftStatOpacity = useTransform(sceneProgress, [0.30, 0.48, 0.78, 0.98], [0, 1, 1, 0]);

  const rightStatY = useTransform(sceneProgress, [0.30, 0.48, 0.78, 0.98], [25, 0, 0, -25]);
  const rightStatOpacity = useTransform(sceneProgress, [0.30, 0.48, 0.78, 0.98], [0, 1, 1, 0]);

  // Faint floating background dots (15-20 count, opacity < 0.1, slow drift via CSS)
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
      const roll = rand();
      let color = 'rgba(245, 235, 221, 0.4)'; // Warm Off-White
      if (roll < 0.12) {
        color = 'rgba(200, 120, 50, 0.4)'; // Amber
      } else if (roll < 0.16) {
        color = 'rgba(138, 45, 36, 0.4)'; // Burgundy Accent
      }
      const animClass = rand() > 0.5 ? 'animate-dot-drift-1' : 'animate-dot-drift-2';
      return { id: `about-dot-${i}`, size, x, y, opacity: dotOpacity, duration, delay, color, animClass };
    });
  }, []);

  if (isMobile) {
    const mobileContainerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.12,
        }
      }
    };

    const mobileItemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }
    };

    return (
      <motion.div
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={mobileContainerVariants}
        className="relative w-full h-auto flex flex-col items-center px-5 py-14 pointer-events-auto select-none z-10 bg-transparent overflow-hidden"
      >
        {/* Floating background dots (optimized to 8 dots for mobile GPU) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {dots.slice(0, 8).map((dot) => (
            <div
              key={dot.id}
              className={`absolute rounded-full bg-current ${dot.animClass}`}
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                opacity: dot.opacity * 1.5,
                color: dot.color,
                '--dot-duration': `${dot.duration}s`,
                '--dot-delay': `${dot.delay}s`,
                willChange: 'transform',
              }}
            />
          ))}
        </div>

        <Container size="lg" className="relative z-10 flex flex-col gap-8 w-full text-left">
          {/* Header & Narrative Block */}
          <motion.div variants={mobileItemVariants} className="w-full flex flex-col gap-4">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] font-semibold uppercase mb-2 block text-text-secondary tv-about-text-shadow">
                ABOUT
              </span>
              <h2 className="text-2xl xs:text-3xl font-bold tracking-tight text-text-primary font-heading leading-tight tv-about-text-shadow">
                A Data Science Tech Carnival
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 text-[15px] text-[#eae3d2] font-sans leading-[1.85] font-light tv-about-text-shadow">
              <p>
                TechnoVista is the flagship annual technology festival organized by VJ Data Questers, the official Data Science and AI community of VNR VJIET. Designed as an immersive tech carnival, it serves as a catalyst for innovation, bringing creative minds together to compete, collaborate, and shape the future of digital engineering.
              </p>
            </div>
          </motion.div>

          {/* Horizontal Divider */}
          <motion.div variants={mobileItemVariants}>
            <div 
              className="w-full h-px" 
              style={{ 
                background: 'linear-gradient(90deg, transparent 0%, rgba(243, 229, 202, 0.15) 20%, rgba(243, 229, 202, 0.15) 80%, transparent 100%)' 
              }} 
            />
          </motion.div>

          {/* Statistics Row — 3 Equal Columns */}
          <motion.div variants={mobileItemVariants} className="w-full">
            <div className="grid grid-cols-3 gap-0 w-full">
              {/* Stat 1: Participants */}
              <div className="flex flex-col items-center text-center py-2">
                <span 
                  className="text-3xl xs:text-4xl font-black font-heading tracking-tight leading-none mb-1.5"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                  }}
                >
                  <CountUp to={800} />+
                </span>
                <span className="text-[9px] font-mono tracking-widest text-text-secondary uppercase font-semibold block tv-about-text-shadow">
                  Participants
                </span>
              </div>

              {/* Vertical Divider */}
              <div className="flex flex-col items-center text-center py-2 border-x" style={{ borderColor: 'rgba(243, 229, 202, 0.08)' }}>
                {/* Stat 2: Signature Events */}
                <span 
                  className="text-3xl xs:text-4xl font-black font-heading tracking-tight leading-none mb-1.5"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                  }}
                >
                  <CountUp to={8} />
                </span>
                <span className="text-[9px] font-mono tracking-widest text-text-secondary uppercase font-semibold block tv-about-text-shadow">
                  Events
                </span>
              </div>

              {/* Stat 3: Participating Colleges */}
              <div className="flex flex-col items-center text-center py-2">
                <span 
                  className="text-3xl xs:text-4xl font-black font-heading tracking-tight leading-none mb-1.5"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                  }}
                >
                  <CountUp to={15} />+
                </span>
                <span className="text-[9px] font-mono tracking-widest text-text-secondary uppercase font-semibold block tv-about-text-shadow">
                  Colleges
                </span>
              </div>
            </div>
          </motion.div>

          {/* Brand Identity / DQ Card — Below Statistics */}
          <motion.div 
            variants={mobileItemVariants}
            className="flex flex-col items-center text-center px-6 py-8 rounded-2xl border w-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 201, 88, 0.02) 0%, rgba(138, 45, 36, 0.04) 100%)',
              borderColor: 'rgba(255, 201, 88, 0.15)', // Premium amber-gold border
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 201, 88, 0.05)',
            }}
          >
            {/* Logo image floating with ambient glow */}
            <div className="relative flex items-center justify-center w-20 h-20 mb-4 select-none">
              <div 
                className="absolute inset-0 rounded-full blur-[25px] pointer-events-none -z-10 animate-float" 
                style={{ background: 'radial-gradient(circle, rgba(255, 201, 88, 0.25) 0%, transparent 70%)' }} 
              />
              <img
                src={clubLogo}
                alt="VJ Data Questers Logo"
                className="relative w-20 h-20 object-contain animate-float"
                draggable={false}
              />
            </div>

            <h3 
              className="text-xl font-extrabold font-heading mb-1 tv-about-text-shadow"
              style={{
                backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
              }}
            >
              VJ Data Questers
            </h3>

            <span 
              className="text-[9px] font-mono tracking-[0.2em] uppercase font-semibold mb-3 block tv-about-text-shadow"
              style={{ color: 'rgba(255, 201, 88, 0.75)' }}
            >
              Official Data Science &amp; AI Community
            </span>
            <p className="text-xs text-text-muted font-sans leading-relaxed max-w-[300px] font-light tv-about-text-shadow">
              The official student community dedicated to fostering innovation in Data Science, Machine Learning, and Artificial Intelligence at VNR VJIET.
            </p>
          </motion.div>
        </Container>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="about"
      style={{ y, opacity, scale, willChange: 'transform, opacity' }}
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 sm:px-12 py-4 sm:py-6 overflow-y-auto pointer-events-auto select-none z-10"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className={`absolute rounded-full bg-current ${dot.animClass}`}
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
              color: dot.color,
              '--dot-duration': `${dot.duration}s`,
              '--dot-delay': `${dot.delay}s`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      <Container size="lg" className="relative z-10 flex flex-col justify-center max-w-5xl w-full">
        
        {/* Tier 1: Introduction & Primary Statistic (Vertical spacing tightened) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start w-full text-left">
          
          {/* Left Side: Introduction Narrative (High contrast text shadows added) */}
          <motion.div
            style={{ y: introY, opacity: introOpacity }}
            className="md:col-span-7 flex flex-col text-left"
          >
            <span className="text-xs font-mono tracking-[0.25em] font-semibold uppercase mb-1 block transition-colors duration-300 text-text-secondary tv-about-text-shadow">
              ABOUT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.2rem] font-bold tracking-tight text-text-primary font-heading mb-3 leading-tight tv-about-text-shadow">
              A Data Science<br />Tech Carnival
            </h2>
            
            <div className="flex flex-col gap-3 max-w-[640px] text-xs sm:text-sm md:text-[16px] text-[#eae3d2] font-sans leading-[1.6] md:leading-[1.8] font-light tv-about-text-shadow">
              <p>
                TechnoVista is the flagship annual technology festival organized by VJ Data Questers, the official Data Science and Artificial Intelligence community of VNR VJIET. Designed as an immersive tech carnival, it brings together creative minds, developers, and data enthusiasts to push the boundaries of technology and intelligence.
              </p>
              <p>
                Through practical competitions, hands-on hackathons, and immersive technical experiences, TechnoVista serves as a catalyst for innovation. It is a space where students transform theoretical concepts into real-world applications, collaborate on new ideas, and shape the future of digital engineering.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Primary Stat (800+ Participants - Border line removed, shifted lower) */}
          <motion.div
            style={{ y: primaryStatY, opacity: primaryStatOpacity }}
            className="md:col-span-5 flex flex-col items-start md:items-center text-left md:text-center justify-center md:pl-10 md:pt-20"
          >
            <span 
              className="text-6xl sm:text-7xl md:text-[5rem] font-black font-heading tracking-tighter leading-none mb-2 select-none"
              style={{
                backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
              }}
            >
              <CountUp to={800} />+
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-text-muted uppercase font-normal mb-2 block tv-about-text-shadow">
              Participants
            </span>
            <p className="text-xs text-text-muted font-sans leading-relaxed max-w-[200px] font-light tv-about-text-shadow">
              Students from leading engineering colleges collaborating, learning, and competing together.
            </p>
          </motion.div>

        </div>

        {/* Tier 2: Brand & Supporting Statistics (Vertical divider deleted to connect the sections) */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-5 items-center w-full text-center mt-3">

          {/* Left Column: Event Stat (Border line removed, centered and shifted) */}
          <motion.div
            style={{ y: leftStatY, opacity: leftStatOpacity }}
            className="md:col-span-3 order-2 md:order-1 flex flex-col items-center text-center py-2 md:pt-4"
          >
            <span 
              className="text-6xl sm:text-7xl font-black font-heading tracking-tighter leading-none mb-2 select-none"
              style={{
                backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
              }}
            >
              <CountUp to={8} />
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-text-muted uppercase font-normal mb-2 block tv-about-text-shadow">
              Signature Events
            </span>
            <p className="text-xs text-text-muted font-sans leading-relaxed max-w-[200px] font-light tv-about-text-shadow">
              Competitions, AI Challenges, Hackathons, and Workshops.
            </p>
          </motion.div>

          {/* Center Column: Brand Identity */}
          <motion.div
            style={{ y: logoY, opacity: logoOpacity }}
            className="md:col-span-6 order-1 md:order-2 flex flex-col items-center text-center px-4"
          >
            {/* Logo image floating directly via CSS animate-float */}
            <div className="relative flex items-center justify-center w-20 h-20 mb-2 select-none">
              {/* Subtle warm ambient glow behind the logo */}
              <div className="absolute inset-0 rounded-full blur-[25px] pointer-events-none -z-10 animate-float" style={{ background: 'radial-gradient(circle, rgba(232, 200, 138, 0.25) 0%, transparent 70%)' }} />

              <img
                src={clubLogo}
                alt="VJ Data Questers Logo"
                className="relative w-20 h-20 object-contain animate-float"
                draggable={false}
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-heading text-text-primary mb-0.5 tv-about-text-shadow">
              VJ Data Questers
            </h3>

            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-text-secondary uppercase font-semibold mb-1.5 block tv-about-text-shadow">
              Official Data Science &amp; AI Community
            </span>
            <p className="text-xs sm:text-[13px] text-text-muted font-sans leading-relaxed max-w-[360px] font-light tv-about-text-shadow">
              The official student community dedicated to fostering innovation in Data Science, Machine Learning, and Artificial Intelligence at VNR VJIET.
            </p>
          </motion.div>

          {/* Right Column: College Stat (Border line removed, centered and shifted) */}
          <motion.div
            style={{ y: rightStatY, opacity: rightStatOpacity }}
            className="md:col-span-3 order-3 md:order-3 flex flex-col items-center text-center py-2 md:pt-4"
          >
            <span 
              className="text-6xl sm:text-7xl font-black font-heading tracking-tighter leading-none mb-2 select-none"
              style={{
                backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
              }}
            >
              <CountUp to={15} />+
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-text-muted uppercase font-normal mb-2 block tv-about-text-shadow">
              Participating Colleges
            </span>
            <p className="text-xs text-text-muted font-sans leading-relaxed max-w-[200px] font-light tv-about-text-shadow">
              Bringing together students from leading engineering institutions.
            </p>
          </motion.div>

        </div>

      </Container>
    </motion.div>
  );
}
