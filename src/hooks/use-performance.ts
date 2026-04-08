import { useSyncExternalStore } from "react";

export type PerfTier = "high" | "medium" | "low";

function detect(): PerfTier {
  if (typeof window === "undefined") return "medium";

  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as any).deviceMemory as number | undefined;
  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTouch = "ontouchstart" in window;

  // Low: only truly underpowered devices (≤2 cores or ≤2GB RAM)
  if (cores <= 2) return "low";
  if (mem !== undefined && mem <= 2) return "low";

  // Medium: mid-range mobile/touch (4GB RAM, 4 cores, etc.)
  if (isMobile || isTouch) return "medium";
  if (mem !== undefined && mem <= 4) return "medium";

  // Medium: moderate hardware or laptops
  if (cores <= 4 || (mem !== undefined && mem <= 6)) return "medium";
  if (isMobile) return "medium";

  return "high";
}

let cached: PerfTier | null = null;
function getTier(): PerfTier {
  if (cached === null) cached = detect();
  return cached;
}

const subscribers = new Set<() => void>();
function subscribe(cb: () => void) {
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

export function usePerformanceTier(): PerfTier {
  return useSyncExternalStore(subscribe, getTier, () => "medium" as PerfTier);
}

// Helper: should we show heavy effects?
export function useHeavyEffects(): boolean {
  const tier = usePerformanceTier();
  return tier === "high";
}

export function useLightAnimations(): boolean {
  const tier = usePerformanceTier();
  return tier === "low";
}
