import { cn } from "@/lib/utils";

/**
 * Ilustracao vetorial de nota de dinheiro sendo queimada.
 * Uso decorativo no background da secao "Problema".
 */
export function MoneyBurn({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 360"
      className={cn("w-full h-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Nota de dinheiro inclinada, cantos um pouco queimados */}
      <g transform="translate(60 170) rotate(-12)">
        <path d="M8 30 C 20 10, 80 4, 130 12 C 160 16, 190 22, 210 30 L 212 110 C 180 120, 140 124, 100 120 C 60 116, 30 108, 10 100 Z" />
        {/* Cantos desgastados (linhas irregulares) */}
        <path d="M8 30 L 18 24 M 210 30 L 220 22 M 212 110 L 222 116 M 10 100 L 4 108" opacity="0.7" />
        {/* Moldura interna */}
        <rect x="22" y="42" width="170" height="60" rx="2" opacity="0.45" />
        {/* Cifrao centralizado */}
        <text
          x="107"
          y="86"
          fontFamily="var(--font-space-grotesk), sans-serif"
          fontSize="34"
          fontWeight="700"
          textAnchor="middle"
          stroke="none"
          fill="currentColor"
          opacity="0.55"
        >
          $
        </text>
        {/* Detalhes nos cantos */}
        <circle cx="30" cy="52" r="6" opacity="0.4" />
        <circle cx="185" cy="52" r="6" opacity="0.4" />
        <circle cx="30" cy="92" r="6" opacity="0.4" />
        <circle cx="185" cy="92" r="6" opacity="0.4" />
      </g>

      {/* Chamas subindo (tracos ondulados) */}
      <g opacity="0.9">
        <path d="M90 170 C 95 150, 85 135, 95 115 C 102 100, 94 85, 108 68 C 118 55, 112 40, 122 22" />
        <path d="M140 170 C 145 150, 138 130, 150 110 C 158 95, 150 80, 162 60 C 170 45, 166 28, 176 12" />
        <path d="M190 170 C 196 152, 190 135, 202 115 C 212 98, 204 82, 216 64 C 224 50, 220 34, 230 20" />
        <path d="M238 170 C 244 152, 240 138, 250 120 C 258 104, 252 88, 264 70 C 270 58, 268 44, 274 32" />
      </g>

      {/* Particulas subindo (traços curtos) */}
      <g opacity="0.55" stroke="currentColor" strokeWidth="1.1">
        <path d="M116 30 L 116 18" />
        <path d="M150 50 L 150 40" />
        <path d="M188 20 L 188 8" />
        <path d="M220 48 L 220 36" />
        <path d="M258 28 L 258 16" />
        <path d="M78 120 L 78 108" />
        <path d="M292 100 L 292 90" />
      </g>
    </svg>
  );
}
