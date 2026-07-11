"use client";

import React from "react";

/**
 * SketchfabBackground — The ONLY source of the page background.
 * 
 * Renders a single fixed vertical gradient spanning the entire viewport:
 *   Dark Burgundy → Deep Maroon → Crimson (subtle highlight) → Deep Maroon → Dark Burgundy
 * 
 * Includes:
 *   - Two soft warm amber/gold radial light streaks for cinematic depth
 *   - Lightweight SVG film-grain noise for texture
 *   - Subtle warm vignette for atmospheric depth
 * 
 * All other sections should use transparent backgrounds and never redefine the base gradient.
 * GPU-accelerated and lightweight — no expensive blur filters or animations.
 */
export default function SketchfabBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none select-none"
      style={{
        /* Single vertical gradient — the continuous canvas */
        background: `
          linear-gradient(
            to bottom,
            #170709 0%,
            #2A0A0F 20%,
            #3B0E12 40%,
            #5A1A19 55%,
            #3B0E12 70%,
            #24090D 85%,
            #170709 100%
          )
        `,
        willChange: 'transform',
      }}
    >
      {/* Subtle warm amber radial light streak — upper left */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '15%',
          width: '50vw',
          height: '50vh',
          background: 'radial-gradient(ellipse at center, rgba(200, 120, 50, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle warm gold radial light streak — lower right */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '10%',
          width: '45vw',
          height: '45vh',
          background: 'radial-gradient(ellipse at center, rgba(255, 213, 145, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Atmospheric warm vignette for depth — avoids flat appearance */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(23, 7, 9, 0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Lightweight SVG film-grain noise overlay for texture */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      >
        <filter id="globalNoiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#globalNoiseFilter)" />
      </svg>
    </div>
  );
}
