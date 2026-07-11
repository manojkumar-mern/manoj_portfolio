import { lazy, Suspense } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SmoothScroll from "@/components/SmoothScroll";
import DeferredSection from "@/components/DeferredSection";

// Lazy load below-fold sections
const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const GitHubActivity = lazy(() => import("@/components/GitHubActivity"));
const Education = lazy(() => import("@/components/Education"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => (
  <div className="py-20 md:py-28 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <Navbar />
        <Hero />
        
        <DeferredSection id="about" minHeight="450px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <About />
          </Suspense>
        </DeferredSection>

        <DeferredSection id="skills" minHeight="500px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>
        </DeferredSection>

        <DeferredSection id="projects" minHeight="800px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>
        </DeferredSection>

        <DeferredSection id="github" minHeight="400px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <GitHubActivity />
          </Suspense>
        </DeferredSection>

        <DeferredSection id="education" minHeight="600px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <Education />
          </Suspense>
        </DeferredSection>

        <DeferredSection id="contact" minHeight="650px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <Contact />
          </Suspense>
        </DeferredSection>

        <DeferredSection id="footer" minHeight="100px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <Footer />
          </Suspense>
        </DeferredSection>
      </div>
    </SmoothScroll>
  );
};

export default Index;
