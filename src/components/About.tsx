import { motion } from "framer-motion";
import { Code2, Server, Database, Rocket } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Frontend", desc: "React, Tailwind, Modern UI/UX" },
  { icon: Server, label: "Backend", desc: "Node.js, Express, REST APIs" },
  { icon: Database, label: "Database", desc: "MongoDB, Mongoose ODM" },
  { icon: Rocket, label: "Real-time", desc: "Socket.io, WebSockets" },
];

const About = () => {
  return (
    <section id="about" className="py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">About Me</h2>
          <div className="h-0.5 w-12 rounded-full bg-primary" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm a <span className="text-foreground font-medium">Full Stack MERN Developer</span> with a passion for building
              high-performance web applications that solve real problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I specialize in crafting scalable applications using React, Node.js, Express, and MongoDB —
              from real-time chat systems to task management platforms. I care deeply about clean code,
              intuitive user experiences, and robust backend architecture.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently seeking opportunities to contribute to impactful products while growing as an engineer
              in a collaborative team environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="p-2 rounded-lg bg-primary/8 text-primary w-fit mb-3 group-hover:bg-primary/12 transition-colors">
                  <item.icon size={18} />
                </div>
                <p className="font-semibold text-foreground text-sm mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
