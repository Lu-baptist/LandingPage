import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import snackLogo from "../../assets/logos/snack_delivery.svg";
import logoMT from "../../assets/logos/logoMT.png";
import AlertaVida from "../../assets/logos/AlertaVida.png";
import GreenEnergy from "../../assets/logos/GreenEnergy.png";
import VinheriaAgnello from "../../assets/logos/VinheriaAgnello.png";

// ─────────────────────────────────────────────
//  Edite seus projetos aqui
//  demo: URL do projeto (opcional)
//  techs: lista de tecnologias usadas
//  details: parágrafos extras que aparecem no modal
// ─────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Snake Delivery",
    category: "Mobile App · React Native · Expo",
    year: "2025",
    description:
      "Aplicativo mobile de delivery desenvolvido com React Native e Expo, com foco em experiência do usuário, rastreamento em tempo real e integração com APIs de pagamento.",
    image: snackLogo,
    color: "from-green-500/20 to-emerald-900/20",
    border: "border-green-500/20 hover:border-green-500/40",
    wip: true,
    featured: true,
    demo: "https://snack-marketplace-delivery.vercel.app/",
    techs: ["React Native", "Expo", "TypeScript", "Node.js", "API REST"],
    details: [
      "O Snake Delivery é um aplicativo mobile de marketplace de delivery, desenvolvido com React Native e Expo, focado em oferecer uma experiência de compra fluida e intuitiva.",
      "O app conta com autenticação de usuários, listagem de produtos por categoria, carrinho de compras, rastreamento de pedidos em tempo real e integração com APIs de pagamento.",
      "O projeto foi construído seguindo boas práticas de arquitetura mobile, com componentização eficiente e foco em performance.",
    ],
  },
  {
    title: "MoneyTown",
    category: "Mobile App · React Native",
    year: "2025",
    description:
      "Educação financeira gamificada para todas as idades. Premiado no NEXT FIAP Festival, em parceria com a B3.",
    image: logoMT,
    isLogo: true,
    color: "from-yellow-500/15 to-orange-900/15",
    border: "border-yellow-500/20 hover:border-yellow-400/40",
    wip: true,
    featured: false,
    demo: "",
    techs: ["React Native", "Expo", "Firebase", "TypeScript"],
    details: [
      "O MoneyTown é uma experiência inovadora de educação financeira gamificada, projetada para todas as idades — desde jovens do ensino médio até aposentados que desejam aprender a investir.",
      "Possui Modo História, onde o jogador aprende sobre finanças de forma evolutiva, e Modo Personalizado, que adapta a experiência ao perfil financeiro do usuário.",
      "Premiado no NEXT FIAP Festival 2025, em parceria com a B3, como uma das melhores soluções acadêmicas da edição.",
    ],
  },
  {
    title: "AlertaVida",
    category: "Mobile App · React Native · IoT",
    year: "2025",
    description:
      "App colaborativo de prevenção e resposta a enchentes com sensores IoT, mapas em tempo real e alertas comunitários.",
    image: AlertaVida,
    isLogo: true,
    color: "from-blue-500/15 to-cyan-900/15",
    border: "border-blue-500/20 hover:border-blue-400/40",
    wip: true,
    featured: false,
    demo: "",
    techs: ["React Native", "Firebase", "MQTT", "IoT", "React Navigation"],
    details: [
      "O AlertaVida é um aplicativo colaborativo focado na prevenção e resposta rápida a enchentes em áreas urbanas.",
      "Combina IoT com sensores de monitoramento, mapas em tempo real e autenticação segura via Firebase, permitindo que usuários recebam alertas e compartilhem ocorrências.",
      "A proposta é facilitar a comunicação entre comunidade e autoridades, ajudando a salvar vidas e reduzir danos causados por enchentes.",
    ],
  },
  {
    title: "GreenEnergy",
    category: "Mobile App · Mobilidade Elétrica",
    year: "2024",
    description:
      "Aplicação de mobilidade elétrica com rotas otimizadas e localização de estações de recarga.",
    image: GreenEnergy,
    isLogo: true,
    color: "from-emerald-500/15 to-green-900/15",
    border: "border-emerald-500/20 hover:border-emerald-400/40",
    wip: false,
    featured: false,
    demo: "",
    techs: ["React Native", "Maps API", "Expo"],
    details: [
      "O GreenEnergy é uma aplicação focada na otimização da mobilidade elétrica, oferecendo rotas otimizadas para veículos elétricos e integração com localização de estações de recarga.",
      "O projeto visa incentivar o uso de veículos elétricos ao tornar mais fácil encontrar pontos de recarga próximos e planejar trajetos eficientes.",
    ],
  },
  {
    title: "VinheriaAgnello",
    category: "E-commerce · Web",
    year: "2024",
    description:
      "E-commerce de vinhos com experiência personalizada via quiz de preferências e perfil de usuário adaptativo.",
    image: VinheriaAgnello,
    isLogo: true,
    color: "from-purple-500/15 to-rose-900/15",
    border: "border-purple-500/20 hover:border-purple-400/40",
    wip: true,
    featured: false,
    demo: "",
    techs: ["React", "TypeScript", "Node.js", "SQL"],
    details: [
      "A VinheriaAgnello vai além de um simples e-commerce: proporciona uma verdadeira conexão entre o usuário e sua paixão por vinhos.",
      "Ao acessar a plataforma, o usuário é convidado a responder um quiz que define seu nível de experiência, gostos e objetivos — criando uma experiência de compra personalizada.",
      "Se o usuário se cadastrar, suas preferências ficam salvas para futuras interações, tornando cada visita mais relevante e personalizada.",
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

type Project = (typeof PROJECTS)[0];

// ── Modal ──
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Fecha com ESC
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[900] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-white/10 rounded-3xl p-8 z-10"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {/* Fechar */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors duration-200 text-white/60 hover:text-white"
          >
            ✕
          </button>

          {/* Imagem / placeholder */}
          <div className="w-full h-52 rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-6 flex items-center justify-center">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full transition-all duration-300 ${
                  project.isLogo
                    ? "object-contain p-8" // logo — com padding
                    : "object-cover" // foto — sem padding
                }`}
              />
            ) : (
              <span className="text-white/15 text-xs uppercase tracking-widest">
                Imagem em breve
              </span>
            )}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.wip && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/8 text-white/50 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse inline-block" />
                Em desenvolvimento
              </span>
            )}
            <span className="text-white/30 text-xs uppercase tracking-wider">
              {project.year}
            </span>
          </div>

          {/* Título */}
          <h3 className="text-3xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-white/35 uppercase tracking-wider mb-6">
            {project.category}
          </p>

          {/* Detalhes */}
          <div className="space-y-3 mb-6">
            {project.details.map((p, i) => (
              <p key={i} className="text-white/60 leading-relaxed text-sm">
                {p}
              </p>
            ))}
          </div>

          {/* Tecnologias */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/6 border border-white/10 text-white/50"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Botão demo */}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-white/90 transition-colors duration-200"
            >
              Acessar demo
              <span className="text-base">↗</span>
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Componente principal ──
export function Works() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = PROJECTS.find((p) => p.featured)!;
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="works" ref={ref} className="relative py-24 px-6">
      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}

      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Projetos
        </motion.h2>

        {/* ── DESTAQUE ── */}
        <motion.div
          className="relative group mb-10 cursor-pointer"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          onClick={() => setSelected(featured)}
        >
          <motion.div
            className={`relative p-8 md:p-12 bg-white/5 border ${featured.border} rounded-3xl backdrop-blur-sm overflow-hidden transition-colors duration-500`}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${featured.color} opacity-60`}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative flex flex-col md:flex-row gap-8 items-start">
              {/* Imagem */}
              <div className="w-full md:w-72 h-48 md:h-56 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🐍</div>
                    <span className="text-white/20 text-xs uppercase tracking-widest">
                      Imagem em breve
                    </span>
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {featured.wip && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                      Em desenvolvimento
                    </span>
                  )}
                  <span className="text-white/30 text-xs uppercase tracking-wider">
                    {featured.year}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
                  {featured.title}
                </h3>
                <p className="text-sm text-white/40 uppercase tracking-wider mb-4">
                  {featured.category}
                </p>
                <p className="text-white/60 leading-relaxed max-w-xl mb-6">
                  {featured.description}
                </p>

                {/* Hint clique */}
                <span className="inline-flex items-center gap-2 text-xs text-white/30 uppercase tracking-wider group-hover:text-white/60 transition-colors duration-300">
                  Ver detalhes ↗
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {others.map((project, i) => (
            <motion.div
              key={i}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: EASE }}
              onClick={() => setSelected(project)}
            >
              <motion.div
                className={`relative p-6 bg-white/5 border ${project.border} rounded-2xl backdrop-blur-sm overflow-hidden transition-colors duration-500 h-full`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative">
                  {/* Imagem */}
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-white/5 border border-white/10 mb-5 flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full transition-all duration-300 ${
                          project.isLogo
                            ? "object-contain p-8" // logo — com padding
                            : "object-cover" // foto — sem padding
                        }`}
                      />
                    ) : (
                      <span className="text-white/15 text-xs uppercase tracking-widest">
                        Imagem em breve
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {project.wip && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/8 text-white/50 border border-white/10">
                        <span className="w-1 h-1 rounded-full bg-white/40 animate-pulse inline-block" />
                        Em desenvolvimento
                      </span>
                    )}
                    <span className="text-white/25 text-xs uppercase tracking-wider">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/35 uppercase tracking-wider mb-3">
                    {project.category}
                  </p>
                  <p className="text-sm text-white/55 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <span className="inline-flex items-center gap-1 text-xs text-white/25 uppercase tracking-wider group-hover:text-white/50 transition-colors duration-300">
                    Ver detalhes ↗
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
