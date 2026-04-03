"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Award, FolderOpen, ListChecks, Mail } from "lucide-react";

const navItems = [
  { icon: User,        label: "Sobre",    href: "#inicio",       id: "inicio" },
  { icon: Briefcase,   label: "Serviços", href: "#servicos",     id: "servicos" },
  { icon: Award,       label: "Skills",   href: "#competencias", id: "competencias" },
  { icon: FolderOpen,  label: "Projetos", href: "#projetos",     id: "projetos" },
  { icon: ListChecks,  label: "Processo", href: "#workflow",     id: "workflow" },
  { icon: Mail,        label: "Contato",  href: "#contato",      id: "contato" },
];

function RotatingRing({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Outer dashed ring */}
      <motion.div
        className="absolute rounded-full border border-dashed"
        style={{
          width: 36,
          height: 36,
          borderColor: active ? "rgba(0,238,252,0.3)" : "transparent",
        }}
        animate={{ rotate: active ? 360 : 0 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner solid ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: 28,
          height: 28,
          borderColor: active ? "rgba(0,238,252,0.5)" : "transparent",
        }}
        animate={{ rotate: active ? -360 : 0 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      {/* Glow dot orbiting on outer ring */}
      {active && (
        <motion.div
          className="absolute"
          style={{ width: 36, height: 36 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute rounded-full bg-primary"
            style={{
              width: "1px",
              height: "1px",
              top: 0,
              left: "50%",
              marginLeft: -0.5,
              boxShadow: "0 0 2px rgba(0,238,252,0.5)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}

export function SideNav() {
  const [activeId, setActiveId]       = useState("inicio");
  const [hoveredId, setHoveredId]     = useState<string | null>(null);
  const activeIndex = navItems.findIndex((n) => n.id === activeId);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) setActiveId(id); },
        { threshold: 0, rootMargin: "-20% 0px -80% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="fixed left-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-[95]"
    >
      <div
        className="relative rounded-r-2xl py-6 px-3 flex flex-col gap-1 overflow-hidden"
        style={{
          background: "linear-gradient(180deg,rgba(8,8,18,0.92) 0%,rgba(5,5,12,0.95) 100%)",
          backdropFilter: "blur(24px) saturate(1.5)",
          WebkitBackdropFilter: "blur(24px) saturate(1.5)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderLeft: "none",
          boxShadow: "8px 0 40px rgba(0,0,0,0.6), inset -1px 0 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Right edge glow */}
        <div className="absolute right-0 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

        {navItems.map((item, index) => {
          const isActive  = activeId  === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <div key={item.id} className="flex flex-col items-center">
              <a
                href={item.href}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl
                           transition-all duration-300 group"
                style={{
                  background: isActive
                    ? "rgba(0,238,252,0.07)"
                    : isHovered
                    ? "rgba(0,238,252,0.04)"
                    : "transparent",
                }}
              >
              {/* Orbital node container */}
              <div className="relative flex items-center justify-center w-8 h-8">
                <RotatingRing active={isActive} />

                {/* Hover: subtle orbit ring */}
                {!isActive && isHovered && (
                  <motion.span
                    className="absolute rounded-full border border-primary/20"
                    style={{ width: 32, height: 32 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                )}

                {/* Icon container */}
                <div
                  className="relative w-8 h-8 rounded-full flex items-center justify-center
                             transition-all duration-300"
                  style={{
                    background: isActive
                      ? "transparent"
                      : isHovered
                      ? "rgba(0,238,252,0.06)"
                      : "rgba(255,255,255,0.03)",
                    boxShadow: "none",
                    border: isActive
                      ? "none"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <item.icon
                    size={14}
                    strokeWidth={isActive ? 2 : 1.5}
                    style={{ color: isActive ? "#00eefc" : isHovered ? "#00eefc" : "#64748b" }}
                  />
                </div>
              </div>

              {/* Label */}
              <span
                className="text-[7px] font-bold tracking-widest uppercase font-mono transition-colors duration-300"
                style={{ color: isActive ? "#00eefc" : isHovered ? "rgba(0,238,252,0.7)" : "#475569" }}
              >
                {item.label}
              </span>

              {/* Active right-edge accent */}
              {isActive && (
                <motion.div
                  layoutId="side-active-bar"
                  className="absolute right-0 top-[20%] bottom-[20%] w-[2px] rounded-l-full"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,238,252,0.1), rgba(0,238,252,0.8), rgba(0,238,252,0.1))",
                    boxShadow: "0 0 8px rgba(0,238,252,0.6)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Tooltip on hover */}
              <AnimatePresence>
                {isHovered && !isActive && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2
                               whitespace-nowrap text-[10px] font-mono font-bold uppercase tracking-widest
                               text-primary bg-black/80 border border-primary/20 rounded-md px-2.5 py-1
                               shadow-[0_0_15px_rgba(0,238,252,0.2)] pointer-events-none"
                  >
                    {item.label}
                    <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0
                                     border-t-4 border-b-4 border-r-4 border-transparent border-r-primary/20" />
                  </motion.span>
                )}
              </AnimatePresence>
            </a>

            {/* Connector line between items */}
            {index < navItems.length - 1 && (
              <div className="w-px h-3 relative">
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: index < activeIndex
                      ? "linear-gradient(180deg, rgba(0,238,252,0.6), rgba(0,238,252,0.3))"
                      : "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
                    boxShadow: index < activeIndex ? "0 0 4px rgba(0,238,252,0.4)" : "none",
                  }}
                />
              </div>
            )}
          </div>
          );
        })}
      </div>
    </motion.aside>
  );
}
