import React, { useState, useEffect, useRef, useCallback } from "react";

interface DeferredSectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  id?: string;
  className?: string;
  minHeight?: string;
}

const ContentNotifier = ({
  children,
  onLoaded,
}: {
  children: React.ReactNode;
  onLoaded: () => void;
}) => {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  return <>{children}</>;
};

export const DeferredSection = ({
  children,
  fallback,
  id,
  className,
  minHeight = "300px",
}: DeferredSectionProps) => {
  const [isNear, setIsNear] = useState(() => {
    if (typeof window === "undefined") return false;
    const hasHash = Boolean(window.location.hash);
    const savedScroll = sessionStorage.getItem("portfolio_scroll_y");
    const hasSavedScroll = savedScroll !== null && parseInt(savedScroll, 10) > 50;
    return hasHash || hasSavedScroll || window.scrollY > 50;
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isNear) return;
    const el = containerRef.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      !window.IntersectionObserver ||
      /Lighthouse/i.test(navigator.userAgent)
    ) {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "400px 0px", // Trigger load when within 400px of viewport
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isNear]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={!isLoaded ? { minHeight } : undefined}
    >
      {isNear ? (
        <ContentNotifier onLoaded={handleLoaded}>{children}</ContentNotifier>
      ) : (
        fallback
      )}
    </div>
  );
};

export default DeferredSection;
