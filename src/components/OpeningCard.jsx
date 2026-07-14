"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OpeningCard({ src, alt, isDesktop = false }) {
  if (isDesktop) {
    return (
      <div className="relative w-full max-w-2xl group">
        {/* Ambient Background Aura Glow */}
        <motion.div
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.98, 1.03, 0.98] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-[22px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.28)_0%,rgba(217,4,11,0.15)_45%,transparent_72%)] filter blur-3xl -z-10 group-hover:scale-105 transition-transform duration-700"
        />

        {/* Premium Glassmorphic Container */}
        <div 
          className="p-3 rounded-[22px] border border-[rgba(245,158,11,0.15)] bg-[#170709]/45 backdrop-blur-[24px] shadow-[0_16px_48px_rgba(0,0,0,0.65)] hover:scale-[1.01] hover:border-[rgba(245,158,11,0.35)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)] transition-all duration-500 w-full"
        >
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-auto rounded-[16px] object-contain filter brightness-[1.08] drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
            draggable={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[85vw] sm:max-w-[420px]">
      {/* Ambient Background Aura Glow */}
      <motion.div
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.04, 0.95] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="opening-mobile-logo-wrap__aura absolute inset-0 -z-10 rounded-2xl"
      />
      
      {/* Premium Glassmorphic Panel */}
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotate: [0, 0.4, -0.4, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="opening-mobile-logo-wrap__panel p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-[rgba(245,158,11,0.15)] bg-[#170709]/45 backdrop-blur-[24px]"
      >
        <img
          src={src}
          alt={alt}
          className="opening-mobile-logo-wrap__img w-full h-auto rounded-[14px] filter brightness-[1.05]"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
