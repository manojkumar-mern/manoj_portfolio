import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, GitCommit, Star, GitFork } from "lucide-react";
import {
  fadeUp, fadeLeft, staggerContainer, staggerItem, scaleIn,
  viewportConfig, prefersReducedMotion, noMotion,
} from "@/lib/motion";

const GITHUB_USERNAME = "manojkumar-mern";

const stats = [
  { icon: GitCommit, label: "Repositories", value: "10+" },
  { icon: Star, label: "Contributions", value: "Active" },
  { icon: GitFork, label: "Open Source", value: "Contributor" },
];

const GitHubActivity = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { setReduced(prefersReducedMotion()); }, []);

  const v = <T extends object>(variant: T) => reduced ? noMotion : variant;

  return (
    <section id="github" className="py-20 md:py-28 px-4 md:px-0">
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
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/20 transition-all mb-10 group"
        >
          <Github size={18} className="text-primary" />
          <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            github.com/{GITHUB_USERNAME}
          </span>
          <ExternalLink size={13} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.a>

        <motion.div
          variants={v(staggerContainer(0.1))}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-3 gap-4 mb-10"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={v(staggerItem)}
              className="p-5 premium-card glow-card text-center"
            >
              <stat.icon size={22} className="text-primary mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
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
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
