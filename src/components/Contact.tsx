import { motion } from "framer-motion";
import { Phone, Mail, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="font-mono text-primary text-sm mb-2 tracking-wider">// contact</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h3>
          <p className="text-muted-foreground mb-10">
            I'm currently looking for new opportunities. Feel free to reach out!
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <a
              href="tel:+91"
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <Phone size={18} className="text-primary" />
              <span className="text-sm text-muted-foreground">+91</span>
            </a>
            <a
              href="mailto:your-email@gmail.com"
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <Mail size={18} className="text-primary" />
              <span className="text-sm text-muted-foreground">your-email@gmail.com</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <Github size={18} className="text-primary" />
              <span className="text-sm text-muted-foreground">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <Linkedin size={18} className="text-primary" />
              <span className="text-sm text-muted-foreground">LinkedIn</span>
            </a>
          </div>

          <a
            href="mailto:your-email@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow"
          >
            Say Hello
            <Mail size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
