import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Server, Zap, X } from "lucide-react";

interface Project {
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  tech: string[];
  links: { demo: string; github: string; api?: string } | null;
}

const projects: Project[] = [
  {
    title: "Real-Time Chat Application",
    description:
      "Built a real-time chat application enabling instant messaging using WebSocket communication.",
    detailedDescription:
      "A full-stack real-time chat application built with the MERN stack and Socket.io. Users can send and receive messages instantly without page refresh. The app supports online user status tracking, real-time typing indicators, and persistent message storage in MongoDB. The backend exposes RESTful APIs for authentication and user management.",
    features: [
      "Real-time messaging via WebSockets",
      "User authentication & authorization",
      "Online user status tracking",
      "MongoDB message storage",
      "REST API integration",
    ],
    tech: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    links: { demo: "#", github: "#", api: "#" },
  },
  {
    title: "Social Media App",
    description:
      "Developed a lightweight social feed application using React (Vite) with a mock REST API powered by json-server to simulate CRUD operations.",
    detailedDescription:
      "A social media feed application that simulates a real social platform. Built with React and Vite for fast development. Uses json-server as a mock backend to simulate full CRUD operations including creating posts, liking, commenting, and deleting content. Features a responsive UI with modern card-based layouts.",
    features: [
      "Create, read, update, delete posts",
      "Mock REST API with json-server",
      "Responsive social feed UI",
      "Like and comment functionality",
    ],
    tech: ["React", "Vite", "json-server", "REST API", "CSS"],
    links: null,
  },
  {
    title: "Task Manager Dashboard",
    description:
      "Built a task management dashboard with secure authentication and full CRUD functionality to create, update, delete, and manage tasks.",
    detailedDescription:
      "A comprehensive task management dashboard with secure login/signup authentication. Users can create, update, delete, and track tasks with priority levels and due-date management. The app features a clean dashboard UI with task filtering, sorting, and status tracking. Built with the MERN stack for full-stack functionality.",
    features: [
      "Secure login/signup authentication",
      "Full CRUD task management",
      "Priority and due-date tracking",
      "Task filtering and sorting",
      "Responsive dashboard UI",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT Auth"],
    links: null,
  },
];

const miniProjects = ["To Do List", "Rock Paper Scissors Game", "Colors App", "Notes API"];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-card border border-border p-6 md:p-8 card-shadow"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
      >
        <X size={20} />
      </button>

      <div className="h-1 w-full rounded-full mb-6" style={{ background: "var(--gradient-primary)" }} />

      <h3 className="text-2xl font-bold text-foreground mb-4">{project.title}</h3>

      <p className="text-muted-foreground leading-relaxed mb-6">{project.detailedDescription}</p>

      <div className="mb-6">
        <h4 className="font-mono text-primary text-sm mb-3 tracking-wider">// features</h4>
        <div className="space-y-2">
          {project.features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Zap size={14} className="text-primary mt-0.5 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-mono text-primary text-sm mb-3 tracking-wider">// tech stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-mono border border-primary/20">
              {t}
            </span>
          ))}
        </div>
      </div>

      {project.links && (
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <a href={"https://chat-app-kappa-ashy.vercel.app/"} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all glow">
            <ExternalLink size={14} /> Live Demo
          </a>
          <a href={"https://github.com/manojkumar-mern/chat-app"} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all">
            <Github size={14} /> GitHub
          </a>
          {project.links.api && (
            <a href={"https://chat-app-y0ic.onrender.com/"} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-muted-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all">
              <Server size={14} /> Backend API
            </a>
          )}
        </div>
      )}
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
              onClick={() => setSelectedProject(project)}
              className="group rounded-xl bg-card border border-border hover:border-primary/40 transition-all card-shadow overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="h-1 w-full" style={{ background: "var(--gradient-primary)" }} />
              <div className="p-6 flex flex-col flex-1">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-mono">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground font-mono">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-2 text-xs font-mono text-primary/70 group-hover:text-primary transition-colors">
                  Click to view details →
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="font-mono text-primary text-sm mb-4 tracking-wider">// mini projects</h4>
          <div className="flex flex-wrap gap-3">
            {miniProjects.map((p) => (
              <span key={p} className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-all cursor-default">
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
