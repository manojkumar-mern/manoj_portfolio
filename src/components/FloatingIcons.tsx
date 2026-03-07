import { motion } from "framer-motion";

const icons = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", x: "10%", y: "20%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", x: "80%", y: "15%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", x: "70%", y: "70%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", x: "15%", y: "75%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", x: "85%", y: "45%" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", x: "5%", y: "50%" },
];

const FloatingIcons = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {icons.map((icon, i) => (
      <motion.img
        key={i}
        src={icon.src}
        alt=""
        className="absolute w-8 h-8 opacity-[0.06]"
        style={{ left: icon.x, top: icon.y }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 6 + i * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.5,
        }}
        loading="lazy"
      />
    ))}
  </div>
);

export default FloatingIcons;
