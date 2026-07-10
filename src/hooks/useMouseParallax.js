import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Enhanced mouse parallax hook with smooth lerp interpolation.
 * Works on all devices (including hybrid touchscreen laptops).
 *
 * @param {number} sensitivity - Mouse offset multiplier (default 0.06)
 * @param {number} lerpFactor - Interpolation speed 0–1, lower = smoother (default 0.16)
 * @returns {{ x: number, y: number, isTouch: boolean }}
 */
export function useMouseParallax(sensitivity = 0.06, lerpFactor = 0.16) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Refs to avoid re-renders on every frame
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);

  // Mouse move handler — updates target positions smoothly
  const handleMouseMove = useCallback(
    (e) => {
      const { innerWidth, innerHeight } = window;
      targetRef.current = {
        x: (e.clientX - innerWidth / 2) * sensitivity,
        y: (e.clientY - innerHeight / 2) * sensitivity,
      };

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        targetRef.current = { x: 0, y: 0 };
      }, 1200);
    },
    [sensitivity]
  );

  // rAF loop to lerp current positions towards targets
  useEffect(() => {
    const animate = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;

      cur.x += (tgt.x - cur.x) * lerpFactor;
      cur.y += (tgt.y - cur.y) * lerpFactor;

      setCoords({ x: cur.x, y: cur.y });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lerpFactor]);

  // Attach mousemove and mouseleave listeners globally
  useEffect(() => {
    const handleMouseLeave = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      targetRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleMouseMove]);

  return { ...coords, isTouch: false };
}
