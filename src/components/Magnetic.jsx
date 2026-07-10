"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Magnetic({ children, pullStrength = 0.35 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from cursor to center of the element
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Apply magnetic pull factor
    setPosition({ x: x * pullStrength, y: y * pullStrength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
