import { memo, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useGsap } from "@/hooks/use-gsap";
import { devicon } from "@/lib/devicons";
import { useIsMobile } from "@/hooks/use-mobile";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: devicon.react },
      { name: "HTML", icon: devicon.html5 },
      { name: "CSS", icon: devicon.css3 },
      { name: "Tailwind CSS", icon: devicon.tailwind },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: devicon.nodejs },
      { name: "Express.js", icon: devicon.express },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: devicon.mongodb },
      { name: "Mongoose", icon: devicon.mongoose },
    ],
  },
  {
    title: "Core",
    skills: [
      { name: "JavaScript", icon: devicon.javascript },
      { name: "TypeScript", icon: devicon.typescript },
      { name: "REST API", icon: "" },
      { name: "Socket.io", icon: devicon.socketio },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: devicon.git },
      { name: "GitHub", icon: devicon.github },
      { name: "Postman", icon: devicon.postman },
      { name: "Vercel", icon: devicon.vercel },
      { name: "Render", icon: "" },
    ],
  },
];

const Skills = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useGsap(() => {
    if (prefersReducedMotion()) {
      gsap.set("[data-skills-animate]", {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        visibility: "visible",
        clearProps: "transform,willChange",
      });
      return;
    }

    const headerEls = gsap.utils.toArray<HTMLElement>("[data-skills-header]");
    const cardEls = gsap.utils.toArray<HTMLElement>("[data-skills-card]");
    const chipEls = gsap.utils.toArray<HTMLElement>("[data-skills-chip]");

    const allEls = [...headerEls, ...cardEls, ...chipEls];

    gsap.set(allEls, {
      visibility: "visible",
      willChange: "opacity, transform",
    });
    gsap.set(headerEls, { opacity: 0, y: 20 });
    // Multi-directional assembly: each card enters from a different side
    // (left / right / top / bottom) with a short 20–40px travel distance.
    const directions: Array<{ x: number; y: number }> = [
      { x: -32, y: 0 },   // from left
      { x: 0, y: -28 },   // from top
      { x: 32, y: 0 },    // from right
      { x: 0, y: 32 },    // from bottom
      { x: -28, y: 0 },   // from left
      { x: 0, y: -32 },   // from top
      { x: 28, y: 0 },    // from right
      { x: 0, y: 28 },    // from bottom
    ];
    cardEls.forEach((el, i) => {
      const d = directions[i % directions.length];
      gsap.set(el, { opacity: 0, x: d.x, y: d.y });
    });
    gsap.set(chipEls, { opacity: 0, y: 12 });

    const forceFinalState = () => {
      gsap.set(allEls, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        visibility: "visible",
        clearProps: "transform,willChange",
      });
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
      defaults: { ease: "power4.out" },
      onComplete: forceFinalState,
      onInterrupt: forceFinalState,
    });

    tl.to(headerEls, { opacity: 1, y: 0, duration: 0.8 })
      .to(
        cardEls,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
        },
        "-=0.6"
      )
      .to(
        chipEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.035,
        },
        "-=0.65"
      );

    gsap.delayedCall(tl.duration() + 0.5, forceFinalState);
  }, { scope: sectionRef, deps: [isMobile] });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 md:py-28 bg-muted/20 px-4 md:px-8 overflow-x-hidden"
    >
      <div className="container">
        <div data-skills-header className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Skills</h2>
          <div className="h-0.5 w-12 rounded-full bg-gradient-accent mb-4" />
          <p className="text-muted-foreground max-w-lg">
            Technologies I use to build modern, scalable applications.
          </p>
        </div>

        {isMobile ? (
          <div className="skills-mobile-card">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                data-skills-card
                className="skills-mobile-category"
              >
                <h3 className="skills-mobile-title">{group.title}</h3>
                <div className="skills-mobile-grid">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      data-skills-chip
                      className="skills-mobile-chip premium-card"
                    >
                      {skill.icon ? (
                        <img
                          src={skill.icon}
                          alt={`${skill.name} Logo`}
                          className="w-4 h-4 object-contain shrink-0"
                          loading="lazy"
                          width={16}
                          height={16}
                        />
                      ) : (
                        <div className="w-4 h-4 rounded bg-primary/15 flex items-center justify-center text-primary text-[9px] font-bold shrink-0">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm text-muted-foreground truncate">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="skills-categories-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                data-skills-card
                className="skills-category-box rounded-2xl border border-border/40 bg-card/50 p-5 md:p-6 w-full"
              >
                <h3 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-2.5 md:mb-4">
                  {group.title}
                </h3>
                <div className="skills-items-grid grid grid-cols-2 gap-2 md:gap-2 [&>*:last-child:nth-child(odd)]:col-span-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      data-skills-chip
                      className="skill-item-card flex items-center gap-2 px-3 py-2 rounded-lg premium-card glow-card cursor-default group"
                    >
                      {skill.icon ? (
                        <img
                          src={skill.icon}
                          alt={`${skill.name} Logo`}
                          className="w-4 h-4 object-contain"
                          loading="lazy"
                          width={16}
                          height={16}
                        />
                      ) : (
                        <div className="w-4 h-4 rounded bg-primary/15 flex items-center justify-center text-primary text-[9px] font-bold">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

Skills.displayName = "Skills";
export default Skills;
