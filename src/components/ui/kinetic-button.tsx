"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KineticButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function KineticButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
}: KineticButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-primary-muted text-black hover:shadow-[0_0_30px_rgba(0,238,252,0.4)] hover:scale-105",
    ghost:
      "cyber-glass text-white border border-white/10 hover:bg-white/5",
    glass:
      "bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-black shadow-[0_0_15px_rgba(0,238,252,0.3)]",
  };

  const sizes = {
    sm: "px-6 py-3 text-[10px] rounded-lg",
    md: "px-10 py-5 text-xs rounded-2xl",
    lg: "px-14 py-6 text-sm rounded-2xl",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
