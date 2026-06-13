import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  fadeUp, fadeLeft, fadeRight, staggerContainer, staggerItemScale,
  viewportConfig, prefersReducedMotion, noMotion,
} from "@/lib/motion";
import { devicon } from "@/lib/devicons";
import { useIsMobile } from "@/hooks/use-mobile";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: devicon.react },
      { name: "HTML", icon: devicon.html5 },
      { name: "CSS", icon: devicon.css3 },
      { name: "Tailwind CSS", icon: devicon.tailwind },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: devicon.nodejs },
      { name: "Express.js", icon: devicon.express },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: devicon.mongodb },
      { name: "Mongoose", icon: devicon.mongoose },
    ],
  },
  {
    title: "Core",
    skills: [
      { name: "JavaScript", icon: devicon.javascript },
      { name: "TypeScript", icon: devicon.typescript },
      { name: "REST API", icon: "" },
      { name: "Socket.io", icon: devicon.socketio },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: devicon.git },
      { name: "GitHub", icon: devicon.github },
      { name: "Postman", icon: devicon.postman },
      { name: "Vercel", icon: devicon.vercel },
      { name: "Render", icon: "" },
    ],
  },
];

const groupVariants = [fadeLeft, fadeRight, fadeUp, fadeLeft, fadeRight];

const Skills = memo(() => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { setReduced(prefersReducedMotion()); }, []);
  const isMobile = useIsMobile();

  const v = <T extends object>(variant: T) => reduced ? noMotion : variant;

  return (
    <section id="skills" className="py-16 md:py-28 bg-muted/20 px-4 md:px-8 overflow-x-hidden">
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

        {isMobile ? (
          <div className="skills-mobile-card">
            {skillGroups.map((group) => (
              <div key={group.title} className="skills-mobile-category">
                <h3 className="skills-mobile-title">{group.title}</h3>
                <div className="skills-mobile-grid">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="skills-mobile-chip premium-card"
                    >
                      {skill.icon ? (
                        <img src={skill.icon} alt={`${skill.name} Logo`} className="w-4 h-4 object-contain shrink-0" loading="lazy" width={16} height={16} />
                      ) : (
                        <div className="w-4 h-4 rounded bg-primary/15 flex items-center justify-center text-primary text-[9px] font-bold shrink-0">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm text-muted-foreground truncate">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
        <motion.div
          variants={v(staggerContainer(0.12))}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="skills-categories-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              variants={v(groupVariants[i % groupVariants.length])}
              className="skills-category-box rounded-2xl border border-border/40 bg-card/50 p-5 md:p-6 w-full"
            >
              <h3 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-2.5 md:mb-4">
                {group.title}
              </h3>
              <motion.div
                variants={v(staggerContainer(0.06))}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="skills-items-grid grid grid-cols-2 gap-2 md:gap-2 [&>*:last-child:nth-child(odd)]:col-span-2"
              >
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={v(staggerItemScale)}
                    className="skill-item-card flex items-center gap-2 px-3 py-2 rounded-lg premium-card glow-card cursor-default group"
                  >
                    {skill.icon ? (
                      <img src={skill.icon} alt={`${skill.name} Logo`} className="w-4 h-4 object-contain" loading="lazy" width={16} height={16} />
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
        )}
      </div>
    </section>
  );
});

Skills.displayName = "Skills";
export default Skills;
