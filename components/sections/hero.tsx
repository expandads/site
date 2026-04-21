"use client";

import { motion } from "motion/react";
import { ArrowRight, Zap, ShieldCheck, Smartphone } from "lucide-react";
import { MagneticButton } from "@/components/primitives/magnetic-button";
import { WordSwap } from "@/components/primitives/word-swap";
import { BrowserMockup } from "@/components/primitives/browser-mockup";
import { NoiseOverlay } from "@/components/primitives/noise-overlay";
import { BrazilMap } from "@/components/primitives/brazil-map";
import { waLink, waMessages } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-40 pb-20 md:pb-32 overflow-hidden">
      {/* Mapa do Brasil decorativo (muito sutil) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[520px] h-[560px] text-[color:var(--gold-500)] opacity-[0.05] hidden md:block"
      >
        <BrazilMap />
      </div>
      <NoiseOverlay />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-10 items-center">
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-hero font-bold text-[color:var(--text-on-dark)] mb-6"
          >
            Landing pages feitas
            <br />
            pra <span className="text-[color:var(--gold-500)]">converter</span>.
            <br />
            Não pra{" "}
            <WordSwap
              words={["impressionar", "decorar", "ganhar prêmio"]}
            />.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lead text-[color:var(--text-on-dark-muted)] mb-8 max-w-[560px] lg:mx-0 mx-auto leading-relaxed"
          >
            Transformamos seu tráfego pago em cliente real. No ar em até 5 dias úteis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 mb-8"
          >
            <MagneticButton
              href={waLink(waMessages.hero)}
              eventName="hero_primary"
              variant="primary"
              className="text-base md:text-lg font-bold"
            >
              QUERO MINHA PÁGINA <ArrowRight className="w-5 h-5" />
            </MagneticButton>

            <a
              href="#investimento"
              className="inline-flex items-center gap-2 px-6 py-4 md:px-8 md:py-5 text-[color:var(--text-on-dark-muted)] hover:text-[color:var(--gold-500)] transition-colors min-h-[48px] text-sm md:text-base"
            >
              Ver investimento →
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center lg:justify-start justify-center gap-x-5 gap-y-2 text-xs md:text-sm text-[color:var(--text-on-dark-muted)]"
          >
            <li className="inline-flex items-center gap-2">
              <Zap className="w-4 h-4 text-[color:var(--gold-500)]" /> 5 dias úteis
            </li>
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[color:var(--gold-500)]" /> Garantia de satisfação
            </li>
            <li className="inline-flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[color:var(--gold-500)]" /> Mobile-first por padrão
            </li>
          </motion.ul>
        </div>

        <div className="w-full">
          <BrowserMockup />
        </div>
      </div>
    </section>
  );
}
