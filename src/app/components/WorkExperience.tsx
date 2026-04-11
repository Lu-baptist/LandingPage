import { motion, useInView } from "motion/react";
import { useRef } from "react";

// ── Edite suas competências aqui ──
const SKILLS = [
  {
    role: ".NET / C#",
    company:
      "Aplicações robustas e escaláveis com foco em performance e arquitetura em camadas.",
    period: "Backend",
    color: "from-purple-500/10 to-purple-900/10",
    border: "hover:border-purple-500/30",
    glow: "from-purple-600 to-purple-400",
    icon: "dotnetcore",
  },
  {
    role: "Java",
    company:
      "Desenvolvimento orientado a objetos, APIs REST e aplicações corporativas.",
    period: "Backend",
    color: "from-red-500/10 to-orange-900/10",
    border: "hover:border-red-500/30",
    glow: "from-red-600 to-orange-400",
    icon: "java",
  },
  {
    role: "Python",
    company:
      "Automação, análise e visualização de dados com pandas, matplotlib e seaborn.",
    period: "Data & Automation",
    color: "from-blue-500/10 to-yellow-900/10",
    border: "hover:border-blue-400/30",
    glow: "from-blue-500 to-yellow-400",
    icon: "python",
  },
  {
    role: "JavaScript",
    company:
      "Lógica de frontend, manipulação do DOM e integração com APIs modernas.",
    period: "Frontend",
    color: "from-yellow-500/10 to-yellow-900/10",
    border: "hover:border-yellow-400/30",
    glow: "from-yellow-500 to-yellow-300",
    icon: "javascript",
  },
  {
    role: "TypeScript",
    company:
      "Tipagem estática para projetos escaláveis, reduzindo erros e aumentando produtividade.",
    period: "Frontend",
    color: "from-blue-600/10 to-blue-900/10",
    border: "hover:border-blue-500/30",
    glow: "from-blue-600 to-blue-400",
    icon: "typescript",
  },
  {
    role: "React",
    company:
      "Construção de interfaces modernas, componentização e gerenciamento de estado.",
    period: "Frontend",
    color: "from-cyan-500/10 to-blue-900/10",
    border: "hover:border-cyan-400/30",
    glow: "from-cyan-500 to-blue-500",
    icon: "react",
  },
  {
    role: "SQL",
    company:
      "Bancos relacionais, modelagem de dados e consultas otimizadas (DML e DDL).",
    period: "Database",
    color: "from-orange-500/10 to-orange-900/10",
    border: "hover:border-orange-400/30",
    glow: "from-orange-500 to-orange-300",
    icon: "azuresqldatabase",
  },
  {
    role: "Expo / React Native",
    company:
      "Desenvolvimento do app Snack — solução mobile com dados em tempo real.",
    period: "Mobile",
    color: "from-slate-500/10 to-slate-900/10",
    border: "hover:border-slate-400/30",
    glow: "from-slate-500 to-slate-400",
    icon: "reactnative",
  },
  {
    role: "UI/UX Design",
    company:
      "Design de interfaces e prototipação com foco em usabilidade e experiência do usuário.",
    period: "Design",
    color: "from-pink-500/10 to-rose-900/10",
    border: "hover:border-pink-400/30",
    glow: "from-pink-500 to-rose-400",
    icon: "figma",
  },
  {
    role: "Metodologias Ágeis",
    company:
      "Scrum e Kanban em ambientes colaborativos com entregas iterativas e comunicação eficiente.",
    period: "Processo",
    color: "from-green-500/10 to-emerald-900/10",
    border: "hover:border-green-400/30",
    glow: "from-green-500 to-emerald-400",
    icon: "jira",
  },
];

export function WorkExperience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="relative py-24 px-6">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Competências Técnicas
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className={`relative p-6 bg-white/5 border border-white/10 ${skill.border} rounded-2xl backdrop-blur-sm overflow-hidden transition-colors duration-500`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient overlay no hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative flex items-center gap-5">
                  {/* Ícone — mesmo tamanho que a imagem do Awards */}
                  <div className="w-16 h-16 flex-shrink-0 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                    <i
                      className={`devicon-${skill.icon}-plain`}
                      style={{
                        fontSize: "2rem",
                        color: "#ffffff",
                        filter: "drop-shadow(0 0 4px rgba(0,0,0,0.3))",
                      }}
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white/50 mb-2 uppercase tracking-wider">
                      {skill.period}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {skill.role}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {skill.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
