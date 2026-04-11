import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import profileLuana from "../assets/profile_luana.jpg";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { WorkExperience } from "./components/WorkExperience";
import { Works } from "./components/Works";
import { Awards } from "./components/Awards";
import { Education } from "./components/Education";
import { Contacts } from "./components/Contacts";
import { PillNav } from "./components/PillNav";
import { CompaniesMarquee } from "./components/CompaniesMarquee";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <div
      ref={containerRef}
      className="relative bg-black min-h-screen overflow-x-hidden"
    >
      {/* Background gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black" />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]"
          style={{ y: backgroundY }}
        />
      </motion.div>

      <div className="relative z-10">
        <PillNav />
        <Hero profileImage={profileLuana} />
        <CompaniesMarquee />
        <About />
        <WorkExperience />
        <Works />
        <Awards />
        <Education />
        <Contacts />
      </div>
    </div>
  );
}
