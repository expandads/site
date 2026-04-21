import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo oficial Ad Expand (arquivo em /public/logo-expand.svg).
 * O svg vem com fill branco (#fff); pra cores diferentes, aplicar
 * filter/mask via className do wrapper.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-expand.svg"
      alt="Ad Expand"
      width={1315}
      height={220}
      priority
      className={cn("h-8 md:h-10 w-auto", className)}
    />
  );
}
