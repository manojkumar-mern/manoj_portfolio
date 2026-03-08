import { useState } from "react";
import { motion } from "framer-motion";
import profileImg from "@/assets/profile.png";

const orbitIcons = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express" },
];

const ORBIT_RADIUS_MD = 170;
const ORBIT_RADIUS_SM = 130;
const ORBIT_DURATION_NORMAL = 28;
const ORBIT_DURATION_FAST = 14;

const HeroProfileImage = () => {
  const [hovered, setHovered] = useState(false);
  const orbitDuration = hovered ? ORBIT_DURATION_FAST : ORBIT_DURATION_NORMAL;

  return (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.3 }}
    className="flex-shrink-0"
  >
    <div className="relative flex items-center justify-center w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
      {/* Outer glow aura */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(187 78% 53% / 0.08) 0%, hsl(160 64% 43% / 0.04) 40%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbit track ring */}
      <div
        className="absolute rounded-full border border-border/30 pointer-events-none hidden md:block"
        style={{
          width: ORBIT_RADIUS_MD * 2,
          height: ORBIT_RADIUS_MD * 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute rounded-full border border-border/30 pointer-events-none md:hidden"
        style={{
          width: ORBIT_RADIUS_SM * 2,
          height: ORBIT_RADIUS_SM * 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Rotating orbit container */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
      >
        {orbitIcons.map((icon, i) => {
          const angle = (i / orbitIcons.length) * 360;
          return (
            <div
              key={icon.label}
              className="absolute left-1/2 top-1/2 pointer-events-auto"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              {/* MD orbit */}
              <motion.div
                className="hidden md:block absolute"
                style={{
                  left: -18,
                  top: -ORBIT_RADIUS_MD - 18,
                }}
                whileHover={{ scale: 1.3 }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg hover:shadow-[0_0_16px_hsl(187_78%_53%/0.35)] hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                    <img src={icon.src} alt={icon.label} className="w-5 h-5 group-hover:drop-shadow-[0_0_6px_hsl(187_78%_53%/0.6)] transition-all duration-300" loading="lazy" />
                  </div>
                </motion.div>
              </motion.div>

              {/* SM orbit */}
              <motion.div
                className="md:hidden absolute"
                style={{
                  left: -15,
                  top: -ORBIT_RADIUS_SM - 15,
                }}
                whileHover={{ scale: 1.3 }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-[30px] h-[30px] rounded-full bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg hover:shadow-[0_0_12px_hsl(187_78%_53%/0.3)] hover:border-primary/50 transition-all duration-300">
                    <img src={icon.src} alt={icon.label} className="w-4 h-4" loading="lazy" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Rotating gradient ring */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "calc(100% - 120px)",
          height: "calc(100% - 120px)",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          background:
            "conic-gradient(from 0deg, hsl(187 78% 53% / 0.3), hsl(160 64% 43% / 0.25), transparent 40%, transparent 60%, hsl(187 78% 53% / 0.2), hsl(160 64% 43% / 0.3))",
          filter: "blur(2px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Thin inner gradient border */}
      <div
        className="absolute rounded-full opacity-50 pointer-events-none"
        style={{
          width: "calc(100% - 123px)",
          height: "calc(100% - 123px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "linear-gradient(135deg, hsl(187 78% 53% / 0.6), hsl(160 64% 43% / 0.6))",
        }}
      />

      {/* Profile image */}
      <motion.div
        className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden bg-card z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          src={profileImg}
          alt="Manoj Kumar D"
          className="w-full h-full object-contain scale-[0.92]"
        />
      </motion.div>
    </div>
  </motion.div>
);

export default HeroProfileImage;
