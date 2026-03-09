import type { Variants } from "framer-motion";

// Shared easing curve for buttery-smooth motion
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Standard viewport trigger config
export const viewportConfig = { once: true, margin: "-80px" as const };

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Reusable animation variants
// Detect mobile for reduced slide distances
const isMobile = (): boolean => typeof window !== "undefined" && window.innerWidth < 768;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: isMobile() ? 20 : 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: isMobile() ? -15 : -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: isMobile() ? -20 : -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: isMobile() ? 20 : 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
};

// Stagger container variant
export const staggerContainer = (stagger = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  },
});

// For items inside a stagger container
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

export const staggerItemRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
};

// No-motion fallback variants (for prefers-reduced-motion)
export const noMotion: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};
