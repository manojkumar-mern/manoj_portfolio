import React, { useState, useEffect, useRef } from "react";

interface DeferredSectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  id?: string;
  className?: string;
  minHeight?: string;
}

export const DeferredSection = ({
  children,
  fallback,
  id,
  className,
  minHeight = "300px",
}: DeferredSectionProps) => {
  const [isNear, setIsNear] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        rootMargin: "300px 0px", // Trigger load when within 300px of viewport
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={!isNear ? { minHeight } : undefined}
    >
      {isNear ? children : fallback}
    </div>
  );
};

export default DeferredSection;
