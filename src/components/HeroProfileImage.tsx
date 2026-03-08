import { motion } from "framer-motion";
import profileImg from "@/assets/profile.png";
import HeroParticles from "./HeroParticles";

const HeroProfileImage = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.3 }}
    className="flex-shrink-0"
  >
    <div className="relative group flex items-center justify-center">
      {/* Floating particles */}
      <HeroParticles />

      {/* Layer 4: Outer glow aura with pulse */}
      <motion.div
        className="absolute -inset-14 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(187 78% 53% / 0.07) 0%, hsl(160 64% 43% / 0.04) 35%, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.85, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 3: Rotating gradient ring */}
      <motion.div
        className="absolute -inset-4 rounded-full pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, hsl(187 78% 53% / 0.3), hsl(160 64% 43% / 0.25), transparent 40%, transparent 60%, hsl(187 78% 53% / 0.2), hsl(160 64% 43% / 0.3))",
          filter: "blur(2px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 2: Thin inner gradient ring */}
      <div
        className="absolute -inset-[1.5px] rounded-full opacity-50"
        style={{
          background:
            "linear-gradient(135deg, hsl(187 78% 53% / 0.6), hsl(160 64% 43% / 0.6))",
        }}
      />

      {/* Layer 1: Profile image */}
      <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden bg-card">
        <img
          src={profileImg}
          alt="Manoj Kumar D"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  </motion.div>
);

export default HeroProfileImage;
