"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function WordSwap({
  words,
  interval = 3200,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((prev) => (prev + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const widest = words.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span
      className={cn(
        "relative inline-block align-baseline overflow-hidden leading-[1.15] pb-[0.18em] -mb-[0.18em]",
        className,
      )}
    >
      <span className="invisible" aria-hidden="true">{widest}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 text-[color:var(--gold-500)] italic"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
