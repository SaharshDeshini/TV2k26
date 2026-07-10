"use client";

import React, { useEffect, useRef } from "react";

// Spark particle structure: { x, y, vx, vy, size, color, alpha, decay, rotation, rotationSpeed }

export default function SparksEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let sparks = [];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const createSparks = (x, y, count = 2) => {
      for (let i = 0; i < count; i++) {
        // Doctor Strange sparks palette: Orange (15-25), Gold (35-45), and Red (0-10)
        const randomType = Math.random();
        let hue = 25; // Default orange
        if (randomType < 0.2) {
          hue = Math.floor(Math.random() * 10); // Red/Orange-Red
        } else if (randomType > 0.7) {
          hue = Math.floor(Math.random() * 10) + 38; // Golden/Yellow
        } else {
          hue = Math.floor(Math.random() * 15) + 15; // Orange
        }

        const saturation = 95 + Math.random() * 5;
        const lightness = 55 + Math.random() * 15;
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, `;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.8;

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.4,
          vy: Math.sin(angle) * speed - Math.random() * 1.0 - 0.2, // Upward bias
          size: Math.random() * 3.0 + 1.2,
          color,
          alpha: 1.0,
          decay: Math.random() * 0.02 + 0.015,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.25,
        });
      }
    };

    const handleMouseMove = (e) => {
      // Create sparks at current mouse position
      createSparks(e.clientX, e.clientY, Math.random() > 0.6 ? 2 : 1);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        createSparks(e.touches[0].clientX, e.touches[0].clientY, 1);
      }
    };

    const handleClick = (e) => {
      // Create a small burst of sparks on click (Doctor Strange spell cast effect)
      createSparks(e.clientX, e.clientY, 15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("click", handleClick);

    const updateAndDraw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        
        // Update physics
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.04; // Gravity
        s.alpha -= s.decay;
        s.size = Math.max(0, s.size - 0.025);
        s.rotation += s.rotationSpeed;

        // Remove dead sparks
        if (s.alpha <= 0 || s.size <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        
        // Spark Glow Filter
        ctx.shadowBlur = s.size * 3.5;
        ctx.shadowColor = s.color.replace(", ", ", 1)");
        
        ctx.fillStyle = s.color + s.alpha + ")";
        
        // Draw spell particles
        ctx.beginPath();
        if (Math.random() > 0.4) {
          // Spark star shape (magic dust style)
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size * 0.3, -s.size * 0.3);
          ctx.lineTo(s.size, 0);
          ctx.lineTo(s.size * 0.3, s.size * 0.3);
          ctx.lineTo(0, s.size);
          ctx.lineTo(-s.size * 0.3, s.size * 0.3);
          ctx.lineTo(-s.size, 0);
          ctx.lineTo(-s.size * 0.3, -s.size * 0.3);
        } else {
          // Circular particle
          ctx.arc(0, 0, s.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-screen"
    />
  );
}
