import { useState, memo, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import profileImg from "@/assets/profile.webp";
import { usePerformanceTier, type PerfTier } from "@/hooks/use-performance";
import { useIdleReady } from "@/hooks/use-idle-animation";

const orbitIcons = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express", invert: true },
];

const ORBIT_RADIUS_MD = 170;
const ORBIT_RADIUS_SM = 130;

// Adaptive durations per tier
function getOrbitDuration(tier: PerfTier, hovered: boolean): number {
  const base = tier === "low" ? 30 : tier === "medium" ? 24 : 18;
  return hovered ? base * 0.6 : base;
}

// Icon count per tier
function getVisibleIcons(tier: PerfTier) {
  if (tier === "low") return orbitIcons.slice(0, 3);
  if (tier === "medium") return orbitIcons.slice(0, 4);
  return orbitIcons;
}

// On low tier, skip heavy effects but keep orbit alive
function shouldShowHeavyEffects(tier: PerfTier): boolean {
  return tier !== "low";
}

// Hook: pause when not visible + respect reduced-motion
function useOrbitVisible(ref: React.RefObject<HTMLElement | null>): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Respect reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(false);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

// Pure CSS orbit ring — no framer-motion rotation, just a CSS animation
const OrbitRing = memo(({ tier, hovered, isVisible }: { tier: PerfTier; hovered: boolean; isVisible: boolean }) => {
  const icons = getVisibleIcons(tier);
  const duration = getOrbitDuration(tier, hovered);

  return (
    <div
      className="absolute inset-0 pointer-events-none will-change-transform"
      style={{
        animation: isVisible ? `orbit-spin ${duration}s linear infinite` : "none",
      }}
    >
      {icons.map((icon, i) => {
        const angle = (i / icons.length) * 360;
        return (
          <div
            key={icon.label}
            className="absolute left-1/2 top-1/2 pointer-events-auto"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            {/* Desktop icon */}
            <div
              className="hidden md:block absolute"
              style={{ left: -18, top: -ORBIT_RADIUS_MD - 18 }}
            >
              <div className="w-9 h-9 rounded-full bg-card border border-border/60 flex items-center justify-center shadow-lg shadow-black/20 hover:shadow-[0_0_16px_hsl(187_78%_53%/0.35)] hover:border-primary/50 transition-shadow transition-colors duration-300 cursor-pointer group">
                <img
                  src={icon.src}
                  alt={icon.label}
                  className={`w-5 h-5 group-hover:drop-shadow-[0_0_6px_hsl(187_78%_53%/0.6)] transition-all duration-300${icon.invert ? " invert brightness-200" : ""}`}
                  loading="lazy"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            {/* Mobile icon */}
            <div
              className="md:hidden absolute"
              style={{ left: -13, top: -ORBIT_RADIUS_SM - 13 }}
            >
              <div className="w-[26px] h-[26px] rounded-full bg-card border border-border/60 flex items-center justify-center shadow-md shadow-black/20">
                <img
                  src={icon.src}
                  alt={icon.label}
                  className={`w-3.5 h-3.5${icon.invert ? " invert brightness-200" : ""}`}
                  loading="lazy"
                  width={14}
                  height={14}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
OrbitRing.displayName = "OrbitRing";

const HeroProfileImage = memo(() => {
  const tier = usePerformanceTier();
  const idleReady = useIdleReady(400);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useOrbitVisible(containerRef);

  const handleEnter = useCallback(() => setHovered(true), []);
  const handleLeave = useCallback(() => setHovered(false), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="flex-shrink-0"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-[320px] h-[320px] md:w-[400px] md:h-[400px] transform-gpu"
      >
        {/* Aura Glow - skip on low */}
        {shouldShowHeavyEffects(tier) && idleReady && isVisible && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(187 78% 53% / 0.08) 0%, hsl(160 64% 43% / 0.04) 40%, transparent 65%)",
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: hovered ? [0.7, 0.95, 0.7] : [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Orbit Track */}
        <div
          className="absolute rounded-full border border-border/30 pointer-events-none hidden md:block"
          style={{ width: ORBIT_RADIUS_MD * 2, height: ORBIT_RADIUS_MD * 2, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
        <div
          className="absolute rounded-full border border-border/30 pointer-events-none md:hidden"
          style={{ width: ORBIT_RADIUS_SM * 2, height: ORBIT_RADIUS_SM * 2, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        />

        {/* Orbit Icons — now shows on all devices, CSS animated */}
        {idleReady && (
          <OrbitRing tier={tier} hovered={hovered} isVisible={isVisible} />
        )}

        {/* Rotating Gradient Ring - skip on low */}
        {shouldShowHeavyEffects(tier) && idleReady && isVisible && (
          <div
            className="absolute rounded-full pointer-events-none will-change-transform"
            style={{
              width: "calc(100% - 120px)",
              height: "calc(100% - 120px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "conic-gradient(from 0deg, hsl(187 78% 53% / 0.3), hsl(160 64% 43% / 0.25), transparent 40%, transparent 60%, hsl(187 78% 53% / 0.2), hsl(160 64% 43% / 0.3))",
              filter: "blur(2px)",
              animation: isVisible ? "orbit-spin 20s linear infinite" : "none",
            }}
          />
        )}

        {/* Profile Image */}
        <motion.div
          className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden bg-card z-10"
          style={{
            boxShadow: hovered ? "0 0 30px hsl(187 78% 53% / 0.3), 0 0 60px hsl(187 78% 53% / 0.1)" : "none",
          }}
          whileHover={tier !== "low" ? { scale: 1.05 } : undefined}
          transition={{ type: "spring", stiffness: 280, damping: 20 }}
        >
          <img
            src={profileImg}
            alt="Manoj Kumar"
            className="w-full h-full object-cover object-[center_20%] rounded-full"
            width={224}
            height={224}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </div>
    </motion.div>
  );
});

HeroProfileImage.displayName = "HeroProfileImage";
export default HeroProfileImage;
