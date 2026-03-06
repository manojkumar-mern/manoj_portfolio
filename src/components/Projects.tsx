import { motion } from "framer-motion";
import { ExternalLink, Github, Zap } from "lucide-react";

const projects = [
  {
    title: "Real-Time Chat Application",
    description:
      "Built a real-time chat application enabling instant messaging using WebSockets. Users can send and receive messages instantly without page refresh.",
    features: [
      "Real-time messaging",
      "WebSocket communication",
      "Online users",
      "REST API integration",
    ],
    tech: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    hasLinks: true,
  },
  {
    title: "Social Media App",
    description:
      "Developed a lightweight social feed application using React (Vite) with a mock REST API using json-server to simulate CRUD operations.",
    tech: ["React", "Vite", "json-server", "REST API"],
    hasLinks: false,
  },
  {
    title: "Task Manager Dashboard",
    description:
      "Built a task management dashboard with secure login/signup authentication and full CRUD functionality to manage tasks with priority and due dates.",
    tech: ["React", "Node.js", "MongoDB", "Auth"],
    hasLinks: false,
  },
];

const miniProjects = ["To Do List", "Rock Paper Scissors Game", "Colors App", "Notes API"];

const Projects = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-primary text-sm mb-2 tracking-wider">// projects</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-12">
            Featured <span className="text-gradient">Work</span>
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group rounded-xl bg-card border border-border hover:border-primary/40 transition-all card-shadow overflow-hidden flex flex-col"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: "var(--gradient-primary)" }} />

              <div className="p-6 flex flex-col flex-1">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {project.features && (
                  <div className="mb-4">
                    {project.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Zap size={12} className="text-primary" />
                        {f}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.hasLinks && (
                  <div className="flex gap-3 mt-auto pt-2">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground font-medium"
                    >
                      <Github size={14} /> GitHub
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="font-mono text-primary text-sm mb-4 tracking-wider">// mini projects</h4>
          <div className="flex flex-wrap gap-3">
            {miniProjects.map((p) => (
              <span
                key={p}
                className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-all cursor-default"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
