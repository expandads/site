"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { Check } from "lucide-react";

/**
 * Mini-site que se constroi progressivamente conforme o scroll.
 * Recebe um MotionValue 0..1 (progresso da secao Processo).
 *
 * Fases:
 *  0.00 - 0.25  chrome do browser + wireframe vazio
 *  0.25 - 0.50  estrutura e texto (copy)
 *  0.50 - 0.75  design (CTA, cores, elementos)
 *  0.75 - 1.00  publicado (indicador LIVE)
 */
export function MiniSiteBuilder({ progress }: { progress: MotionValue<number> }) {
  // Fase 1 - wireframe (placeholders cinzas)
  const wireOpacity = useTransform(progress, [0, 0.08, 0.28, 0.3], [0, 1, 1, 0]);

  // Fase 2 - copy (headline + paragrafo reais)
  const copyOpacity = useTransform(progress, [0.24, 0.34, 1], [0, 1, 1]);
  const headlineWidth = useTransform(progress, [0.26, 0.4], ["0%", "85%"]);
  const sub1Width = useTransform(progress, [0.3, 0.42], ["0%", "92%"]);
  const sub2Width = useTransform(progress, [0.32, 0.44], ["0%", "70%"]);

  // Fase 3 - design (CTA dourado, cor)
  const designOpacity = useTransform(progress, [0.5, 0.6, 1], [0, 1, 1]);
  const ctaScale = useTransform(progress, [0.55, 0.68], [0.9, 1]);

  // Fase 4 - live (badge)
  const liveOpacity = useTransform(progress, [0.78, 0.9, 1], [0, 1, 1]);
  const liveScale = useTransform(progress, [0.78, 0.92], [0.85, 1]);

  // Etiqueta da fase atual
  const phaseLabel = useTransform<number, string>(progress, (v) => {
    if (v < 0.25) return "01 · Estrutura";
    if (v < 0.5) return "02 · Copy";
    if (v < 0.75) return "03 · Design";
    return "04 · No ar";
  });

  // Barra de progresso
  const progressPct = useTransform<number, string>(progress, (v) => `${Math.min(100, Math.max(0, v * 100)).toFixed(0)}%`);
  const progressBarWidth = useTransform(progress, (v) => `${Math.min(100, Math.max(0, v * 100))}%`);

  return (
    <div className="w-full">
      <div className="rounded-3xl overflow-hidden border border-[color:var(--paper-200)] bg-white">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[color:var(--paper-200)] bg-[color:var(--paper-100)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--paper-200)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--paper-200)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--paper-200)]" />
          <div className="ml-3 flex-1 text-[10px] font-mono text-[color:var(--text-on-light-muted)] bg-white px-3 py-1 rounded-md text-center truncate border border-[color:var(--paper-200)]">
            seudominio.com.br
          </div>
          <motion.div
            style={{ opacity: liveOpacity, scale: liveScale }}
            className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--ink-950)] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold-500)]" />
            LIVE
          </motion.div>
        </div>

        {/* Viewport */}
        <div className="relative p-6 md:p-8 min-h-[360px]">
          {/* Wireframe (fase 1) */}
          <motion.div style={{ opacity: wireOpacity }} className="absolute inset-6 md:inset-8 space-y-3">
            <div className="h-6 w-[60%] rounded bg-[color:var(--paper-200)]" />
            <div className="h-6 w-[80%] rounded bg-[color:var(--paper-200)]" />
            <div className="h-3 w-full rounded bg-[color:var(--paper-200)]/70 mt-6" />
            <div className="h-3 w-[90%] rounded bg-[color:var(--paper-200)]/70" />
            <div className="h-10 w-40 rounded-xl bg-[color:var(--paper-200)] mt-6" />
          </motion.div>

          {/* Copy (fase 2) */}
          <motion.div style={{ opacity: copyOpacity }} className="space-y-3">
            <motion.div style={{ width: headlineWidth }} className="h-6 rounded bg-[color:var(--ink-900)]" />
            <motion.div style={{ width: sub1Width }} className="h-3 rounded bg-[color:var(--text-on-light-muted)]/50 mt-6" />
            <motion.div style={{ width: sub2Width }} className="h-3 rounded bg-[color:var(--text-on-light-muted)]/50" />
          </motion.div>

          {/* Design (fase 3) */}
          <motion.div style={{ opacity: designOpacity }} className="mt-8 space-y-5">
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-xl bg-[color:var(--ink-900)]" />
              <div className="aspect-square rounded-xl bg-[color:var(--paper-100)] border border-[color:var(--paper-200)]" />
              <div className="aspect-square rounded-xl bg-[color:var(--paper-100)] border border-[color:var(--paper-200)]" />
            </div>
            <motion.div
              style={{ scale: ctaScale }}
              className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--gold-500)] text-[color:var(--ink-950)] px-5 py-3 text-xs font-bold"
            >
              FALAR NO WHATSAPP
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Status abaixo do mockup */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs font-mono text-[color:var(--text-on-light-muted)] mb-2">
            <motion.span>{phaseLabel}</motion.span>
            <motion.span className="text-[color:var(--gold-600)] font-semibold">
              {progressPct}
            </motion.span>
          </div>
          <div className="h-1 w-full rounded-full bg-[color:var(--paper-200)] overflow-hidden">
            <motion.div
              style={{ width: progressBarWidth }}
              className="h-full bg-[color:var(--gold-500)]"
            />
          </div>
        </div>
        <motion.div
          style={{ opacity: liveOpacity }}
          className="shrink-0 w-8 h-8 rounded-full bg-[color:var(--ink-950)] text-[color:var(--gold-500)] flex items-center justify-center"
        >
          <Check className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  );
}
