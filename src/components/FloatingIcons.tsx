import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const icons = [
{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", x: "10%", y: "20%" },
{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", x: "80%", y: "15%" },
{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", x: "70%", y: "70%" },
{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", x: "15%", y: "75%" },
{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", x: "85%", y: "45%" },
{ src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", x: "5%", y: "50%" },
];

const FloatingIcons = () => {
const ref = useRef<HTMLDivElement>(null);
const [visible, setVisible] = useState(true);

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

return ( <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">


  {visible &&
    icons.map((icon, i) => (
      <motion.img
        key={i}
        src={icon.src}
        alt=""
        className="absolute w-7 h-7 opacity-[0.05] transform-gpu"
        style={{ left: icon.x, top: icon.y }}
        animate={{
          y: [0, -8, 0],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 12 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.8,
        }}
        loading="lazy"
      />
    ))}

</div>


);
};

export default FloatingIcons;
