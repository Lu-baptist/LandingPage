import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const softSkills = [
    { name: "Creative Thinking", level: 95 },
    { name: "Problem Solving", level: 90 },
    { name: "Team Leadership", level: 85 },
    { name: "Communication", level: 92 },
    { name: "Time Management", level: 88 },
  ];

  const hardSkills = [
    { name: "Figma", level: 98, color: "from-purple-500 to-pink-500" },
    { name: "Adobe XD", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "Photoshop", level: 90, color: "from-orange-500 to-yellow-500" },
    { name: "Illustrator", level: 88, color: "from-green-500 to-emerald-500" },
    { name: "Prototyping", level: 93, color: "from-red-500 to-rose-500" },
    { name: "HTML/CSS", level: 85, color: "from-indigo-500 to-purple-500" },
  ];

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl font-bold text-white mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Soft Skills */}
          <div>
            <motion.h3
              className="text-3xl font-bold text-white mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Soft Skills
            </motion.h3>

            <div className="space-y-6">
              {softSkills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-white/50">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{
                        duration: 1,
                        delay: 0.4 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hard Skills */}
          <div>
            <motion.h3
              className="text-3xl font-bold text-white mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Hard Skills
            </motion.h3>

            <div className="space-y-6">
              {hardSkills.map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-white/50">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{
                        duration: 1,
                        delay: 0.4 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
