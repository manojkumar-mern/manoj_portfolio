import { memo, useEffect, useRef, useState } from "react";
import { usePerformanceTier } from "@/hooks/use-performance";
import { useIdleReady } from "@/hooks/use-idle-animation";
import { devicon } from "@/lib/devicons";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/* Every icon breathes at its own tempo, amplitude, direction, and easing. */
const allIcons = [
  { src: devicon.react,      x: "10%", y: "20%", ay: 14, ax:  6, dur: 11, ease: "sine.inOut",   dir:  1 },
  { src: devicon.nodejs,     x: "80%", y: "15%", ay: 10, ax: -8, dur: 13, ease: "power1.inOut", dir: -1 },
  { src: devicon.mongodb,    x: "70%", y: "70%", ay: 16, ax:  5, dur: 15, ease: "sine.inOut",   dir:  1 },
  { src: devicon.typescript, x: "15%", y: "75%", ay:  8, ax: -6, dur: 10, ease: "power2.inOut", dir: -1 },
  { src: devicon.javascript, x: "85%", y: "45%", ay: 12, ax:  9, dur: 17, ease: "sine.inOut",   dir:  1 },
  { src: devicon.tailwind,   x: "5%",  y: "50%", ay:  9, ax: -5, dur: 12, ease: "power1.inOut", dir: -1 },
];

const FloatingIcons = memo(() => {
  const tier = usePerformanceTier();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const ready = useIdleReady(600);
  const iconRefs = useRef<Array<HTMLImageElement | null>>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !ready) return;
    if (prefersReducedMotion()) return;

    const tweens: gsap.core.Tween[] = [];
    iconRefs.current.forEach((el, i) => {
      if (!el) return;
      const cfg = allIcons[i];
      // Independent Y drift.
      tweens.push(
        gsap.to(el, {
          y: cfg.ay * cfg.dir,
          duration: cfg.dur,
          ease: cfg.ease,
          yoyo: true,
          repeat: -1,
          delay: i * 0.35,
        }),
      );
      // Independent X drift on a different tempo — creates organic figure-8 feel.
      tweens.push(
        gsap.to(el, {
          x: cfg.ax,
          duration: cfg.dur * 1.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.5,
        }),
      );
      // Gentle opacity breathing.
      tweens.push(
        gsap.to(el, {
          opacity: 0.08,
          duration: cfg.dur * 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.25,
        }),
      );
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, [visible, ready, tier]);

  // LOW: no floating icons
  if (tier === "low") return <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" />;

  const icons = tier === "medium" ? allIcons.slice(0, 3) : allIcons;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {visible && ready &&
        icons.map((icon, i) => (
          <img
            key={i}
            ref={(el) => { iconRefs.current[i] = el; }}
            src={icon.src}
            alt=""
            className="absolute w-7 h-7 transform-gpu will-change-transform"
            style={{ left: icon.x, top: icon.y, opacity: 0.05 }}
            loading="lazy"
            width={28}
            height={28}
          />
        ))}
    </div>
  );
});

FloatingIcons.displayName = "FloatingIcons";
export default FloatingIcons;
