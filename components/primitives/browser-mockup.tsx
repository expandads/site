"use client";

import { motion } from "motion/react";
import { Smartphone, Gauge, Activity } from "lucide-react";

export function BrowserMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="relative w-full max-w-[520px] mx-auto"
      aria-hidden="true"
    >
      <div className="rounded-3xl overflow-hidden border border-[color:var(--ink-800)] bg-[color:var(--ink-900)] shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[color:var(--ink-800)] bg-[color:var(--ink-950)]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div className="ml-4 flex-1 text-[10px] font-mono text-[color:var(--text-on-dark-muted)] bg-[color:var(--ink-900)] px-3 py-1 rounded-md text-center truncate">
            adexpand.com.br/cliente
          </div>
        </div>

        {/* Fake LP */}
        <div className="p-6 md:p-8 space-y-5 bg-[color:var(--ink-900)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-8 rounded-full bg-[color:var(--gold-500)]" />
            <span className="text-[9px] font-mono tracking-widest text-[color:var(--gold-500)]">
              OFERTA EXCLUSIVA
            </span>
          </div>

          <div className="space-y-2">
            <div className="h-5 w-[85%] rounded-md bg-[color:var(--text-on-dark)]/85" />
            <div className="h-5 w-[65%] rounded-md bg-[color:var(--text-on-dark)]/85" />
            <div className="h-5 w-[78%] rounded-md bg-[color:var(--gold-500)]/85" />
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="h-2 w-full rounded-full bg-[color:var(--ink-700)]" />
            <div className="h-2 w-[92%] rounded-full bg-[color:var(--ink-700)]" />
            <div className="h-2 w-[60%] rounded-full bg-[color:var(--ink-700)]" />
          </div>

          <div className="flex gap-3 pt-2">
            <motion.div
              className="animate-soft-pulse rounded-xl bg-[color:var(--gold-500)] px-5 py-3 text-[11px] font-bold text-[color:var(--ink-950)]"
            >
              QUERO AGORA →
            </motion.div>
            <div className="rounded-xl border border-[color:var(--ink-700)] px-5 py-3 text-[11px] text-[color:var(--text-on-dark-muted)]">
              Saiba mais
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4">
            <div className="h-14 rounded-lg bg-[color:var(--ink-800)]" />
            <div className="h-14 rounded-lg bg-[color:var(--ink-800)]" />
            <div className="h-14 rounded-lg bg-[color:var(--ink-800)]" />
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute -left-4 md:-left-8 top-8 bg-[color:var(--ink-900)] border border-[color:var(--ink-800)] rounded-xl px-3 py-2 shadow-lg inline-flex items-center gap-2"
      >
        <Smartphone className="w-3.5 h-3.5 text-[color:var(--gold-500)]" />
        <div>
          <div className="text-[color:var(--text-on-dark)] text-[11px] font-semibold leading-tight">Mobile-first</div>
          <div className="text-[color:var(--text-on-dark-muted)] text-[9px] font-mono">100% responsivo</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute -right-2 md:-right-6 bottom-10 bg-[color:var(--ink-900)] border border-[color:var(--ink-800)] rounded-xl px-3 py-2 shadow-lg inline-flex items-center gap-2"
      >
        <Gauge className="w-3.5 h-3.5 text-[color:var(--gold-500)]" />
        <div>
          <div className="text-[color:var(--text-on-dark)] text-[11px] font-semibold leading-tight">Velocidade</div>
          <div className="text-[color:var(--text-on-dark-muted)] text-[9px] font-mono">otimizada</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute left-6 -bottom-4 bg-[color:var(--ink-900)] border border-[color:var(--ink-800)] rounded-xl px-3 py-2 shadow-lg inline-flex items-center gap-2"
      >
        <Activity className="w-3.5 h-3.5 text-[color:var(--gold-500)]" />
        <div>
          <div className="text-[color:var(--text-on-dark)] text-[11px] font-semibold leading-tight">Rastreio pronto</div>
          <div className="text-[color:var(--text-on-dark-muted)] text-[9px] font-mono">pixel + GA4</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
