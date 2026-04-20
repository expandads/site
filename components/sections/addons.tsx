"use client";

import { Image as ImageIcon, Layers, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";
import { waLink, waMessages } from "@/lib/whatsapp";
import { trackLead } from "@/lib/pixel";

export function Addons() {
  return (
    <section className="relative py-20 md:py-28 bg-[color:var(--paper-50)] text-[color:var(--text-on-light)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-[700px] mb-12 md:mb-16">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--text-on-light-muted)] mb-4 block">
              Adicionais
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-display font-bold">
              Precisa de banner
              <br />
              pra campanha? <span className="text-[color:var(--gold-600)]">Pegamos.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-12 gap-4 md:gap-6">
          <Reveal className="md:col-span-5">
            <div className="bg-white border border-[color:var(--paper-200)] rounded-3xl p-7 md:p-8 h-full flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-[color:var(--ink-950)] text-[color:var(--gold-500)] flex items-center justify-center mb-6">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Banner Avulso</h3>
              <p className="text-[color:var(--text-on-light-muted)] mb-8 leading-relaxed">
                Criativo único pra campanha pontual. Entrega em 2 dias úteis.
              </p>

              <div className="mt-auto pt-6 border-t border-[color:var(--paper-200)]">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display text-4xl font-bold">R$ 80</span>
                  <span className="text-xs text-[color:var(--text-on-light-muted)] font-mono">
                    por peça
                  </span>
                </div>
                <a
                  href={waLink(waMessages.addon("Banner Avulso"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLead("addon_banner")}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ink-950)] hover:text-[color:var(--gold-600)] transition-colors"
                >
                  Solicitar banner <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <div className="relative bg-[color:var(--ink-950)] text-[color:var(--text-on-dark)] border border-[color:var(--ink-800)] rounded-3xl p-7 md:p-10 h-full flex flex-col glow-gold overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[color:var(--gold-500)]/15 blur-3xl pointer-events-none" />
              <div className="relative flex-1">
                <span className="inline-block bg-[color:var(--gold-500)] text-[color:var(--ink-950)] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
                  Mais pedido
                </span>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[color:var(--ink-900)] border border-[color:var(--gold-500)]/40 text-[color:var(--gold-500)] flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                      Kit 3 Banners
                    </h3>
                    <p className="text-[color:var(--text-on-dark-muted)] leading-relaxed">
                      Três criativos variados pra testar no Meta e Google. Perfeito pra começar
                      uma campanha com A/B real desde o dia 1.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-auto pt-6 border-t border-[color:var(--ink-800)] flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display text-5xl font-bold text-[color:var(--text-on-dark)]">
                      R$ 200
                    </span>
                  </div>
                  <span className="text-xs text-[color:var(--text-on-dark-muted)] font-mono">
                    economize R$ 40 vs avulso
                  </span>
                </div>
                <a
                  href={waLink(waMessages.addon("Kit 3 Banners"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLead("addon_kit")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--gold-500)] text-[color:var(--ink-950)] px-5 py-3 min-h-[44px] text-sm font-semibold hover:bg-[color:var(--gold-400)] transition-colors"
                >
                  Quero o kit <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
