import { cn } from "@/lib/utils";

/**
 * Silhueta estilizada do Brasil. Uso decorativo (background do hero).
 * Path simplificado mas com proporcoes reconheciveis: bulge nordeste,
 * afinamento no sul, borda norte (Roraima/Amazonas).
 */
export function BrazilMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 440"
      className={cn("w-full h-full", className)}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M142 18 C162 10 188 14 210 22 C228 28 244 38 260 50 C272 58 280 70 288 82 C296 94 304 106 312 120 C318 132 322 146 324 160 C326 174 324 188 320 200 C316 212 310 224 306 236 C302 248 300 260 298 270 C296 280 290 288 282 296 C274 304 266 312 260 322 C254 332 252 342 248 352 C244 362 238 372 230 380 C222 388 214 394 204 400 C194 406 182 410 170 408 C158 406 146 402 136 394 C126 386 118 376 110 364 C102 352 96 340 90 326 C84 312 80 298 76 284 C72 270 70 256 68 242 C66 228 64 214 60 200 C56 186 50 172 48 158 C46 144 50 130 56 118 C62 106 72 96 82 86 C92 76 104 68 116 60 C128 52 140 44 148 34 C152 28 144 24 142 18 Z"
      />
      {/* Pequenos acentos (pontos representando capitais) */}
      <circle cx="260" cy="120" r="3" opacity="0.6" />
      <circle cx="220" cy="190" r="3" opacity="0.6" />
      <circle cx="170" cy="270" r="3" opacity="0.6" />
      <circle cx="150" cy="340" r="3" opacity="0.6" />
      <circle cx="120" cy="150" r="3" opacity="0.6" />
    </svg>
  );
}
