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

/* ---------------- TYPEWRITER LOOP ---------------- */

const useTypewriterLoop = (
words: string[],
enabled: boolean,
typeSpeed = TYPE_SPEED,
deleteSpeed = DELETE_SPEED
) => {
const [index, setIndex] = useState(0);
const [text, setText] = useState("");
const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
if (!enabled) return;


const current = words[index];

const speed = isDeleting ? deleteSpeed : typeSpeed;

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
}, speed);

return () => clearTimeout(timeout);


}, [enabled, text, isDeleting, index, words, typeSpeed, deleteSpeed]);

return text;
};

/* ---------------- HERO COMPONENT ---------------- */

const Hero = () => {
const [nameText, setNameText] = useState("");
const [nameDone, setNameDone] = useState(false);

const [roleText, setRoleText] = useState("");
const [roleDone, setRoleDone] = useState(false);

/* Name typing */

useEffect(() => {
if (nameText.length < HERO_NAME.length) {
const t = setTimeout(
() => setNameText(HERO_NAME.slice(0, nameText.length + 1)),
NAME_SPEED
);


  return () => clearTimeout(t);
} else {
  setNameDone(true);
}


}, [nameText]);

/* Role typing */

useEffect(() => {
if (!nameDone) return;


if (roleText.length < HERO_ROLE.length) {
  const t = setTimeout(
    () => setRoleText(HERO_ROLE.slice(0, roleText.length + 1)),
    TYPE_SPEED
  );

  return () => clearTimeout(t);
} else {
  setRoleDone(true);
}


}, [nameDone, roleText]);

const skillText = useTypewriterLoop(SKILLS, roleDone, 110, 55);

return ( <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 md:pt-16 px-4 md:px-0 render-layer">


  {/* background grid */}

  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage:
        "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />

  <FloatingIcons />

  {/* ambient glow blobs (lighter version) */}

  <div
    className="absolute top-1/3 left-1/3 w-[320px] h-[320px] rounded-full blur-[120px] pointer-events-none"
    style={{ background: "hsl(187 78% 53% / 0.04)" }}
  />

  <div
    className="absolute bottom-1/4 right-1/4 w-[260px] h-[260px] rounded-full blur-[110px] pointer-events-none"
    style={{ background: "hsl(160 64% 43% / 0.03)" }}
  />

  <div className="container relative z-10">

    <div className="flex flex-col md:flex-row items-center justify-center gap-14 lg:gap-20 max-w-5xl mx-auto">

      {/* LEFT CONTENT */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 text-center"
      >

        {/* availability badge */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 mb-6 premium-card glow-card"
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-mono text-muted-foreground text-xs tracking-wider">
            Available for opportunities
          </span>
        </motion.div>

        <p className="font-mono text-muted-foreground text-sm mb-3 tracking-wider">
          Hello, I'm
        </p>

        {/* name */}

        <h1 className="text-4xl md:text-7xl font-extrabold mb-2 tracking-tight min-h-[1.2em]">

          {nameText.split("").map((char, i) => (
            <span
              key={i}
              className={`transition duration-300 ${
                i >= 6 ? "text-gradient" : ""
              }`}
            >
              {char}
            </span>
          ))}

          {!nameDone && (
            <span className="inline-block w-[3px] h-[0.8em] bg-primary/70 ml-1 align-middle animate-pulse" />
          )}
        </h1>

        {/* role */}

        <div className="text-base md:text-lg mb-4 min-h-[1.5em]">

          <span className="text-gradient font-semibold">
            {roleText}
          </span>

          {nameDone && !roleDone && (
            <span className="inline-block w-[2px] h-[0.8em] bg-primary/60 ml-0.5 align-middle animate-pulse" />
          )}
        </div>

        {/* skill loop */}

        <div className="mb-8 flex items-center justify-center gap-2 h-8">
          <span className="font-mono text-gradient text-lg font-semibold">
            {skillText}
          </span>

          {roleDone && (
            <span className="font-mono text-primary/60 text-lg animate-pulse">
              |
            </span>
          )}
        </div>

        {/* description */}

        <p className="text-muted-foreground text-base max-w-lg mx-auto mb-10 leading-relaxed">
          I build high-performance, scalable web applications with modern
          technologies. Passionate about clean architecture, real-time systems,
          and delivering polished user experiences.
        </p>

        {/* buttons */}

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">

          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-accent text-primary-foreground font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            View Projects
            <ExternalLink size={14} />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/40 hover:text-primary transition-all duration-300"
          >
            Contact Me
          </a>

          <a
            href="/resume.pdf#zoom=65"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:text-primary transition-all duration-300"
          >
            <Eye size={14} />
            View Resume
          </a>

          <a
            href="/resume.pdf"
            download="manoj_resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:text-primary transition-all duration-300"
          >
            <Download size={14} />
            Resume Download
          </a>

        </div>

        {/* social icons */}

        <div className="flex items-center justify-center gap-2">

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
              className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:scale-105 transition-all duration-300"
            >
              <Icon size={17} />
            </a>

          ))}

        </div>

      </motion.div>

      {/* profile image */}

      <HeroProfileImage />

    </div>

    {/* scroll arrow */}

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <a
        href="#about"
        className="text-muted-foreground hover:text-primary transition-colors animate-bounce inline-block"
      >
        <ArrowDown size={22} />
      </a>
    </motion.div>

  </div>
</section>


);
};

export default Hero;
