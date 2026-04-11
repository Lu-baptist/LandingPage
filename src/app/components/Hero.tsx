import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface HeroProps {
  profileImage: string;
}

// ── Edite suas informações aqui ──
const INFO = {
  subtitle: "Fullstack Developer & UI/UX Designer",
  firstName: "LUANA",
  lastName: "OLIVEIRA",
  location: "Construindo soluções com propósito, inovação e responsabilidade",
  email: "luanabatista20081@gmail.com",
  socials: [
    { label: "Li.", href: "https://www.linkedin.com/in/luana-boliveira" },
    { label: "WhatsApp.", href: "https://wa.me/5511972886875" },
    
  ],
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ profileImage }: HeroProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [photoHover, setPhotoHover] = useState(false);

  useEffect(() => {
    const fn = (e: MouseEvent) =>
      setMouse({
        x: (e.clientX - window.innerWidth / 2) / 60,
        y: (e.clientY - window.innerHeight / 2) / 60,
      });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pb-16"
    >
      {/* ── Subtítulo ── */}
      <div className="overflow-hidden mb-5">
        <motion.p
          className="text-white/50 text-xs md:text-sm font-normal tracking-[.22em] uppercase text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          {INFO.subtitle}
        </motion.p>
      </div>

      {/* ── Primeiro nome — 100% branco, destaque total ── */}
      <div className="overflow-hidden mb-0">
        <motion.h1
          style={{
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,90%)",
            textAlign: "center",
            margin: 0,
          }}
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          {INFO.firstName}
        </motion.h1>
      </div>

      {/* ── Sobrenome — fantasma, cria hierarquia visual ── */}
      {INFO.lastName && (
        <div className="overflow-hidden mb-6">
          <motion.h1
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.13)",
              textAlign: "center",
              margin: 0,
            }}
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.28, ease: EASE }}
          >
            {INFO.lastName}
          </motion.h1>
        </div>
      )}

      {/* ── Tagline / localização ── */}
      <motion.p
        className="text-white/35 text-xs tracking-[.15em] uppercase mb-10 text-center max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
      >
        {INFO.location}
      </motion.p>

      {/* ── Foto oval com hover expand ── */}
      <motion.div
        className="relative cursor-pointer"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
        style={{ x: mouse.x, y: mouse.y }}
        onMouseEnter={() => setPhotoHover(true)}
        onMouseLeave={() => setPhotoHover(false)}
      >
        <motion.div
          style={{
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            width: "clamp(220px, 28vw, 340px)",
            height: "clamp(270px, 36vw, 440px)",
          }}
          animate={{
            borderRadius: photoHover ? "24px" : "25% 25% 25% 25%",
          }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <motion.img
            src={profileImage}
            alt="Foto de perfil"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
            animate={{ scale: photoHover ? 1.06 : 1 }}
            transition={{ duration: 0.55, ease: EASE }}
          />
        </motion.div>
      </motion.div>

      {/* ── E-mail (canto inferior esquerdo) ── */}
      <motion.a
        href={`mailto:${INFO.email}`}
        className="absolute bottom-10 left-8 text-xs tracking-widest uppercase hover:text-white transition-colors duration-300 hidden md:block"
        style={{ color: "rgba(255,255,255,0.45)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
      >
        <span style={{ color: "#fff" }}>{INFO.email.split("@")[0]}</span>
        <span style={{ color: "rgba(255,255,255,0.35)" }}>
          @{INFO.email.split("@")[1]}
        </span>
      </motion.a>

      {/* ── Redes sociais (canto inferior direito) ── */}
      <motion.div
        className="absolute bottom-10 right-8 items-center gap-5 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
      >
        {INFO.socials.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold tracking-widest uppercase transition-colors duration-300"
            style={{ color: "rgba(255,255,255,0.45)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
            }
          >
            {label}
          </a>
        ))}
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1, ease: EASE }}
      >
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.4)" }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
