import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, Database, Rocket } from "lucide-react";
import {
  fadeLeft, fadeUp, staggerContainer, staggerItem, staggerItemScale,
  viewportConfig, prefersReducedMotion, noMotion,
} from "@/lib/motion";

const highlights = [
  {
    icon: Code2, label: "Frontend", desc: "React, Tailwind, Modern UI/UX",
    logos: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind" },
    ],
  },
  {
    icon: Server, label: "Backend", desc: "Node.js, Express, REST APIs",
    logos: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", alt: "Express" },
    ],
  },
  {
    icon: Database, label: "Database", desc: "MongoDB, Mongoose ODM",
    logos: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB" },
    ],
  },
  {
    icon: Rocket, label: "Real-time", desc: "Socket.io, WebSockets",
    logos: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg", alt: "Socket.io" },
    ],
  },
];

const About = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { setReduced(prefersReducedMotion()); }, []);

  const v = (variant: typeof fadeLeft) => reduced ? noMotion : variant;

  return (
    <section id="about" className="py-20 md:py-28 px-4 md:px-0">
      <div className="container">
        <motion.div
          variants={v(fadeLeft)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">About Me</h2>
          <div className="h-0.5 w-12 rounded-full bg-primary" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          <motion.div
            variants={v(staggerContainer(0.12))}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-5"
          >
            <motion.p variants={v(staggerItem)} className="text-muted-foreground text-lg leading-relaxed">
              I'm a <span className="text-foreground font-medium">Full Stack MERN Developer</span> with a passion for building
              high-performance web applications that solve real problems.
            </motion.p>
            <motion.p variants={v(staggerItem)} className="text-muted-foreground leading-relaxed">
              I specialize in crafting scalable applications using React, Node.js, Express, and MongoDB —
              from real-time chat systems to task management platforms. I care deeply about clean code,
              intuitive user experiences, and robust backend architecture.
            </motion.p>
            <motion.p variants={v(staggerItem)} className="text-muted-foreground leading-relaxed">
              Currently seeking opportunities to contribute to impactful products while growing as an engineer
              in a collaborative team environment.
            </motion.p>
          </motion.div>

          <motion.div
            variants={v(staggerContainer(0.1))}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                variants={v(staggerItemScale)}
                className="p-5 premium-card glow-card group"
              >
                <div className="p-2 rounded-lg bg-primary/8 text-primary w-fit mb-3 group-hover:bg-primary/12 transition-colors">
                  <item.icon size={18} />
                </div>
                <p className="font-semibold text-foreground text-sm mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{item.desc}</p>
                <div className="flex items-center gap-2 max-md:opacity-100 max-md:translate-y-0 max-md:scale-100 opacity-0 translate-y-1 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  {item.logos.map((logo) => (
                    <img key={logo.alt} src={logo.src} alt={logo.alt} className="w-5 h-5 object-contain" loading="lazy" />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
