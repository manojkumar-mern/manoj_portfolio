import { motion } from "framer-motion";
import { Github, ExternalLink, GitCommit, Star, GitFork } from "lucide-react";

const GITHUB_USERNAME = "manojkumar-mern";

const stats = [
  { icon: GitCommit, label: "Repositories", value: "10+" },
  { icon: Star, label: "Contributions", value: "Active" },
  { icon: GitFork, label: "Open Source", value: "Contributor" },
];

const GitHubActivity = () => {
  return (
    <section id="github" className="py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">GitHub</h2>
          <div className="h-0.5 w-12 rounded-full bg-primary" />
        </motion.div>

        <motion.a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-card border border-border hover:border-primary/20 transition-all mb-10 group"
        >
          <Github size={18} className="text-primary" />
          <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            github.com/{GITHUB_USERNAME}
          </span>
          <ExternalLink size={13} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.a>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/15 transition-all text-center"
            >
              <stat.icon size={22} className="text-primary mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl bg-card border border-border p-5 overflow-hidden"
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
