"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import SparksEffect from "@/components/SparksEffect";
import SketchfabBackground from "@/components/SketchfabBackground";
import EventHub from "@/components/EventHub";
import HeroSection from "@/components/Hero/HeroSection";
import { AppProvider } from "@/contexts/AppContext";
import { FestivalProvider } from "@/contexts/FestivalContext";

import { useApp } from "@/contexts/AppContext";

export default function Home() {
  return (
    <AppProvider>
      <FestivalProvider>
        <SmoothScroll>
          <HomeContent />
        </SmoothScroll>
      </FestivalProvider>
    </AppProvider>
  );
}

export function HomeContent() {
  const { setIsLoaderFinished, setIsLoaderExiting } = useApp();
  const [mounted, setMounted] = useState(() => {
    if (typeof window !== "undefined") {
      return !!window.__hasShownIntro;
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !window.__hasShownIntro;
    }
    return true;
  });
  const [stage, setStage] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.__startCinematic) return "cinematic";
      return "refresh";
    }
    return "transition";
  });
  const [introPhase, setIntroPhase] = useState(() => {
    if (typeof window !== "undefined") {
      if (window.__startCinematic) return "fadeout";
      if (window.__introTransitionComplete) return "completed";
      return "refresh_bg";
    }
    return "completed";
  });

  useEffect(() => {
    document.title = "TECHNOVISTA 2K26 | VJ Data Questers";
    setMounted(true);
    if (typeof window !== "undefined") {
      setIsLoading(false);
      setIsLoaderExiting(true);
      setIsLoaderFinished(true);

      if (window.__introTransitionComplete) {
        setStage("completed");
        setIntroPhase("completed");
        document.documentElement.setAttribute('data-transition-complete', '');
      } else if (!window.__startCinematic) {
        setStage("refresh");
        setIntroPhase("refresh_bg");
      }
    }
  }, [setIsLoaderFinished, setIsLoaderExiting]);

  // Flow 1: Staged Cinematic Intro Timeline (Entry from Intro page)
  useEffect(() => {
    if (stage === "cinematic") {
      const timerBeam           = setTimeout(() => setIntroPhase("beam"), 600);
      const timerGoldEntry      = setTimeout(() => setIntroPhase("gold_entry"), 1800);
      const timerRetract        = setTimeout(() => setIntroPhase("retract_anchor"), 4000);
      const timerBgUnveil       = setTimeout(() => setIntroPhase("bg_unveil"), 5000);
      const timerBadgesParticles= setTimeout(() => setIntroPhase("badges_particles"), 6200);
      const timerReexpandMorph  = setTimeout(() => setIntroPhase("reexpand_morph"), 7400);
      const timerFinalCta       = setTimeout(() => setIntroPhase("final_cta"), 8800);
      const timerComplete       = setTimeout(() => {
        setIntroPhase("completed");
        setStage("completed");
        if (typeof window !== "undefined") {
          document.documentElement.setAttribute('data-transition-complete', '');
          window.__introTransitionComplete = true;
          window.__hasShownIntro = true;
          delete window.__startCinematic;
        }
      }, 10000);

      return () => {
        clearTimeout(timerBeam);
        clearTimeout(timerGoldEntry);
        clearTimeout(timerRetract);
        clearTimeout(timerBgUnveil);
        clearTimeout(timerBadgesParticles);
        clearTimeout(timerReexpandMorph);
        clearTimeout(timerFinalCta);
        clearTimeout(timerComplete);
      };
    }

    // Flow 2: Direct Load / Refresh Timeline (~2.0s Total)
    if (stage === "refresh") {
      const tBeam      = setTimeout(() => setIntroPhase("refresh_beam"), 300);
      const tParticles = setTimeout(() => setIntroPhase("refresh_particles"), 600);
      const tTitle     = setTimeout(() => setIntroPhase("refresh_title"), 900);
      const tSettle    = setTimeout(() => setIntroPhase("refresh_settle"), 1300);
      const tComplete  = setTimeout(() => {
        setIntroPhase("completed");
        setStage("completed");
        if (typeof window !== "undefined") {
          document.documentElement.setAttribute('data-transition-complete', '');
          window.__introTransitionComplete = true;
          window.__hasShownIntro = true;
        }
      }, 2000);

      return () => {
        clearTimeout(tBeam);
        clearTimeout(tParticles);
        clearTimeout(tTitle);
        clearTimeout(tSettle);
        clearTimeout(tComplete);
      };
    }
  }, [stage]);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  const word = "TECHNOVISTA";

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Doctor Strange spark mouse trails */}
      <SparksEffect />
      
      {/* Global fixed gradient background — the ONLY background source */}
      <SketchfabBackground />

      <div className="relative z-10">
        <main>
          {/* Main content - render immediately under the mask */}
          <div className="relative z-10">
            {/* Relative container to keep content above background glows */}
            <div className="relative z-10">
              <HeroSection introPhase={introPhase} />
              <EventHub />
            </div>
          </div>
        </main>
      </div>


    </div>
  );
}
