import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import {
  fadeUp, fadeRight, staggerContainer, staggerItem, staggerItemScale,
  viewportConfig, prefersReducedMotion, noMotion,
} from "@/lib/motion";

interface Project {
  title: string;
  description: string;
  tech: string[];
  demo: string | null;
  github: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Real-Time Chat Application",
    description:
      "A real-time messaging application built with MERN stack and Socket.io. Users can send instant messages, see online status, and experience live communication using WebSockets.",
    tech: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    demo: null,
    github: "https://github.com/manojkumar-mern/chat-app",
    featured: true,
  },
  {
    title: "Postly – Social Media Feed",
    description:
      "A full-stack social media style feed where users can create posts and view posts dynamically. Built with React and REST APIs with MongoDB backend.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    demo: "https://postly-react.vercel.app",
    github: "https://github.com/manojkumar-mern/postly",
  },
  {
    title: "Task Manager Authentication",
    description:
      "A secure task management system with authentication. Users can register, login, and manage their tasks with protected routes and JWT authentication.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    demo: "https://task-manager-auth-mern.vercel.app",
    github: "https://github.com/manojkumar-mern/task-manager-auth",
  },
  {
    title: "To-Do List Application",
    description:
      "A simple and responsive task tracking application where users can add, search, and manage daily tasks efficiently.",
    tech: ["JavaScript", "HTML", "CSS"],
    demo: "https://to-do-list-app-87.vercel.app",
    github: "https://github.com/manojkumar-mern/to-do-list",
  },
  {
    title: "Notes API",
    description:
      "A RESTful API built with Node.js and Express for creating, updating, deleting, and retrieving notes with MongoDB database integration.",
    tech: ["Node.js", "Express.js", "MongoDB"],
    demo: "https://notes-api-mern.vercel.app",
    github: "https://github.com/manojkumar-mern/notes-api",
  },
  {
    title: "React Live Color Generator",
    description:
      "An interactive React application that generates colors dynamically and allows users to preview and save color combinations.",
    tech: ["React", "JavaScript", "CSS"],
    demo: "https://react-live-color.vercel.app",
    github: "https://github.com/manojkumar-mern/react-live-color",
  },
  {
    title: "Rock Paper Scissors – Elite RPS Arena",
    description:
      "An interactive browser game with smooth animations and modern UI where users can play Rock Paper Scissors against the computer.",
    tech: ["JavaScript", "HTML", "CSS"],
    demo: "https://rock-paper-scissors-game-online.vercel.app",
    github: "https://github.com/manojkumar-mern/rock-paper-scissors-game",
  },
];

const featured = projects[0];
const otherProjects = projects.slice(1);

/* ── Glowing link button ── */
const GlowButton = ({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "outline";
  children: React.ReactNode;
}) => {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 active:scale-95 transform-gpu";
  const styles =
    variant === "primary"
      ? "bg-gradient-accent text-primary-foreground hover:shadow-[0_0_24px_hsl(187_78%_53%/0.35)] hover:scale-[1.04]"
      : "border border-border text-foreground hover:border-primary/40 hover:text-primary hover:shadow-[0_0_16px_hsl(187_78%_53%/0.12)] hover:scale-[1.04]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  );
};

/* ── Project Card ── */
const ProjectCard = ({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) => (
  <motion.div
    variants={staggerItem}
    onClick={onOpen}
    className="group relative premium-card glow-card overflow-hidden flex flex-col cursor-pointer transform-gpu will-change-transform"
  >
    {/* Visual header */}
    <div className="relative h-36 overflow-hidden bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-black text-foreground/[0.04] tracking-widest select-none transition-transform duration-500 group-hover:scale-110">
          {project.title
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gradient transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t, idx) => (
          <span
            key={t}
            className="text-[11px] px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-mono border border-border group-hover:border-primary/15 group-hover:text-foreground transition-all duration-300"
            style={{ transitionDelay: `${idx * 40}ms` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {project.demo && (
          <GlowButton href={project.demo} variant="primary">
            <ExternalLink size={14} /> Live Demo
          </GlowButton>
        )}
        <GlowButton href={project.github} variant="outline">
          <Github size={14} /> GitHub
        </GlowButton>
      </div>
    </div>
  </motion.div>
);

/* ── Modal ── */
const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.97, opacity: 0 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
      className="relative w-full max-w-lg rounded-2xl bg-card border border-border card-shadow transform-gpu will-change-transform"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
      >
        <X size={16} />
      </button>

      <div className="p-6 md:p-8">
        <div className="h-0.5 w-full rounded-full bg-gradient-accent mb-5 opacity-30" />
        <h3 className="text-2xl font-bold text-foreground mb-3">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="mb-6">
          <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-3 block">
            Tech Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-md bg-muted border border-border text-muted-foreground font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          {project.demo && (
            <GlowButton href={project.demo} variant="primary">
              <ExternalLink size={14} /> Live Demo
            </GlowButton>
          )}
          <GlowButton href={project.github} variant="outline">
            <Github size={14} /> GitHub
          </GlowButton>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

/* ── Main Section ── */
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  const v = <T extends object>(variant: T) => (reduced ? noMotion : variant);

  return (
    <section id="projects" className="py-20 md:py-28 overflow-x-hidden">
      <div className="container px-4 md:px-8">
        {/* Header */}
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
            Explore my projects — click any card for more details.
          </p>
        </motion.div>

        {/* Featured Project — large hero card */}
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          onClick={() => setSelectedProject(featured)}
          className="group relative rounded-2xl premium-card glow-card overflow-hidden mb-14 cursor-pointer transform-gpu will-change-transform"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left visual */}
            <div className="relative h-56 md:h-auto min-h-[260px] overflow-hidden bg-muted/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/10 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl md:text-8xl font-black text-foreground/[0.03] tracking-[0.2em] select-none transition-transform duration-700 group-hover:scale-105">
                  {featured.title
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>
              <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-primary/15 border border-primary/20 text-primary text-[10px] font-semibold tracking-wider uppercase backdrop-blur-sm">
                ★ Featured
              </div>
            </div>

            {/* Right content */}
            <div className="p-7 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-gradient transition-colors duration-300">
                {featured.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {featured.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {featured.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-md bg-muted border border-border text-muted-foreground font-mono group-hover:border-primary/20 group-hover:text-foreground transition-all duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {featured.demo && (
                  <GlowButton href={featured.demo} variant="primary">
                    <ExternalLink size={14} /> Live Demo
                  </GlowButton>
                )}
                <GlowButton href={featured.github} variant="outline">
                  <Github size={14} /> GitHub
                </GlowButton>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={v(staggerContainer(0.1))}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {otherProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
