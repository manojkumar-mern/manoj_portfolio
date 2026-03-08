import { useState, useEffect } from "react";
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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = links.map((l) => l.href.replace("#", "")).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50" : "bg-transparent"}`}>
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-mono text-base font-bold text-gradient">
          {"<MK />"}
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = l.href === "#" ? !activeSection : activeSection === l.href.replace("#", "");
            return (
              <a
                key={l.href + l.label}
                href={l.href}
                className={`relative text-sm px-3 py-2 rounded-md transition-all duration-300 ease-in-out group hover:-translate-y-[3px] active:scale-[0.96] ${
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
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-2">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
          >
            {links.map((l) => {
              const isActive = l.href === "#" ? !activeSection : activeSection === l.href.replace("#", "");
              return (
                <a
                  key={l.href + l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
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
};

export default Navbar;
