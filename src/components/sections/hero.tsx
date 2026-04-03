"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ArrowRight, ChevronDown } from "lucide-react";
import { OrbitalLogo } from "@/components/ui/orbital-logo";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { EnergyGrid } from "@/components/ui/energy-grid";

/* ── Animated counter ───────────────────────────────────────────── */
function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const duration = 2000;
    let startTime: number | null = null;
    const id = requestAnimationFrame(function frame(ts) {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(frame);
      else setCount(value);
    });
    return () => cancelAnimationFrame(id);
  }, [value]);

  return <>{count}{suffix}</>;
}

/* ── Char-by-char scramble reveal (internal) ──────────────── */
function RevealChars({ text, startDelay }: { text: string; startDelay: number }) {
  return (
    <span aria-label={text}>
      {[...text].map((ch, i) => {
        const delay = startDelay + i * 0.045;
        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
            style={{ whiteSpace: ch === " " ? "pre" : undefined }}
          >
            {ch}
          </motion.span>
        );
      })}
    </span>
  );
}

/* ── Typewriter effect for description ── */
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, 20); // Velocidade da digitação
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span className="relative">
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[3px] h-[0.9em] bg-primary ml-1.5 align-middle shadow-[0_0_8px_rgba(0,238,252,0.6)]"
        />
      )}
    </span>
  );
}

/* ── Glitch Title ───────────────────────────────────────────────── */
function GlitchTitle() {
  return (
    <div
      aria-label="Full Stack Developer"
      className="font-headline font-extrabold tracking-[-0.03em] leading-[0.88]"
    >
      {/* Line 1: FULL STACK */}
      <span
        className="glitch-title block text-[2rem] sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] text-white"
        data-text="FULL STACK"
      >
        <RevealChars text="FULL STACK" startDelay={0.25} />
      </span>
      {/* Line 2: DEVELOPER — larger, cyan glow */}
      <span
        className="glitch-title block text-[1.6rem] sm:text-3xl md:text-4xl lg:text-[3.5rem] xl:text-[4rem] text-primary"
        data-text="DEVELOPER"
        style={{ textShadow: "0 0 40px rgba(0,238,252,0.35), 0 0 80px rgba(0,238,252,0.15)" }}
      >
        <RevealChars text="DEVELOPER" startDelay={0.7} />
      </span>
    </div>
  );
}

