import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";

import logoB3 from "../../assets/logos/b3.svg";
import logoIBM from "../../assets/logos/ibm.svg";
import logoSAP from "../../assets/logos/sap.png";
import logoMicrosoft from "../../assets/logos/microsoft.png";
import logoSchneider from "../../assets/logos/schneider.png";
import logoAncora from "../../assets/logos/ancora.png";
import logoHeinz from "../../assets/logos/heinz.png";
import logoFormulaE from "../../assets/logos/formulae.png";
import logoUltragaz from "../../assets/logos/ultragaz.png";

// ── Edite: adicione ou remova empresas ──
// size: altura da logo em px — ajuste por empresa conforme necessário
const COMPANIES = [
  { name: "B3", url: "#", color: "#f59e0b", logo: logoB3, size: 70 },
  {
    name: "Schneider Electric",
    url: "#",
    color: "#3db84b",
    logo: logoSchneider,
    size: 40,
  },
  { name: "IBM", url: "#", color: "#1d4ed8", logo: logoIBM, size: 40 },
  { name: "SAP", url: "#", color: "#0f766e", logo: logoSAP, size: 36 },
  {
    name: "Microsoft",
    url: "#",
    color: "#2563eb",
    logo: logoMicrosoft,
    size: 40,
  },
  {
    name: "Rede Ancora",
    url: "#",
    color: "#dc2626",
    logo: logoAncora,
    size: 45,
  },
  { name: "Heinz", url: "#", color: "#b91c1c", logo: logoHeinz, size: 70 },
  {
    name: "Formula-e",
    url: "#",
    color: "#6d28d9",
    logo: logoFormulaE,
    size: 36,
  },
  {
    name: "Ultragaz",
    url: "#",
    color: "#ea580c",
    logo: logoUltragaz,
    size: 70,
  },
];

const ITEMS = [...COMPANIES, ...COMPANIES, ...COMPANIES];
const SPEED = 0.4;

// Componente de logo com fallback para texto se a imagem falhar
function CompanyLogo({
  logo,
  name,
  size,
}: {
  logo: string;
  name: string;
  size: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="text-xs md:text-sm font-bold tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        {name}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      onError={() => setFailed(true)}
      style={{ height: `${size}px`, width: "auto", objectFit: "contain" }}
      className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
    />
  );
}

export function CompaniesMarquee() {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useAnimationFrame(() => {
    if (paused.current) return;
    const track = trackRef.current;
    if (!track) return;
    const singleWidth = track.scrollWidth / 3;
    const next = x.get() - SPEED;
    x.set(next <= -singleWidth ? 0 : next);
  });

  return (
    <section
      className="relative py-16 overflow-hidden border-t border-b border-white/[0.06]"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* Fade nas laterais */}
      <div
        className="absolute inset-y-0 left-0 w-8 md:w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #000 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-8 md:w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #000 0%, transparent 100%)",
        }}
      />

      {/* Label */}
      <p className="text-center text-white/75 text-[1.25rem] font-bold tracking-[0.25em] uppercase mb-4">
        Empresas parceiras
      </p>

      {/* Subtítulo */}
      <p className="text-center text-white/55 text-xs md:text-xl font-normal max-w-xl mx-auto mb-8 leading-relaxed px-6">
        Ao longo da minha graduação, desenvolvi projetos em parceria com
        empresas de renome, como Schneider Electric, Microsoft, Heinz, SAP,
        Formula-e, Ultragaz, IBM, Rede Ancora e B3.
      </p>

      {/* Faixa deslizante */}
      <div className="flex overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-4 will-change-transform"
          style={{ x }}
          onMouseEnter={() => {
            paused.current = true;
          }}
          onMouseLeave={() => {
            paused.current = false;
          }}
        >
          {ITEMS.map(({ name, url, color, logo, size }, i) => (
            <a
              key={i}
              href={url}
              target={url !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex-shrink-0 flex items-center justify-center px-5 py-4 md:px-8 md:py-5 rounded-2xl border border-white/[0.07] transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                minWidth: "130px",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  `${color}14`;
                (e.currentTarget as HTMLElement).style.borderColor =
                  `${color}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.07)";
              }}
            >
              <CompanyLogo logo={logo} name={name} size={size} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
