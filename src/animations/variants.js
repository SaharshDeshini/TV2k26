// Reusable Framer Motion Animation Presets for TechnoVista 2K26

// Premium Custom Ease (Apple-style ease-out)
export const GOLDEN_EASE = [0.16, 1, 0.3, 1];

// 1. Page Transition preset
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: GOLDEN_EASE,
      staggerChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.5,
      ease: GOLDEN_EASE,
    },
  },
};

// 2. Fade Up preset
export const fadeUp = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: GOLDEN_EASE,
    },
  },
};

// 3. Fade In preset
export const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: GOLDEN_EASE,
    },
  },
};

// 4. Scale In preset
export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: GOLDEN_EASE,
    },
  },
};

// scaleUp preset
export const scaleUp = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 15,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: GOLDEN_EASE,
    },
  },
};

// 5. Stagger Container preset
export const stagger = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// 6. Section Reveal viewport preset
export const sectionReveal = {
  initial: {
    opacity: 0,
    y: 40,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: GOLDEN_EASE,
    },
  },
  viewport: {
    once: true,
    margin: '-10% 0px -10% 0px',
  },
};

// 7. Hover Lift preset
export const hoverLift = {
  whileHover: {
    y: -6,
    transition: {
      duration: 0.4,
      ease: GOLDEN_EASE,
    },
  },
};

// 8. Floating animation loop preset
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// 9. Theme transition duration preset
export const themeTransition = {
  transition: {
    duration: 0.8,
    ease: GOLDEN_EASE,
  },
};
