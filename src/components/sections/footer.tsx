"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowUpRight,
  Code2,
  Globe,
  Zap,
  ChevronRight,
} from "lucide-react";
import { OrbitalLogo } from "@/components/ui/orbital-logo";

const navLinks = [
  { label: "Sobre", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Competências", href: "#competencias" },
  { label: "Projetos", href: "#projetos" },
  { label: "Processo", href: "#workflow" },
  { label: "Contato", href: "#contato" },
];

const services = [
  { label: "Sites Institucionais", href: "#servicos" },
  { label: "Landing Pages", href: "#servicos" },
  { label: "E-commerce", href: "#servicos" },
  { label: "Dashboards & Sistemas", href: "#servicos" },
  { label: "Áreas de Membros", href: "#servicos" },
  { label: "Manutenção & Suporte", href: "#servicos" },
];

const socialLinks = [
  { label: "GitHub", href: "#", path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" },
  { label: "LinkedIn", href: "#", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "Instagram", href: "#", path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-1.5 text-slate-500 text-xs font-mono tracking-wider
                 hover:text-primary transition-colors duration-300"
    >
      <ChevronRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary/60" />
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary/40 group-hover:w-full transition-all duration-300" />
      </span>
    </a>
  );
}

function SocialIcon({ label, href, path }: { label: string; href: string; path: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group relative w-10 h-10 rounded-xl flex items-center justify-center
                 border border-white/8 bg-white/[0.02]
                 hover:border-primary/30 hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(0,238,252,0.1)]
                 transition-all duration-300"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-slate-500 group-hover:fill-primary transition-colors duration-300"
      >
        <path d={path} />
      </svg>
      {/* Corner accent on hover */}
      <span className="absolute -top-px -right-px w-2 h-2 border-t border-r border-primary/0 group-hover:border-primary/40 rounded-tr transition-all duration-300" />
    </a>
  );
}

export function Footer() {
  return (
    <footer
      className="w-full relative overflow-hidden border-t border-white/5"
      style={{
        background: "linear-gradient(180deg, rgba(2,2,10,0.97) 0%, rgba(3,1,8,0.99) 50%, rgba(1,0,4,1) 100%)",
      }}
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,238,252,1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,238,252,1) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,238,252,0.06) 0%, rgba(124,58,237,0.03) 40%, transparent 70%)",
          }}
        />
        {/* Scan line top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* ── Main footer content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:pl-32">
        {/* Top section */}
        <div className="py-16 md:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <a href="#inicio" className="flex items-center gap-3 group">
              <div className="shrink-0 drop-shadow-[0_0_10px_rgba(0,238,252,0.4)] group-hover:drop-shadow-[0_0_16px_rgba(0,238,252,0.6)] transition-all duration-500">
                <OrbitalLogo size={36} />
              </div>
              <div>
                <span className="text-lg md:text-xl tracking-tight leading-none block">
                  <span className="font-light text-white">chuster</span>
                  <span className="font-black text-primary">tech</span>
                </span>
                <span className="text-[8px] font-mono text-slate-600 tracking-[0.4em] uppercase">
                  Full Stack Architect
                </span>
              </div>
            </a>

            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Transformando ideias em soluções digitais escaláveis. 
              Sites, landing pages e plataformas de alta performance.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-px bg-primary/40" />
              <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-primary">
                Navegação
              </h4>
            </div>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-px bg-secondary/40" />
              <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-secondary">
                Serviços
              </h4>
            </div>
            <div className="flex flex-col gap-3">
              {services.map((service) => (
                <FooterLink key={service.label} href={service.href}>
                  {service.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Col 4: Contact (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-px bg-primary/40" />
              <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-primary">
                Contato
              </h4>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:douglas@chuster.dev"
                className="group flex items-start gap-3 text-slate-500 hover:text-primary transition-colors duration-300"
              >
                <Mail size={14} className="mt-0.5 shrink-0 text-slate-600 group-hover:text-primary transition-colors" />
                <span className="text-xs font-mono leading-relaxed break-all">
                  douglas@chuster.dev
                </span>
              </a>
              <a
                href="https://wa.me/5561999135861"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-slate-500 hover:text-primary transition-colors duration-300"
              >
                <Phone size={14} className="mt-0.5 shrink-0 text-slate-600 group-hover:text-primary transition-colors" />
                <span className="text-xs font-mono leading-relaxed">
                  +55 (61) 99913-5861
                </span>
              </a>
              <div className="flex items-start gap-3 text-slate-500">
                <MapPin size={14} className="mt-0.5 shrink-0 text-slate-600" />
                <span className="text-xs font-mono leading-relaxed">
                  Remote · Brasil
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider with tech accent ── */}
        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center gap-4 px-4 bg-[#02020a]">
              <div className="flex items-center gap-1.5">
                <Code2 size={10} className="text-primary/40" />
                <span className="text-[8px] font-mono text-slate-600 tracking-widest uppercase">
                  Feito com
                </span>
                <Zap size={10} className="text-primary/60" />
                <span className="text-[8px] font-mono text-slate-600 tracking-widest uppercase">
                  e café
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: copyright */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-slate-600 tracking-widest">
              &copy; 2026 DOUGLAS CHUSTER
            </span>
            <span className="text-[8px] text-slate-700">//</span>
            <span className="text-[9px] font-mono text-slate-600 tracking-widest">
              TODOS OS DIREITOS RESERVADOS
            </span>
          </div>

          {/* Right: tech stack pills */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[8px] font-mono text-slate-700 tracking-wider uppercase mr-1">
              Powered by
            </span>
            {["React", "Next.js", "TypeScript", "Tailwind"].map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider
                           border border-white/6 text-slate-600 bg-white/[0.02]
                           hover:border-primary/20 hover:text-primary/70 hover:bg-primary/5
                           transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom edge glow ── */}
      <div className="absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      {/* ── Corner accents ── */}
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-primary/15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-white/6 pointer-events-none" />
    </footer>
  );
}
