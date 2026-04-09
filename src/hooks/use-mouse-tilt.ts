import { useRef, useEffect, useCallback } from "react";

const LERP_FACTOR = 0.08;
const MAX_TILT = 8;

interface TiltState {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
  rafId: number | null;
  active: boolean;
}

export function useMouseTilt(
  containerRef: React.RefObject<HTMLElement | null>,
  tiltRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  const state = useRef<TiltState>({
    targetX: 0, targetY: 0,
    currentX: 0, currentY: 0,
    rafId: null, active: false,
  });

  const animate = useCallback(() => {
    const s = state.current;
    s.currentX += (s.targetX - s.currentX) * LERP_FACTOR;
    s.currentY += (s.targetY - s.currentY) * LERP_FACTOR;

    if (tiltRef.current) {
      tiltRef.current.style.transform =
        `perspective(800px) rotateX(${s.currentY}deg) rotateY(${-s.currentX}deg)`;
    }

    if (s.active) {
      s.rafId = requestAnimationFrame(animate);
    }
  }, [tiltRef]);

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    const s = state.current;
    s.active = true;
    s.rafId = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = ((e.clientX - cx) / (rect.width / 2));
      const ny = ((e.clientY - cy) / (rect.height / 2));
      s.targetX = Math.max(-1, Math.min(1, nx)) * MAX_TILT;
      s.targetY = Math.max(-1, Math.min(1, ny)) * MAX_TILT;
    };

    const onLeave = () => {
      s.targetX = 0;
      s.targetY = 0;
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      s.active = false;
      if (s.rafId) cancelAnimationFrame(s.rafId);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (tiltRef.current) {
        tiltRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
      }
    };
  }, [enabled, containerRef, tiltRef, animate]);
}
