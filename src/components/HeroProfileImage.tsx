import { useState, memo } from "react";
import { motion } from "framer-motion";
import profileImg from "@/assets/profile.webp";
import { usePerformanceTier } from "@/hooks/use-performance";
import { useIdleReady } from "@/hooks/use-idle-animation";

const orbitIcons = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express" },
];

const ORBIT_RADIUS_MD = 170;
const ORBIT_RADIUS_SM = 130;
const ORBIT_DURATION_NORMAL = 36;
const ORBIT_DURATION_FAST = 18;

const OrbitRing = memo(({ icons, duration, tier }: { icons: typeof orbitIcons; duration: number; tier: string }) => {
  // LOW: no orbit animation
  if (tier === "low") return null;

  // MEDIUM: fewer icons, slower orbit
  const visibleIcons = tier === "medium" ? icons.slice(0, 3) : icons;
  const adjustedDuration = tier === "medium" ? duration * 1.5 : duration;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ rotate: 360 }}
      transition={{ duration: adjustedDuration, repeat: Infinity, ease: "linear" }}
    >
      {visibleIcons.map((icon, i) => {
        const angle = (i / visibleIcons.length) * 360;
        return (
          <div
            key={icon.label}
            className="absolute left-1/2 top-1/2 pointer-events-auto"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <motion.div
              className="hidden md:block absolute"
              style={{ left: -18, top: -ORBIT_RADIUS_MD - 18 }}
              whileHover={{ scale: 1.25 }}
            >
              <div className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg hover:shadow-[0_0_16px_hsl(187_78%_53%/0.35)] hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                <img src={icon.src} alt={icon.label} className="w-5 h-5 group-hover:drop-shadow-[0_0_6px_hsl(187_78%_53%/0.6)] transition-all duration-300" loading="lazy" width={20} height={20} />
              </div>
            </motion.div>
            <motion.div
              className="md:hidden absolute"
              style={{ left: -15, top: -ORBIT_RADIUS_SM - 15 }}
              whileHover={{ scale: 1.25 }}
            >
              <div className="w-[30px] h-[30px] rounded-full bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg">
                <img src={icon.src} alt={icon.label} className="w-4 h-4" loading="lazy" width={16} height={16} />
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
});
OrbitRing.displayName = "OrbitRing";

const HeroProfileImage = memo(() => {
  const tier = usePerformanceTier();
  const [hovered, setHovered] = useState(false);
  const orbitDuration = hovered ? ORBIT_DURATION_FAST : ORBIT_DURATION_NORMAL;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="flex-shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex items-center justify-center w-[320px] h-[320px] md:w-[400px] md:h-[400px] transform-gpu">
        {/* Aura Glow - skip on low */}
        {tier !== "low" && (
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
        {tier !== "low" && (
          <>
            <div
              className="absolute rounded-full border border-border/30 pointer-events-none hidden md:block"
              style={{ width: ORBIT_RADIUS_MD * 2, height: ORBIT_RADIUS_MD * 2, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
            <div
              className="absolute rounded-full border border-border/30 pointer-events-none md:hidden"
              style={{ width: ORBIT_RADIUS_SM * 2, height: ORBIT_RADIUS_SM * 2, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
          </>
        )}

        {/* Orbit Icons */}
        <OrbitRing icons={orbitIcons} duration={orbitDuration} tier={tier} />

        {/* Rotating Gradient Ring - skip on low */}
        {tier !== "low" && (
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "calc(100% - 120px)", height: "calc(100% - 120px)",
              top: "50%", left: "50%", x: "-50%", y: "-50%",
              background: "conic-gradient(from 0deg, hsl(187 78% 53% / 0.3), hsl(160 64% 43% / 0.25), transparent 40%, transparent 60%, hsl(187 78% 53% / 0.2), hsl(160 64% 43% / 0.3))",
              filter: "blur(2px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
          />
        </motion.div>
      </div>
    </motion.div>
  );
});

HeroProfileImage.displayName = "HeroProfileImage";
export default HeroProfileImage;
