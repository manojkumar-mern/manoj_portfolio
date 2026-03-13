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
      duration: 1,
      smoothWheel: true,
      touchMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;
    rafIdRef.current = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;

      if (!anchor) return;

      const id = anchor.getAttribute("href");

      if (!id) return;

      e.preventDefault();

      if (id === "#") {
        lenis.scrollTo(0);
        return;
      }

      const el = document.querySelector(id);
      if (el) {
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
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
