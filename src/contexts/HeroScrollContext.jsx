import React, { createContext, useContext } from 'react';

export const HeroScrollContext = createContext(null);

/**
 * Custom hook to consume the shared scroll progress of the Hero -> About scene.
 * Returns the framer-motion MotionValue `sceneProgress` (0 to 1).
 */
export function useHeroScroll() {
  const context = useContext(HeroScrollContext);
  if (!context) {
    throw new Error('useHeroScroll must be used within a HeroScrollProvider');
  }
  return context;
}
