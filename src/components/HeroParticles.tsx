import { motion } from "framer-motion";

const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 8) * Math.PI * 2) * 160,
  y: Math.sin((i / 8) * Math.PI * 2) * 160,
  size: 3 + (i % 3) * 2,
  delay: i * 0.6,
  duration: 4 + (i % 3) * 1.5,
}));

const HeroParticles = () => (
  <div className="absolute inset-0 pointer-events-none">
    {particles.map((p) => (
      <motion.div
        key={p.id}
        className="absolute left-1/2 top-1/2 rounded-full transform-gpu will-change-transform"
        style={{
          width: p.size,
          height: p.size,
          background: p.id % 2 === 0
            ? "hsl(187 78% 53% / 0.4)"
            : "hsl(160 64% 43% / 0.35)",
          filter: `blur(${p.size > 4 ? 2 : 1}px)`,
          x: p.x,
          y: p.y,
        }}
        animate={{
          x: [p.x, p.x + 15, p.x - 10, p.x],
          y: [p.y, p.y - 20, p.y + 10, p.y],
          opacity: [0.3, 0.7, 0.4, 0.3],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: p.delay,
        }}
      />
    ))}
  </div>
);

export default HeroParticles;
