import { useState, memo, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import profileImg from "@/assets/profile.webp";
import { usePerformanceTier, type PerfTier } from "@/hooks/use-performance";
import { useIdleReady } from "@/hooks/use-idle-animation";
import { useMouseTilt } from "@/hooks/use-mouse-tilt";
import { useIsMobile } from "@/hooks/use-mobile";

const orbitIcons = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express", invert: true },
];

const ORBIT_RADIUS_MD = 170;
const ORBIT_RADIUS_SM = Math.min(window.innerWidth * 0.35, 115);

function getOrbitBaseDuration(tier: PerfTier, isMobile: boolean): number {
  if (isMobile) return 30;
  return tier === "low" ? 28 : tier === "medium" ? 22 : 16;
}

const HOVER_SPEED_MULTIPLIER = 2.2;

function getVisibleIcons(tier: PerfTier, isMobile: boolean) {
  if (isMobile) return orbitIcons;

  if (tier === "low") return orbitIcons.slice(0, 4);
  if (tier === "medium") return orbitIcons.slice(0, 5);

  return orbitIcons;
}

function getOrbitDuration(tier: PerfTier, hovered: boolean): number {
  const base = tier === "low" ? 32 : tier === "medium" ? 22 : 16;
  return hovered ? base * 0.45 : base;
}

function shouldShowHeavyEffects(tier: PerfTier): boolean {
  return tier !== "low";
}

function useOrbitVisible(ref: React.RefObject<HTMLElement | null>): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
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

/* ───────── Orbit Ring ───────── */
const OrbitRing = memo(
  ({
    tier,
    hovered,
    isVisible,
    isMobile,
  }: {
    tier: PerfTier;
    hovered: boolean;
    isVisible: boolean;
    isMobile: boolean;
  }) => {
    const icons = getVisibleIcons(tier, isMobile);

    const ringRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<Animation | null>(null);
    const currentRateRef = useRef(1);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
      const el = ringRef.current;
      if (!el) return;

      const anim = el.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
        {
          duration: isMobile ? 8000 : 20000,
          iterations: Infinity,
          easing: "linear",
        }
      );

      animationRef.current = anim;
      anim.playbackRate = currentRateRef.current;

      return () => {
        anim.cancel();
        animationRef.current = null;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [isVisible, isMobile]);

    const BASE_SPEED = isMobile ? 0.5 : 1;
    const HOVER_SPEED = isMobile ? 1.0 : 1.8;

    useEffect(() => {
      const anim = animationRef.current;
      if (!anim) return;

      const target = hovered ? HOVER_SPEED : BASE_SPEED;

      const tick = () => {
        const cur = currentRateRef.current;
        const smoothFactor = isMobile ? 0.08 : 0.12;
        const next = cur + (target - cur) * smoothFactor;

        if (Math.abs(target - next) < 0.01) {
          currentRateRef.current = target;
          anim.playbackRate = target;
          rafRef.current = null;
          return;
        }

        currentRateRef.current = next;
        anim.playbackRate = next;
        rafRef.current = requestAnimationFrame(tick);
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }, [hovered]);

    return (
      <div
        ref={ringRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          transform: "translateZ(0)",
        }}
      >
        {icons.map((icon, i) => {
          const angle = (i / icons.length) * 360;

          return (
            <div
              key={icon.label}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              {/* Desktop */}
              <div
                className="hidden md:block absolute"
                style={{ left: -18, top: -ORBIT_RADIUS_MD - 18 }}
              >
                <div className="w-9 h-9 rounded-full bg-card border border-border/60 flex items-center justify-center shadow-lg shadow-black/20 hover:shadow-[0_0_16px_hsl(187_78%_53%/0.35)] hover:border-primary/50 transition duration-300">
                  <img
                    src={icon.src}
                    alt={icon.label}
                    className={`w-5 h-5 ${
                      icon.invert ? "invert brightness-200" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Mobile */}
              <div
                className="md:hidden absolute"
                style={{ left: -18, top: -ORBIT_RADIUS_SM - 18 }}
              >
                <div className="w-8 h-8 rounded-full bg-card border border-border/60 flex items-center justify-center">
                  <img
                    src={icon.src}
                    alt={icon.label}
                    className={`w-[18px] h-[18px] ${
                      icon.invert ? "invert brightness-200" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

OrbitRing.displayName = "OrbitRing";

/* ───────── MAIN ───────── */
const HeroProfileImage = memo(() => {
  const tier = usePerformanceTier();
  const idleReady = useIdleReady(400);
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  const isVisible = useOrbitVisible(containerRef);

  useMouseTilt(
    containerRef,
    tiltRef,
    shouldShowHeavyEffects(tier) && isVisible
  );

  return (
    <motion.div className="flex-shrink-0">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-[260px] h-[300px] md:w-[400px] md:h-[400px] overflow-visible"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div ref={tiltRef} className="absolute inset-0">
          {/* Orbit */}
          <OrbitRing
            tier={tier}
            hovered={hovered}
            isVisible={isVisible}
            isMobile={isMobile}
          />
        </div>

        {/* Profile */}
        <div className="relative w-[160px] h-[160px] md:w-56 md:h-56 rounded-full overflow-hidden z-10 ">
          <img
            src={profileImg}
            alt="profile"
            className="w-full h-full object-cover object-[center_20%]"
          />
        </div>
      </div>
    </motion.div>
  );
});

HeroProfileImage.displayName = "HeroProfileImage";

export default HeroProfileImage;
