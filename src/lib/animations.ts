import { Variants } from 'framer-motion';

/**
 * Editorial Animation System
 * Disciplined, purposeful motion patterns inspired by Linear, Raycast, and Apple.
 * All animations respect prefers-reduced-motion via Framer Motion.
 */

// Animation 1: Staggered Entrance (Linear-inspired)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Animation 2: Scroll-triggered Reveal (Apple-inspired)
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Animation 3: Text Reveal / Line Mask Reveal
export const textLineMask: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Animation 4: Image Clip Reveal (Raycast-inspired)
export const imageClipReveal: Variants = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(10% 0% 10% 0% round 8px)',
    scale: 1.04,
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0% round 8px)',
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Animation 6: Hover & Tap Micro-interactions
export const microHover = {
  whileHover: { y: -2, transition: { duration: 0.18, ease: 'easeOut' } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
};

export const cardLift = {
  whileHover: {
    y: -3,
    borderColor: 'var(--border-strong)',
    transition: { duration: 0.22, ease: 'easeOut' },
  },
};
