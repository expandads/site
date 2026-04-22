"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Moldura de MacBook (vista frontal) em SVG.
 * - Desktop (md+): aspect 1200/780 — proporcao original do MacBook, sem distorcao.
 * - Mobile: aspect 1200/858 — chassis esticado +10% vertical pra dar mais
 *   espaco de preview dentro de um card estreito. preserveAspectRatio="none"
 *   faz o SVG acompanhar o wrapper, e as % da area de tela continuam
 *   funcionando (sao relativas).
 */

// Area de tela relativa ao viewBox 1200x780 (funciona pros dois breakpoints
// porque preserveAspectRatio="none" escala proporcionalmente).
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
  const visibleRef = useRef(false);

  // Loop RAF persistente + IntersectionObserver pra auto-scroll suave.
  // Nao reseta em hover/touch nem em idas-e-vindas do viewport.
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
      if (!visibleRef.current || hoveringRef.current) {
        wasPaused = true;
        rafId = requestAnimationFrame(tick);
        return;
      }
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
        className="relative w-full aspect-[1200/858] md:aspect-[1200/780]"
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
        {/* Moldura SVG (preserveAspectRatio="none" pra acompanhar o wrapper) */}
        <svg
          viewBox="0 0 1200 780"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          preserveAspectRatio="none"
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

          {/* Sombra base */}
          <ellipse cx="600" cy="770" rx="510" ry="8" fill="rgba(0,0,0,0.45)" />

          {/* Chassis/bezel */}
          <rect
            x="0"
            y="0"
            width="1200"
            height="740"
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
            height="120"
            rx="22"
            ry="22"
            fill="url(#mbGlare)"
          />

          {/* Notch topo */}
          <path
            d="M 540 45 L 540 55 Q 540 65 550 65 L 650 65 Q 660 65 660 55 L 660 45 Z"
            fill="#0a0a0b"
          />

          {/* Area da tela */}
          <rect x="55" y="45" width="1090" height="660" rx="6" ry="6" fill="#000" />

          {/* Base/hinge */}
          <path
            d="M 30 740 L 1170 740 L 1150 758 Q 1135 766 1120 766 L 80 766 Q 65 766 50 758 Z"
            fill="url(#mbBase)"
          />
          {/* Entalhe central */}
          <path
            d="M 530 740 Q 530 754 545 754 L 655 754 Q 670 754 670 740 Z"
            fill="#0a0a0b"
          />
          {/* Linha divisoria */}
          <line
            x1="0"
            y1="740"
            x2="1200"
            y2="740"
            stroke="rgba(0,0,0,0.7)"
            strokeWidth="1"
          />
        </svg>

        {/* Tela scrollavel */}
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
