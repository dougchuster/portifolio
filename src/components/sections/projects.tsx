"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/cyber-glass";
import { Reveal } from "@/components/ui/reveal";

const projects = [
  {
    title: "Elite Law Systems",
    category: "Jurídico & Advocacia",
    type: "Site institucional",
    description:
      "Plataforma completa com apresentação do escritório, áreas de atuação, equipe e canal de contato direto.",
    image: "/images/projects/proj_law.png",
    accent: "cyan" as const,
  },
  {
    title: "Lens & Light",
    category: "Fotografia & Visual",
    type: "Portfólio interativo",
    description:
      "Portfólio imersivo para estúdio de fotografia premium com galeria interativa e sistema de booking.",
    image: "/images/projects/proj_photo.png",
    accent: "purple" as const,
  },
  {
    title: "DevCraft Studio",
    category: "Design & Desenvolvimento",
    type: "Landing page",
    description:
      "Landing page de alta conversão para agência de desenvolvimento, com foco em apresentação de cases e captação de leads.",
    image: "/images/projects/proj_dev.png",
    accent: "cyan" as const,
  },
  {
    title: "AgroSmart Pro",
    category: "Agricultura & Agronegócio",
    type: "Dashboard / Sistema",
    description:
      "Dashboard de monitoramento agrícola com visualização de dados, alertas e gestão de safra integrada.",
    image: "/images/projects/proj_agro.png",
    accent: "purple" as const,
  },
  {
    title: "Finanças & Bancos",
    category: "Plataforma Web",
    type: "Dashboard Financeiro",
    description: "Sites seguros e confiáveis para serviços financeiros e bancários.",
    image: "/images/projects/proj_fin.png",
    accent: "cyan" as const,
  },
  {
    title: "Saúde & Clínicas",
    category: "Portal Saúde",
    type: "Site Médico",
    description: "Sites limpos e fáceis de usar para clínicas e profissionais de saúde.",
    image: "/images/projects/proj_health.png",
    accent: "purple" as const,
  },
  {
    title: "Notícias & Blog",
    category: "Portal de Notícias",
    type: "Blog Profissional",
    description: "Sites profissionais de notícias e blogs, focados em conteúdo, performance e legibilidade.",
    image: "/images/projects/proj_news.png",
    accent: "purple" as const,
  },
  {
    title: "Arquitetura & Engenharia",
    category: "Site Corporativo",
    type: "Site de Arquitetura",
    description: "Sites profissionais para escritórios de arquitetura e engenharia, focados em precisão, estrutura e clareza visual.",
    image: "/images/projects/proj_arch.png",
    accent: "cyan" as const,
  },
];

// Items with col-span-2 (wide) in the bento layout
const WIDE_ITEMS = new Set([0, 4, 6, 7]);

export function ProjectsSection() {
  return (
    <section
      className="py-20 md:py-28 lg:py-32 px-5 sm:px-6 md:px-12 lg:pl-32 relative overflow-hidden border-t border-white/5"
      id="projetos"
      style={{
        backgroundImage: "linear-gradient(rgba(0,238,252,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(0,238,252,0.028) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        backgroundColor: "rgba(2,4,12,0.88)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 55% at 100% 20%, rgba(0,238,252,0.09) 0%, transparent 65%), radial-gradient(ellipse 40% 45% at 0% 90%, rgba(124,58,237,0.08) 0%, transparent 65%)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Scan line top ── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
        {/* ── Corner brackets ── */}
        <div className="absolute top-8 left-4 sm:left-28 w-6 h-6 border-l border-t border-primary/25 pointer-events-none" />
        <div className="absolute bottom-8 right-4 w-6 h-6 border-r border-b border-white/8 pointer-events-none" />
        {/* ── Section counter ── */}
        <div className="absolute top-8 right-4 hidden sm:flex items-center gap-3 pointer-events-none">
          <span className="text-[10px] font-mono text-slate-600 tracking-widest">04 / 06</span>
          <div className="w-10 h-px bg-white/10" />
          <a href="#workflow" className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-primary transition-colors">Next ↓</a>
        </div>
        <Reveal className="mb-16 md:mb-24 pt-16 text-center">
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="text-slate-600">// 04</span>
            <span className="text-slate-600 select-none hidden sm:inline">──────</span>
            <span className="text-primary">PROJETOS</span>
            <span className="text-slate-600 select-none hidden sm:inline">──────</span>
          </p>
          <SectionLabel>Projetos de Sucesso</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-headline heading-gradient mt-4">
            Projetos em Destaque
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-6 leading-relaxed">
            Soluções adaptadas ao contexto, ao público e ao objetivo de cada
            cliente — interfaces, sites e plataformas que unem clareza e
            performance.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {projects.map((project, index) => {
            const isWide = WIDE_ITEMS.has(index);
            const colClass = isWide ? "sm:col-span-2 h-[320px] sm:h-[380px] lg:h-[420px]" : "h-[320px] sm:h-[380px] lg:h-[420px]";
            const glassClass =
              project.accent === "purple"
                ? "glass-card glass-card-purple"
                : "glass-card";
            const accentText =
              project.accent === "purple" ? "text-secondary" : "text-primary";
            const hoverGlow =
              project.accent === "purple"
                ? "bg-gradient-to-br from-secondary/5 via-transparent to-secondary/10"
                : "bg-gradient-to-br from-primary/5 via-transparent to-primary/10";
            const shadowClass =
              project.accent === "purple"
                ? "shadow-[0_0_20px_rgba(124,58,237,0.2)]"
                : "shadow-[0_0_20px_rgba(0,238,252,0.2)]";

            return (
              <div key={project.title} className={colClass}>
                <Reveal delay={index * 0.06} className="h-full">
                  <div className={`group relative h-full w-full overflow-hidden ${glassClass} rounded-2xl`}>
                    
                    {/* Background Image Layer */}
                    <div className="absolute inset-x-0 top-0 h-[75%] w-full overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 mix-blend-screen" 
                        loading="lazy" 
                      />
                      {/* Gradient to blend image down into the dark background */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#02040c]" />
                    </div>

                    {/* Glassmorphism Gradient Overlay (Max opacity 80% per user request) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02040c]/80 via-[#02040c]/40 to-transparent pointer-events-none" />

                    {/* Hover Glow */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${hoverGlow}`}
                    />

                    {/* Content Positioned perfectly aligned at bottom */}
                    <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full flex flex-col justify-end z-10">
                      <span
                        className={`text-[9px] font-mono font-bold tracking-[0.2em] uppercase mb-1 block ${accentText}`}
                      >
                        {project.type}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold mb-2 font-headline tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-[11px] md:text-xs leading-relaxed mb-0 mt-1 max-w-[85%] line-clamp-2">
                        {project.description}
                      </p>
                      <button
                        className={`absolute right-5 md:right-6 bottom-5 md:bottom-6 w-10 h-10 rounded-lg cyber-glass border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 ${shadowClass}`}
                      >
                        <ArrowUpRight size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
