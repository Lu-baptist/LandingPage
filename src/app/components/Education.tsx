import { motion, useInView } from "motion/react";
import { useRef } from "react";
import fiapLogo from "../../assets/logos/fiap.png";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" ref={ref} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Educação
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.div
            className="relative p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden group"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-rose-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center gap-6">
              {/* Logo FIAP */}
              <div className="w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center bg-white/5">
                <img
                  src={fiapLogo}
                  alt="FIAP"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Conteúdo */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Engenharia de Software
                  </h3>
                  <span className="text-white/40 text-sm uppercase tracking-wider">
                    2022 — 07/2026
                  </span>
                </div>
                <p className="text-white/60 text-lg mb-1">FIAP</p>
                <p className="text-white/40 text-sm">
                  Previsão de conclusão: julho de 2026
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
