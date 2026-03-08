import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Download, Github, Linkedin, Mail, Eye } from "lucide-react";
import profileImg from "@/assets/profile.png";
import FloatingIcons from "./FloatingIcons";

const typingWords = ["React", "Node.js", "Express", "MongoDB", "JavaScript"];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typingWords[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), 1200);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % typingWords.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <FloatingIcons />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-primary text-xs tracking-wider">Available for opportunities</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-primary text-sm mb-3 tracking-wider"
            >
              Hello, I'm
            </motion.p>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-3 tracking-tight">
              Manoj <span className="text-gradient">Kumar</span> D
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center md:justify-start gap-2 mb-3"
            >
              <span className="h-px w-8 bg-primary/50" />
              <p className="font-mono text-primary text-base md:text-lg font-semibold">
                Full Stack Developer | MERN Stack Specialist
              </p>
              <span className="h-px w-8 bg-primary/50" />
            </motion.div>

            {/* Typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-5 flex items-center justify-center md:justify-start gap-2"
            >
              <span className="font-mono text-muted-foreground text-sm">{">"}</span>
              <span className="font-mono text-accent text-lg font-semibold">
                {text}
              </span>
              <span className="font-mono text-primary animate-pulse text-lg">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-lg max-w-xl mb-8 leading-relaxed"
            >
              I build high-performance, scalable web applications with modern
              technologies. Passionate about clean architecture, real-time systems,
              and delivering polished user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow text-sm"
              >
                View Projects
                <ExternalLink size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-border text-foreground font-semibold hover:border-primary/50 hover:text-primary transition-all text-sm"
              >
                Contact Me
              </a>
              <a
                href="/resume.pdf#zoom=65"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all text-sm"
              >
                <Eye size={15} />
                View
              </a>
              <a
                href="/resume.pdf"
                download="manoj_resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all text-sm"
              >
                <Download size={15} />
                Download
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center md:justify-start gap-3"
            >
              {[
                { icon: Github, href: "https://github.com/manojkumar-mern" },
                { icon: Linkedin, href: "https://linkedin.com/in/manoj-kumar-d-513253293" },
                { icon: Mail, href: "mailto:vijaymanoj0000@gmail.com" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:glow transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Photo with glowing rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/40 glow">
                <img
                  src={profileImg}
                  alt="Manoj Kumar D"
                  className="w-full h-full object-cover object-[center_20%] scale-90"
                />
              </div>
              {/* Animated glowing rings */}
              <div className="absolute -inset-2 rounded-full border border-primary/20 animate-pulse-glow" />
              <div className="absolute -inset-4 rounded-full border border-primary/10 animate-pulse-glow" style={{ animationDelay: "1s" }} />
              <div className="absolute -inset-6 rounded-full border border-primary/5 animate-pulse-glow" style={{ animationDelay: "2s" }} />
              {/* Corner accent dots */}
              <div className="absolute top-0 right-4 w-3 h-3 rounded-full bg-primary/60 blur-sm" />
              <div className="absolute bottom-4 left-0 w-2 h-2 rounded-full bg-accent/60 blur-sm" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors animate-bounce inline-block">
            <ArrowDown size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
