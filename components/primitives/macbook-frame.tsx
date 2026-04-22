"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Moldura de MacBook Pro (vista frontal) em SVG.
 * Chassis + bezel + notch + base com entalhe central, proporcao 1200x780.
 * A area de tela e posicionada em % por cima do SVG e faz auto-scroll
 * suave enquanto esta no viewport, pausando em hover/touch sem resetar.
 */

// Area de tela relativa ao viewBox 1200x858 (x=55, y=50, w=1090, h=726).
// Proporcoes do MacBook mantidas; viewBox esticado +10% em altura pra dar
// mais espaco de preview dentro da tela.
const SCREEN = {
  top: "5.83%",
  left: "4.58%",
  width: "90.83%",
  height: "84.62%",
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
  const visibleRef = useRef(false);

  // Observer + loop RAF montados UMA VEZ no mount. visibleRef/hoveringRef
  // controlam o tick internamente sem destruir o loop. Assim phase/phaseStart
  // persistem entre idas-e-vindas do viewport e entre hovers.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const scrollEl = scrollRef.current;
    if (!wrapper || !scrollEl) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current =
          entry.isIntersecting && entry.intersectionRatio >= 0.35;
      },
      { threshold: [0, 0.35, 0.7] },
    );
    io.observe(wrapper);

    const DURATION_DOWN = 25000;
    const PAUSE_BOTTOM = 1200;
    const DURATION_UP = 900;

    let phase: "down" | "pause" | "up" = "down";
    let phaseStart = performance.now();
    let wasPaused = false;

    const max = () => Math.max(1, scrollEl.scrollHeight - scrollEl.clientHeight);

    const tick = (ts: number) => {
      // Pausa logica quando fora do viewport OU em hover.
      // NAO mexe no scrollTop, NAO avanca phase.
      if (!visibleRef.current || hoveringRef.current) {
        wasPaused = true;
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Retomando de pausa: re-sincroniza phaseStart a partir do scrollTop atual
      // (usuario pode ter rolado manualmente durante o hover).
      if (wasPaused) {
        wasPaused = false;
        const M = max();
        const pct = scrollEl.scrollTop / M;
        if (pct >= 0.995) {
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
        scrollEl.scrollTop = M * pct;
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
        scrollEl.scrollTop = M * (1 - pct);
        if (pct >= 1) {
          phase = "down";
          phaseStart = ts;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    let rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ aspectRatio: "1200 / 858" }}
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
        onTouchCancel={() => {
          hoveringRef.current = false;
        }}
      >
        {/* Moldura SVG */}
        <svg
          viewBox="0 0 1200 858"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="mbChassis" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4d4d52" />
              <stop offset="100%" stopColor="#2a2a2d" />
            </linearGradient>
            <linearGradient id="mbBase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#525258" />
              <stop offset="100%" stopColor="#2c2c30" />
            </linearGradient>
            <linearGradient id="mbGlare" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Sombra base (ambient) */}
          <ellipse cx="600" cy="847" rx="510" ry="9" fill="rgba(0,0,0,0.45)" />

          {/* Chassis/bezel */}
          <rect
            x="0"
            y="0"
            width="1200"
            height="814"
            rx="22"
            ry="22"
            fill="url(#mbChassis)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
          {/* Glare sutil topo */}
          <rect
            x="0"
            y="0"
            width="1200"
            height="132"
            rx="22"
            ry="22"
            fill="url(#mbGlare)"
          />

          {/* Notch centralizado no topo */}
          <path
            d="M 540 50 L 540 61 Q 540 72 550 72 L 650 72 Q 660 72 660 61 L 660 50 Z"
            fill="#0a0a0b"
          />

          {/* Area da tela (fundo escuro atras do conteudo rolavel) */}
          <rect x="55" y="50" width="1090" height="726" rx="6" ry="6" fill="#000" />

          {/* Base/hinge inferior */}
          <path
            d="M 30 814 L 1170 814 L 1150 834 Q 1135 843 1120 843 L 80 843 Q 65 843 50 834 Z"
            fill="url(#mbBase)"
          />
          {/* Entalhe central da base */}
          <path
            d="M 530 814 Q 530 829 545 829 L 655 829 Q 670 829 670 814 Z"
            fill="#0a0a0b"
          />
          {/* Linha divisoria chassis/base */}
          <line
            x1="0"
            y1="814"
            x2="1200"
            y2="814"
            stroke="rgba(0,0,0,0.7)"
            strokeWidth="1"
          />
        </svg>

        {/* Tela scrollavel (HTML sobreposto, alinhado com a area interna do SVG) */}
        <div
          ref={scrollRef}
          className="absolute overflow-y-auto overflow-x-hidden bg-black"
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
            sizes="(max-width: 768px) 92vw, 560px"
          />
        </div>

        {/* Botao tela cheia */}
        {onExpand && (
          <button
            type="button"
            onClick={onExpand}
            aria-label="Ver pagina em tela cheia"
            className="absolute bottom-[12%] right-[7%] z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black text-white text-xs font-medium backdrop-blur-sm border border-white/10 transition-colors"
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
