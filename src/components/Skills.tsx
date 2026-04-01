import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItemScale,
  viewportConfig, prefersReducedMotion, noMotion,
} from "@/lib/motion";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Mongoose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" },
    ],
  },
  {
    title: "Core",
    skills: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "REST API", icon: "" },
      { name: "Socket.io", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
      { name: "Render", icon: "" },
    ],
  },
];

const groupVariants = [fadeLeft, fadeRight, fadeUp, fadeLeft, fadeRight];

const Skills = memo(() => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { setReduced(prefersReducedMotion()); }, []);

  const v = <T extends object>(variant: T) => reduced ? noMotion : variant;

  return (
    <section id="skills" className="py-20 md:py-28 bg-muted/20 px-4 md:px-8 overflow-x-hidden transform-gpu will-change-transform">
      <div className="container">
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Skills</h2>
          <div className="h-0.5 w-12 rounded-full bg-gradient-accent mb-4" />
          <p className="text-muted-foreground max-w-lg">
            Technologies I use to build modern, scalable applications.
          </p>
        </motion.div>

        <motion.div
          variants={v(staggerContainer(0.12))}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {skillGroups.map((group, i) => (
            <motion.div key={group.title} variants={v(groupVariants[i % groupVariants.length])} className="max-sm:text-center">
              <h3 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-4">
                {group.title}
              </h3>
              <motion.div
                variants={v(staggerContainer(0.06))}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5 justify-center sm:justify-start"
              >
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={v(staggerItemScale)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg premium-card glow-card cursor-default group"
                  >
                    {skill.icon ? (
                      <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain" loading="lazy" width={16} height={16} />
                    ) : (
                      <div className="w-4 h-4 rounded bg-primary/15 flex items-center justify-center text-primary text-[9px] font-bold">
                        {skill.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";
export default Skills;
