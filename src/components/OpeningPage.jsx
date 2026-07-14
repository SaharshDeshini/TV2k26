"use client";

import React from "react";
import { motion } from "framer-motion";
import OpeningBackground from "@/components/OpeningBackground";
import OpeningCard from "@/components/OpeningCard";
import OpeningCTA from "@/components/OpeningCTA";
import OpeningMobileHero from "@/components/OpeningMobileHero";

export default function Hero({ onEnter, isEntered = false }) {
  return (
    <>
      <OpeningMobileHero onEnter={onEnter} isEntered={isEntered} />

    <section
      id="hero-desktop"
      className="relative min-h-screen w-full hidden lg:flex flex-col justify-center py-8 lg:py-4 select-none"
    >
      <OpeningBackground />
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Responsive Grid: Flanked sidebars on desktop, stacked layout on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-center">
          
          {/* Left Sidebar (Stats 1 & 2) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-6 sm:gap-8 lg:gap-14 text-left lg:text-right order-2 lg:order-1"
          >
            {/* Stat Item 1 */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F59E0B] block mb-1">
                INDEX SYSTEM // EST. 2019
              </span>
              <h3 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-wide" style={{ backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))' }}>
                4th Edition
              </h3>
              <p className="font-switzer text-[#eae3d2b3] font-light text-sm sm:text-base leading-relaxed mt-2 max-w-sm lg:ml-auto">
                Nearly four years of technical innovation and student coordination.
              </p>
            </div>

            {/* Stat Item 2 */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F59E0B] block mb-1">
                SECTORS // TACTICAL MISSIONS
              </span>
              <h3 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-wide" style={{ backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))' }}>
                8 Events
              </h3>
              <p className="font-switzer text-[#eae3d2b3] font-light text-sm sm:text-base leading-relaxed mt-2 max-w-sm lg:ml-auto">
                Immersive sprints in machine learning, security hacking, and optimization.
              </p>
            </div>
          </motion.div>

          {/* Center Column (Technovista Banner Image Card) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-2 flex flex-col items-center justify-center order-1 lg:order-2 relative group gap-6"
          >
            <OpeningCard src="/events/technovista-banner.png" alt="VNRVJIET Technovista 18th Edition Banner" isDesktop />

            {/* Enter Command Button */}
            {!isEntered && onEnter && (
              <OpeningCTA onClick={onEnter} className="mt-8">
                ENTER THE EXPERIENCE
              </OpeningCTA>
            )}
          </motion.div>

          {/* Right Sidebar (Stats 3 & 4) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col gap-6 sm:gap-8 lg:gap-14 text-left order-3"
          >
            {/* Stat Item 3 */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F59E0B] block mb-1">
                REWARDS // VALUATION
              </span>
              <h3 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-wide" style={{ backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))' }}>
                ₹1,00,000+
              </h3>
              <p className="font-switzer text-[#eae3d2b3] font-light text-sm sm:text-base leading-relaxed mt-2 max-w-sm">
                Cash prize pools distributed across flagship symposium domains.
              </p>
            </div>

            {/* Stat Item 4 */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F59E0B] block mb-1">
                COORDINATES // VENUE PLACE
              </span>
              <h3 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-wide" style={{ backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))' }}>
                VNRVJIET
              </h3>
              <p className="font-switzer text-[#eae3d2b3] font-light text-sm sm:text-base leading-relaxed mt-2 max-w-sm">
                VNR Vignana Jyothi Institute, Bachupally, Hyderabad.
              </p>
            </div>
            
            {/* Stat Item 5 */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#F59E0B] block mb-1">
                CONFLUENCE // ATTENDEES
              </span>
              <h3 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-wide" style={{ backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #F59E0B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))' }}>
                700+ Agents
              </h3>
              <p className="font-switzer text-[#eae3d2b3] font-light text-sm sm:text-base leading-relaxed mt-2 max-w-sm">
                Tech enthusiasts and elite coders assembling for symposium operations.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
    </>
  );
}
