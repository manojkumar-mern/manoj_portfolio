import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePerformanceTier } from "@/hooks/use-performance";

const allParticles = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 6) * Math.PI * 2) * 140,
  y: Math.sin((i / 6) * Math.PI * 2) * 140,
  size: 3 + (i % 3) * 2,
  delay: i * 0.8,
  duration: 5 + (i % 3) * 2,
}));

const HeroParticles = memo(() => {
  const tier = usePerformanceTier();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  // Delay mount by 500ms to reduce first-load jank
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // LOW tier: don't render particles at all
  if (tier === "low") return <div ref={ref} className="absolute inset-0 pointer-events-none" />;

  // MEDIUM: fewer particles, longer duration
  const particles = tier === "medium" ? allParticles.slice(0, 3) : allParticles;
  const durationMultiplier = tier === "medium" ? 1.5 : 1;

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      {visible && ready &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute left-1/2 top-1/2 rounded-full transform-gpu will-change-transform"
            style={{
              width: p.size,
              height: p.size,
              background:
                p.id % 2 === 0
                  ? "hsl(187 78% 53% / 0.35)"
                  : "hsl(160 64% 43% / 0.3)",
              filter: `blur(${p.size > 4 ? 2 : 1}px)`,
              x: p.x,
              y: p.y,
            }}
            animate={{
              x: [p.x, p.x + 12, p.x - 8, p.x],
              y: [p.y, p.y - 15, p.y + 8, p.y],
              opacity: [0.25, 0.6, 0.35, 0.25],
              scale: [1, 1.2, 0.95, 1],
            }}
            transition={{
              duration: p.duration * durationMultiplier,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
    </div>
  );
});

HeroParticles.displayName = "HeroParticles";
export default HeroParticles;
