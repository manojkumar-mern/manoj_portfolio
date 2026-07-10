import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePerformanceTier } from "@/hooks/use-performance";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once at module load (safe to call multiple times).
gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const tier = usePerformanceTier();

  useEffect(() => {
    const isLow = tier === "low";

    const lenis = new Lenis({
      duration: isLow ? 0.8 : 1,
      smoothWheel: true,
      touchMultiplier: isLow ? 1.5 : 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Drive Lenis via GSAP's ticker so ScrollTrigger stays perfectly in sync.
    const tickerCb = (time: number) => {
      const isPrevented = document.documentElement.hasAttribute("data-lenis-prevent");
      if (isPrevented) {
        lenis.stop();
      } else if (!lenis.isScrolling) {
        lenis.start();
      }
      // GSAP ticker time is in seconds; Lenis expects ms.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    // Disable GSAP's own lag smoothing — Lenis handles smoothing itself.
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger whenever Lenis reports a scroll (keeps triggers accurate).
    lenis.on("scroll", ScrollTrigger.update);

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id) return;
      e.preventDefault();
      
      const scrollOptions = {
        duration: 1.8, // Noticeably slower and premium duration
        easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, // Gentle ease-in-out cubic curve
      };

      if (id === "#") {
        lenis.scrollTo(0, scrollOptions);
        return;
      }
      const el = document.querySelector(id);
      if (el) lenis.scrollTo(el as HTMLElement, { offset: -80, ...scrollOptions });
    };

    document.addEventListener("click", handleAnchorClick);

    // After first paint, make sure ScrollTrigger measures the correct layout.
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tickerCb);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [tier]);

  return <>{children}</>;
};

export default SmoothScroll;
