import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import {
  fadeUp, fadeRight, staggerContainer, staggerItem,
  viewportConfig, prefersReducedMotion, noMotion,
} from "@/lib/motion";

interface Project {
  title: string;
  description: string;
  tech: string[];
  demo: string | null;
  github: string;
  image: string;
}

const featuredProjects: Project[] = [
  {
    title: "Real-Time Chat Application",
    description:
      "A real-time messaging application built with MERN stack and Socket.io. Users can send instant messages, see online status, and experience live communication using WebSockets.",
    tech: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    demo: "https://chat-app-manoj.vercel.app",
    github: "https://github.com/manojkumar-mern/chat-app",
    image: "/projects/chat-app.webp",
  },
  {
    title: "Postly – Social Media Feed",
    description:
      "A full-stack social media style feed where users can create posts and view posts dynamically. Built with React and REST APIs with MongoDB backend.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    demo: "https://postly-react.vercel.app",
    github: "https://github.com/manojkumar-mern/postly",
    image: "/projects/postly.webp",
  },
  {
    title: "Task Manager Authentication",
    description:
      "A secure task management system with authentication. Users can register, login, and manage their tasks with protected routes and JWT authentication.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    demo: "https://task-manager-auth-mern.vercel.app",
    github: "https://github.com/manojkumar-mern/task-manager-auth",
    image: "/projects/task-manager.webp",
  },
];

const miniProjects: Project[] = [
  {
    title: "To-Do List Application",
    description:
      "A simple and responsive task tracking application where users can add, search, and manage daily tasks efficiently.",
    tech: ["JavaScript", "HTML", "CSS"],
    demo: "https://to-do-list-app-87.vercel.app",
    github: "https://github.com/manojkumar-mern/to-do-list",
    image: "/projects/todo-list.webp",
  },
  {
    title: "React Live Color Generator",
    description:
      "An interactive React application that generates colors dynamically and allows users to preview and save color combinations.",
    tech: ["React", "JavaScript", "CSS"],
    demo: "https://react-live-color.vercel.app",
    github: "https://github.com/manojkumar-mern/react-live-color",
    image: "/projects/color-generator.webp",
  },
  {
    title: "Rock Paper Scissors – Elite RPS Arena",
    description:
      "An interactive browser game with smooth animations and modern UI where users can play Rock Paper Scissors against the computer.",
    tech: ["JavaScript", "HTML", "CSS"],
    demo: "https://rock-paper-scissors-game-online.vercel.app",
    github: "https://github.com/manojkumar-mern/rock-paper-scissors-game",
    image: "/projects/rps-game.webp",
  },
  {
    title: "Notes API",
    description:
      "A RESTful API built with Node.js and Express for creating, updating, deleting, and retrieving notes with MongoDB database integration.",
    tech: ["Node.js", "Express.js", "MongoDB"],
    demo: "https://notes-api-mern.vercel.app",
    github: "https://github.com/manojkumar-mern/notes-api",
    image: "/projects/notes-api.webp",
  },
];

