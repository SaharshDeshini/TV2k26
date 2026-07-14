"use client";

import React, { useMemo } from "react";

export default function OpeningBackground() {
  const backgroundElements = useMemo(() => {
    const particles = [];
    const stars = [];
    const embers = [];

    // Slow-moving dust/glowing particles (22 items)
    for (let i = 0; i < 22; i++) {
      particles.push({
        id: `p-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * -10, // Start animation in past so it starts immediately
        duration: 20 + Math.random() * 14,
        opacity: 0.15 + Math.random() * 0.4,
        isGold: Math.random() > 0.65,
      });
    }

    // Twinkling stars (14 items)
    for (let i = 0; i < 14; i++) {
      stars.push({
        id: `s-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 85, // concentrate higher up
        size: 0.8 + Math.random() * 1.5,
        delay: Math.random() * -5,
        duration: 3 + Math.random() * 4,
      });
    }

    // Upward drifting embers (14 items)
    for (let i = 0; i < 14; i++) {
      embers.push({
        id: `e-${i}`,
        x: Math.random() * 100,
        y: 75 + Math.random() * 25, // start near bottom
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * -15,
        duration: 8 + Math.random() * 8,
      });
    }

    return { particles, stars, embers };
  }, []);

  const streaks = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: 12 + i * 22,
        delay: i * -3, // Start in past
        duration: 16 + i * 4,
      })),
    []
  );

  return (
    <div
      className="opening-mobile-ambient pointer-events-none absolute inset-0 overflow-hidden bg-[#21090c]"
      aria-hidden="true"
    >
      <div className="opening-mobile-vignette" />
      <div className="opening-mobile-circuit-grid" />
      <div className="opening-mobile-ambient__glow" />
      <div className="opening-mobile-ambient__radial opening-mobile-ambient__radial--top" />
      <div className="opening-mobile-ambient__radial opening-mobile-ambient__radial--bottom" />

      {/* Twinkling Stars */}
      {backgroundElements.stars.map((star) => (
        <span
          key={star.id}
          className="opening-mobile-ambient__star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Floating Embers */}
      {backgroundElements.embers.map((ember) => (
        <span
          key={ember.id}
          className="opening-mobile-ambient__ember"
          style={{
            left: `${ember.x}%`,
            top: `${ember.y}%`,
            width: ember.size,
            height: ember.size,
            animationDelay: `${ember.delay}s`,
            animationDuration: `${ember.duration}s`,
          }}
        />
      ))}

      {/* Glowing Dust Particles */}
      {backgroundElements.particles.map((p) => (
        <span
          key={p.id}
          className={`opening-mobile-ambient__particle ${p.isGold ? "opening-mobile-ambient__particle--gold" : ""}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Streak details */}
      {streaks.map((s) => (
        <span
          key={s.id}
          className="opening-mobile-ambient__streak"
          style={{
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
