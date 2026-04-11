import { motion, useInView } from "motion/react";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
            Sobre
          </h2>

          <motion.p
            className="text-base md:text-lg text-white/65 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            Estudante de Engenharia de Software, em transição de carreira do
            setor de saúde para Tecnologia da Informação. No Hospital Israelita
            Albert Einstein, atuo no laboratório de Anatomia Patológica, onde
            implementei automações com Power Automate que otimizaram o controle
            de caixas de arquivos externos, agilizaram solicitações para
            aprovação de exames e melhoraram fluxos internos. Minha vivência em
            ambientes hospitalares de missão crítica, aliada a conhecimentos em
            JavaScript, TypeScript, React, Node.js e fundamentos de DevOps, me
            permite unir compreensão profunda dos processos da saúde com
            soluções tecnológicas seguras e eficientes.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
