import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Mail, Linkedin, Github, Instagram } from "lucide-react";

// ── Edite seus contatos aqui ──
const EMAIL = "luanabatista20081@gmail.com";
const WHATSAPP = "https://wa.me/5511972886875";

const SOCIALS = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/luana-boliveira",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Lu-baptist",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/lu_baptist/",
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${EMAIL}`,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Ícone WhatsApp SVG (lucide não tem)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Contacts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título */}
        <motion.p
          className="text-xs text-white/30 font-bold tracking-[.22em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Contato
        </motion.p>

        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Entre em contato
        </motion.h2>

        {/* E-mail */}
        <motion.a
          href={`mailto:${EMAIL}`}
          className="inline-block text-base md:text-xl text-white/50 hover:text-white transition-colors duration-300 mb-14 tracking-wide"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          {EMAIL}
        </motion.a>

        {/* Ícones sociais */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          {/* WhatsApp em destaque */}
          <motion.a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-12 h-12 flex items-center justify-center bg-[#25D366]/10 border border-[#25D366]/30 rounded-full hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
          </motion.a>

          {/* Demais redes */}
          {SOCIALS.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <s.icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-300" />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="pt-16 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        >
          <p className="text-white/25 text-xs tracking-wider">
            © 2026 Luana Oliveira.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
