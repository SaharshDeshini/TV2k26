"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OpeningCTA({ onClick, children, className = "" }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative px-8 py-2.5 sm:px-8.5 sm:py-3.5 border font-heading font-semibold uppercase text-[11px] sm:text-xs rounded-full cursor-pointer overflow-hidden text-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/20 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300 ${className}`}
      style={{
        backgroundImage: 'linear-gradient(135deg, #FFE899 0%, #E6B94A 50%, #C49021 100%)',
        borderColor: 'rgba(255, 230, 160, 0.45)',
        color: '#170709',
        letterSpacing: '0.16em',
        boxShadow: '0 4px 20px rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.40)',
      }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        animate={{ x: ["-180%", "180%"] }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          repeatDelay: 4.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.30) 50%, transparent 100%)',
          transform: 'skewX(-25deg)',
        }}
      />
    </motion.button>
  );
}
