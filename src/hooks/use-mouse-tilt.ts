import { useRef, useEffect, useCallback } from "react";

const LERP_FACTOR = 0.1;
const MAX_TILT = 8;
const EPSILON = 0.01; // Dead-zone: stop RAF when delta < this

interface TiltState {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  rafId: number | null;
  active: boolean;
  settling: boolean; // true while interpolating toward target
}

export function useMouseTilt(
  containerRef: React.RefObject<HTMLElement | null>,
  tiltRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  const state = useRef<TiltState>({
    targetX: 0, targetY: 0,
    currentX: 0, currentY: 0,
    rafId: null, active: false, settling: false,
  });

  const applyTransform = useCallback((x: number, y: number) => {
    if (tiltRef.current) {
      tiltRef.current.style.transform =
        `perspective(800px) rotateX(${y}deg) rotateY(${-x}deg)`;
    }
  }, [tiltRef]);

  const animate = useCallback(() => {
    const s = state.current;
    if (!s.active) return;

    const dx = s.targetX - s.currentX;
    const dy = s.targetY - s.currentY;

    // If close enough, snap and stop the loop
    if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) {
      s.currentX = s.targetX;
      s.currentY = s.targetY;
      applyTransform(s.currentX, s.currentY);
      s.settling = false;
      s.rafId = null;
      return;
    }

    s.currentX += dx * LERP_FACTOR;
    s.currentY += dy * LERP_FACTOR;
    applyTransform(s.currentX, s.currentY);

    s.rafId = requestAnimationFrame(animate);
  }, [applyTransform]);

  // Kick the RAF loop if not already running
  const ensureAnimating = useCallback(() => {
    const s = state.current;
    if (!s.active || s.settling) return;
    s.settling = true;
    s.rafId = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    const s = state.current;
    s.active = true;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);
      s.targetX = Math.max(-1, Math.min(1, nx)) * MAX_TILT;
      s.targetY = Math.max(-1, Math.min(1, ny)) * MAX_TILT;
      ensureAnimating();
    };

    const onLeave = () => {
      s.targetX = 0;
      s.targetY = 0;
      ensureAnimating();
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      s.active = false;
      s.settling = false;
      if (s.rafId) cancelAnimationFrame(s.rafId);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (tiltRef.current) {
        tiltRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
      }
    };
  }, [enabled, containerRef, tiltRef, ensureAnimating]);
}
