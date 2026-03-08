import { motion } from "framer-motion";

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

const directions: Array<{ x: number; y: number }> = [
  { x: -40, y: 0 },
  { x: 40, y: 0 },
  { x: 0, y: 40 },
  { x: -30, y: 20 },
  { x: 30, y: 20 },
];

const Skills = () => {
  return (
    <section id="skills" className="py-28 bg-muted/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Skills</h2>
          <div className="h-0.5 w-12 rounded-full bg-gradient-accent mb-4" />
          <p className="text-muted-foreground max-w-lg">
            Technologies I use to build modern, scalable applications.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillGroups.map((group, i) => {
            const dir = directions[i % directions.length];
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, x: dir.x, y: dir.y }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              >
                <h3 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-4">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 + si * 0.05 }}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-[0_0_18px_hsl(187_78%_53%/0.12)] hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 cursor-default group"
                    >
                      {skill.icon ? (
                        <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain" loading="lazy" />
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
