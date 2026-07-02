import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Central registration point. Importing this module guarantees ScrollTrigger
// is registered exactly once regardless of how many components use it.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Shared premium easing — matches the cubic-bezier used by existing motion.
export const PREMIUM_EASE = "power3.out";

/** True when the user has asked the OS to reduce motion. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };