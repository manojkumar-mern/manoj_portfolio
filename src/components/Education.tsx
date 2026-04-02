import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Languages, Calendar } from "lucide-react";
import {
  fadeLeft, fadeUp, fadeRight, staggerContainer, staggerItem, staggerItemLeft, staggerItemRight, staggerItemScale,
  viewportConfig, prefersReducedMotion, noMotion,
} from "@/lib/motion";

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

const Education = memo(() => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => { setReduced(prefersReducedMotion()); }, []);

  const v = <T extends object>(variant: T) => reduced ? noMotion : variant;

  return (
    <section id="education" className="py-20 md:py-28 bg-muted/30 px-4 md:px-8">
      <div className="container">
        <motion.div
          variants={v(fadeLeft)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Education</h2>
          <div className="h-0.5 w-12 rounded-full bg-primary" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-2">
            <motion.div
              variants={v(fadeUp)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex items-center gap-2 mb-8"
            >
              <GraduationCap size={18} className="text-primary" />
              <h3 className="font-medium text-foreground">Academic Background</h3>
            </motion.div>

            <motion.div
              variants={v(staggerContainer(0.12))}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="relative pl-8 border-l border-border space-y-6 max-sm:pl-0 max-sm:border-l-0"
            >
              {education.map((e) => (
                <motion.div key={e.degree} variants={v(staggerItemLeft)} className="relative glow-card rounded-xl">
                  <div className="absolute -left-[calc(2rem+4px)] top-2 w-2 h-2 rounded-full bg-primary max-sm:hidden" />
                  <div className="p-5 premium-card">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                      <p className="font-medium text-foreground">{e.degree}</p>
                      <span className="text-xs font-mono text-primary bg-primary/8 px-2 py-1 rounded-md shrink-0 w-fit">
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
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              variants={v(fadeRight)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <div className="flex items-center gap-2 mb-4">
                <Award size={18} className="text-primary" />
                <h3 className="font-medium text-foreground">Certifications</h3>
              </div>
              <motion.div
                variants={v(staggerContainer(0.1))}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-2"
              >
                {certifications.map((c) => (
                  <motion.div
                    key={c}
                    variants={v(staggerItemRight)}
                    className="glow-card p-4 premium-card text-sm text-muted-foreground"
                  >
                    {c}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={v(fadeUp)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <div className="flex items-center gap-2 mb-4">
                <Languages size={18} className="text-primary" />
                <h3 className="font-medium text-foreground">Languages</h3>
              </div>
              <motion.div
                variants={v(staggerContainer(0.08))}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {languages.map((l) => (
                  <motion.span
                    key={l}
                    variants={v(staggerItemScale)}
                    className="glow-card px-4 py-2 premium-card text-sm text-muted-foreground"
                  >
                    {l}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

Education.displayName = "Education";
export default Education;
