"use client";

import { useEffect, useRef } from "react";

interface EnergyGridProps {
  className?: string;
}

export function EnergyGrid({ className = "" }: EnergyGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
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

    const GRID_SIZE = 60;
    const PULSE_COUNT = 6;
    const LINE_ALPHA = 0.035;
    const PULSE_ALPHA = 0.6;
    const PULSE_LENGTH = 8;

    interface Pulse {
      x: number;
      y: number;
      dir: "h" | "v";
      speed: number;
      alpha: number;
      color: [number, number, number];
    }

    const pulses: Pulse[] = [];
    for (let i = 0; i < PULSE_COUNT; i++) {
      const isH = Math.random() > 0.5;
      const gridPos = Math.floor(Math.random() * (isH ? h() : w()) / GRID_SIZE);
      pulses.push({
        x: isH ? 0 : gridPos * GRID_SIZE,
        y: isH ? gridPos * GRID_SIZE : 0,
        dir: isH ? "h" : "v",
        speed: 1.5 + Math.random() * 2.5,
        alpha: PULSE_ALPHA * (0.5 + Math.random() * 0.5),
        color: Math.random() > 0.4 ? [0, 238, 252] : [124, 58, 237],
      });
    }

    let time = 0;

    const draw = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w(), h());

      // Grid lines
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w(); x += GRID_SIZE) {
        const flicker = LINE_ALPHA + Math.sin(time * 0.5 + x * 0.01) * 0.008;
        ctx.strokeStyle = `rgba(0, 238, 252, ${flicker})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h());
        ctx.stroke();
      }
      for (let y = 0; y < h(); y += GRID_SIZE) {
        const flicker = LINE_ALPHA + Math.cos(time * 0.4 + y * 0.01) * 0.008;
        ctx.strokeStyle = `rgba(0, 238, 252, ${flicker})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w(), y);
        ctx.stroke();
      }

      // Intersection dots
      for (let x = 0; x < w(); x += GRID_SIZE) {
        for (let y = 0; y < h(); y += GRID_SIZE) {
          const pulse = Math.sin(time * 1.2 + x * 0.005 + y * 0.005) * 0.5 + 0.5;
          const alpha = 0.02 + pulse * 0.03;
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 238, 252, ${alpha})`;
          ctx.fill();
        }
      }

      // Energy pulses
      pulses.forEach((p) => {
        if (p.dir === "h") {
          p.x += p.speed;
          if (p.x > w() + PULSE_LENGTH * GRID_SIZE) {
            p.x = -PULSE_LENGTH * GRID_SIZE;
            p.y = Math.floor(Math.random() * (h() / GRID_SIZE)) * GRID_SIZE;
            p.alpha = PULSE_ALPHA * (0.5 + Math.random() * 0.5);
            p.color = Math.random() > 0.4 ? [0, 238, 252] : [124, 58, 237];
          }
          const [r, g, b] = p.color;
          for (let i = 0; i < PULSE_LENGTH; i++) {
            const segX = p.x - i * GRID_SIZE;
            if (segX < -GRID_SIZE || segX > w() + GRID_SIZE) continue;
            const segAlpha = p.alpha * (1 - i / PULSE_LENGTH) * 0.15;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${segAlpha})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(segX, p.y);
            ctx.lineTo(segX + GRID_SIZE, p.y);
            ctx.stroke();
          }
          // Head glow
          const headGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 12);
          headGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.3})`);
          headGlow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = headGlow;
          ctx.fillRect(p.x - 12, p.y - 12, 24, 24);
        } else {
          p.y += p.speed;
          if (p.y > h() + PULSE_LENGTH * GRID_SIZE) {
            p.y = -PULSE_LENGTH * GRID_SIZE;
            p.x = Math.floor(Math.random() * (w() / GRID_SIZE)) * GRID_SIZE;
            p.alpha = PULSE_ALPHA * (0.5 + Math.random() * 0.5);
            p.color = Math.random() > 0.4 ? [0, 238, 252] : [124, 58, 237];
          }
          const [r, g, b] = p.color;
          for (let i = 0; i < PULSE_LENGTH; i++) {
            const segY = p.y - i * GRID_SIZE;
            if (segY < -GRID_SIZE || segY > h() + GRID_SIZE) continue;
            const segAlpha = p.alpha * (1 - i / PULSE_LENGTH) * 0.15;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${segAlpha})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(p.x, segY);
            ctx.lineTo(p.x, segY + GRID_SIZE);
            ctx.stroke();
          }
          const headGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 12);
          headGlow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.3})`);
          headGlow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          ctx.fillStyle = headGlow;
          ctx.fillRect(p.x - 12, p.y - 12, 24, 24);
        }
      });

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
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}
