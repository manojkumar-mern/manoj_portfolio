import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <a href="#" className="font-mono text-base font-bold text-gradient inline-block mb-2">
              {"<MK />"}
            </a>
            <p className="text-sm text-muted-foreground">
              Built with <Heart size={11} className="inline text-primary" /> using React & Tailwind
            </p>
          </div>
          <div className="flex items-center gap-3">
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
                className="p-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_14px_hsl(187_78%_53%/0.18)] hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Manoj Kumar D
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
