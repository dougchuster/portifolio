"use client";

import { useEffect, useRef } from "react";

/**
 * OrbitalLogo
 * Mini canvas orb extracted from the artificial-hero component.
 * Renders the glitch+atmosphere circle effect at a small fixed size.
 */
export function OrbitalLogo({ size = 32 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);
  const timeRef   = useRef(0);

  // GSAP-free params – drive with simple rAF counters instead
  const rotRef    = useRef(0);
  const atmRef    = useRef(0);
  const atmDirRef = useRef(1);
  const glitchRef = useRef(0);
  const nextGlitchRef = useRef(Math.random() * 3 + 1); // seconds until next glitch burst

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const px  = size * DPR;

    canvas.width  = px;
    canvas.height = px;
    canvas.style.width  = `${size}px`;
    canvas.style.height = `${size}px`;

    const render = () => {
      const dt = 0.016;
      timeRef.current += dt;

      // Rotation: full turn every 8 s
      rotRef.current = (rotRef.current + (Math.PI * 2) / (8 / dt)) % (Math.PI * 2);

      // Atmosphere oscillation
      atmRef.current += atmDirRef.current * dt * (1 / 6); // period ≈ 6 s
      if (atmRef.current >= 1) { atmRef.current = 1; atmDirRef.current = -1; }
      if (atmRef.current <= 0) { atmRef.current = 0; atmDirRef.current =  1; }

      // Glitch: random burst
      nextGlitchRef.current -= dt;
      if (nextGlitchRef.current <= 0) {
        glitchRef.current = 1;
        nextGlitchRef.current = Math.random() * 4 + 1.5;
      } else {
        glitchRef.current = Math.max(0, glitchRef.current - dt * 10); // fade out fast
      }

      // ── Draw ──────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, px, px);

      const cx = px / 2;
      const cy = px / 2;
      const r  = px * 0.28; // orb radius

      const hue        = 185 + atmRef.current * 55; // 185-240 shift
      const glitch     = glitchRef.current;
      const shouldGlitch = glitch > 0.5 && Math.random() < 0.15;
      const gOffset    = shouldGlitch ? (Math.random() - 0.5) * 4 * glitch : 0;

      // Atmospheric glow
      const bgGrad = ctx.createRadialGradient(cx, cy - px * 0.05, 0, cx, cy, px * 0.6);
      bgGrad.addColorStop(0,   `hsla(${hue + 40}, 80%, 60%, 0.35)`);
      bgGrad.addColorStop(0.4, `hsla(${hue},      60%, 40%, 0.20)`);
      bgGrad.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, px, px);

      // ── Orb gradient ───────────────────────────────────────────────────
      ctx.save();
      if (shouldGlitch) ctx.translate(gOffset, gOffset * 0.7);

      const orbGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.5);
      orbGrad.addColorStop(0,   `hsla(${hue + 10}, 100%, 95%, 0.85)`);
      orbGrad.addColorStop(0.25, `hsla(${hue + 20},  90%, 78%, 0.65)`);
      orbGrad.addColorStop(0.6,  `hsla(${hue},       70%, 50%, 0.35)`);
      orbGrad.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = orbGrad;
      ctx.fillRect(0, 0, px, px);

      // Bright core
      const coreR = r * 0.28;
      ctx.fillStyle = `hsla(${hue + 20}, 100%, 95%, 0.9)`;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // Outer ring
      const ringR = r * 1.15 + (shouldGlitch ? (Math.random() - 0.5) * 2 * glitch : 0);
      ctx.strokeStyle = `hsla(${hue + 20}, 80%, 70%, 0.55)`;
      ctx.lineWidth    = DPR * 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.stroke();

      // RGB glitch split
      if (shouldGlitch) {
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = `hsla(120, 100%, 50%, ${0.4 * glitch})`;
        ctx.beginPath();
        ctx.arc(cx + gOffset * 0.4, cy, coreR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsla(240, 100%, 50%, ${0.35 * glitch})`;
        ctx.beginPath();
        ctx.arc(cx - gOffset * 0.4, cy, coreR, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      // ASCII sphere dots (light-weight version for small size)
      const density = " .:-=+*#%@";
      ctx.font = `${DPR * 3.5}px "JetBrains Mono", monospace`;
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";

      const spacing = DPR * 4;
      const cols = Math.floor(px / spacing);
      const rows = Math.floor(px / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i - cols / 2) * spacing + cx;
          const y = (j - rows / 2) * spacing + cy;
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < r && Math.random() > 0.45) {
            const z          = Math.sqrt(Math.max(0, r * r - dx * dx - dy * dy));
            const angle      = rotRef.current;
            const rotZ       = dx * Math.sin(angle) + z * Math.cos(angle);
            const brightness = (rotZ + r) / (r * 2);

            if (rotZ > -r * 0.3) {
              let char = density[Math.floor(brightness * (density.length - 1))];
              if (glitch > 0.8 && Math.random() < 0.25) {
                const gc = ["█","▓","▒","░","▄","▀"];
                char = gc[Math.floor(Math.random() * gc.length)];
              }
              ctx.fillStyle = `rgba(255,255,255,${Math.max(0.15, brightness)})`;
              ctx.fillText(char, x, y);
            }
          }
        }
      }

      ctx.restore();

      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,238,252,0.08) 0%, rgba(0,0,0,0.3) 70%)",
      }}
    />
  );
}
