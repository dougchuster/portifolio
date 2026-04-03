"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { OrbitalLogo } from "@/components/ui/orbital-logo";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [autoCycleIndex, setAutoCycleIndex] = useState<number>(-1);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      collapseAll();
      setIsUserInteracting(false);
    }
  };

  const collapseAll = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  };

  // Auto-cycle through nodes
  useEffect(() => {
    if (isUserInteracting) return;

    const cycleDelay = 3500;
    const expandDuration = 3000;

    cycleTimerRef.current = setTimeout(() => {
      setAutoCycleIndex((prev) => {
        const next = (prev + 1) % timelineData.length;
        const item = timelineData[next];

        // Rotate to position
        const targetAngle = (next / timelineData.length) * 360;
        setRotationAngle(270 - targetAngle);
        setAutoRotate(false);

        // Expand node
        const newState: Record<number, boolean> = {};
        newState[item.id] = true;
        setExpandedItems(newState);
        setActiveNodeId(item.id);

        // Highlight related
        const newPulse: Record<number, boolean> = {};
        item.relatedIds.forEach((relId) => { newPulse[relId] = true; });
        setPulseEffect(newPulse);

        // Collapse after delay
        setTimeout(() => {
          if (!isUserInteracting) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
          }
        }, expandDuration);

        return next;
      });
    }, cycleDelay);

    return () => {
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
  }, [autoCycleIndex, isUserInteracting, timelineData]);

  const toggleItem = (id: number) => {
    setIsUserInteracting(true);
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      // Collapse all others
      Object.keys(prev).forEach((key) => { newState[parseInt(key)] = false; });

      if (!prev[id]) {
        newState[id] = true;
        setActiveNodeId(id);
        setAutoRotate(false);
        const newPulse: Record<number, boolean> = {};
        getRelatedItems(id).forEach((relId) => { newPulse[relId] = true; });
        setPulseEffect(newPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
        // Resume auto-cycle after interaction
        setTimeout(() => setIsUserInteracting(false), 5000);
      }
      return newState;
    });
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.15) % 360).toFixed(3)));
      }, 50);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = useCallback((index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 240;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const depth = Math.max(0.35, (1 + Math.cos(radian)) / 2);
    return { x, y, angle, zIndex, opacity: 0.35 + 0.65 * depth, scale: 0.75 + 0.25 * depth };
  }, [rotationAngle]);

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusLabel = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "COMPLETO";
      case "in-progress": return "EM PROGRESSO";
      case "pending": return "PENDENTE";
      default: return "PENDENTE";
    }
  };

  const getStatusColor = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "text-primary bg-primary/20 border-primary/40";
      case "in-progress": return "text-white bg-white/20 border-white/40";
      case "pending": return "text-slate-400 bg-white/5 border-white/20";
      default: return "text-slate-400 bg-white/5 border-white/20";
    }
  };

  return (
    <div
      className="w-full h-[600px] flex flex-col items-center justify-center overflow-visible relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,238,252,0.15) 2px, rgba(0,238,252,0.15) 4px)",
            }}
          />

          {/* Orbit rings */}
          <div className="absolute w-[520px] h-[520px] rounded-full border border-white/[0.03]" />
          <div className="absolute w-[480px] h-[480px] rounded-full border border-primary/[0.06]" />
          <div className="absolute w-[440px] h-[440px] rounded-full border border-white/[0.04] border-dashed" />

          {/* Center node — Orbital canvas orb */}
          <div className="absolute flex items-center justify-center z-10" style={{ width: 96, height: 96 }}>
            {/* Ping aura rings */}
            <div className="absolute w-28 h-28 rounded-full border border-primary/20 animate-ping opacity-50" />
            <div className="absolute w-36 h-36 rounded-full border border-primary/10 animate-ping opacity-30" style={{ animationDelay: "0.6s" }} />
            <div className="absolute w-44 h-44 rounded-full border border-secondary/8 animate-ping opacity-15" style={{ animationDelay: "1.2s" }} />
            {/* Glitch orb canvas */}
            <div className="drop-shadow-[0_0_18px_rgba(0,238,252,0.55)]">
              <OrbitalLogo size={96} />
            </div>
          </div>

          {/* Connection lines */}
          <svg className="absolute pointer-events-none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            {activeNodeId && getRelatedItems(activeNodeId).map((relId) => {
              const activeIndex = timelineData.findIndex((i) => i.id === activeNodeId);
              const relIndex = timelineData.findIndex((i) => i.id === relId);
              if (activeIndex === -1 || relIndex === -1) return null;
              const pos1 = calculateNodePosition(activeIndex, timelineData.length);
              const pos2 = calculateNodePosition(relIndex, timelineData.length);
              return (
                <line
                  key={`line-${activeNodeId}-${relId}`}
                  x1={`calc(50% + ${pos1.x}px)`}
                  y1={`calc(50% + ${pos1.y}px)`}
                  x2={`calc(50% + ${pos2.x}px)`}
                  y2={`calc(50% + ${pos2.y}px)`}
                  stroke="rgba(0,238,252,0.25)"
                  strokeWidth="1"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              );
            })}
          </svg>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${isExpanded ? 1.2 : position.scale})`,
                  zIndex: isExpanded ? 90 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Glow */}
                <div
                  className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: isExpanded
                      ? "radial-gradient(circle, rgba(0,238,252,0.35) 0%, rgba(0,238,252,0) 70%)"
                      : "radial-gradient(circle, rgba(0,238,252,0.12) 0%, rgba(0,238,252,0) 70%)",
                    width: "90px",
                    height: "90px",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-45px",
                    marginTop: "-45px",
                  }}
                />

                {/* Rotating ring */}
                <div
                  className={`absolute rounded-full border transition-all duration-500 ${
                    isExpanded
                      ? "border-primary/40 border-dashed"
                      : isRelated
                      ? "border-primary/25"
                      : "border-white/8"
                  }`}
                  style={{
                    width: "76px",
                    height: "76px",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-38px",
                    marginTop: "-38px",
                    ...(isExpanded ? { animation: "spin 6s linear infinite" } : {}),
                  }}
                />

                {/* Node circle */}
                <div
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center
                    transition-all duration-300 transform relative
                    ${isExpanded
                      ? "bg-primary text-black shadow-[0_0_40px_rgba(0,238,252,0.6),0_0_80px_rgba(0,238,252,0.2)]"
                      : isRelated
                      ? "bg-primary/30 text-white shadow-[0_0_25px_rgba(0,238,252,0.3)]"
                      : "bg-black/80 border border-white/15 text-white hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,238,252,0.15)]"
                    }
                    ${isRelated && !isExpanded ? "animate-pulse" : ""}
                  `}
                >
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                {/* Label */}
                <div
                  className={`
                    absolute top-[76px] whitespace-nowrap
                    text-[11px] font-bold uppercase tracking-wider font-mono
                    transition-all duration-300 text-center left-1/2 -translate-x-1/2
                    ${isExpanded ? "text-primary neon-text-cyan" : isRelated ? "text-primary/70" : "text-slate-500"}
                  `}
                >
                  {item.title}
                </div>

                {/* Expanded Card */}
                {isExpanded && (
                  <div className="absolute top-28 left-1/2 -translate-x-1/2 w-72 cyber-glass rounded-xl border border-primary/20 shadow-[0_0_50px_rgba(0,238,252,0.12)] p-5 z-40">
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-primary/40" />

                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusColor(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">{item.date}</span>
                    </div>

                    <h4 className="text-base font-bold mb-2 font-headline">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.content}</p>

                    {/* Energy bar */}
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <div className="flex justify-between items-center text-[9px] mb-1.5">
                        <span className="flex items-center text-slate-500">
                          <Zap size={10} className="mr-1 text-primary" />
                          Proficiência
                        </span>
                        <span className="font-mono text-primary font-bold">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary via-cyan-400 to-secondary shadow-[0_0_10px_rgba(0,238,252,0.5)]"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>
                    </div>

                    {/* Connected nodes */}
                    {item.relatedIds.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex items-center mb-2">
                          <Link size={9} className="text-slate-500 mr-1" />
                          <span className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">Conexões</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.relatedIds.map((relatedId) => {
                            const relatedItem = timelineData.find((i) => i.id === relatedId);
                            return (
                              <button
                                key={relatedId}
                                className="flex items-center h-6 px-2.5 text-[9px] font-mono rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/15 text-primary hover:text-white transition-all"
                                onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                              >
                                {relatedItem?.title}
                                <ArrowRight size={8} className="ml-1 opacity-60" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
