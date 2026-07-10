"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero({ onEnter, isEntered = false }) {
  return (
    <section
      id="hero"
      className="relative h-full w-full flex flex-col justify-center py-4 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Responsive Grid: Flanked sidebars on desktop, stacked layout on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-center">
          
          {/* Left Sidebar (Stats 1 & 2) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 flex flex-col space-y-10 lg:space-y-14 text-left lg:text-right order-2 lg:order-1"
          >
            {/* Stat Item 1 */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#f97316] block mb-1">
                INDEX SYSTEM // EST. 2006
              </span>
              <h3 className="font-boska text-4xl sm:text-5xl font-black text-white uppercase tracking-wide">
                18th Edition
              </h3>
              <p className="font-switzer text-gray-300 text-sm sm:text-base leading-relaxed mt-2 max-w-sm lg:ml-auto">
                Nearly two decades of technical innovation and student coordination.
              </p>
            </div>

            {/* Stat Item 2 */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#f97316] block mb-1">
                SECTORS // TACTICAL MISSIONS
              </span>
              <h3 className="font-boska text-4xl sm:text-5xl font-black text-white uppercase tracking-wide">
                8 Events
              </h3>
              <p className="font-switzer text-gray-300 text-sm sm:text-base leading-relaxed mt-2 max-w-sm lg:ml-auto">
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
            {/* Ambient Background Aura Glow behind image */}
            <div className="absolute inset-0 rounded-[22px] bg-orange-600/10 blur-3xl group-hover:bg-orange-600/20 transition-all duration-700 -z-10" />

            {/* Premium Glassmorphic Container for Banner with custom glow */}
            <div className="p-3 rounded-[22px] border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[0_0_40px_rgba(249,115,22,0.15)] hover:border-orange-500/30 hover:shadow-[0_0_45px_rgba(249,115,22,0.3)] transition-all duration-500 max-w-2xl w-full">
              <motion.img
                src="/events/technovista-banner.png"
                alt="VNRVJIET Technovista 18th Edition Banner"
                className="w-full h-auto rounded-[16px] object-contain filter brightness-[1.05]"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Enter Command Button */}
            {!isEntered && onEnter && (
              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-3 rounded-full border border-red-500/40 text-xs tracking-[0.25em] uppercase font-stardom text-white overflow-hidden group shadow-[0_0_15px_rgba(217,4,11,0.15)] hover:border-red-500 hover:shadow-[0_0_25px_rgba(217,4,11,0.4)] transition-all duration-500 cursor-pointer bg-black/40 backdrop-blur-md mt-8"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                <div className="absolute top-1 left-2 w-1 h-1 rounded-full bg-red-500" />
                <div className="absolute bottom-1 right-2 w-1 h-1 rounded-full bg-red-500" />
                <span className="relative z-10">ENTER COMMAND GRID</span>
              </motion.button>
            )}
          </motion.div>

          {/* Right Sidebar (Stats 3 & 4) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 flex flex-col space-y-10 lg:space-y-14 text-left order-3"
          >
            {/* Stat Item 3 */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#f97316] block mb-1">
                REWARDS // VALUATION
              </span>
              <h3 className="font-boska text-4xl sm:text-5xl font-black text-white uppercase tracking-wide">
                ₹1,00,000+
              </h3>
              <p className="font-switzer text-gray-300 text-sm sm:text-base leading-relaxed mt-2 max-w-sm">
                Cash prize pools distributed across flagship symposium domains.
              </p>
            </div>

            {/* Stat Item 4 */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#f97316] block mb-1">
                COORDINATES // VENUE PLACE
              </span>
              <h3 className="font-boska text-4xl sm:text-5xl font-black text-white uppercase tracking-wide">
                VNRVJIET
              </h3>
              <p className="font-switzer text-gray-300 text-sm sm:text-base leading-relaxed mt-2 max-w-sm">
                VNR Vignana Jyothi Institute, Bachupally, Hyderabad.
              </p>
            </div>
            
            {/* Stat Item 5 */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#f97316] block mb-1">
                CONFLUENCE // ATTENDEES
              </span>
              <h3 className="font-boska text-4xl sm:text-5xl font-black text-white uppercase tracking-wide">
                600+ Agents
              </h3>
              <p className="font-switzer text-gray-300 text-sm sm:text-base leading-relaxed mt-2 max-w-sm">
                Tech enthusiasts and elite coders assembling for symposium operations.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
