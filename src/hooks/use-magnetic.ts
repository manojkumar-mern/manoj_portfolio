import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Subtle magnetic hover — pulls the element toward the cursor.
 * Desktop only (skips on touch / reduced-motion). GPU-friendly transforms only.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  {
    strength = 0.35,
    radius = 90,
    enabled = true,
  }: { strength?: number; radius?: number; enabled?: boolean } = {},
) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || isTouch) return;

    const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius + Math.max(r.width, r.height) / 2) return;
      qx(dx * strength);
      qy(dy * strength);
    };

    const onLeave = () => {
      qx(0);
      qy(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, enabled, strength, radius]);
}