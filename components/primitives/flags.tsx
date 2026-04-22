import { cn } from "@/lib/utils";

/**
 * Mini bandeiras em SVG (20x14). Cores oficiais simplificadas,
 * detalhes omitidos no tamanho pequeno (estrelas, inscricoes) pra
 * manter nitidez em 16-22px.
 */

type FlagProps = { className?: string; title?: string };

export function FlagBR({ className, title }: FlagProps) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <rect width="20" height="14" rx="1.5" fill="#009C3B" />
      <polygon points="10,2 17.5,7 10,12 2.5,7" fill="#FFDF00" />
      <circle cx="10" cy="7" r="2.4" fill="#002776" />
    </svg>
  );
}

export function FlagUS({ className, title }: FlagProps) {
  // 13 faixas iguais (1.077 cada). 7 vermelhas, 6 brancas.
  const stripe = 14 / 13;
  const redStripes = [0, 2, 4, 6, 8, 10, 12];
  return (
    <svg
      viewBox="0 0 20 14"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <rect width="20" height="14" rx="1.5" fill="#FFFFFF" />
      {redStripes.map((i) => (
        <rect
          key={i}
          x="0"
          y={i * stripe}
          width="20"
          height={stripe}
          fill="#B22234"
        />
      ))}
      {/* Canton azul: 7 faixas de altura, ~40% da largura */}
      <rect
        x="0"
        y="0"
        width="8"
        height={stripe * 7}
        fill="#3C3B6E"
      />
      {/* Clip das bordas arredondadas */}
      <rect
        x="0"
        y="0"
        width="20"
        height="14"
        rx="1.5"
        fill="none"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

export const Flags = {
  BR: FlagBR,
  US: FlagUS,
} as const;

export type FlagCode = keyof typeof Flags;
