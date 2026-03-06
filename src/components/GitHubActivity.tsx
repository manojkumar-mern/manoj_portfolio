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
    <section id="github" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-primary text-sm mb-2 tracking-wider">// github</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-12">
            GitHub <span className="text-gradient">Activity</span>
          </h3>
        </motion.div>

        <motion.a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-card border border-border hover:border-primary/40 transition-all mb-8 group"
        >
          <Github size={20} className="text-primary" />
          <span className="font-mono text-sm text-muted-foreground group-hover:text-primary transition-colors">
            github.com/{GITHUB_USERNAME}
          </span>
          <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.a>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all card-shadow text-center"
            >
              <stat.icon size={24} className="text-primary mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl bg-card border border-border p-4 card-shadow overflow-hidden"
        >
          <h4 className="font-mono text-primary text-sm mb-4">// contribution graph</h4>
          <img
            src={`https://ghchart.rshah.org/2dd4bf/${GITHUB_USERNAME}`}
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
