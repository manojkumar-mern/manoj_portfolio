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
    <section id="about" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-2">
            About Me
          </h3>
          <div className="h-1 w-16 rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -4, boxShadow: "0 0 20px hsl(160 84% 50% / 0.1)" }}
                className="p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all text-center"
              >
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary mx-auto w-fit mb-3">
                  <item.icon size={20} />
                </div>
                <p className="font-semibold text-foreground text-sm mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
