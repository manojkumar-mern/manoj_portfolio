import type { Variants } from "framer-motion";

// Shared easing curve for buttery-smooth motion
export const smoothEase = [0.22, 1, 0.36, 1] as const;

// Standard viewport trigger config
export const viewportConfig = { once: true, margin: "-80px" as const };

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Responsive distance: smaller on mobile
const d = (desktop: number): number => {
  if (typeof window === "undefined") return desktop;
  return window.innerWidth < 640 ? Math.round(desktop * 0.6) : desktop;
};

// Reusable animation variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase as unknown as number[] } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase as unknown as number[] } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smoothEase as unknown as number[] } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smoothEase as unknown as number[] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: smoothEase as unknown as number[] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: smoothEase as unknown as number[] } },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase as unknown as number[] } },
};

export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: smoothEase as unknown as number[] } },
};

export const staggerItemRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: smoothEase as unknown as number[] } },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: smoothEase as unknown as number[] } },
};

// No-motion fallback variants (for prefers-reduced-motion)
export const noMotion: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};
