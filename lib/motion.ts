import type { Variants } from "motion/react";

export const easings = {
  smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
  snap: [0.4, 0, 0.2, 1] as [number, number, number, number],
  bounce: [0.68, -0.6, 0.32, 1.6] as [number, number, number, number],
};

export const durations = {
  fast: 0.2,
  base: 0.4,
  slow: 0.8,
  hero: 1.2,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easings.smooth },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easings.smooth },
  },
};

export const wordMask: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: durations.slow, ease: easings.smooth },
  },
};
