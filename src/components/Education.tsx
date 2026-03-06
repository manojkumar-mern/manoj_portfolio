import { motion } from "framer-motion";
import { GraduationCap, Award, Languages } from "lucide-react";

const education = [
  {
    degree: "B.Sc Computer Science",
    school: "Sengunthar Arts and Science College",
    year: "2021 – 2024",
    score: "86%",
  },
  {
    degree: "HSC (12th)",
    school: "AKV Matric Hr Sec School",
    year: "2020 – 2021",
    score: "93%",
  },
  {
    degree: "SSLC (10th)",
    school: "AKV Matric Hr Sec School",
    year: "2018 – 2019",
    score: "86%",
  },
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
        >
          <h2 className="font-mono text-primary text-sm mb-2 tracking-wider">// education & more</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-12">
            Background & <span className="text-gradient">Credentials</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={20} className="text-primary" />
              <h4 className="font-semibold text-lg text-foreground">Education</h4>
            </div>
            {education.map((e) => (
              <div
                key={e.degree}
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <p className="font-semibold text-foreground">{e.degree}</p>
                <p className="text-sm text-muted-foreground">{e.school}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground font-mono">{e.year}</span>
                  <span className="text-xs font-mono text-primary font-semibold">{e.score}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Award size={20} className="text-primary" />
              <h4 className="font-semibold text-lg text-foreground">Certifications</h4>
            </div>
            {certifications.map((c) => (
              <div
                key={c}
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <p className="text-sm text-muted-foreground">{c}</p>
              </div>
            ))}
          </motion.div>

          {/* Languages */}
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
                  className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground"
                >
                  {l}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
