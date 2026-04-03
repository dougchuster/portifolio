"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { OrbitalLogo } from "@/components/ui/orbital-logo";

const links = [
  { label: "Sobre",        href: "#inicio" },
  { label: "Serviços",     href: "#servicos" },
  { label: "Competências", href: "#competencias" },
  { label: "Projetos",     href: "#projetos" },
  { label: "Processo",     href: "#workflow" },
  { label: "Contato",      href: "#contato" },
];

export function TopNav() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map(l => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center
                   px-6 md:px-8 h-16 md:h-20 mx-auto max-w-6xl mt-2 md:mt-4
                   rounded-xl md:rounded-2xl overflow-hidden
                   transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(8,8,16,0.8)"
            : "rgba(8,8,16,0.5)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.4)"
            : "0 4px 24px rgba(0,0,0,0.2)",
        }}
      >
        {/* ── Top accent line ── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* ── Logo ── */}
        <a href="#inicio" className="relative flex items-center gap-2.5 group z-10">
          <div className="shrink-0">
            <OrbitalLogo size={28} />
          </div>
          <span className="text-base md:text-lg tracking-tight leading-none">
            <span className="font-light text-white">chuster</span>
            <span className="font-black text-primary">tech</span>
          </span>
        </a>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-6 font-mono text-[11px] tracking-[0.15em] uppercase z-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative py-1 transition-colors duration-200 ${
                activeLink === link.href
                  ? "text-primary"
                  : "text-slate-500 hover:text-slate-200"
              }`}
            >
              {link.label}
              {activeLink === link.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary/60" />
              )}
            </a>
          ))}
        </div>

        {/* ── CTA + hamburger ── */}
        <div className="flex items-center gap-4 z-10">
          <a
            href="#contato"
            className="hidden md:inline-flex items-center gap-2
                       text-primary text-[10px] font-mono uppercase tracking-widest
                       border border-primary/20 px-4 py-2 rounded-lg
                       hover:bg-primary/10 hover:border-primary/40
                       transition-all duration-200"
          >
            <Zap size={10} />
            Contato
          </a>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg
                       text-slate-500 hover:text-primary transition-colors duration-200"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] md:hidden"
            style={{ background: "rgba(4,4,10,0.95)", backdropFilter: "blur(20px)" }}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center
                         text-slate-500 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
            >
              <X size={20} />
            </button>

            <div className="absolute top-5 left-5 flex items-center gap-2">
              <OrbitalLogo size={22} />
              <span className="text-sm tracking-tight leading-none">
                <span className="font-light text-white">chuster</span>
                <span className="font-black text-primary">tech</span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-center h-full gap-2">
              <nav className="flex flex-col items-center gap-1 w-full px-8">
                {links.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="group w-full max-w-xs flex items-center justify-between py-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xl font-bold font-headline text-slate-300 group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600">
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="#contato"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => setIsOpen(false)}
                className="mt-8 flex items-center gap-2 text-primary text-[10px] font-mono uppercase tracking-widest
                           border border-primary/20 px-6 py-3 rounded-lg
                           hover:bg-primary/10 transition-all"
              >
                <Zap size={10} />
                Entrar em contato
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
