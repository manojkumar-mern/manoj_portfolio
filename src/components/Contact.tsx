import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Github, Linkedin, Send, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    const mailtoLink = `mailto:vijaymanoj0000@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.name)} (${encodeURIComponent(form.email)})`;
    window.open(mailtoLink);
    toast({ title: "Opening email client..." });
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-card/50 backdrop-blur-sm border text-foreground placeholder:text-muted-foreground focus:outline-none transition-all text-sm ${
      focused === field
        ? "border-primary/50 ring-2 ring-primary/20 shadow-[0_0_15px_hsl(160_84%_50%/0.1)]"
        : "border-border hover:border-border"
    }`;

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-mono text-primary text-sm mb-2 tracking-wider">// contact</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            I'm currently open to new opportunities. Let's build something great together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Glass Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-border"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input
                id="name"
                type="text"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                placeholder="Your name"
                className={inputClass("name")}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="your@email.com"
                className={inputClass("email")}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                id="message"
                rows={5}
                maxLength={1000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Your message..."
                className={`${inputClass("message")} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all glow w-full justify-center text-sm"
            >
              Send Message
              <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {[
              { icon: MapPin, label: "Tamil Nadu, India", href: undefined },
              { icon: Phone, label: "+91 9159843416", href: "tel:+919159843416" },
              { icon: Mail, label: "vijaymanoj0000@gmail.com", href: "mailto:vijaymanoj0000@gmail.com" },
              { icon: Github, label: "github.com/manojkumar-mern", href: "https://github.com/manojkumar-mern" },
              { icon: Linkedin, label: "LinkedIn Profile", href: "https://linkedin.com/in/manoj-kumar-d-513253293" },
            ].map(({ icon: Icon, label, href }) => {
              const Wrapper = href ? "a" : "div";
              return (
                <Wrapper
                  key={label}
                  {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noopener noreferrer" : undefined } : {})}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
                </Wrapper>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
