"use client";

import {
  Building2,
  Rocket,
  ShoppingCart,
  LayoutDashboard,
  Users,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/cyber-glass";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/reveal";
import { KineticButton } from "@/components/ui/kinetic-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const services = [
  {
    icon: Building2,
    title: "Sites Institucionais",
    description:
      "Sites corporativos modernos que fortalecem credibilidade, apresentam a marca com clareza e geram confiança desde o primeiro acesso.",
    tags: ["Credibilidade", "Branding"],
    accent: "cyan" as const,
  },
  {
    icon: Rocket,
    title: "Landing Pages de Alta Conversão",
    description:
      "Páginas estratégicas para campanhas, com foco em captação de leads e ações específicas. Estrutura orientada à conversão com copy clara e CTA direto.",
    tags: ["Conversão", "Performance"],
    accent: "purple" as const,
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Lojas virtuais com experiência de compra fluida, integração com meios de pagamento e logística, e foco em taxa de conversão.",
    tags: ["Vendas", "Integração"],
    accent: "cyan" as const,
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards e Sistemas Web",
    description:
      "Sistemas personalizados e painéis internos que automatizam processos, organizam dados e facilitam a tomada de decisão.",
    tags: ["Automação", "Dados"],
    accent: "purple" as const,
  },
  {
    icon: Users,
    title: "Áreas de Membros e Plataformas Restritas",
    description:
      "Ambientes com acesso protegido, controle de usuários e permissões. Experiências exclusivas para membros, clientes ou alunos.",
    tags: ["Acesso", "Exclusividade"],
    accent: "cyan" as const,
  },
  {
    icon: Wrench,
    title: "Manutenção, Suporte e Evolução",
    description:
      "Suporte contínuo com correções, ajustes, melhorias e evolução técnica do projeto ao longo do tempo. Seu investimento protegido.",
    tags: ["Contínuo", "Evolução"],
    accent: "purple" as const,
  },
];

export function ServicesSection() {
  return (
    <section
      className="py-20 md:py-28 lg:py-32 px-5 sm:px-6 md:px-12 lg:pl-32 relative overflow-hidden border-t border-white/5"
      id="servicos"
      style={{
        background: "linear-gradient(160deg, rgba(2,2,10,0.85) 0%, rgba(4,4,18,0.70) 50%, rgba(2,2,10,0.85) 100%), radial-gradient(ellipse 55% 60% at 0% 0%, rgba(0,238,252,0.13) 0%, transparent 65%), radial-gradient(ellipse 55% 60% at 100% 100%, rgba(124,58,237,0.14) 0%, transparent 65%)",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Scan line top ── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />
        {/* ── Corner brackets ── */}
        <div className="absolute top-8 left-4 sm:left-28 w-6 h-6 border-l border-t border-primary/25 pointer-events-none" />
        <div className="absolute bottom-8 right-4 w-6 h-6 border-r border-b border-white/8 pointer-events-none" />
        {/* ── Section counter ── */}
        <div className="absolute top-8 right-4 hidden sm:flex items-center gap-3 pointer-events-none">
          <span className="text-[10px] font-mono text-slate-600 tracking-widest">02 / 06</span>
          <div className="w-10 h-px bg-white/10" />
          <a href="#competencias" className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-primary transition-colors">Next ↓</a>
        </div>
        <Reveal className="mb-16 md:mb-20 pt-16 text-center">
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="text-slate-600">// 02</span>
            <span className="text-slate-600 select-none hidden sm:inline">──────</span>
            <span className="text-primary">SERVIÇOS</span>
            <span className="text-slate-600 select-none hidden sm:inline">──────</span>
          </p>
          <SectionLabel>O Que Eu Faço</SectionLabel>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter font-headline heading-gradient mt-4">
            Soluções Digitais
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-6 leading-relaxed">
            Da página institucional ao sistema web, cada projeto é pensado para
            unir clareza, experiência e evolução.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {services.map((service) => (
            <StaggerItem key={service.title} className="h-full">
              <SpotlightCard
                glowColor={service.accent === "purple" ? "purple" : "cyan"}
                className="p-6 sm:p-8 md:p-10 h-full flex flex-col"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shrink-0 ${
                    service.accent === "purple" ? "glass-icon-purple" : "glass-icon"
                  }`}
                >
                  <service.icon
                    size={22}
                    className={
                      service.accent === "purple" ? "text-secondary" : "text-primary"
                    }
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 font-headline tracking-tight shrink-0">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex gap-2 font-mono text-[9px] uppercase shrink-0 mt-auto">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full border ${
                        service.accent === "purple"
                          ? "border-secondary/20 text-secondary bg-secondary/5"
                          : "border-primary/20 text-primary bg-primary/5"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mt-16 text-center">
          <KineticButton variant="glass" href="#contato" size="sm">
            Solicitar orçamento <ArrowRight size={14} />
          </KineticButton>
        </Reveal>
      </div>
    </section>
  );
}
