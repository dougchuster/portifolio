"use client";

import { Code, Palette, Globe, Database, Layers, Zap } from "lucide-react";
import { SectionLabel } from "@/components/ui/cyber-glass";
import { Reveal } from "@/components/ui/reveal";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const categories = [
  {
    name: "Front-end & Web",
    description:
      "Desenvolvimento de interfaces modernas, responsivas e performáticas.",
    accent: "cyan" as const,
    skills: [
      { name: "React / Next.js", level: "Avançado" },
      { name: "TypeScript / JavaScript", level: "Avançado" },
      { name: "HTML5 / CSS3", level: "Especialista" },
      { name: "Performance & Acessibilidade", level: "Avançado" },
      { name: "Git, Deploy e CI/CD", level: "Sólido" },
    ],
  },
  {
    name: "Plataformas e Ecossistema Web",
    description:
      "Implementação em plataformas prontas, SEO técnico e performance web.",
    accent: "purple" as const,
    skills: [
      { name: "WordPress & Elementor", level: "Especialista" },
      { name: "SEO & Performance Web", level: "Avançado" },
      { name: "WooCommerce", level: "Sólido" },
      { name: "Identidade de Marca", level: "Intermediário" },
      { name: "Ilustração & Design Visual", level: "Intermediário" },
    ],
  },
  {
    name: "Produto, UI e Experiência",
    description:
      "Do wireframe ao protótipo, com foco em usabilidade e consistência.",
    accent: "cyan" as const,
    skills: [
      { name: "UI e Sistemas de Design", level: "Avançado" },
      { name: "Pesquisa com Usuários", level: "Avançado" },
      { name: "Wireframes & Prototipagem", level: "Sólido" },
      { name: "Design de Interação", level: "Sólido" },
      { name: "Figma", level: "Intermediário" },
    ],
  },
];

const levelColors: Record<string, string> = {
  Especialista: "bg-primary text-black",
  Avançado: "bg-primary/30 text-primary border border-primary/40",
  Sólido: "bg-secondary/30 text-secondary border border-secondary/40",
  Intermediário: "bg-white/10 text-slate-300 border border-white/10",
};

const orbitalData = [
  {
    id: 1,
    title: "React",
    date: "2018",
    content:
      "Desenvolvimento de SPAs e interfaces reativas com componentização avançada.",
    category: "Front-end",
    icon: Code,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Next.js",
    date: "2020",
    content:
      "SSR, SSG, App Router e Server Components para aplicações full-stack.",
    category: "Framework",
    icon: Layers,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "TypeScript",
    date: "2019",
    content:
      "Tipagem estática para código mais seguro, escalável e manutenível.",
    category: "Linguagem",
    icon: Zap,
    relatedIds: [1, 2],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "WordPress",
    date: "2014",
    content:
      "Temas customizados, Elementor, WooCommerce e otimização de performance.",
    category: "Plataforma",
    icon: Globe,
    relatedIds: [5, 6],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 5,
    title: "UI/UX",
    date: "2016",
    content:
      "Design de interface, wireframes, prototipagem e sistemas de design.",
    category: "Design",
    icon: Palette,
    relatedIds: [4, 6],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 6,
    title: "Node.js",
    date: "2019",
    content:
      "APIs REST, integrações, automação e infraestrutura back-end.",
    category: "Back-end",
    icon: Database,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 75,
  },
];

export function ExpertiseSection() {
  return (
    <section
      className="py-20 md:py-28 lg:py-32 px-5 sm:px-6 md:px-12 lg:pl-32 relative overflow-hidden border-t border-white/5"
      id="competencias"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.06) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        backgroundColor: "rgba(3,2,14,0.9)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 80% at 0% 50%, rgba(124,58,237,0.12) 0%, transparent 65%)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Scan line top ── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/25 to-transparent pointer-events-none" />
        {/* ── Corner brackets ── */}
        <div className="absolute top-8 left-4 sm:left-28 w-6 h-6 border-l border-t border-secondary/30 pointer-events-none" />
        <div className="absolute bottom-8 right-4 w-6 h-6 border-r border-b border-white/8 pointer-events-none" />
        {/* ── Section counter ── */}
        <div className="absolute top-8 right-4 hidden sm:flex items-center gap-3 pointer-events-none">
          <span className="text-[10px] font-mono text-slate-600 tracking-widest">03 / 06</span>
          <div className="w-10 h-px bg-white/10" />
          <a href="#projetos" className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-primary transition-colors">Next ↓</a>
        </div>
        <Reveal className="mb-16 md:mb-20 pt-16 text-center">
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="text-slate-600">// 03</span>
            <span className="text-slate-600 select-none hidden sm:inline">──────</span>
            <span className="text-secondary">COMPETÊNCIAS</span>
            <span className="text-slate-600 select-none hidden sm:inline">──────</span>
          </p>
          <SectionLabel color="cyan">Arsenal Técnico</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-headline heading-gradient">
            Stack & Competências
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-6 leading-relaxed">
            Da base técnica à experiência final do usuário — front-end,
            performance, plataformas web e design de interface.
          </p>
        </Reveal>

        {/* Orbital Timeline */}
        <Reveal className="mb-16 md:mb-20">
          <RadialOrbitalTimeline timelineData={orbitalData} />
        </Reveal>

        {/* Cards - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {categories.map((category, index) => (
            <Reveal key={category.name} delay={index * 0.12} className="h-full">
              <SpotlightCard
                glowColor={category.accent === "purple" ? "purple" : "cyan"}
                className="p-6 sm:p-8 md:p-10 h-full flex flex-col"
              >
                <h3 className="text-lg md:text-xl font-bold mb-2 font-headline tracking-tight">
                  {category.name}
                </h3>
                <p className="text-slate-500 text-xs mb-6 leading-relaxed">
                  {category.description}
                </p>
                <ul className="space-y-3 flex-1">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-sm text-slate-300 font-medium">
                        {skill.name}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap ${
                          levelColors[skill.level] || levelColors["Intermediário"]
                        }`}
                      >
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
