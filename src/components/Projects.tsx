import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Server, X, Lightbulb, Target, BookOpen, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  fadeUp, fadeRight, fadeLeft, staggerContainer, staggerItem, staggerItemScale, scaleIn,
  viewportConfig, prefersReducedMotion, noMotion,
} from "@/lib/motion";

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
    title: "Real-Time Chat Platform",
    description: "Full-stack real-time messaging platform with WebSocket communication and online user tracking.",
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
    title: "Social Media Feed Application",
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
    title: "Task Management Dashboard",
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

const miniProjects: { name: string; description: string; tech: string[] }[] = [
  { name: "To Do List", description: "A task management application with full CRUD functionality and persistent storage.", tech: ["React", "Local Storage"] },
  { name: "Rock Paper Scissors Game", description: "Classic game with animated UI, score tracking, and computer AI opponent.", tech: ["JavaScript", "CSS"] },
  { name: "Colors App", description: "Color palette generator and explorer with copy-to-clipboard functionality.", tech: ["React", "CSS"] },
  { name: "Notes API", description: "RESTful API for managing notes with CRUD endpoints and validation.", tech: ["Node.js", "Express", "MongoDB"] },
];

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.97, opacity: 0 }}
      transition={{ type: "spring", duration: 0.4 }}
      className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl bg-card border border-border card-shadow"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:shadow-[0_0_10px_hsl(187_78%_53%/0.15)] transition-all duration-300"
      >
        <X size={16} />
      </button>

      <div className="overflow-y-auto max-h-[85vh] p-6 md:p-8">
        <div className="h-0.5 w-full rounded-full bg-gradient-accent mb-6 opacity-30" />

        <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.overview}</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={13} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">Problem</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
          </div>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={13} className="text-primary" />
              <span className="text-xs font-medium text-primary tracking-wider uppercase">Solution</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Target size={13} className="text-primary" />
            <span className="text-xs font-medium text-primary tracking-wider uppercase">Key Features</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {project.features.map((f) => (
              <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground p-2 rounded-lg bg-muted/30">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-3 block">Tech Stack</span>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-md bg-muted border border-border text-muted-foreground font-mono hover:border-primary/20 hover:text-foreground transition-all duration-200">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={13} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">Challenges</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.challenges}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={13} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">What I Learned</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.learned}</p>
          </div>
        </div>

        {project.links && (
          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-accent text-primary-foreground font-medium text-sm hover:shadow-[0_0_20px_hsl(187_78%_53%/0.25)] hover:scale-[1.02] transition-all duration-300">
              <ExternalLink size={14} /> Live Demo
            </a>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/30 hover:text-primary hover:shadow-[0_0_12px_hsl(187_78%_53%/0.1)] transition-all duration-300">
              <Github size={14} /> GitHub
            </a>
            {project.links.api && (
              <a href={project.links.api} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:border-primary/30 hover:text-primary transition-all duration-300">
                <Server size={14} /> API
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
);


const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => { setReduced(prefersReducedMotion()); }, []);

  const v = <T extends object>(variant: T) => reduced ? noMotion : variant;

  return (
    <section id="projects" className="py-28">
      <div className="container">
        <motion.div
          variants={v(fadeRight)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Projects</h2>
          <div className="h-0.5 w-12 rounded-full bg-gradient-accent mb-4" />
          <p className="text-muted-foreground max-w-lg">
            Click on any project to explore the full story — from problem to solution.
          </p>
        </motion.div>

        {/* Featured Project */}
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          onClick={() => setSelectedProject(projects[0])}
          className="group relative rounded-2xl premium-card glow-card overflow-hidden mb-16 cursor-pointer"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Visual preview */}
            <div className="relative h-64 md:h-auto min-h-[280px] overflow-hidden bg-muted/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/10 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl md:text-8xl font-black text-foreground/[0.03] tracking-[0.2em] select-none transition-transform duration-700 group-hover:scale-105">
                  {projects[0].title.split(" ").map(w => w[0]).join("")}
                </span>
              </div>
              {/* Decorative floating elements */}
              <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-primary/15 border border-primary/20 text-primary text-[10px] font-semibold tracking-wider uppercase backdrop-blur-sm">
                ★ Featured Project
              </div>
              {/* Hover overlay with buttons */}
              <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                {projects[0].links && (
                  <>
                    <a
                      href={projects[0].links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-accent text-primary-foreground font-semibold text-sm hover:shadow-[0_0_24px_hsl(187_78%_53%/0.35)] hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                    <a
                      href={projects[0].links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border/80 bg-card/90 backdrop-blur-sm text-foreground font-semibold text-sm hover:border-primary/40 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <Github size={14} /> GitHub
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Right: Details */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-gradient transition-colors duration-300">
                {projects[0].title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {projects[0].overview}
              </p>

              <div className="space-y-2 mb-6">
                {projects[0].features.slice(0, 4).map((f, fi) => (
                  <motion.div
                    key={f}
                    variants={v(staggerItem)}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {projects[0].tech.map((t, ti) => (
                  <motion.span
                    key={t}
                    variants={v(staggerItemScale)}
                    className="text-xs px-3 py-1.5 rounded-md bg-muted border border-border text-muted-foreground font-mono group-hover:border-primary/20 group-hover:text-foreground transition-all duration-300"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects */}
        <motion.div
          variants={v(staggerContainer(0.12))}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid lg:grid-cols-2 gap-6 mb-16"
        >
          {projects.slice(1).map((project) => (
              <motion.div
                key={project.title}
                variants={v(staggerItem)}
                onClick={() => setSelectedProject(project)}
                className="group relative premium-card glow-card overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Preview banner with zoom + overlay */}
                <div className="relative h-36 overflow-hidden bg-muted/40">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-black text-foreground/[0.04] tracking-widest select-none transition-transform duration-500 group-hover:scale-110">
                      {project.title.split(" ").map(w => w[0]).join("")}
                    </span>
                  </div>
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Hover action buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                    {project.links ? (
                      <>
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-accent text-primary-foreground font-medium text-xs hover:shadow-[0_0_20px_hsl(187_78%_53%/0.3)] hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                          <ExternalLink size={12} /> Live Demo
                        </a>
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border/80 bg-card/90 backdrop-blur-sm text-foreground font-medium text-xs hover:border-primary/40 hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                          <Github size={12} /> GitHub
                        </a>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground font-medium px-4 py-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50">
                        Click for details
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gradient transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((t, idx) => (
                      <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-muted text-muted-foreground font-mono border border-border group-hover:border-primary/15 group-hover:text-foreground transition-all duration-300" style={{ transitionDelay: `${idx * 50}ms` }}>
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[11px] px-2 py-1 rounded-md bg-muted text-muted-foreground font-mono group-hover:text-foreground transition-all duration-300">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-border text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-1">
                    <span>View details</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-6"
        >
          <h4 className="text-base font-semibold text-foreground mb-5">Mini Projects</h4>
          <TooltipProvider delayDuration={200}>
            <motion.div
              variants={v(staggerContainer(0.06))}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {miniProjects.map((p) => (
                <motion.div key={p.name} variants={v(staggerItemScale)}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-block px-4 py-2 rounded-full bg-muted/60 border border-border text-sm text-muted-foreground cursor-default transition-all duration-300 hover:-translate-y-[2px] hover:border-primary/25 hover:text-foreground hover:shadow-[0_4px_16px_hsl(var(--primary)/0.1)]">
                        {p.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={8} className="max-w-xs bg-card border-border p-3 rounded-xl shadow-lg z-50">
                      <p className="text-sm font-medium text-foreground mb-1">{p.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.tech.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono border border-border">
                            {t}
                          </span>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </motion.div>
          </TooltipProvider>
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
