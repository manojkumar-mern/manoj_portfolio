import { useState, memo, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import profileImg from "@/assets/profile.webp";
import { usePerformanceTier, type PerfTier } from "@/hooks/use-performance";
import { useIdleReady } from "@/hooks/use-idle-animation";
import { useMouseTilt } from "@/hooks/use-mouse-tilt";

const orbitIcons = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind", invert: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express", invert: true },
];

const ORBIT_RADIUS_MD = 170;
const ORBIT_RADIUS_SM = 130;

function getOrbitBaseDuration(tier: PerfTier): number {
  return tier === "low" ? 28 : tier === "medium" ? 22 : 16;
}

const HOVER_SPEED_MULTIPLIER = 2.2; // playbackRate when hovered

function getVisibleIcons(tier: PerfTier) {
  if (tier === "low") return orbitIcons.slice(0, 3);
  if (tier === "medium") return orbitIcons.slice(0, 4);
  return orbitIcons;
}

function shouldShowHeavyEffects(tier: PerfTier): boolean {
  return tier !== "low";
}

function useOrbitVisible(ref: React.RefObject<HTMLElement | null>): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) { setVisible(false); return; }

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

/* ── Orbit Ring: pure CSS rotation, speed controlled via animation-duration ── */
const OrbitRing = memo(({ tier, hovered, isVisible }: { tier: PerfTier; hovered: boolean; isVisible: boolean }) => {
  const icons = getVisibleIcons(tier);
  const baseDuration = getOrbitBaseDuration(tier);
  const ringRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const currentRateRef = useRef<number>(1);
  const rafRef = useRef<number | null>(null);

  // Create a single Web Animations API rotation; speed is changed via playbackRate (no position jump).
  useEffect(() => {
    const el = ringRef.current;
    if (!el || !isVisible) return;

    const anim = el.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      { duration: baseDuration * 1000, iterations: Infinity, easing: "linear" }
    );
    animationRef.current = anim;
    anim.playbackRate = currentRateRef.current;

    return () => {
      anim.cancel();
      animationRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [baseDuration, isVisible]);

  // Smoothly LERP playbackRate on hover state change — no transform reset, just speed.
  useEffect(() => {
    const anim = animationRef.current;
    if (!anim) return;
    const target = hovered ? HOVER_SPEED_MULTIPLIER : 1;

    const tick = () => {
      const cur = currentRateRef.current;
      const next = cur + (target - cur) * 0.12;
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
      className="orbit-ring absolute inset-0 pointer-events-none will-change-transform"
      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
    >
      {icons.map((icon, i) => {
        const angle = (i / icons.length) * 360;
        return (
          <div
            key={icon.label}
            className="absolute left-1/2 top-1/2 pointer-events-auto"
            style={{ transform: `rotate(${angle}deg)` }}
          >
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
            <div
              className="md:hidden absolute"
              style={{ left: -14, top: -ORBIT_RADIUS_SM - 14 }}
            >
              <div className="w-[28px] h-[28px] rounded-full bg-card border border-border/60 flex items-center justify-center shadow-md shadow-black/20">
                <img
                  src={icon.src}
                  alt={icon.label}
                  className={`w-4 h-4${icon.invert ? " invert brightness-200" : ""}`}
                  loading="lazy"
                  width={16}
                  height={16}
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

/* ── Main Component ── */
const HeroProfileImage = memo(() => {
  const tier = usePerformanceTier();
  const idleReady = useIdleReady(400);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const isVisible = useOrbitVisible(containerRef);

  // Mouse tilt — only on high tier desktops
  useMouseTilt(containerRef, tiltRef, shouldShowHeavyEffects(tier) && isVisible);

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
      {/* Outer container: owns the ref for mouse events + visibility */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-[320px] h-[320px] md:w-[400px] md:h-[400px]"
      >
        {/* Tilt layer: separate from orbit rotation */}
        <div
          ref={tiltRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: "perspective(800px) rotateX(0deg) rotateY(0deg)" }}
        >
          {/* Static Aura Glow — no heavy animation, just opacity transition */}
          {shouldShowHeavyEffects(tier) && idleReady && isVisible && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-700"
              style={{
                background: "radial-gradient(circle, hsl(187 78% 53% / 0.08) 0%, hsl(160 64% 43% / 0.04) 40%, transparent 65%)",
                opacity: hovered ? 0.9 : 0.6,
              }}
            />
          )}

          {/* Orbit Tracks */}
          <div
            className="absolute rounded-full border border-border/30 pointer-events-none hidden md:block"
            style={{ width: ORBIT_RADIUS_MD * 2, height: ORBIT_RADIUS_MD * 2, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          />
          <div
            className="absolute rounded-full border border-border/30 pointer-events-none md:hidden"
            style={{ width: ORBIT_RADIUS_SM * 2, height: ORBIT_RADIUS_SM * 2, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          />

          {/* Orbit Icons */}
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
                background: "conic-gradient(from 0deg, hsl(187 78% 53% / 0.25), hsl(160 64% 43% / 0.2), transparent 40%, transparent 60%, hsl(187 78% 53% / 0.15), hsl(160 64% 43% / 0.25))",
                filter: "blur(2px)",
                animationName: "orbit-spin",
                animationDuration: "20s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            />
          )}
        </div>

        {/* Profile Image — outside tilt layer, stays centered */}
        <motion.div
          className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden bg-card z-10"
          style={{
            boxShadow: hovered
              ? "0 0 30px hsl(187 78% 53% / 0.3), 0 0 60px hsl(187 78% 53% / 0.1)"
              : "none",
            transition: "box-shadow 0.4s ease",
          }}
          whileHover={shouldShowHeavyEffects(tier) ? { scale: 1.05 } : undefined}
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
