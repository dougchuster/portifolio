"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "0123456789!@#$%&*<>[]|/\\^~";

export function TextScramble({
  text,
  className,
  delay = 0,
  duration = 1300,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const [output, setOutput] = useState(() => text.replace(/[^\s]/g, CHARS[0]));
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(spanRef, { once: true });
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isInView) return;

    timerRef.current = setTimeout(() => {
      let startTime: number | null = null;
      const chars = [...text];

      const frame = (ts: number) => {
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const revealed = Math.floor(progress * chars.length);

        const result = chars.map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealed) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        });

        setOutput(result.join(""));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(frame);
        }
      };

      rafRef.current = requestAnimationFrame(frame);
    }, delay * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, text, duration, delay]);

  return (
    <span ref={spanRef} className={className}>
      {output}
    </span>
  );
}
