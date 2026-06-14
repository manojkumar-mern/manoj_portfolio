import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, GitCommit, Star, GitFork, X } from "lucide-react";
import {
  fadeUp, fadeLeft, staggerContainer, staggerItem, scaleIn,
  viewportConfig, prefersReducedMotion, noMotion,
} from "@/lib/motion";

const GITHUB_USERNAME = "manojkumar-mern";

type StatKind = "repos" | "commits" | "since";
const stats: { icon: typeof GitCommit; label: string; value: string; kind: StatKind }[] = [
  { icon: GitCommit, label: "Repositories", value: "10+", kind: "repos" },
  { icon: Star, label: "Commits", value: "500+", kind: "commits" },
  { icon: GitFork, label: "Active Since", value: "2022", kind: "since" },
];

const REPOS_URL = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;

/* ── Stat Modal ── */
const StatModal = memo(({
  kind,
  onClose,
}: {
  kind: "commits" | "since";
  onClose: () => void;
}) => {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.setAttribute("data-lenis-prevent", "");
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.removeAttribute("data-lenis-prevent");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const isCommits = kind === "commits";
  const title = isCommits ? "Commits & Activity" : "GitHub Journey";
  const headlineValue = isCommits ? "500+" : "2022";
  const headlineLabel = isCommits ? "Total commits" : "Active since";
  const description = isCommits
    ? "Consistent, active development across personal and open-source projects. Regular commits reflect an ongoing focus on shipping, refactoring, and learning in public."
    : "Coding on GitHub since 2022. Started with frontend fundamentals, grew into full-stack MERN development, and continue to ship side projects, experiments, and contributions.";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
        className="relative w-full max-w-xl max-h-[90vh] rounded-2xl bg-card border border-border card-shadow overflow-hidden transform-gpu flex flex-col"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-muted/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
        >
          <X size={16} />
        </button>

        <div className="overflow-y-auto overscroll-contain flex-1 p-5 sm:p-7 md:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 pr-10">{title}</h3>
          <div className="h-0.5 w-10 rounded-full bg-primary mb-5" />

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl sm:text-4xl font-bold text-gradient">{headlineValue}</span>
            <span className="text-sm text-muted-foreground">{headlineLabel}</span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{description}</p>

          <div className="rounded-lg border border-border bg-muted/30 p-3 overflow-hidden">
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">
              Contribution Graph
            </p>
            <img
              src={`https://ghchart.rshah.org/22d3ee/${GITHUB_USERNAME}`}
              alt="GitHub Contribution Graph"
              className="w-full rounded-md"
              loading="lazy"
            />
          </div>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-lg border border-border text-foreground text-sm font-semibold hover:border-primary/40 hover:text-primary transition-all"
          >
            <Github size={14} /> View GitHub Profile
            <ExternalLink size={12} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
});
StatModal.displayName = "StatModal";

const GitHubActivity = memo(() => {
  const [reduced, setReduced] = useState(false);
  const [openModal, setOpenModal] = useState<"commits" | "since" | null>(null);
  useEffect(() => { setReduced(prefersReducedMotion()); }, []);

  const v = <T extends object>(variant: T) => reduced ? noMotion : variant;

  return (
    <section id="github" className="py-16 md:py-28 px-4 md:px-8">
      <div className="container">
        <motion.div
          variants={v(fadeLeft)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">GitHub</h2>
          <div className="h-0.5 w-12 rounded-full bg-primary" />
        </motion.div>

        <motion.a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/20 transition-all mb-10 group max-w-full"
        >
          <Github size={18} className="text-primary flex-shrink-0" />
          <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors truncate">
            github.com/{GITHUB_USERNAME}
          </span>
          <ExternalLink size={13} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
        </motion.a>

        <motion.div
          variants={v(staggerContainer(0.1))}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {stats.map((stat) => {
            const inner = (
              <>
                <stat.icon size={22} className="text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </>
            );
            const cls = "p-5 premium-card glow-card text-center cursor-pointer block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";
            if (stat.kind === "repos") {
              return (
                <motion.a
                  key={stat.label}
                  href={REPOS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={v(staggerItem)}
                  className={cls}
                  aria-label="View GitHub repositories"
                >
                  {inner}
                </motion.a>
              );
            }
            return (
              <motion.button
                key={stat.label}
                type="button"
                onClick={() => setOpenModal(stat.kind as "commits" | "since")}
                variants={v(staggerItem)}
                className={cls}
                aria-haspopup="dialog"
              >
                {inner}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          variants={v(scaleIn)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="premium-card glow-card p-5 overflow-hidden"
        >
          <h3 className="text-sm font-medium text-foreground mb-4">Contribution Graph</h3>
          <img
            src={`https://ghchart.rshah.org/22d3ee/${GITHUB_USERNAME}`}
            alt="GitHub Contribution Graph"
            className="w-full rounded-lg"
            loading="lazy"
            width={722}
            height={112}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {openModal && (
          <StatModal kind={openModal} onClose={() => setOpenModal(null)} />
        )}
      </AnimatePresence>
    </section>
  );
});

GitHubActivity.displayName = "GitHubActivity";
export default GitHubActivity;
