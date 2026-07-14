"use client";

import React from "react";
import { motion } from "framer-motion";
import { GOLDEN_EASE } from "@/animations/variants";
import OpeningBackground from "@/components/OpeningBackground";
import OpeningCard from "@/components/OpeningCard";
import OpeningCTA from "@/components/OpeningCTA";

export default function OpeningMobileHero({ onEnter, isEntered = false }) {
  return (
    <section
      id="hero"
      className="opening-mobile-hero relative flex h-[100svh] w-full flex-col overflow-hidden select-none lg:hidden"
    >
      <OpeningBackground />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 sm:gap-6 -mt-2">
          
          {/* Logo / Poster - Increased visual importance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: GOLDEN_EASE }}
            className="flex justify-center w-full"
          >
            <OpeningCard src="/events/technovista-banner.png" alt="TechnoVista 18th Edition" />
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
              <OpeningCTA onClick={onEnter}>
                ENTER THE EXPERIENCE
              </OpeningCTA>
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
