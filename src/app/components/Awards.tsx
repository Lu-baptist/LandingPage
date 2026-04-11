import { motion, useInView } from "motion/react";
import { useRef } from "react";
import nextLogo from "../../assets/logos/next.svg";
import nextPhoto from "../../assets/next_1.jpg";
import mitLogo from "../../assets/logos/mit.avif";
import mitPhoto from "../../assets/foto_mit.jpeg";

// ── Edite seus prêmios aqui ──
const AWARDS = [
  {
    title: "Premiação NEXT FIAP Festival",
    org: "NEXT FIAP Festival · Parceria B3",
    year: "08/11/2025",
    logo: nextLogo,
    photo: nextPhoto,
    link: "https://www.fiap.com.br/next/",
    color: "from-yellow-500/10 to-orange-900/10",
    border: "hover:border-yellow-500/30",
    description:
      "Projeto MoneyTown reconhecido como uma das melhores soluções acadêmicas do festival — app de educação financeira gamificada desenvolvido em parceria com a B3.",
  },
  {
    title: "MIT Hacking Medicine Brazil 2025",
    org: "MIT · Hospital Israelita Albert Einstein · Eretz.bio",
    year: "Setembro 2025",
    logo: mitLogo,
    photo: mitPhoto,
    link: "https://www.eretz.bio/mit-einstein/",
    color: "from-blue-500/10 to-indigo-900/10",
    border: "hover:border-blue-500/30",
    description:
      "Participação na primeira edição brasileira do hackathon global do MIT, colaborando em time multidisciplinar para prototipar soluções de saúde focadas em MASH e inflamação sistêmica cardiovascular.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Awards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="awards" ref={ref} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Premiações
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AWARDS.map((award, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
            >
              <motion.div
                className={`relative bg-white/5 border border-white/10 ${award.border} rounded-2xl backdrop-blur-sm overflow-hidden transition-colors duration-500`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Foto */}
                <div className="relative w-full h-72 overflow-hidden">
                  <img
                    src={award.photo}
                    alt={award.title}
                    className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                  />
                  {/* Fade bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                </div>

                {/* Conteúdo */}
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    {/* Logo */}
                    <div className="w-20 h-20 bg-white/10 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
                      <img
                        src={award.logo}
                        alt={award.org}
                        className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <span className="text-xs text-white/40 uppercase tracking-wider">
                      {award.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {award.title}
                  </h3>
                  <p className="text-white/50 text-sm mb-3">{award.org}</p>
                  <p className="text-sm text-white/40 leading-relaxed mb-5">
                    {award.description}
                  </p>

                  {/* Link */}
                  {award.link && (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 hover:text-white transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ver evento ↗
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
