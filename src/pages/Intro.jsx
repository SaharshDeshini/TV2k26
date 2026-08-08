"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LandingIntro from "@/components/LandingIntro";
import SparksEffect from "@/components/SparksEffect";
import SketchfabBackground from "@/components/SketchfabBackground";
import OpeningPage from "@/components/OpeningPage";
import SmoothScroll from "@/components/SmoothScroll";
import { HomeContent } from "@/pages/Home";
import { AppProvider } from "@/contexts/AppContext";
import { FestivalProvider } from "@/contexts/FestivalContext";

export default function Intro() {
  return (
    <AppProvider>
      <FestivalProvider>
        <SmoothScroll>
          <IntroContent />
        </SmoothScroll>
      </FestivalProvider>
    </AppProvider>
  );
}

function IntroContent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState("portal"); // "portal" | "opening" | "fade_out" | "home"

  useEffect(() => {
    document.title = "TECHNOVISTA 2K26 | VJ Data Questers";
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading || stage === "home") {
      document.documentElement.classList.remove("scroll-locked");
      return;
    }
    document.documentElement.classList.add("scroll-locked");
    return () => {
      document.documentElement.classList.remove("scroll-locked");
    };
  }, [mounted, isLoading, stage]);

  const handleIntroComplete = () => {
    if (typeof window !== "undefined") {
      window.__hasShownIntro = true;
    }
    setIsLoading(false);
    setStage("opening");
  };

  const handleEnter = () => {
    setStage("fade_out");
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.__startCinematic = true;
        window.__hasShownIntro = true;
      }
      navigate('/home');
    }, 700); // 700ms spatial elevation bridge
  };

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  if (stage === "home") {
    return <HomeContent />;
  }

  return (
    <div className="relative min-h-screen bg-transparent">
      <AnimatePresence mode="popLayout">
        {isLoading ? (
          <motion.div
            key="portal-loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100]"
          >
            <LandingIntro onComplete={handleIntroComplete} />
          </motion.div>
        ) : (
          <div className="relative h-[100svh] md:min-h-screen md:h-auto w-screen bg-transparent overflow-hidden flex flex-col justify-center select-none">
            {/* Doctor Strange spark mouse trails */}
            <SparksEffect />
            
            {/* Solid black background for opening page */}
            <SketchfabBackground />

            {/* Opening Page (Fades out when transition starts) */}
            <motion.div
              key="opening-page"
              initial={{ opacity: 0 }}
              animate={stage === "fade_out" ? { opacity: 0 } : { opacity: 1 }}
              transition={stage === "fade_out" ? { duration: 0.8, ease: "easeInOut" } : { duration: 0.5, ease: "easeOut" }}
              className="relative z-10 flex flex-col justify-center w-full h-full md:min-h-full lg:h-full pointer-events-auto"
            >
              <main className="relative z-10 flex flex-col justify-center w-full h-full md:min-h-full lg:h-full">
                <OpeningPage onEnter={handleEnter} isEntered={stage !== "opening"} />
              </main>
            </motion.div>

            {/* Solid Black Screen fades in on Enter click */}
            <AnimatePresence>
              {stage === "fade_out" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="fixed inset-0 z-50 bg-black pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
