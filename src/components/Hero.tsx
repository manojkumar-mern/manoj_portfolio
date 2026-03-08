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
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <FloatingIcons />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[160px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-14 lg:gap-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-muted-foreground text-xs tracking-wider">Available for opportunities</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-muted-foreground text-sm mb-3 tracking-wider"
            >
              Hello, I'm
            </motion.p>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
              Manoj <span className="text-gradient">Kumar</span> D
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-base md:text-lg mb-4"
            >
              Full Stack Developer · MERN Stack Specialist
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 flex items-center justify-center md:justify-start gap-2 h-8"
            >
              <span className="font-mono text-primary text-lg font-semibold">{text}</span>
              <span className="font-mono text-primary/60 animate-pulse text-lg">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-base max-w-lg mb-10 leading-relaxed"
            >
              I build high-performance, scalable web applications with modern
              technologies. Passionate about clean architecture, real-time systems,
              and delivering polished user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
              >
                View Projects
                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/40 hover:text-primary transition-all"
              >
                Contact Me
              </a>
              <a
                href="/resume.pdf#zoom=65"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:text-primary hover:border-primary/30 transition-all"
              >
                <Eye size={14} />
                View Resume
              </a>
              <a
                href="/resume.pdf"
                download="manoj_resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:text-primary hover:border-primary/30 transition-all"
              >
                <Download size={14} />
                Download
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center md:justify-start gap-2"
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
                  className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border border-border">
                <img
                  src={profileImg}
                  alt="Manoj Kumar D"
                  className="w-full h-full object-cover object-center scale-[0.85]"
                />
              </div>
              <div className="absolute -inset-3 rounded-full border border-primary/10" />
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
            <ArrowDown size={22} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
