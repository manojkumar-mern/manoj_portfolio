import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, AlertCircle, Lightbulb, Zap, BookOpen, Trophy } from "lucide-react";
import {
  fadeUp, fadeRight, staggerContainer, staggerItem,
  viewportConfig, prefersReducedMotion, noMotion,
} from "@/lib/motion";
import { type Project, featuredProjects, miniProjects } from "@/data/projects";

/* ── Case Study Section ── */
const CaseStudySection = memo(({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-5">
    <div className="flex items-center gap-2 mb-2">
      <Icon size={14} className="text-primary shrink-0" />
      <span className="text-xs font-semibold text-primary tracking-wider uppercase">
        {title}
      </span>
    </div>
    {children}
  </div>
));
CaseStudySection.displayName = "CaseStudySection";

const BulletList = memo(({ items }: { items: string[] }) => (
  <ul className="space-y-1.5 ml-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm leading-relaxed">
        <span className="text-primary mt-1.5 shrink-0 w-1 h-1 rounded-full bg-primary" />
        {item}
      </li>
    ))}
  </ul>
));
BulletList.displayName = "BulletList";

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
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    // Stop Lenis smooth scroll so modal can scroll natively
    document.documentElement.setAttribute("data-lenis-prevent", "");
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.removeAttribute("data-lenis-prevent");
    };
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
        className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl bg-card border border-border card-shadow overflow-hidden transform-gpu flex flex-col"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky close button */}
        <button
          onClick={onClose}
          className="sticky top-0 z-20 ml-auto mr-4 mt-4 mb-[-2.5rem] p-2 rounded-full bg-muted/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 shrink-0"
        >
          <X size={16} />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto overscroll-contain scroll-smooth flex-1">
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

            <CaseStudySection icon={AlertCircle} title="Problem Statement">
              <p className="text-muted-foreground text-sm leading-relaxed">{project.problem}</p>
            </CaseStudySection>

            <CaseStudySection icon={Lightbulb} title="Solution / Approach">
              <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
            </CaseStudySection>

            <CaseStudySection icon={Zap} title="Key Features">
              <BulletList items={project.features} />
            </CaseStudySection>

            <CaseStudySection icon={Trophy} title="Challenges Faced">
              <BulletList items={project.challenges} />
            </CaseStudySection>

            <CaseStudySection icon={BookOpen} title="What I Learned">
              <BulletList items={project.learnings} />
            </CaseStudySection>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-primary tracking-wider uppercase">
                  Tech Stack
                </span>
              </div>
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
          </div>
        </div>

        {/* Sticky bottom action buttons */}
        <div className="sticky bottom-0 z-20 flex flex-wrap gap-3 px-5 sm:px-6 md:px-8 py-4 border-t border-border bg-card/95 backdrop-blur-sm shrink-0">
          {project.demo && (
            <GlowButton href={project.demo} variant="primary">
              <ExternalLink size={14} /> Live Demo
            </GlowButton>
          )}
          <GlowButton href={project.github} variant="outline">
            <Github size={14} /> GitHub
          </GlowButton>
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
