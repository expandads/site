import { cn } from "@/lib/utils";

/**
 * Silhueta estilizada do Brasil (contorno).
 * Uso decorativo - fica meio escondida atras do texto.
 * viewBox "alto" pra permitir cropping nos lados.
 */
export function BrazilMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 560"
      className={cn("w-full h-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="
          M 180 40
          C 195 36 210 44 220 52
          L 228 42
          C 238 38 248 48 252 58
          L 262 50
          C 276 46 290 54 296 66
          L 306 58
          C 320 58 332 66 340 78
          L 352 70
          C 368 72 382 82 392 96
          C 402 108 410 122 416 138
          C 422 154 424 172 420 188
          C 416 204 408 218 402 232
          C 396 246 392 260 394 274
          C 396 288 402 300 410 312
          C 418 324 428 334 436 346
          C 444 358 450 372 448 386
          C 446 400 438 412 430 422
          C 422 432 410 440 398 446
          C 384 452 370 454 354 454
          C 338 454 322 450 308 442
          C 296 434 286 424 280 412
          L 272 426
          C 266 440 258 454 250 466
          C 242 478 232 490 220 498
          C 208 506 194 510 180 510
          L 176 522
          C 170 532 156 538 144 534
          C 132 530 124 518 126 506
          L 116 500
          C 106 492 102 480 104 468
          L 92 460
          C 82 450 78 436 82 422
          C 86 408 94 398 104 390
          L 100 378
          C 94 366 94 352 100 340
          C 106 328 116 320 128 316
          L 122 304
          C 116 292 114 278 118 266
          C 122 254 130 244 140 238
          L 134 224
          C 128 210 124 196 124 180
          C 124 164 128 150 134 138
          L 126 126
          C 120 114 118 100 122 88
          C 126 76 134 66 144 60
          C 154 54 166 50 180 48
          Z
        "
      />
    </svg>
  );
}
