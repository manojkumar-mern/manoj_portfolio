import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Download, Github, Linkedin, Mail, Eye } from "lucide-react";
import profileImg from "@/assets/profile.png";
import FloatingIcons from "./FloatingIcons";

const typingWords = ["React", "Node.js", "MongoDB", "Express", "Socket.io", "TypeScript"];

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

      {/* Floating tech icons */}
      <FloatingIcons />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-primary text-sm mb-4 tracking-wider"
            >
              Hello, I'm
            </motion.p>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
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
                MERN Stack Developer
              </p>
              <span className="h-px w-8 bg-primary/50" />
            </motion.div>

            {/* Typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6 flex items-center justify-center md:justify-start gap-2"
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
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
            >
              MERN Stack Developer skilled in building scalable web applications using React, Node.js,
              Express, and MongoDB.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-6"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow"
              >
                View Projects
                <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-border text-foreground font-semibold hover:border-primary/50 hover:text-primary transition-all"
              >
                Contact Me
              </a>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf#zoom=65"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all"
                >
                  <Eye size={16} />
                  View
                </a>
                <a
                  href="/resume.pdf"
                  download="manoj_resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all"
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center md:justify-start gap-4"
            >
              <a href="https://github.com/manojkumar-mern" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:glow transition-all">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/manoj-kumar-d-513253293" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:glow transition-all">
                <Linkedin size={20} />
              </a>
              <a href="mailto:vijaymanoj0000@gmail.com" className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:glow transition-all">
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/30 glow">
                <img
                  src={profileImg}
                  alt="Manoj Kumar D"
                  className="w-full h-full object-cover object-[center_30%]"
                />
              </div>
              <div className="absolute -inset-2 rounded-full border border-primary/10 animate-pulse-glow" />
              <div className="absolute -inset-4 rounded-full border border-primary/5 animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
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