/* ── Specs row ──────────────────────────────────────────────────── */
function SpecRow({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
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

/* ── Stack pill ─────────────────────────────────────────────────── */
function Pill({ label, delay, active }: { label: string; delay: number; active?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-widest border transition-all duration-300 cursor-default select-none whitespace-nowrap
        ${active
          ? "border-primary/50 bg-primary/10 text-primary shadow-[0_0_12px_rgba(0,238,252,0.2)]"
          : "border-white/10 bg-white/4 text-slate-400 hover:border-primary/30 hover:text-primary/80"
        }`}
    >
      {label}
    </motion.span>
  );
}

/* ── Dark dot-field canvas ──────────────────────────────────────── */
function DotFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const SPACING = 28;
    const DOT_R  = 1.2;
    let time = 0;

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width  / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      const cx = canvas.width  * 0.5;
      const cy = canvas.height * 0.18;
      const maxDist = Math.sqrt(cx * cx + (canvas.height * 0.85) ** 2);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const nearness = 1 - Math.min(dist / maxDist, 1);
          const phase = (c * 0.18 + r * 0.22 + time);
          const pulse = (Math.sin(phase) * 0.5 + 0.5);
          const alpha = nearness * nearness * (0.08 + pulse * 0.12);

          if (alpha < 0.005) continue;

          ctx.beginPath();
          ctx.arc(x, y, DOT_R + nearness * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,210,255,${alpha})`;
          ctx.fill();
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

/* ── Main HeroSection ───────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex items-center justify-center overflow-hidden min-h-screen
                 pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      {/* ── Layer 0: dot-field background ── */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" style={{ zIndex: 0 }} />
      <DotFieldCanvas />

      {/* ── Energy Grid ── */}
      <EnergyGrid />

      {/* ── Shader animation — hero only ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <ShaderAnimation />
      </div>

      {/* ── Layer 1: Atmospheric glows ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,238,252,0.06) 0%, rgba(124,58,237,0.05) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute -bottom-20 -left-10 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,238,252,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute -bottom-20 -left-10 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,238,252,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Orbital Sphere — centered background ── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,238,252,0.11) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)",
            width: 560,
            height: 560,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.18, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{
            filter: "drop-shadow(0 0 80px rgba(0,238,252,0.25)) drop-shadow(0 0 140px rgba(124,58,237,0.15))",
          }}
        >
          <OrbitalLogo size={480} />
        </motion.div>
      </div>

      {/* ── Scrim overlay to ensure text readability over bright animations ── */}
      <div className="absolute inset-0 pointer-events-none bg-[#02040c]/60" style={{ zIndex: 5 }} />

      {/* ── Section counter (top-right, md+) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="absolute top-24 right-5 sm:right-8 hidden sm:flex items-center gap-3 z-10"
      >
        <span className="text-[10px] font-mono text-slate-600 tracking-widest">01 / 05</span>
        <div className="w-12 h-px bg-white/10" />
        <a
          href="#servicos"
          className="text-[10px] font-mono text-slate-500 tracking-widest uppercase hover:text-primary transition-colors flex items-center gap-1"
        >
          Next <ChevronDown size={10} />
        </a>
      </motion.div>

      {/* ── Main content — fully centered ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-primary font-mono text-[9px] sm:text-[10px] tracking-[0.5em] uppercase mb-6 sm:mb-8 flex items-center gap-3"
        >
          <span className="text-slate-600">// 01</span>
          <span className="text-slate-600 select-none hidden sm:inline">──────</span>
          DOUGLAS CHUSTER
          <span className="text-slate-600 select-none hidden sm:inline">──────</span>
        </motion.p>

        {/* Headline */}
        <h1 className="mb-6 sm:mb-8">
          <GlitchTitle />
        </h1>

        {/* Sub-line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="text-slate-300 text-lg sm:text-xl lg:text-2xl font-medium tracking-wide max-w-3xl leading-relaxed mb-8 sm:mb-10 drop-shadow-md min-h-[3em] sm:min-h-[auto]"
        >
          <Typewriter 
            text="Desenvolvo sites, landing pages e plataformas digitais que unem estética, performance e resultado."
            delay={1.4}
          />
        </motion.div>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.35 }}
          className="flex flex-wrap justify-center items-center gap-2 mb-8 sm:mb-10 max-w-2xl relative z-10"
        >
          {["React", "Next.js", "Wordpress", "Elementor", "Node.js", "UI/UX"].map((t, i) => (
            <Pill key={t} label={t} delay={1.35 + i * 0.05} active={i === 0 || i === 2 || i === 5} />
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.55 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full sm:w-auto"
        >
          <a
            href="#contato"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                       bg-primary text-black font-bold text-[11px] uppercase tracking-widest
                       px-8 py-4 rounded-xl
                       hover:shadow-[0_0_40px_rgba(0,238,252,0.45)] hover:scale-105
                       transition-all duration-300 active:scale-95"
          >
            <MessageSquare size={13} />
            Falar sobre um projeto
          </a>
          <a
            href="#projetos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                       text-slate-400 text-[11px] font-mono uppercase tracking-widest
                       border border-white/10 rounded-xl px-8 py-4
                       hover:text-primary hover:border-primary/30
                       transition-all duration-200 group"
          >
            Ver projetos
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="flex items-stretch gap-0 rounded-2xl overflow-hidden w-full sm:w-auto"
          style={{
            background: "rgba(8,8,18,0.55)",
            backdropFilter: "blur(20px) saturate(1.5)",
            WebkitBackdropFilter: "blur(20px) saturate(1.5)",
            border: "1px solid rgba(0,238,252,0.1)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {[
            { value: 14,  suffix: "+", label: "Anos de exp." },
            { value: 200, suffix: "+", label: "Projetos" },
            { value: 50,  suffix: "+", label: "Clientes" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-5 sm:py-6
                          ${i < 2 ? "border-r border-white/6" : ""}`}
            >
              <p
                className="text-2xl sm:text-3xl font-black font-headline text-primary"
                style={{ textShadow: "0 0 20px rgba(0,238,252,0.4)" }}
              >
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mt-1 whitespace-nowrap">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Tech specs — collapsed into horizontal row below stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          className="mt-6 w-full rounded-2xl px-5 sm:px-8 py-5"
          style={{
            background: "rgba(8,8,18,0.45)",
            backdropFilter: "blur(20px) saturate(1.5)",
            WebkitBackdropFilter: "blur(20px) saturate(1.5)",
            border: "1px solid rgba(0,238,252,0.08)",
          }}
        >
          <p className="text-[9px] font-mono text-slate-600 tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-px bg-primary/30" />
            Especificações Técnicas
            <span className="inline-block w-4 h-px bg-primary/30" />
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
            <SpecRow label="Role"  value="Full Stack Dev"         delay={2.0} />
            <SpecRow label="Stack" value="React / Next.js / Node" delay={2.1} />
            <SpecRow label="Tipo"  value="Front-end + Back-end"   delay={2.15} />
            <SpecRow label="Exp."  value="14+ anos de projeto"    delay={2.2} />
            <SpecRow label="Foco"  value="UX · Perf · Resultado"  delay={2.25} />
            <SpecRow label="Modo"  value="Remote · Freelance"     delay={2.3} />
          </div>
        </motion.div>

      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
      >
        <span className="text-[9px] font-mono text-slate-600 tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
