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
    `w-full px-4 py-3 rounded-lg bg-muted/50 border text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all text-sm ${
      focused === field
        ? "border-primary/40 ring-1 ring-primary/15"
        : "border-border"
    }`;

  return (
    <section id="contact" className="py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Contact</h2>
          <div className="h-0.5 w-12 rounded-full bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            I'm currently open to new opportunities. Let's build something great together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 p-6 rounded-xl bg-card border border-border"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input id="name" type="text" maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Your name" className={inputClass("name")} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input id="email" type="email" maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="your@email.com" className={inputClass("email")} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea id="message" rows={5} maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Your message..." className={`${inputClass("message")} resize-none`} />
            </div>
            <button type="submit" className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-accent text-primary-foreground font-medium text-sm hover:shadow-[0_0_24px_hsl(187_78%_53%/0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full justify-center">
              Send Message
              <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
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
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/25 hover:-translate-y-0.5 hover:shadow-[0_0_15px_hsl(187_78%_53%/0.08)] transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-primary/8 group-hover:bg-primary/12 transition-colors">
                    <Icon size={15} className="text-primary" />
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
