"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  Zap,
  Send,
  Radio,
  Shield,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/cyber-glass";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/* ── Signal wave canvas ─────────────────────────────────────────── */
function SignalWave({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;
    let time = 0;

    const draw = () => {
      time += 0.02;
      ctx.clearRect(0, 0, w(), h());

      const waves = [
        { amp: 20, freq: 0.015, speed: 1.2, color: "rgba(0,238,252,0.15)" },
        { amp: 15, freq: 0.02, speed: 0.8, color: "rgba(124,58,237,0.12)" },
        { amp: 25, freq: 0.01, speed: 1.5, color: "rgba(0,238,252,0.08)" },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, h() / 2);
        for (let x = 0; x < w(); x++) {
          const y =
            h() / 2 +
            Math.sin(x * wave.freq + time * wave.speed) * wave.amp *
              Math.sin(x * 0.003 + time * 0.5);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

/* ── Animated signal bars ───────────────────────────────────────── */
function SignalBars({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-primary/60"
          initial={{ height: 4 }}
          animate={{ height: [4, 8 + i * 3, 4] }}
          transition={{
            duration: 1.2,
            delay: delay + i * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Pulsing ring ───────────────────────────────────────────────── */
function PulseRing({ size = 120, color = "primary" }: { size?: number; color?: "primary" | "secondary" }) {
  const colorMap = {
    primary: "rgba(0,238,252,",
    secondary: "rgba(124,58,237,",
  };
  const base = colorMap[color];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            borderColor: `${base}${0.3 - i * 0.08})`,
            width: size - i * 16,
            height: size - i * 16,
          }}
          animate={{
            scale: [1, 1.15 + i * 0.1, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Contact channel card ───────────────────────────────────────── */
function ChannelCard({
  icon: Icon,
  label,
  value,
  description,
  href,
  accent,
  delay,
  badge,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
  href: string;
  accent: "cyan" | "purple" | "green";
  delay: number;
  badge?: string;
}) {
  const [hovered, setHovered] = useState(false);

  const accentMap = {
    cyan: {
      border: "rgba(0,238,252,0.15)",
      bg: "rgba(0,238,252,0.04)",
      text: "text-primary",
      iconBg: "rgba(0,238,252,0.08)",
      hoverBg: "rgba(0,238,252,0.08)",
      glow: "0 0 30px rgba(0,238,252,0.15)",
    },
    purple: {
      border: "rgba(124,58,237,0.15)",
      bg: "rgba(124,58,237,0.04)",
      text: "text-secondary",
      iconBg: "rgba(124,58,237,0.08)",
      hoverBg: "rgba(124,58,237,0.08)",
      glow: "0 0 30px rgba(124,58,237,0.15)",
    },
    green: {
      border: "rgba(37,211,102,0.15)",
      bg: "rgba(37,211,102,0.04)",
      text: "text-[#25D366]",
      iconBg: "rgba(37,211,102,0.08)",
      hoverBg: "rgba(37,211,102,0.08)",
      glow: "0 0 30px rgba(37,211,102,0.15)",
    },
  };

  const a = accentMap[accent];

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block rounded-2xl overflow-hidden"
      style={{
        background: a.bg,
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        border: `1px solid ${a.border}`,
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: a.hoverBg }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 p-5 sm:p-6 flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: a.iconBg,
            border: `1px solid ${a.border}`,
            boxShadow: hovered ? a.glow : "none",
            transition: "box-shadow 0.4s ease",
          }}
        >
          <Icon size={20} className={a.text} strokeWidth={1.5} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`text-sm font-bold font-headline ${a.text}`}>
              {label}
            </h4>
            {badge && (
              <span
                className="text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: a.iconBg,
                  border: `1px solid ${a.border}`,
                  color: a.text,
                }}
              >
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs font-mono text-slate-300 mb-1 truncate">
            {value}
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="shrink-0 self-center">
          <ArrowRight
            size={14}
            className="text-slate-600 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </motion.a>
  );
}

/* ── Availability indicator ─────────────────────────────────────── */
function AvailabilityStatus() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-3 w-3">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-primary transition-opacity duration-1000"
          style={{ opacity: pulse ? 0.75 : 0 }}
        />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-[0_0_8px_rgba(0,238,252,0.6)]" />
      </span>
      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
        Disponível para novos projetos
      </span>
    </div>
  );
}

/* ── Main Contact Section ───────────────────────────────────────── */
export function ContactSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:pl-32 relative overflow-hidden border-t border-white/5"
      id="contato"
      style={{
        background:
          "linear-gradient(180deg, rgba(2,1,8,0.95) 0%, rgba(3,1,12,0.98) 50%, rgba(1,0,6,1) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <SignalWave active={sectionVisible} />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(124,58,237,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 100%, rgba(0,238,252,0.08) 0%, rgba(124,58,237,0.05) 40%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/25 to-transparent" />
      </div>

      <div className="absolute top-8 left-4 sm:left-28 w-6 h-6 border-l border-t border-secondary/30 pointer-events-none" />
      <div className="absolute bottom-8 right-4 w-6 h-6 border-r border-b border-white/8 pointer-events-none" />

      <div className="absolute top-8 right-4 hidden sm:flex items-center gap-3 pointer-events-none">
        <span className="text-[10px] font-mono text-slate-600 tracking-widest">
          06 / 06
        </span>
        <div className="w-10 h-px bg-white/10" />
        <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          FIM
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="mb-16 md:mb-20 pt-16 text-center">
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] uppercase mb-4 flex items-center justify-center gap-3">
            <span className="text-slate-600">// 06</span>
            <span className="text-slate-600 select-none hidden sm:inline">
              ──────
            </span>
            <span className="text-secondary">CONTATO</span>
            <span className="text-slate-600 select-none hidden sm:inline">
              ──────
            </span>
          </p>

          <SectionLabel>Inicie a Transmissão</SectionLabel>

          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.03em] leading-[0.9] font-headline mt-4">
            <span className="text-white">TEM UM</span>
            <br />
            <span
              className="text-primary"
              style={{
                textShadow:
                  "0 0 40px rgba(0,238,252,0.35), 0 0 80px rgba(0,238,252,0.15)",
              }}
            >
              PROJETO
            </span>
            <br />
            <span className="text-white">EM MENTE?</span>
          </h2>

          <p className="text-slate-400 text-base max-w-xl mx-auto mt-6 leading-relaxed">
            Vamos transformar sua visão em realidade digital. Escolha o canal
            que preferir e vamos conversar.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ══ LEFT: Channels (7 cols) ═══════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <Reveal delay={0.1}>
              <SpotlightCard glowColor="cyan" className="p-6 sm:p-8" blur={3}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="relative shrink-0">
                    <PulseRing size={80} color="primary" />
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ zIndex: 2 }}
                    >
                      <MessageCircle
                        size={28}
                        className="text-primary"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-black font-headline tracking-tight text-white">
                        WhatsApp Direto
                      </h3>
                      <SignalBars delay={0.5} />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Resposta rápida e direta. Me envie uma mensagem e vamos
                      alinhar os detalhes do seu projeto.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-5">
                      {[
                        { icon: Zap, text: "Resposta em minutos" },
                        { icon: Clock, text: "Seg–Sex, 9h às 18h" },
                        { icon: Shield, text: "Sem compromisso" },
                      ].map(({ icon: Icon, text }) => (
                        <div
                          key={text}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                          style={{
                            background: "rgba(0,238,252,0.04)",
                            border: "1px solid rgba(0,238,252,0.08)",
                          }}
                        >
                          <Icon
                            size={11}
                            className="text-primary/60 shrink-0"
                          />
                          <span className="text-[10px] font-mono text-slate-400">
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="https://wa.me/5561999135861"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#25D366] text-black font-black px-8 py-3.5 rounded-xl
                                 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:scale-[1.02] active:scale-[0.98]
                                 transition-all duration-300 text-[11px] uppercase tracking-widest"
                    >
                      <MessageCircle size={16} strokeWidth={2.5} />
                      Iniciar conversa
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ChannelCard
                icon={Mail}
                label="E-mail"
                value="douglas@chuster.dev"
                description="Para propostas detalhadas e documentos"
                href="mailto:douglas@chuster.dev"
                accent="purple"
                delay={0.2}
                badge="Formal"
              />
              <ChannelCard
                icon={Phone}
                label="Telefone"
                value="+55 (61) 99913-5861"
                description="Para conversas rápidas e alinhamentos"
                href="tel:+5561999135861"
                accent="cyan"
                delay={0.3}
                badge="Direto"
              />
            </div>

            <Reveal delay={0.4}>
              <div
                className="rounded-2xl p-5 sm:p-6"
                style={{
                  background: "rgba(8,8,18,0.55)",
                  backdropFilter: "blur(3px)",
                  WebkitBackdropFilter: "blur(3px)",
                  border: "1px solid rgba(0,238,252,0.08)",
                  boxShadow:
                    "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <p className="text-[9px] font-mono text-slate-600 tracking-[0.4em] uppercase mb-4 flex items-center gap-2">
                  <Radio size={10} className="text-primary/40" />
                  Informações de Contato
                  <span className="inline-block w-4 h-px bg-primary/30" />
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                  {[
                    { label: "E-mail", value: "douglas@chuster.dev", delay: 0.45 },
                    { label: "Telefone", value: "+55 (61) 99913-5861", delay: 0.5 },
                    { label: "Resposta", value: "Até 24h úteis", delay: 0.55 },
                    { label: "Modo", value: "Remote · Freelance", delay: 0.6 },
                    { label: "Foco", value: "Sites · Landing · SaaS", delay: 0.65 },
                    { label: "Horário", value: "Seg–Sex, 9h–18h", delay: 0.7 },
                  ].map((item) => (
                    <SpecRow key={item.label} {...item} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ══ RIGHT: Status panel (5 cols) ══════════════════════ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal direction="right" delay={0.15}>
              <SpotlightCard glowColor="cyan" className="p-6 sm:p-8" blur={3}>
                <div className="flex flex-col items-center text-center gap-5">
                  <div className="relative">
                    <PulseRing size={100} color="primary" />
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ zIndex: 2 }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(0,238,252,0.15) 0%, rgba(124,58,237,0.1) 100%)",
                          border: "1px solid rgba(0,238,252,0.2)",
                          boxShadow: "0 0 20px rgba(0,238,252,0.2)",
                        }}
                      >
                        <Zap
                          size={24}
                          className="text-primary"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black font-headline tracking-tight text-white mb-2">
                      Status: Online
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Atualmente disponível para novos projetos. Respondo em
                      até 24 horas úteis.
                    </p>
                  </div>

                  <AvailabilityStatus />

                  <div className="w-full grid grid-cols-3 gap-3 pt-4 border-t border-white/6">
                    {[
                      { value: "14+", label: "Anos exp." },
                      { value: "200+", label: "Projetos" },
                      { value: "50+", label: "Clientes" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p
                          className="text-xl font-black font-headline text-primary"
                          style={{
                            textShadow:
                              "0 0 15px rgba(0,238,252,0.3)",
                          }}
                        >
                          {stat.value}
                        </p>
                        <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mt-0.5">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal direction="right" delay={0.25}>
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(8,8,18,0.45)",
                  border: "1px solid rgba(124,58,237,0.1)",
                }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <Send size={14} className="text-secondary/60" />
                  <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-secondary">
                    Como funciona
                  </h4>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { step: "01", title: "Contato inicial", desc: "Me conte sobre seu projeto" },
                    { step: "02", title: "Briefing", desc: "Alinhamos escopo e objetivos" },
                    { step: "03", title: "Proposta", desc: "Envio orçamento detalhado" },
                    { step: "04", title: "Execução", desc: "Mão na massa com atualizações" },
                  ].map((item, i) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-mono font-bold"
                        style={{
                          background:
                            i === 3
                              ? "rgba(0,238,252,0.1)"
                              : "rgba(124,58,237,0.08)",
                          border: `1px solid ${
                            i === 3
                              ? "rgba(0,238,252,0.2)"
                              : "rgba(124,58,237,0.15)"
                          }`,
                          color:
                            i === 3 ? "#00eefc" : "#7c3aed",
                        }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-bold font-headline text-slate-200">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {item.desc}
                        </p>
                      </div>
                      {i < 3 && (
                        <div className="absolute left-[27px] mt-10 w-px h-4 bg-white/6" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.35}>
              <SpotlightCard glowColor="purple" className="p-5" blur={3}>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.2)",
                    }}
                  >
                    <Mail
                      size={18}
                      className="text-secondary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-0.5">
                      E-mail
                    </p>
                    <p className="font-bold font-headline text-base truncate text-slate-200">
                      douglas@chuster.dev
                    </p>
                  </div>
                  <a
                    href="mailto:douglas@chuster.dev"
                    className="shrink-0 text-[9px] font-mono uppercase tracking-widest text-slate-500
                               border border-white/10 px-3 py-1.5 rounded-lg
                               hover:text-primary hover:border-primary/30 transition-all"
                  >
                    Enviar
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Spec row ────────────────────────────────────────────────────── */
function SpecRow({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
      className="flex justify-between items-baseline gap-4 py-2.5 border-b border-white/6 group"
    >
      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-slate-400 transition-colors shrink-0">
        {label}
      </span>
      <span className="text-xs font-semibold font-headline text-right text-slate-200 group-hover:text-primary transition-colors">
        {value}
      </span>
    </motion.div>
  );
}
