import { useEffect, useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

// SSR-safe layout effect.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs a GSAP setup callback inside a scoped `gsap.context` so every tween,
 * timeline, and ScrollTrigger created inside is automatically reverted on
 * unmount — no manual cleanup, no memory leaks.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null);
 *   useGsap(() => {
 *     gsap.from(".title", { y: 40, opacity: 0 });
 *   }, { scope: ref });
 */
export function useGsap(
  setup: (ctx: gsap.Context) => void | (() => void),
  options: { scope?: RefObject<Element | null>; deps?: DependencyList } = {},
) {
  const { scope, deps = [] } = options;
  const savedSetup = useRef(setup);
  savedSetup.current = setup;

  useIsoLayoutEffect(() => {
    let ctx: gsap.Context;
    ctx = gsap.context((self) => {
      savedSetup.current(self as gsap.Context);
    }, scope?.current ?? undefined);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}