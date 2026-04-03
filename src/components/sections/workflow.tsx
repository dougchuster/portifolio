"use client";

import { Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/cyber-glass";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";

const steps = [
  {
    number: "01",
    title: "Descoberta e Briefing",
    description:
      "Entendimento do negócio, objetivos, público-alvo, referências e necessidades reais do projeto.",
    deliverables: "Briefing completo, escopo definido",
    accent: "cyan" as const,
  },
  {
    number: "02",
    title: "Estratégia e Pesquisa",
    description:
      "Análise de referências, concorrentes, mercado e definição da estrutura e direcionamento.",
    deliverables: "Plano de projeto, mapa de conteúdo",
    accent: "purple" as const,
  },
  {
    number: "03",
    title: "UX e Wireframes",
    description:
      "Transformação dos requisitos em estrutura de navegação e arquitetura de páginas.",
    deliverables: "Wireframes, mapa de navegação",
    accent: "cyan" as const,
  },
  {
    number: "04",
    title: "Design de Interface",
    description:
      "Definição da linguagem visual, componentes, estilo e consistência da interface.",
    deliverables: "UI Kit, telas aprovadas",
    accent: "purple" as const,
  },
  {
    number: "05",
    title: "Desenvolvimento",
    description:
      "Construção do produto, transformando layout e estrutura em solução funcional e performática.",
    deliverables: "Sistema funcional, testes",
    accent: "cyan" as const,
  },
  {
    number: "06",
    title: "Lançamento e Suporte",
    description:
      "Publicação, validação, acompanhamento e suporte pós-lançamento para evolução contínua.",
    deliverables: "Deploy, documentação, suporte",
    accent: "launch" as const,
  },
];

export function WorkflowSection() {
  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12 lg:pl-32 relative overflow-hidden border-t border-white/5"
      id="workflow"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(124,58,237,0.035) 60px, rgba(124,58,237,0.035) 61px)",
        backgroundColor: "rgba(4,2,16,0.90)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.10) 0%, transparent 40%)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Scan line top ── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent pointer-events-none" />
        {/* ── Corner brackets ── */}
        <div className="absolute top-8 left-4 sm:left-28 w-6 h-6 border-l border-t border-secondary/30 pointer-events-none" />
        <div className="absolute bottom-8 right-4 w-6 h-6 border-r border-b border-white/8 pointer-events-none" />
        {/* ── Section counter ── */}
        <div className="absolute top-8 right-4 hidden sm:flex items-center gap-3 pointer-events-none">
          <span className="text-[10px] font-mono text-slate-600 tracking-widest">05 / 06</span>
          <div className="w-10 h-px bg-white/10" />
          <a href="#contato" className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-primary transition-colors">Next ↓</a>
        </div>
        <Reveal className="text-center mb-16 md:mb-20 pt-16">
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="text-slate-600">// 05</span>
            <span className="text-slate-600 select-none hidden sm:inline">──────</span>
            <span className="text-secondary">PROCESSO</span>
            <span className="text-slate-600 select-none hidden sm:inline">──────</span>
          </p>
          <SectionLabel color="cyan">Metodologia Exclusiva</SectionLabel>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter font-headline text-slate-200 leading-snug">
            Cada projeto segue uma sequência clara, da estratégia à
            implementação, para garantir que a solução final não seja apenas
            bonita, mas funcional, coerente e preparada para crescer.
          </h2>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {steps.map((step) => (
            <StaggerItem key={step.number} className="h-full">
              <div
                className={`p-8 md:p-10 h-full flex flex-col ${
                  step.accent === "launch"
                    ? "glass-card"
                    : step.accent === "purple"
                    ? "glass-card glass-card-purple"
                    : "glass-card"
                }`}
              >
                {/* Step number */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shrink-0 transition-all duration-300 ${
                    step.accent === "launch"
                      ? "bg-primary text-black shadow-[0_0_30px_rgba(0,238,252,0.4)]"
                      : step.accent === "cyan"
                      ? "glass-icon"
                      : "glass-icon-purple"
                  }`}
                >
                  {step.accent === "launch" ? (
                    <Check size={22} strokeWidth={3} />
                  ) : (
                    <span
                      className={`font-mono font-bold text-lg ${
                        step.accent === "cyan" ? "text-primary" : "text-secondary"
                      }`}
                    >
                      {step.number}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-lg md:text-xl mb-2 font-headline shrink-0">
                  {step.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                  {step.description}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 shrink-0 mt-auto">
                  <span className="text-primary">Entregável:</span>{" "}
                  {step.deliverables}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
