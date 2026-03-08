import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Server, Zap, X, Lightbulb, Target, BookOpen, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Project {
  title: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  challenges: string;
  learned: string;
  links: { demo: string; github: string; api?: string } | null;
}

const projects: Project[] = [
  {
    title: "Real-Time Chat Application",
    description: "Full-stack real-time messaging app with WebSocket communication and online user tracking.",
    overview: "A production-grade real-time chat application built with the MERN stack and Socket.io enabling instant messaging between users with persistent storage.",
    problem: "Traditional HTTP polling creates latency and wasted bandwidth for messaging apps. Users need instant, seamless communication without page refreshes.",
    solution: "Implemented WebSocket communication via Socket.io for bi-directional real-time data flow, backed by MongoDB for message persistence and Express REST APIs for authentication.",
    features: [
      "Real-time messaging via WebSockets",
      "User authentication & authorization",
      "Online user status tracking",
      "MongoDB message persistence",
      "REST API for user management",
    ],
    tech: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    challenges: "Managing WebSocket connections at scale, handling disconnections gracefully, and ensuring message ordering with concurrent users.",
    learned: "Deep understanding of WebSocket lifecycle, real-time state synchronization, and building scalable event-driven architectures.",
    links: { demo: "https://chat-app-kappa-ashy.vercel.app/", github: "https://github.com/manojkumar-mern/chat-app", api: "https://chat-app-y0ic.onrender.com/" },
  },
  {
    title: "Social Media App",
    description: "Lightweight social feed with CRUD operations and responsive card-based UI.",
    overview: "A social media feed application simulating a real social platform with complete CRUD functionality and a modern responsive interface.",
    problem: "Needed a lightweight social platform prototype to demonstrate full CRUD operations and responsive design principles.",
    solution: "Built with React and Vite using json-server as a mock REST API backend, enabling rapid prototyping with realistic data operations.",
    features: [
      "Create, read, update, delete posts",
      "Mock REST API with json-server",
      "Responsive social feed UI",
      "Like and comment functionality",
    ],
    tech: ["React", "Vite", "json-server", "REST API", "CSS"],
    challenges: "Simulating realistic API behavior with json-server while maintaining a responsive and intuitive user interface.",
    learned: "Effective rapid prototyping, REST API design patterns, and building engaging social UI components.",
    links: null,
  },
  {
    title: "Task Manager Dashboard",
    description: "Secure task management dashboard with authentication and full CRUD functionality.",
    overview: "A comprehensive task management system with secure authentication, priority tracking, and an intuitive dashboard interface.",
    problem: "Teams need a simple yet powerful way to manage tasks with secure access, priority levels, and real-time status tracking.",
    solution: "Built a full-stack MERN application with JWT authentication, RESTful CRUD APIs, and a clean dashboard UI with filtering and sorting capabilities.",
    features: [
      "Secure JWT authentication",
      "Full CRUD task management",
      "Priority and due-date tracking",
      "Task filtering and sorting",
      "Responsive dashboard UI",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT Auth"],
    challenges: "Implementing secure authentication flows, managing complex task state, and building an intuitive filtering system.",
    learned: "JWT security best practices, complex state management patterns, and building production-ready CRUD applications.",
    links: null,
  },
];

const miniProjects = ["To Do List", "Rock Paper Scissors Game", "Colors App", "Notes API"];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 10 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card/95 backdrop-blur-sm border border-border p-6 md:p-8 card-shadow"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
      >
        <X size={18} />
      </button>

      <div className="h-1 w-full rounded-full mb-6" style={{ background: "var(--gradient-primary)" }} />

      <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.overview}</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-accent" />
            <span className="text-xs font-semibold text-accent tracking-wider uppercase">Problem</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wider uppercase">Solution</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-primary" />
          <span className="text-xs font-semibold text-primary tracking-wider uppercase">Key Features</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {project.features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground p-2 rounded-lg bg-secondary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Target size={14} className="text-primary" />
          <span className="text-xs font-semibold text-primary tracking-wider uppercase">Tech Stack</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-mono border border-primary/20">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-secondary/20 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Challenges</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.challenges}</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/20 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={14} className="text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">What I Learned</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.learned}</p>
        </div>
      </div>

      {project.links && (
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all glow">
            <ExternalLink size={14} /> Live Demo
          </a>
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all">
            <Github size={14} /> GitHub
          </a>
          {project.links.api && (
            <a href={project.links.api} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-muted-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all">
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
          className="mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-2">
            Projects
          </h3>
          <div className="h-1 w-16 rounded-full mb-4" style={{ background: "var(--gradient-primary)" }} />
          <p className="text-muted-foreground max-w-xl">
            Click on any project to explore the full story — from problem to solution.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setSelectedProject(project)}
              className="group rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/40 hover:shadow-[0_0_30px_hsl(160_84%_50%/0.1)] transition-all overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="h-1 w-full" style={{ background: "var(--gradient-primary)" }} />

              <div className="p-6 flex flex-col flex-1">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-md bg-primary/10 text-primary font-mono border border-primary/10">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[11px] px-2.5 py-1 rounded-md bg-secondary/50 text-muted-foreground font-mono">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-3 border-t border-border/50 text-xs text-primary/60 group-hover:text-primary transition-colors flex items-center gap-1">
                  <span>View details</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
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
          <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide">Other Projects</h4>
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
