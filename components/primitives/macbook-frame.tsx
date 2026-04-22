"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Moldura de MacBook Pro (vista frontal) em SVG.
 * Chassis + bezel + notch + base com entalhe central, proporcao 1200x780.
 * A area de tela (conteudo interno) e posicionada em % por cima do SVG
 * e faz auto-scroll suave quando entra no viewport (pausa no hover).
 */

// Area de tela relativa ao viewBox 1200x780:
// x=55, y=45, w=1090, h=660
const SCREEN = {
  top: "5.77%",
  left: "4.58%",
  width: "90.83%",
  height: "84.61%",
};

export function MacbookFrame({
  src,
  alt,
  imgWidth,
  imgHeight,
  onExpand,
  className,
  label,
}: {
  src: string | StaticImageData;
  alt: string;
  imgWidth: number;
  imgHeight: number;
  onExpand?: () => void;
  className?: string;
  label?: ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  // Detecta visibilidade (>40% no viewport) pra ligar/desligar auto-scroll.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.4),
      { threshold: [0, 0.4, 0.8] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-scroll loop persistente: nao reseta em hover/touch.
  // - Em hover: pausa ticks, mas mantem phase/posicao atual.
  // - Ao sair do hover: re-sincroniza o timer com base no scrollTop atual
  //   (o usuario pode ter rolado manualmente) e continua de onde estava.
  // - Reset ao topo so acontece quando o ciclo natural completa (ao fim do "up").
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isVisible) return;

    const DURATION_DOWN = 25000;
    const PAUSE_BOTTOM = 1200;
    const DURATION_UP = 900;

    let rafId = 0;
    let phase: "down" | "pause" | "up" = "down";
    let phaseStart = performance.now();
    let wasHovering = false;

    const max = () => Math.max(1, el.scrollHeight - el.clientHeight);

    const tick = (ts: number) => {
      if (hoveringRef.current) {
        // Pausado: nao avanca nem mexe no scrollTop. Usuario pode rolar livre.
        wasHovering = true;
        rafId = requestAnimationFrame(tick);
        return;
      }
      if (wasHovering) {
        // Saindo do hover: resincroniza a partir da posicao atual, continua descendo.
        wasHovering = false;
        const M = max();
        const pct = el.scrollTop / M;
        if (pct >= 0.995) {
          // Ja estava no fim -> entra em pausa e depois volta ao topo.
          phase = "pause";
          phaseStart = ts;
        } else {
          phase = "down";
          phaseStart = ts - pct * DURATION_DOWN;
        }
      }

      const elapsed = ts - phaseStart;
      const M = max();

      if (phase === "down") {
        const pct = Math.min(1, elapsed / DURATION_DOWN);
        el.scrollTop = M * pct;
        if (pct >= 1) {
          phase = "pause";
          phaseStart = ts;
        }
      } else if (phase === "pause") {
        if (elapsed >= PAUSE_BOTTOM) {
          phase = "up";
          phaseStart = ts;
        }
      } else {
        const pct = Math.min(1, elapsed / DURATION_UP);
        el.scrollTop = M * (1 - pct);
        if (pct >= 1) {
          phase = "down";
          phaseStart = ts;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible]);

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ aspectRatio: "1200 / 780" }}
        onMouseEnter={() => {
          hoveringRef.current = true;
        }}
        onMouseLeave={() => {
          hoveringRef.current = false;
        }}
        onTouchStart={() => {
          hoveringRef.current = true;
        }}
        onTouchEnd={() => {
          hoveringRef.current = false;
        }}
      >
        {/* Moldura SVG (absoluta, cobre todo o wrapper) */}
        <svg
          viewBox="0 0 1200 780"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="mbChassis" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2c2c30" />
              <stop offset="100%" stopColor="#1a1a1d" />
            </linearGradient>
            <linearGradient id="mbBase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a3a3e" />
              <stop offset="100%" stopColor="#1a1a1d" />
            </linearGradient>
            <linearGradient id="mbGlare" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Sombra base (ambient) */}
          <ellipse cx="600" cy="770" rx="500" ry="7" fill="rgba(0,0,0,0.35)" />

          {/* Chassis/bezel (display lid) */}
          <rect
            x="0"
            y="0"
            width="1200"
            height="740"
            rx="22"
            ry="22"
            fill="url(#mbChassis)"
          />
          {/* Glare sutil topo */}
          <rect
            x="0"
            y="0"
            width="1200"
            height="120"
            rx="22"
            ry="22"
            fill="url(#mbGlare)"
          />

          {/* Notch centralizado no topo */}
          <path
            d="M 540 45 L 540 55 Q 540 65 550 65 L 650 65 Q 660 65 660 55 L 660 45 Z"
            fill="#0a0a0b"
          />

          {/* Furo da tela (recorte escuro onde vai o conteudo; ficara atras do div scrollavel) */}
          <rect x="55" y="45" width="1090" height="660" rx="6" ry="6" fill="#000" />

          {/* Base/hinge inferior */}
          <path
            d="M 30 740 L 1170 740 L 1150 755 Q 1135 764 1120 764 L 80 764 Q 65 764 50 755 Z"
            fill="url(#mbBase)"
          />

          {/* Entalhe central da base (o grip de abrir o MacBook) */}
          <path
            d="M 530 740 Q 530 752 545 752 L 655 752 Q 670 752 670 740 Z"
            fill="#0a0a0b"
          />

          {/* Linha de separacao chassis/base */}
          <line
            x1="0"
            y1="740"
            x2="1200"
            y2="740"
            stroke="rgba(0,0,0,0.6)"
            strokeWidth="1"
          />
        </svg>

        {/* Area de tela scrollavel (HTML sobreposto) */}
        <div
          ref={scrollRef}
          className="absolute overflow-y-auto overflow-x-hidden bg-black scrollbar-thin"
          style={{
            top: SCREEN.top,
            left: SCREEN.left,
            width: SCREEN.width,
            height: SCREEN.height,
            borderRadius: "4px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.2) transparent",
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={imgWidth}
            height={imgHeight}
            className="w-full h-auto block select-none"
            sizes="(max-width: 768px) 90vw, 560px"
            priority={false}
          />
        </div>

        {/* Botao "ver em tela cheia" */}
        {onExpand && (
          <button
            type="button"
            onClick={onExpand}
            aria-label="Ver pagina em tela cheia"
            className="absolute bottom-[12%] right-[7%] z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs font-medium backdrop-blur-sm border border-white/10 transition-colors"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 3h6v6" />
              <path d="M9 21H3v-6" />
              <path d="M21 3l-7 7" />
              <path d="M3 21l7-7" />
            </svg>
            Tela cheia
          </button>
        )}
      </div>

      {label && <div className="mt-4">{label}</div>}
    </div>
  );
}
