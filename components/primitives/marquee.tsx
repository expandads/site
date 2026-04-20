import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  reverse = false,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("marquee-mask overflow-hidden w-full", className)}>
      <div className={cn("flex w-max", reverse ? "marquee-track-rev" : "marquee-track")}>
        <div className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
