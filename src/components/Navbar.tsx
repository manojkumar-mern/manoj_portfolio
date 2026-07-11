import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = links.map((l) => l.href.replace("#", "")).filter(Boolean);

const Navbar = memo(() => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrolledRef = useRef(false);
  const activeRef = useRef("");
  const rafScheduled = useRef(false);

  // Use a single passive scroll listener with rAF batching — no re-render unless value changes
  useEffect(() => {
    const update = () => {
      rafScheduled.current = false;

      const nowScrolled = window.scrollY > 20;
      if (nowScrolled !== scrolledRef.current) {
        scrolledRef.current = nowScrolled;
        setScrolled(nowScrolled);
      }

      let newActive = "";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          newActive = sectionIds[i];
          break;
        }
      }
      if (newActive !== activeRef.current) {
        activeRef.current = newActive;
        setActiveSection(newActive);
      }
    };

    const onScroll = () => {
      if (!rafScheduled.current) {
        rafScheduled.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <nav
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] md:max-w-3xl lg:max-w-5xl xl:max-w-[1280px] 2xl:max-w-[1200px] rounded-2xl transition-all duration-500 ease-premium border ${
        scrolled
          ? "bg-card/60 backdrop-blur-xl border-border/40 shadow-[0_8px_32px_hsl(0_0%_0%/0.35),0_0_0_1px_hsl(187_78%_53%/0.06)]"
          : "bg-card/30 backdrop-blur-md border-border/20 shadow-[0_4px_16px_hsl(0_0%_0%/0.2)]"
      }`}
    >
      <div className="flex items-center justify-between h-14 px-5 md:px-[10.65px] xl:px-[50.65px] 2xl:px-[10.65px]">
        <a
          href="#"
          aria-label="Home"
          className="flex items-center justify-center -ml-5 md:ml-0"
        >
        <img
          src="/logo.png"
          alt="Manoj Kumar Logo"
          className="h-20 w-20 object-contain transition-transform duration-300 hover:scale-105"
          width="80"
          height="80"
          decoding="async"
          fetchpriority="high"
        />
        </a>
        <div className="hidden md:flex items-center gap-1 md:mr-[5px]">
          {links.map((l) => {
            const isActive = l.href === "#" ? !activeSection : activeSection === l.href.replace("#", "");
            return (
              <a
                key={l.href + l.label}
                href={l.href}
                className={`relative text-sm px-3 py-2 rounded-md transition-all duration-300 ease-in-out group hover:-translate-y-[3px] active:scale-[0.96] transform-gpu ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_6px_hsl(187_78%_53%/0.4)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/8 rounded-md"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
                <span className="absolute bottom-0.5 left-1/2 right-1/2 h-[2px] rounded-full bg-gradient-accent group-hover:left-3 group-hover:right-3 transition-all duration-300 ease-in-out" />
              </a>
            );
          })}
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="md:hidden text-foreground p-2">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/30 bg-card/50 backdrop-blur-xl overflow-hidden rounded-b-2xl"
          >
            {links.map((l) => {
              const isActive = l.href === "#" ? !activeSection : activeSection === l.href.replace("#", "");
              return (
                <a
                  key={l.href + l.label}
                  href={l.href}
                  onClick={close}
                  className={`block px-6 py-3 text-sm transition-all duration-300 active:scale-[0.96] active:bg-primary/10 ${
                    isActive
                      ? "text-primary bg-primary/5 border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
