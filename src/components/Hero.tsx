import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Download, Github, Linkedin, Mail, Eye } from "lucide-react";
import FloatingIcons from "./FloatingIcons";
import HeroProfileImage from "./HeroProfileImage";

const HERO_NAME = "Manoj Kumar";
const HERO_ROLE = "MERN Stack Developer";
const SKILLS = ["JavaScript", "React", "Node", "Express", "MongoDB"];
const NAME_SPEED = 100;
const TYPE_SPEED = 85;
const DELETE_SPEED = 45;
const PAUSE_BEFORE_DELETE = 2000;
const PAUSE_BEFORE_TYPE = 500;

const useTypewriterLoop = (words: string[], enabled: boolean, typeSpeed = TYPE_SPEED, deleteSpeed = DELETE_SPEED) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const current = words[index];
    // Add slight randomness for natural feel
    const jitter = Math.random() * 30 - 15;
    const speed = isDeleting
      ? deleteSpeed + jitter * 0.5
      : text.length === 0 && !isDeleting
        ? PAUSE_BEFORE_TYPE
        : typeSpeed + jitter;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), PAUSE_BEFORE_DELETE);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, Math.max(speed, 20));
    return () => clearTimeout(timeout);
  }, [enabled, text, isDeleting, index, words, typeSpeed, deleteSpeed]);

  return text;
};

const Hero = () => {
  const [nameText, setNameText] = useState("");
  const [nameDone, setNameDone] = useState(false);
  const [roleText, setRoleText] = useState("");
  const [roleDone, setRoleDone] = useState(false);

  // Type name once
  useEffect(() => {
    if (nameText.length < HERO_NAME.length) {
      const jitter = Math.random() * 20 - 10;
      const t = setTimeout(() => setNameText(HERO_NAME.slice(0, nameText.length + 1)), NAME_SPEED + jitter);
      return () => clearTimeout(t);
    } else {
      setNameDone(true);
    }
  }, [nameText]);

  // Type role once after name finishes
  useEffect(() => {
    if (!nameDone) return;
    if (roleText.length < HERO_ROLE.length) {
      const jitter = Math.random() * 20 - 10;
      const t = setTimeout(() => setRoleText(HERO_ROLE.slice(0, roleText.length + 1)), TYPE_SPEED + jitter);
      return () => clearTimeout(t);
    } else {
      setRoleDone(true);
    }
  }, [nameDone, roleText]);

  const skillText = useTypewriterLoop(SKILLS, roleDone, 110, 55);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 md:pt-16 px-4 md:px-0">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <FloatingIcons />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none" style={{ background: "hsl(187 78% 53% / 0.04)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none" style={{ background: "hsl(160 64% 43% / 0.03)" }} />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-14 lg:gap-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 mb-6 premium-card glow-card"
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

            <motion.h1
              className="group/name text-4xl md:text-7xl font-extrabold mb-2 tracking-tight min-h-[1.2em] relative cursor-default"
              animate={nameDone ? {
                textShadow: [
                  "0 0 8px hsl(187 78% 53% / 0), 0 0 20px hsl(187 78% 53% / 0)",
                  "0 0 8px hsl(187 78% 53% / 0.15), 0 0 24px hsl(160 64% 43% / 0.1)",
                  "0 0 8px hsl(187 78% 53% / 0), 0 0 20px hsl(187 78% 53% / 0)",
                ],
              } : {}}
              transition={nameDone ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
            >
              <span className="relative inline-block">
                {nameText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`relative z-10 transition-[filter] duration-300 ${i >= 6 ? "text-gradient" : ""} group-hover/name:brightness-125`}
                  >
                    {char}
                  </motion.span>
                ))}
                {/* Gradient sweep overlay */}
                {nameDone && (
                  <span
                    className="pointer-events-none absolute inset-0 z-20 bg-[length:200%_100%] bg-clip-text opacity-0 group-hover/name:opacity-100 group-hover/name:animate-gradient-sweep transition-opacity duration-300"
                    style={{
                      backgroundImage: "linear-gradient(90deg, transparent 0%, hsl(187 78% 53% / 0.45) 40%, hsl(160 64% 50% / 0.55) 60%, transparent 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mixBlendMode: "screen",
                    }}
                    aria-hidden="true"
                  >
                    {nameText}
                  </span>
                )}
                {/* Neon glow behind text */}
                <span className="pointer-events-none absolute inset-0 -z-10 blur-xl opacity-0 group-hover/name:opacity-40 transition-opacity duration-500 bg-gradient-to-r from-primary/30 via-primary/50 to-secondary/30 rounded-full scale-y-150" aria-hidden="true" />
              </span>
              {!nameDone && (
                <span className="inline-block w-[3px] h-[0.8em] bg-primary/70 ml-1 align-middle" style={{ animation: "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite" }} />
              )}
            </motion.h1>

            <div className="text-base md:text-lg mb-4 min-h-[1.5em]">
              <span className="text-gradient font-semibold">{roleText}</span>
              {nameDone && !roleDone && (
                <span className="inline-block w-[2px] h-[0.8em] bg-primary/60 ml-0.5 align-middle" style={{ animation: "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite" }} />
              )}
            </div>

            <div className="mb-8 flex items-center justify-center gap-2 h-8">
              <span className="font-mono text-gradient text-lg font-semibold">{skillText}</span>
              {roleDone && (
                <span className="font-mono text-primary/60 text-lg" style={{ animation: "pulse 1s cubic-bezier(0.4,0,0.6,1) infinite" }}>|</span>
              )}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-base max-w-lg mx-auto mb-10 leading-relaxed"
            >
              I build high-performance, scalable web applications with modern
              technologies. Passionate about clean architecture, real-time systems,
              and delivering polished user experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-accent text-primary-foreground font-semibold text-sm hover:shadow-[0_0_24px_hsl(187_78%_53%/0.35)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300"
              >
                View Projects
                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/40 hover:text-primary hover:shadow-[0_0_18px_hsl(187_78%_53%/0.12)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                Contact Me
              </a>
              <a
                href="/resume.pdf#zoom=65"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:text-primary hover:border-primary/30 hover:shadow-[0_0_12px_hsl(187_78%_53%/0.08)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <Eye size={14} />
                View Resume
              </a>
              <a
                href="/resume.pdf"
                download="manoj_resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:text-primary hover:border-primary/30 hover:shadow-[0_0_12px_hsl(187_78%_53%/0.08)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <Download size={14} />
                Resume Download
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center gap-2"
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
                  className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_16px_hsl(187_78%_53%/0.2)] hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <HeroProfileImage />
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
