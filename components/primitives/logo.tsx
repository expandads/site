import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 110"
      className={cn("h-8 md:h-10 w-auto", className)}
      role="img"
      aria-label="Ad Expand"
      fill="currentColor"
    >
      <path
        d="M8 8 h46 a42 42 0 0 1 42 42 v8 a42 42 0 0 1 -42 42 h-46 z M20 20 v68 h34 a30 30 0 0 0 30-30 v-8 a30 30 0 0 0 -30-30 z"
        fillRule="evenodd"
      />
      <rect x="50" y="20" width="12" height="68" />
      <text
        x="130"
        y="84"
        fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
        fontWeight="800"
        fontSize="92"
        letterSpacing="-4"
        fill="currentColor"
      >
        expand
      </text>
    </svg>
  );
}
