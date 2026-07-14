"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingIntro({ onComplete }) {
  const [showText, setShowText] = useState(false);
  const [stage, setStage] = useState(0); // 0: loading/playing, 1: fade-out
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1200);

    // Fade out text matching the portal collapse
    const textExitTimer = setTimeout(() => {
      setShowText(false);
    }, 3700);

    // Trigger page entrance transition after 4.6 seconds
    const exitTimer = setTimeout(() => {
      setStage(1);
    }, 4600);

    // Complete loader and enter main landing page after 5.2 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5200);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(textExitTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const count = isMobile ? 12 : 30;
    const newParticles = Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 2.5 + 1; // 1px to 3.5px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 12 + 12; // 12s to 24s
      const delay = Math.random() * -20; // negative delay so they start immediately
      const opacity = Math.random() * 0.35 + 0.15; // 0.15 to 0.50 opacity
      
      const dx1 = `${(Math.random() * 40 - 20).toFixed(1)}px`;
      const dy1 = `${(Math.random() * 40 - 20).toFixed(1)}px`;
      const dx2 = `${(Math.random() * 40 - 20).toFixed(1)}px`;
      const dy2 = `${(Math.random() * 40 - 20).toFixed(1)}px`;
      
      return {
        id: i,
        style: {
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: opacity,
          "--duration": `${duration}s`,
          "--delay": `${delay}s`,
          "--dx1": dx1,
          "--dy1": dy1,
          "--dx2": dx2,
          "--dy2": dy2,
        }
      };
    });
    setParticles(newParticles);
  }, [isMobile]);

  const handleVideoEnded = () => {
    setStage(1);
    setTimeout(() => {
      onComplete();
    }, 600); // Allow fade-out animation to complete
  };

  return (
    <AnimatePresence>
      {stage === 0 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Fullscreen Portal Video Intro Styles */}
          <style>{`
            /* Camera Drift on the Video Container */
            @keyframes camera-drift {
              0% {
                transform: scale(1.05) translateX(3%) translate3d(0px, 0px, 0px) rotate(0deg);
              }
              50% {
                transform: scale(1.08) translateX(3%) translate3d(4px, -6px, 0px) rotate(0.12deg);
              }
              100% {
                transform: scale(1.05) translateX(3%) translate3d(0px, 0px, 0px) rotate(0deg);
              }
            }

            @keyframes camera-drift-mobile {
              0% {
                transform: translate(-45.5%, -50%) scale(1) translate3d(0px, 0px, 0px) rotate(0deg);
              }
              50% {
                transform: translate(-45.5%, -50%) scale(1.04) translate3d(4px, -6px, 0px) rotate(-0.1deg);
              }
              100% {
                transform: translate(-45.5%, -50%) scale(1) translate3d(0px, 0px, 0px) rotate(0deg);
              }
            }

            .portal-video-responsive {
              position: absolute;
              z-index: 10;
              opacity: 0.8;
            }

            @media (max-width: 639px) {
              .portal-video-responsive {
                width: 215vw;
                height: auto;
                max-width: none;
                top: 50%;
                left: 50%;
                transform: translate(-45.5%, -50%);
                animation: camera-drift-mobile 22s ease-in-out infinite;
                will-change: transform;
              }
            }
            @media (min-width: 640px) {
              .portal-video-responsive {
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: 0% center;
                transform: scale(1.05) translateX(3%);
                animation: camera-drift 24s ease-in-out infinite;
                will-change: transform;
              }
            }

            /* Ambient Particles floating */
            @keyframes float-ambient {
              0% {
                transform: translate3d(0, 0, 0) scale(1);
              }
              33% {
                transform: translate3d(var(--dx1), var(--dy1), 0) scale(1.2);
              }
              66% {
                transform: translate3d(var(--dx2), var(--dy2), 0) scale(0.8);
              }
              100% {
                transform: translate3d(0, 0, 0) scale(1);
              }
            }

            .ambient-particle {
              position: absolute;
              border-radius: 50%;
              background-color: rgba(245, 158, 11, 0.45);
              box-shadow: 0 0 4px rgba(245, 158, 11, 0.3);
              animation: float-ambient var(--duration) ease-in-out infinite;
              animation-delay: var(--delay);
              pointer-events: none;
              will-change: transform;
            }

            /* Atmospheric Haze drifting slowly */
            @keyframes haze-drift {
              0% {
                transform: translate3d(-2%, -2%, 0) scale(1.05);
              }
              50% {
                transform: translate3d(2%, 2%, 0) scale(1.1);
              }
              100% {
                transform: translate3d(-2%, -2%, 0) scale(1.05);
              }
            }

            .haze-layer {
              position: absolute;
              inset: -5%;
              width: 110%;
              height: 110%;
              background: radial-gradient(circle at 50% 50%, rgba(217, 4, 11, 0.04) 0%, rgba(245, 158, 11, 0.02) 40%, transparent 70%);
              filter: blur(40px);
              opacity: 0.8;
              pointer-events: none;
              animation: haze-drift 18s ease-in-out infinite;
              will-change: transform;
            }

            /* Slow breathing of overall overlay and vignette */
            @keyframes atmospheric-breath {
              0%, 100% {
                opacity: 0.75;
              }
              50% {
                opacity: 0.88;
              }
            }

            .cinematic-vignette {
              position: absolute;
              inset: 0;
              background: radial-gradient(circle, transparent 35%, rgba(0, 0, 0, 0.75) 85%, rgba(0, 0, 0, 0.95) 100%);
              pointer-events: none;
              animation: atmospheric-breath 14s ease-in-out infinite;
              will-change: opacity;
            }

            /* Film Grain layer moving */
            @keyframes noise-drift {
              0% { transform: translate3d(0, 0, 0); }
              10% { transform: translate3d(-0.5%, -0.5%, 0); }
              20% { transform: translate3d(-1%, 0.5%, 0); }
              30% { transform: translate3d(0.5%, -1%, 0); }
              40% { transform: translate3d(-0.5%, 1.5%, 0); }
              50% { transform: translate3d(-1%, 0.5%, 0); }
              60% { transform: translate3d(1.5%, -0.5%, 0); }
              70% { transform: translate3d(1%, 0.5%, 0); }
              80% { transform: translate3d(-1.5%, -1%, 0); }
              90% { transform: translate3d(0.5%, 1%, 0); }
              100% { transform: translate3d(0, 0, 0); }
            }

            .film-grain {
              position: absolute;
              inset: -5%;
              width: 110%;
              height: 110%;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
              opacity: 0.025;
              mix-blend-mode: overlay;
              pointer-events: none;
              animation: noise-drift 0.15s steps(3) infinite;
              will-change: transform;
            }

            /* Edge light rays sweeping */
            @keyframes edge-ray-sweep {
              0% {
                transform: translateX(-100%) translateY(-100%) rotate(-45deg);
                opacity: 0;
              }
              5% {
                opacity: 0.12;
              }
              15% {
                opacity: 0;
                transform: translateX(100%) translateY(100%) rotate(-45deg);
              }
              100% {
                transform: translateX(100%) translateY(100%) rotate(-45deg);
                opacity: 0;
              }
            }

            .edge-ray-1 {
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: linear-gradient(135deg, transparent 45%, rgba(245, 158, 11, 0.06) 50%, transparent 55%);
              filter: blur(60px);
              pointer-events: none;
              animation: edge-ray-sweep 28s ease-in-out infinite;
              animation-delay: 2s;
              will-change: transform, opacity;
            }

            /* Radial Orange Glow behind Title */
            @keyframes radial-glow-pulse {
              0%, 100% {
                transform: scale(0.95);
                opacity: 0.08;
              }
              50% {
                transform: scale(1.05);
                opacity: 0.15;
              }
            }

            .radial-glow-back {
              position: absolute;
              width: 75vw;
              height: 75vw;
              max-width: 800px;
              max-height: 800px;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, rgba(217, 4, 11, 0.1) 50%, transparent 70%);
              filter: blur(50px);
              pointer-events: none;
              animation: radial-glow-pulse 6s ease-in-out infinite;
              will-change: transform, opacity;
              mix-blend-mode: screen;
            }

            /* Dynamic Environmental Light pulse matching portal peak */
            @keyframes portal-lighting {
              0%, 100% {
                opacity: 0.3;
                filter: brightness(0.85);
              }
              50% {
                opacity: 0.6;
                filter: brightness(1.1);
              }
            }

            .environmental-light {
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 60%);
              pointer-events: none;
              animation: portal-lighting 5s ease-in-out infinite;
              will-change: opacity, filter;
            }

             /* Static Text drop shadow */
             .text-glow-static {
               text-shadow: 0 2px 6px rgba(0, 0, 0, 0.85), 0 0 10px rgba(245, 158, 11, 0.2);
             }

            /* Reduced motion logic */
            @media (prefers-reduced-motion: reduce) {
              .portal-video-responsive,
              .ambient-particle,
              .haze-layer,
              .cinematic-vignette,
              .film-grain,
              .edge-ray-1,
              .radial-glow-back,
              .environmental-light,
              .text-glow-sync {
                animation: none !important;
                will-change: auto !important;
              }
              .ambient-particle,
              .haze-layer,
              .cinematic-vignette,
              .film-grain,
              .edge-ray-1,
              .radial-glow-back,
              .environmental-light,
              .text-glow-sync {
                transform: none !important;
              }
              @media (max-width: 639px) {
                .portal-video-responsive {
                  transform: translate(-45.5%, -50%) !important;
                }
              }
              @media (min-width: 640px) {
                .portal-video-responsive {
                  transform: scale(1.05) translateX(3%) !important;
                }
              }
              .ambient-particle {
                opacity: 0.15 !important;
              }
              .film-grain {
                opacity: 0.01 !important;
              }
              .cinematic-vignette {
                opacity: 0.8 !important;
              }
              .radial-glow-back {
                opacity: 0.1 !important;
                transform: scale(1) !important;
              }
            }
          `}</style>

          {/* Layer 1: Background Video */}
          <video
            src="/videos/portal.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="portal-video-responsive"
            style={{ zIndex: 10 }}
          />

          {/* Layer 2: Gradient Overlay & Bottom Dark Gradient */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ 
              zIndex: 11,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.85) 100%)'
            }} 
          />

          {/* Layer 3: Volumetric Atmospheric Haze */}
          <div className="haze-layer" style={{ zIndex: 12 }} />

          {/* Layer 4: Floating Ambient Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 13 }}>
            {particles.map((p) => (
              <div key={p.id} className="ambient-particle" style={p.style} />
            ))}
          </div>

          {/* Layer 5: Radial Glow & Environmental Lighting & Rays */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 14 }}>
            <div className="radial-glow-back" style={{ transform: 'translate3d(0, 0, 0)' }} />
          </div>
          <div className="environmental-light" style={{ zIndex: 14 }} />
          <div className="edge-ray-1" style={{ zIndex: 14 }} />

          {/* Layer 6: Film Grain & Noise Texture */}
          <div className="film-grain" style={{ zIndex: 15 }} />

          {/* Layer 7: Cinematic Vignette */}
          <div className="cinematic-vignette" style={{ zIndex: 15 }} />

          {/* Layer 8: Scanlines & HUD */}
          <div className="absolute inset-0 bg-radar opacity-[0.05] pointer-events-none" style={{ zIndex: 16 }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" style={{ zIndex: 16 }} />

          {/* Layer 9: Logo, Typography, and Title text (z-index: 20) */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
            <AnimatePresence>
              {showText && (
                <>
                  {/* Deep Atmospheric Haze & Red Illumination */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
                  >
                    <div className="absolute w-[85vw] h-[85vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
                    <div className="absolute w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] rounded-full bg-[radial-gradient(circle,rgba(217,4,11,0.06)_0%,transparent_65%)] mix-blend-screen" />
                  </motion.div>

                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center justify-center text-center px-4 w-full -space-y-1 -translate-y-4 sm:-translate-y-6 translate-x-[6px] sm:translate-x-0"
                  >
                    <motion.h1 
                      variants={{
                        hidden: { 
                          opacity: 0, 
                          scale: 0.45, 
                          filter: "blur(12px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0)) drop-shadow(0 0 0px rgba(245, 158, 11, 0))" 
                        },
                        visible: { 
                          opacity: 1, 
                          scale: 1, 
                          filter: "blur(0px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 10px rgba(245, 158, 11, 0.22))",
                          transition: { 
                            scale: { type: "spring", stiffness: 45, damping: 14, delay: 0.1 },
                            opacity: { duration: 1.2, delay: 0.1, ease: "easeOut" },
                            filter: { duration: 1.2, delay: 0.1, ease: "easeOut" }
                          }
                        },
                        exit: { 
                          opacity: 0, 
                          scale: 0.8, 
                          filter: "blur(4px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0))", 
                          transition: { duration: 0.5, ease: "easeIn" } 
                        }
                      }}
                      className="font-heading font-black text-2xl sm:text-4xl md:text-[3.6rem] leading-[1.05] tracking-wide uppercase translate-x-[1px] sm:translate-x-0"
                      style={{ 
                        backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      VJ DATA
                    </motion.h1>

                    <motion.h1 
                      variants={{
                        hidden: { 
                          opacity: 0, 
                          scale: 0.45, 
                          filter: "blur(12px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0)) drop-shadow(0 0 0px rgba(245, 158, 11, 0))" 
                        },
                        visible: { 
                          opacity: 1, 
                          scale: 1, 
                          filter: "blur(0px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 10px rgba(245, 158, 11, 0.22))",
                          transition: { 
                            scale: { type: "spring", stiffness: 45, damping: 14, delay: 0.6 },
                            opacity: { duration: 1.2, delay: 0.6, ease: "easeOut" },
                            filter: { duration: 1.2, delay: 0.6, ease: "easeOut" }
                          }
                        },
                        exit: { 
                          opacity: 0, 
                          scale: 0.8, 
                          filter: "blur(4px) drop-shadow(0 2px 4px rgba(0, 0, 0, 0))", 
                          transition: { duration: 0.5, ease: "easeIn" } 
                        }
                      }}
                      className="font-heading font-black text-2xl sm:text-4xl md:text-[3.6rem] leading-[1.05] tracking-wide uppercase"
                      style={{ 
                        backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      QUESTERS
                    </motion.h1>
                    
                    <motion.p 
                      variants={{
                        hidden: { opacity: 0, scale: 0.6, filter: "blur(6px) drop-shadow(0 0 0px rgba(217, 4, 11, 0))" },
                        visible: { 
                          opacity: 1, 
                          scale: 1,
                          filter: "blur(0px) drop-shadow(0 0 10px rgba(217, 4, 11, 0.5))",
                          transition: { 
                            scale: { type: "spring", stiffness: 40, damping: 15, delay: 1.1 },
                            opacity: { duration: 1.0, delay: 1.1, ease: "easeOut" },
                            filter: { duration: 1.0, delay: 1.1, ease: "easeOut" }
                          }
                        },
                        exit: { 
                          opacity: 0, 
                          scale: 0.8, 
                          filter: "blur(4px) drop-shadow(0 0 0px rgba(217, 4, 11, 0))",
                          transition: { duration: 0.4, ease: "easeIn" } 
                        }
                      }}
                      className="font-mono font-medium text-[0.55rem] sm:text-[0.7rem] md:text-[0.8rem] tracking-[1em] uppercase mt-4 opacity-70 ml-4"
                      style={{ 
                        color: '#d9040b'
                      }}
                    >
                      PRESENTS
                    </motion.p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
