import { motion } from "framer-motion";
import { Code2, Server, Database } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-primary text-sm mb-2 tracking-wider">// about me</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8">
            Who I <span className="text-gradient">Am</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            MERN Stack Developer skilled in building scalable web applications
            using React, Node.js, Express, and MongoDB. Passionate about
            creating real-time, user-friendly solutions with clean UI and
            efficient backend architecture. Seeking an opportunity to contribute
            to impactful products while continuously growing as a full-stack
            developer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 gap-4"
          >
            {[
              { icon: Code2, label: "Frontend", desc: "React, Tailwind, Modern UI" },
              { icon: Server, label: "Backend", desc: "Node.js, Express, REST APIs" },
              { icon: Database, label: "Database", desc: "MongoDB, Mongoose ODM" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors card-shadow"
              >
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <item.icon size={22} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

