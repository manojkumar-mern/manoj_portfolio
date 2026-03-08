import { motion } from "framer-motion";
import { GraduationCap, Award, Languages, Calendar } from "lucide-react";

const education = [
  { degree: "B.Sc Computer Science", school: "Sengunthar Arts and Science College", year: "2021 – 2024", score: "86%" },
  { degree: "HSC (12th)", school: "AKV Matric Hr Sec School", year: "2020 – 2021", score: "93%" },
  { degree: "SSLC (10th)", school: "AKV Matric Hr Sec School", year: "2018 – 2019", score: "86%" },
];

const certifications = [
  "Internship (Python) – LiveWire Training Services Pvt Ltd",
  "Full Stack Development (MERN) and AI – NoviTech Pvt Ltd",
  "Python Programming – Besant Technologies",
];

const languages = ["English", "Tamil"];

const Education = () => {
  return (
    <section id="education" className="py-24 bg-card/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-2">
            Education
          </h3>
          <div className="h-1 w-16 rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap size={20} className="text-primary" />
              <h4 className="font-semibold text-lg text-foreground">Academic Background</h4>
            </div>
            <div className="relative pl-8 border-l-2 border-primary/20 space-y-8">
              {education.map((e, i) => (
                <motion.div
                  key={e.degree}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="absolute -left-[calc(2rem+5px)] top-1 w-3 h-3 rounded-full bg-primary" />
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="p-5 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="font-semibold text-foreground">{e.degree}</p>
                      <span className="text-xs font-mono text-primary font-semibold bg-primary/10 px-2.5 py-1 rounded-lg shrink-0 border border-primary/10">
                        {e.score}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{e.school}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                      <Calendar size={12} />
                      {e.year}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Award size={20} className="text-primary" />
                <h4 className="font-semibold text-lg text-foreground">Certifications</h4>
              </div>
              <div className="space-y-3">
                {certifications.map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all text-sm text-muted-foreground"
                  >
                    {c}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Languages size={20} className="text-primary" />
                <h4 className="font-semibold text-lg text-foreground">Languages</h4>
              </div>
              <div className="flex gap-3">
                {languages.map((l) => (
                  <span
                    key={l}
                    className="px-5 py-2.5 rounded-xl bg-card/80 backdrop-blur-sm border border-border text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-all"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
