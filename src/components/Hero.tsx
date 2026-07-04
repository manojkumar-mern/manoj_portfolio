import { useState, useEffect, useRef } from "react";
import { ArrowDown, ExternalLink, Download, Github, Linkedin, Mail, Eye } from "lucide-react";
import FloatingIcons from "./FloatingIcons";
import HeroProfileImage from "./HeroProfileImage";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/hooks/use-gsap";

const HERO_NAME = "Manoj Kumar";
const NAME_CHARS = HERO_NAME.split("");
const HERO_ROLE = "MERN Stack Developer";
const SKILLS = ["JavaScript", "HTML", "CSS", "React.js", "Express.js", "Node.js", "MongoDB", "Tailwind CSS", "Git"];

const TYPE_SPEED = 85;
const DELETE_SPEED = 45;
const PAUSE_BEFORE_DELETE = 2000;

const useTypewriterLoop = (
  words: string[],
  enabled: boolean,
  typeSpeed = TYPE_SPEED,
  deleteSpeed = DELETE_SPEED,
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

const Hero = () => {
  const [nameDone, setNameDone] = useState(false);
  const [roleText, setRoleText] = useState("");
  const [roleDone, setRoleDone] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameWrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!nameDone) return;
    if (roleText.length < HERO_ROLE.length) {
      const t = setTimeout(() => setRoleText(HERO_ROLE.slice(0, roleText.length + 1)), TYPE_SPEED);
      return () => clearTimeout(t);
    } else {
      setRoleDone(true);
    }
  }, [nameDone, roleText]);

  const skillText = useTypewriterLoop(SKILLS, roleDone, 110, 55);

  /* ---- GSAP entrance choreography + scroll storytelling ---- */
  useGsap(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-hero-reveal], [data-hero-reveal] > *", {
        opacity: 1,
        y: 0,
        scale: 1,
        visibility: "visible",
        clearProps: "transform",
      });
      // Set final characters immediately for reduced motion.
      const chars = nameWrapRef.current?.querySelectorAll<HTMLSpanElement>("[data-name-char]");
      chars?.forEach((el, i) => {
        el.textContent = NAME_CHARS[i];
      });
      setNameDone(true);
      return;
    }

    const targets = gsap.utils.toArray<HTMLElement>("[data-hero-reveal]");
    const childTargets = gsap.utils.toArray<HTMLElement>(
      '[data-hero-reveal="ctas"] > *, [data-hero-reveal="socials"] > *',
    );
    // Baseline: keep everything visible/scale:1; only opacity + y animate.
    gsap.set([...targets, ...childTargets], {
      visibility: "visible",
      scale: 1,
      willChange: "opacity, transform",
    });
    gsap.set(targets, { opacity: 0, y: 24 });
    gsap.set(childTargets, { opacity: 0, y: 12 });

    // Guarantees the final resting state no matter what interrupts the timeline.
    const forceFinalState = () => {
      gsap.set([...targets, ...childTargets], {
        opacity: 1,
        y: 0,
        scale: 1,
        visibility: "visible",
        clearProps: "transform,willChange",
      });
    };

    const tl = gsap.timeline({
      delay: 0.15,
      defaults: { ease: "power3.out", duration: 0.9 },
      onComplete: forceFinalState,
      onInterrupt: forceFinalState,
    });
    tl.addLabel("start")
      .to('[data-hero-reveal="badge"]', { opacity: 1, y: 0, duration: 0.7 }, "start")
      .addLabel("greeting", "-=0.45")
      .to('[data-hero-reveal="greeting"]', { opacity: 1, y: 0, duration: 0.6 }, "greeting")
      .addLabel("name", "-=0.35")
      .to('[data-hero-reveal="name"]', { opacity: 1, y: 0 }, "name")
      .addLabel("role", "-=0.55")
      .to('[data-hero-reveal="role"]', { opacity: 1, y: 0 }, "role")
      .addLabel("skill", "-=0.55")
      .to('[data-hero-reveal="skill"]', { opacity: 1, y: 0 }, "skill")
      .addLabel("desc", "-=0.55")
      .to('[data-hero-reveal="desc"]', { opacity: 1, y: 0 }, "desc")
      .addLabel("ctas", "-=0.55")
      .to('[data-hero-reveal="ctas"]', { opacity: 1, y: 0, duration: 0.5 }, "ctas")
      .to(
        '[data-hero-reveal="ctas"] > *',
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 },
        "ctas",
      )
      .addLabel("socials", "-=0.45")
      .to('[data-hero-reveal="socials"]', { opacity: 1, y: 0, duration: 0.5 }, "socials")
      .to(
        '[data-hero-reveal="socials"] > *',
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.5 },
        "socials",
      )
      .addLabel("scroll", "-=0.3")
      .to('[data-hero-reveal="scroll"]', { opacity: 1, y: 0, duration: 0.6 }, "scroll");

    // Safety net: if the tab is hidden mid-animation or GSAP is throttled,
    // still land on the final state after the timeline's total duration.
    // delayedCall is registered in the gsap.context and reverts on unmount.
    gsap.delayedCall(tl.duration() + 0.5, forceFinalState);

    /* ---- Name stagger reveal — clean left-to-right character fade ---- */
    const nameChars = nameWrapRef.current
      ? Array.from(
          nameWrapRef.current.querySelectorAll<HTMLSpanElement>("[data-name-char]"),
        )
      : [];

    if (nameChars.length) {
      gsap.set(nameChars, { opacity: 0, y: 14 });

      const nameTl = gsap.timeline({
        delay: 0.55,
        onComplete: () => setNameDone(true),
      });

      nameTl.to(nameChars, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: "power3.out",
        clearProps: "transform",
      });
    }

    /* Ambient background drift — infinite, very subtle. */
    gsap.utils.toArray<HTMLElement>("[data-hero-blob]").forEach((el, i) => {
      gsap.to(el, {
        xPercent: i % 2 === 0 ? 8 : -8,
        yPercent: i % 2 === 0 ? -6 : 6,
        duration: 14 + i * 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    /* Scroll storytelling — hero lifts + fades so next section blends in. */
    if (contentRef.current && rootRef.current) {
      gsap.to(contentRef.current, {
        yPercent: -12,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    ScrollTrigger.refresh();
  }, { scope: rootRef, deps: [] });

  return (
    <section
      ref={rootRef}
      className="relative min-h-[auto] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 md:pt-16 md:pb-0 px-4 md:px-0 render-layer"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <FloatingIcons />

      <div
        data-hero-blob
        className="absolute top-1/3 left-1/3 w-[320px] h-[320px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "hsl(187 78% 53% / 0.04)" }}
      />
      <div
        data-hero-blob
        className="absolute bottom-1/4 right-1/4 w-[260px] h-[260px] rounded-full blur-[110px] pointer-events-none"
        style={{ background: "hsl(160 64% 43% / 0.03)" }}
      />

      <div ref={contentRef} className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 lg:gap-20 max-w-5xl mx-auto">
          <div className="flex-1 text-center">
            <div
              data-hero-reveal="badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 mb-6 premium-card glow-card"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-muted-foreground text-xs tracking-wider">
                Available for opportunities
              </span>
            </div>

            <p data-hero-reveal="greeting" className="font-mono text-muted-foreground text-sm mb-3 tracking-wider">
              Hello, I'm
            </p>

            <h1 data-hero-reveal="name" className="text-4xl md:text-7xl font-extrabold mb-2 tracking-tight min-h-[1.2em]">
              <span
                ref={nameWrapRef}
                className="relative inline-block align-baseline [overflow-x:hidden] [overflow-y:visible] pb-[0.05em]"
                aria-label={HERO_NAME}
              >
                {NAME_CHARS.map((char, i) => (
                  <span
                    key={i}
                    data-name-char
                    aria-hidden="true"
                    className={`inline-block will-change-transform ${i >= 6 ? "text-gradient" : ""}`}
                    style={{ whiteSpace: char === " " ? "pre" : undefined }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              {!nameDone && (
                <span className="inline-block w-[3px] h-[0.8em] bg-primary/70 ml-1 align-middle animate-pulse" />
              )}
              <span className="sr-only"> — MERN Stack Developer</span>
            </h1>

            <div data-hero-reveal="role" className="text-base md:text-lg mb-4 min-h-[1.5em]">
              <span className="text-gradient font-semibold">{roleText}</span>
              {nameDone && !roleDone && (
                <span className="inline-block w-[2px] h-[0.8em] bg-primary/60 ml-0.5 align-middle animate-pulse" />
              )}
            </div>

            <div data-hero-reveal="skill" className="mb-8 flex items-center justify-center gap-2 h-8">
              <span className="font-mono text-gradient text-lg font-semibold">{skillText}</span>
              {roleDone && (
                <span className="font-mono text-primary/60 text-lg animate-pulse">|</span>
              )}
            </div>

            <p data-hero-reveal="desc" className="text-muted-foreground text-base max-w-lg mx-auto mb-10 leading-relaxed">
              I build high-performance, scalable web applications with modern
              technologies. Passionate about clean architecture, real-time systems,
              and delivering polished user experiences.
            </p>

            <div data-hero-reveal="ctas" className="flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center justify-center gap-3 mb-8 w-full">
              <a
                href="#projects"
                className="hero-cta hero-cta--primary group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-accent text-primary-foreground font-semibold text-sm w-full md:w-auto"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  View Projects
                  <ExternalLink size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                </span>
              </a>

              <a
                href="#contact"
                className="hero-cta hero-cta--ghost group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm w-full md:w-auto"
              >
                <span className="relative z-10">Contact Me</span>
              </a>

              <a
                href="/resume.pdf#zoom=65"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta hero-cta--ghost group relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm w-full md:w-auto"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <Eye size={14} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
                  View Resume
                </span>
              </a>

              <a
                href="/resume.pdf"
                download="manoj_resume.pdf"
                className="hero-cta hero-cta--ghost group relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted-foreground font-medium text-sm w-full md:w-auto"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <Download size={14} className="transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
                  Resume Download
                </span>
              </a>
            </div>

            <div data-hero-reveal="socials" className="flex items-center justify-center gap-2">
              {[
                { icon: Github, href: "https://github.com/manojkumar-mern", label: "GitHub Profile" },
                { icon: Linkedin, href: "https://linkedin.com/in/manoj-kumar-d-513253293", label: "LinkedIn Profile" },
                { icon: Mail, href: "mailto:vijaymanoj0000@gmail.com", label: "Send Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:scale-105 transition-all duration-300"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <HeroProfileImage />
        </div>

        <div
          data-hero-reveal="scroll"
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="group relative flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="relative flex h-9 w-6 items-center justify-center rounded-full border border-border/70 group-hover:border-primary/50 transition-colors">
              <span className="absolute top-2 h-1.5 w-[3px] rounded-full bg-current animate-[scroll-dot_1.8s_ease-in-out_infinite]" />
            </span>
            <ArrowDown size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
