"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingIntro({ onComplete }) {
  const [showText, setShowText] = useState(false);
  const [stage, setStage] = useState(0); // 0: loading/playing, 1: fade-out

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
          className="fixed inset-0 z-[100] bg-[#170709] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Fullscreen Portal Video Intro */}
          <style>{`
            .portal-video-responsive {
              position: absolute;
              z-index: 10;
              opacity: 0.8;
            }
            @media (max-width: 639px) {
              .portal-video-responsive {
                width: 250vw;
                height: auto;
                max-width: none;
                top: 50%;
                left: 50%;
                transform: translate(-32%, -50%);
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
              }
            }
          `}</style>
          <video
            src="/videos/portal.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="portal-video-responsive"
          />

          {/* Futuristic HUD scans & scanlines */}
          <div className="absolute inset-0 bg-radar opacity-[0.06] pointer-events-none z-15" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[length:100%_4px] pointer-events-none z-15" />

          {/* "TECHNOVISTA 2K26" coming out of the portal center */}
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
                    className="flex flex-col items-center justify-center text-center px-4 w-full -space-y-1 -translate-y-4 sm:-translate-y-6"
                  >
                  <motion.h1 
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 1.5, delay: 0, ease: "easeOut" } },
                      exit: { opacity: 0, scale: 0.8, filter: "blur(4px)", transition: { duration: 0.5, ease: "easeIn" } }
                    }}
                    className="font-heading font-black text-3xl sm:text-4xl md:text-[3.6rem] leading-[1.05] tracking-wide uppercase"
                    style={{ 
                      backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                    }}
                  >
                    VJ DATA
                  </motion.h1>

                  <motion.h1 
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 1.5, delay: 0.8, ease: "easeOut" } },
                      exit: { opacity: 0, scale: 0.8, filter: "blur(4px)", transition: { duration: 0.5, ease: "easeIn" } }
                    }}
                    className="font-heading font-black text-3xl sm:text-4xl md:text-[3.6rem] leading-[1.05] tracking-wide uppercase"
                    style={{ 
                      backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))'
                    }}
                  >
                    QUESTERS
                  </motion.h1>
                  
                  <motion.p 
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 1.5, delay: 1.6, ease: "easeInOut" } },
                      exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4, ease: "easeIn" } }
                    }}
                    className="font-mono font-medium text-[0.55rem] sm:text-[0.7rem] md:text-[0.8rem] tracking-[1em] uppercase mt-4 opacity-70 ml-4"
                    style={{ 
                      color: '#d9040b',
                      filter: 'drop-shadow(0 0 10px rgba(217,4,11,0.5))' 
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
