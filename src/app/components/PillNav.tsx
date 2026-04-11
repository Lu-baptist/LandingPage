// ─────────────────────────────────────────────
//  PillNav.tsx  —  responsivo
//
//  Desktop (≥768px): pill flutuante centralizada
//  Mobile  (<768px): botão hamburguer fixo no canto +
//                    menu fullscreen com links
//
//  USO em App.tsx:
//    import { PillNav } from "./components/PillNav";
//    <div className="relative z-10">
//      <PillNav />
//      <Hero ... />
//      ...
//    </div>
// ─────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react";

// ── Edite os links aqui ──
const NAV_LINKS = [
  { label: "Sobre", href: "#about" },
  { label: "Experiência", href: "#experience" },
  { label: "Projetos", href: "#works" },
  { label: "Premiações", href: "#awards" },
  { label: "Educação", href: "#education" },
  { label: "Contato", href: "#contact" },
];

const BREAKPOINT = 768;

export function PillNav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINT);
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const pillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // ── Detecta mobile/desktop ──
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Fecha menu mobile ao redimensionar para desktop ──
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  // ── Bloqueia scroll do body quando menu mobile está aberto ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ── Mostra pill/hamburguer após scroll ──
  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Move indicador ──
  const moveIndicatorTo = useCallback((href: string) => {
    const link = linkRefs.current[href];
    const pill = pillRef.current;
    if (!link || !pill) return;
    const pillRect = pill.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - pillRect.left,
      width: linkRect.width,
    });
  }, []);

  useEffect(() => {
    const target = hovered ?? activeId;
    if (target) moveIndicatorTo(target);
    else setIndicator((prev) => ({ ...prev, width: 0 }));
  }, [hovered, activeId, moveIndicatorTo]);

  useEffect(() => {
    const onResize = () => {
      const target = hovered ?? activeId;
      if (target) moveIndicatorTo(target);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hovered, activeId, moveIndicatorTo]);

  // ── Seção ativa ──
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.href.slice(1)),
    ).filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId("#" + e.target.id);
        }),
      { rootMargin: "-25% 0px -70% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // ── Scroll suave ──
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(
      () => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      },
      isMobile ? 300 : 0,
    );
  };

  // ════════════════════════════════
  //  MOBILE — hamburguer + overlay
  // ════════════════════════════════
  if (isMobile) {
    return (
      <>
        {/* Botão hamburguer */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            position: "fixed",
            top: "1.4rem",
            right: "1.5rem",
            zIndex: 600,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(10,10,10,0.8)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            cursor: "pointer",
            opacity: visible || menuOpen ? 1 : 0,
            transform:
              visible || menuOpen ? "translateY(0)" : "translateY(-8px)",
            transition:
              "opacity .4s cubic-bezier(.22,1,.36,1), transform .4s cubic-bezier(.22,1,.36,1)",
            pointerEvents: visible || menuOpen ? "all" : "none",
          }}
          aria-label="Menu"
        >
          {/* Linhas do hamburguer animadas */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "18px",
                height: "1.5px",
                background: "#fff",
                borderRadius: "2px",
                transition:
                  "transform .35s cubic-bezier(.22,1,.36,1), opacity .25s",
                transformOrigin: "center",
                transform: menuOpen
                  ? i === 0
                    ? "translateY(6.5px) rotate(45deg)"
                    : i === 1
                      ? "scaleX(0)"
                      : "translateY(-6.5px) rotate(-45deg)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>

        {/* Overlay fullscreen */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 550,
            background: "rgba(0,0,0,0.97)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.2rem",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "all" : "none",
            transition: "opacity .4s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {NAV_LINKS.map(({ label, href }, i) => {
            const isActive = activeId === href;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  padding: "0.6rem 1.5rem",
                  transition: "color .25s",
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: menuOpen ? 1 : 0,
                  transitionDelay: menuOpen ? `${i * 0.05}s` : "0s",
                  transitionProperty: "color, transform, opacity",
                  transitionDuration: "0.4s",
                  transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
                  cursor: "pointer",
                }}
              >
                {label}
              </a>
            );
          })}
        </div>
      </>
    );
  }

  // ════════════════════════════════
  //  DESKTOP — pill flutuante
  // ════════════════════════════════
  return (
    <nav
      style={{
        position: "fixed",
        top: "1.6rem",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "-12px"})`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
        transition:
          "opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1)",
        zIndex: 500,
      }}
    >
      <div
        ref={pillRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.2rem",
          padding: "0.5rem 0.7rem", // ← ajuste aqui para maior/menor
          background: "rgba(10,10,10,0.75)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "100px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          position: "relative",
        }}
      >
        {/* Indicador deslizante */}
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            left: indicator.left,
            height: "calc(100% - 1rem)",
            width: indicator.width,
            background: "rgba(255,255,255,0.13)",
            borderRadius: "100px",
            transition:
              "left .38s cubic-bezier(.22,1,.36,1), width .38s cubic-bezier(.22,1,.36,1)",
            pointerEvents: "none",
          }}
        />

        {NAV_LINKS.map(({ label, href }) => {
          const isActive = activeId === href;
          return (
            <a
              key={href}
              href={href}
              ref={(el) => {
                linkRefs.current[href] = el;
              }}
              onClick={(e) => handleClick(e, href)}
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                fontSize: "0.7rem", // ← ajuste aqui para maior/menor
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: isActive
                  ? "#ffffff"
                  : hovered === href
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.42)",
                padding: "0.65rem 1.4rem", // ← ajuste aqui para maior/menor
                borderRadius: "100px",
                transition: "color .3s",
                whiteSpace: "nowrap",
                zIndex: 1,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