/* ── Glowing link button ── */
const GlowButton = memo(({
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
});
GlowButton.displayName = "GlowButton";

/* ── Project Detail Modal ── */
const ProjectModal = memo(({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
        className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-card border border-border card-shadow overflow-y-auto transform-gpu"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
        >
          <X size={16} />
        </button>

        <div className="h-48 sm:h-56 md:h-64 overflow-hidden bg-muted/30">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            width={800}
            height={450}
          />
        </div>

        <div className="p-5 sm:p-6 md:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
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
});
ProjectModal.displayName = "ProjectModal";

/* ── Featured Hero Card ── */
const HeroCard = memo(({
  project,
  reduced,
  onOpen,
}: {
  project: Project;
  reduced: boolean;
  onOpen: () => void;
}) => {
  const v = <T extends object>(variant: T) => (reduced ? noMotion : variant);
  return (
    <motion.div
      variants={v(fadeUp)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      onClick={onOpen}
      className="group relative rounded-2xl premium-card glow-card overflow-hidden mb-8 transform-gpu cursor-pointer"
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-48 sm:h-56 md:h-auto md:min-h-[260px] overflow-hidden bg-muted/30">
          <img
            src={project.image}
            alt={project.title}
            loading="eager"
            width={960}
            height={540}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-primary/15 border border-primary/20 text-primary text-[10px] font-semibold tracking-wider uppercase backdrop-blur-sm">
            ★ Featured
          </div>
        </div>

        <div className="p-5 sm:p-7 md:p-10 flex flex-col justify-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-gradient transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-md bg-muted border border-border text-muted-foreground font-mono group-hover:border-primary/20 group-hover:text-foreground transition-all duration-300"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 max-md:opacity-100 max-md:translate-y-0 opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
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
      </div>
    </motion.div>
  );
});
HeroCard.displayName = "HeroCard";

/* ── Featured Sub Card ── */
const FeaturedCard = memo(({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) => (
  <motion.div
    variants={staggerItem}
    onClick={onOpen}
    className="group relative premium-card glow-card overflow-hidden rounded-2xl flex flex-col transform-gpu cursor-pointer"
  >
    <div className="relative h-36 sm:h-44 overflow-hidden bg-muted/30">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        width={640}
        height={360}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent" />
    </div>

    <div className="p-4 sm:p-6 flex flex-col flex-1">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-gradient transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>
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
      <div className="flex flex-wrap gap-3 max-md:opacity-100 max-md:translate-y-0 opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
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
));
FeaturedCard.displayName = "FeaturedCard";

/* ── Mini Project Card ── */
const MiniCard = memo(({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) => (
  <motion.div
    variants={staggerItem}
    onClick={onOpen}
    className="group relative premium-card glow-card overflow-hidden rounded-xl flex flex-col cursor-pointer transform-gpu"
  >
    <div className="relative h-32 sm:h-36 overflow-hidden bg-muted/30">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        width={512}
        height={288}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-transparent to-transparent" />
    </div>

    <div className="p-3 sm:p-4 flex flex-col flex-1">
      <h4 className="text-sm font-semibold text-foreground mb-1 group-hover:text-gradient transition-colors duration-300">
        {project.title}
      </h4>
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tech.slice(0, 3).map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono border border-border"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-auto max-md:opacity-100 max-md:translate-y-0 opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-md bg-gradient-accent text-primary-foreground font-semibold transform-gpu hover:scale-105 transition-transform"
          >
            <ExternalLink size={12} /> Demo
          </a>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-md border border-border text-foreground font-semibold transform-gpu hover:scale-105 hover:border-primary/40 transition-all"
        >
          <Github size={12} /> GitHub
        </a>
      </div>
    </div>
  </motion.div>
));
MiniCard.displayName = "MiniCard";

/* ── Main Section ── */
const Projects = memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  const v = <T extends object>(variant: T) => (reduced ? noMotion : variant);
  const hero = featuredProjects[0];
  const subFeatured = featuredProjects.slice(1);

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
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Projects</h2>
          <div className="h-0.5 w-12 rounded-full bg-gradient-accent mb-4" />
          <p className="text-muted-foreground max-w-lg">
            Full-stack applications built with modern technologies.
          </p>
        </motion.div>

        {/* Hero project */}
        <HeroCard project={hero} reduced={reduced} onOpen={() => setSelectedProject(hero)} />

        {/* Sub-featured */}
        <motion.div
          variants={v(staggerContainer(0.15))}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-20"
        >
          {subFeatured.map((p) => (
            <FeaturedCard key={p.title} project={p} onOpen={() => setSelectedProject(p)} />
          ))}
        </motion.div>

        {/* Mini Projects Header */}
        <motion.div
          variants={v(fadeRight)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Mini Projects</h2>
          <div className="h-0.5 w-12 rounded-full bg-gradient-accent mb-4" />
          <p className="text-muted-foreground max-w-lg">
            Smaller experiments and utility tools.
          </p>
        </motion.div>

        {/* Mini Projects Grid */}
        <motion.div
          variants={v(staggerContainer(0.1))}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {miniProjects.map((p) => (
            <MiniCard
              key={p.title}
              project={p}
              onOpen={() => setSelectedProject(p)}
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
});

Projects.displayName = "Projects";
export default Projects;
