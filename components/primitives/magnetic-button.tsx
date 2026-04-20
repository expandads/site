"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  variant?: Variant;
  children: ReactNode;
  asChild?: boolean;
  href?: string;
  eventName?: string;
  magnetic?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[color:var(--gold-500)] text-[color:var(--ink-950)] hover:bg-[color:var(--gold-400)] font-semibold",
  outline:
    "bg-transparent text-[color:var(--gold-500)] border border-[color:var(--gold-500)]/60 hover:border-[color:var(--gold-500)] hover:bg-[color:var(--gold-500)]/5",
  ghost:
    "bg-transparent text-[color:var(--text-on-dark)] hover:text-[color:var(--gold-500)]",
};

export const MagneticButton = forwardRef<HTMLAnchorElement, Props>(function MagneticButton(
  {
    variant = "primary",
    children,
    className,
    href,
    magnetic = true,
    fullWidth = false,
    eventName,
    onClick,
    ...rest
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!magnetic) return;
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.25);
    y.set(relY * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <motion.span
      style={{ x: springX, y: springY }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 md:px-8 md:py-5 text-sm md:text-base transition-colors duration-300 min-h-[48px] whitespace-nowrap",
        variantStyles[variant],
        variant === "primary" && "glow-gold",
        fullWidth && "w-full",
        className,
      )}
    >
      {children}
    </motion.span>
  );

  const handleClick = (e: React.MouseEvent) => {
    if (eventName && typeof window !== "undefined") {
      import("@/lib/pixel").then((m) => m.trackLead(eventName));
    }
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);
  };

  if (href) {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("inline-block", fullWidth && "w-full")}
      >
        <a
          ref={ref}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          onClick={handleClick as React.MouseEventHandler<HTMLAnchorElement>}
          className={cn("inline-block", fullWidth && "w-full")}
        >
          {content}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block", fullWidth && "w-full")}
    >
      <button
        onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}
        className={cn("inline-block", fullWidth && "w-full")}
        {...rest}
      >
        {content}
      </button>
    </div>
  );
});
