"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CyberGlassProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: keyof HTMLElementTagNameMap;
}

export function CyberGlass({
  children,
  className,
  hover = true,
  as: Component = "div",
}: CyberGlassProps) {
  return (
    <Component
      className={cn(
        "cyber-glass rounded-2xl",
        hover && "kinetic-hover",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function GlowOrb({
  className,
  color = "primary",
}: {
  className?: string;
  color?: "primary" | "secondary";
}) {
  return (
    <div
      className={cn(
        "glow-orb",
        color === "primary" ? "bg-primary/10" : "bg-secondary/10",
        className
      )}
    />
  );
}

export function SectionLabel({
  children,
  className,
  color = "cyan",
}: {
  children: ReactNode;
  className?: string;
  color?: "cyan" | "purple";
}) {
  return (
    <span
      className={cn(
        "text-xs font-mono font-bold uppercase tracking-[0.5em] mb-6 block",
        color === "cyan"
          ? "text-primary neon-text-cyan"
          : "text-secondary neon-text-purple",
        className
      )}
    >
      <span className="opacity-35 mr-1 select-none">// </span>{children}
    </span>
  );
}
