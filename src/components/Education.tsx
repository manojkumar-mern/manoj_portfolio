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
    <section id="education" className="py-28 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Education</h2>
          <div className="h-0.5 w-12 rounded-full bg-primary" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-14">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap size={18} className="text-primary" />
              <h3 className="font-medium text-foreground">Academic Background</h3>
            </div>
            <div className="relative pl-8 border-l border-border space-y-6">
              {education.map((e, i) => (
                <motion.div
                  key={e.degree}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[calc(2rem+4px)] top-2 w-2 h-2 rounded-full bg-primary" />
                  <div className="p-5 rounded-xl bg-card border border-border hover:border-primary/15 transition-all">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <p className="font-medium text-foreground">{e.degree}</p>
                      <span className="text-xs font-mono text-primary bg-primary/8 px-2 py-1 rounded-md shrink-0">
                        {e.score}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{e.school}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                      <Calendar size={11} />
                      {e.year}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Award size={18} className="text-primary" />
                <h3 className="font-medium text-foreground">Certifications</h3>
              </div>
              <div className="space-y-2">
                {certifications.map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="p-4 rounded-xl bg-card border border-border hover:border-primary/15 transition-all text-sm text-muted-foreground"
                  >
                    {c}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Languages size={18} className="text-primary" />
                <h3 className="font-medium text-foreground">Languages</h3>
              </div>
              <div className="flex gap-2">
                {languages.map((l) => (
                  <span
                    key={l}
                    className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:border-primary/15 transition-all"
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
