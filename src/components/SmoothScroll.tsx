import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number>(0);

  const raf = useCallback((time: number) => {
    lenisRef.current?.raf(time);
    rafIdRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    rafIdRef.current = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (anchor) {
        const id = anchor.getAttribute("href");
        if (id && id !== "#") {
          e.preventDefault();
          const el = document.querySelector(id);
          if (el) lenis.scrollTo(el as HTMLElement, { offset: -80 });
        } else if (id === "#") {
          e.preventDefault();
          lenis.scrollTo(0);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, [raf]);

  return <>{children}</>;
};

export default SmoothScroll;
