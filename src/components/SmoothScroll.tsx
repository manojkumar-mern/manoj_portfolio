import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { usePerformanceTier } from "@/hooks/use-performance";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number>(0);
  const tier = usePerformanceTier();

  const raf = useCallback((time: number) => {
    if (lenisRef.current) {
      const isPrevented = document.documentElement.hasAttribute("data-lenis-prevent");
      if (isPrevented) {
        lenisRef.current.stop();
      } else if (!lenisRef.current.isScrolling) {
        lenisRef.current.start();
      }
      lenisRef.current.raf(time);
    }
    rafIdRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // On low-tier mobile, use lighter scroll config
    const isLow = tier === "low";

    const lenis = new Lenis({
      duration: isLow ? 0.8 : 1,
      smoothWheel: true,
      touchMultiplier: isLow ? 1.5 : 1,
      infinite: false,
    });

    lenisRef.current = lenis;
    rafIdRef.current = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id) return;
      e.preventDefault();
      if (id === "#") {
        lenis.scrollTo(0);
        return;
      }
      const el = document.querySelector(id);
      if (el) lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, [raf, tier]);

  return <>{children}</>;
};

export default SmoothScroll;
