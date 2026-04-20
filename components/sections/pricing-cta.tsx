"use client";

import { ShieldCheck, Percent, CreditCard, Clock, ArrowRight, Lock } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";
import { waLink, waMessages } from "@/lib/whatsapp";
import { trackCheckout } from "@/lib/pixel";
import { NoiseOverlay } from "@/components/primitives/noise-overlay";

const conditions = [
  {
    icon: Percent,
    title: "PIX à vista — 10% OFF",
    body: "Desconto direto no valor total. Sem pegadinha.",
    highlight: true,
  },
  {
    icon: CreditCard,
    title: "Cartão em até 5x",
    body: "Sem juros, sem taxa. Parcelamento fica na sua mão.",
  },
  {
    icon: Clock,
    title: "Entrega em 5 dias úteis",
    body: "Contados da aprovação do briefing inicial.",
  },
  {
    icon: ShieldCheck,
    title: "Satisfação garantida",
    body: "Não gostou? Dinheiro de volta em até 7 dias.",
  },
];

export function PricingCta() {
  return (
    <section
      id="investimento"
      className="relative py-20 md:py-32 bg-[color:var(--ink-950)] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[color:var(--gold-500)]/10 blur-[140px] pointer-events-none"
      />
      <NoiseOverlay />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-[760px] mb-14 md:mb-20">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--gold-500)] mb-4 block">
              Investimento
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-display font-bold">
              Condições pra fechar
              <br />
              <span className="italic text-[color:var(--gold-500)]">ainda hoje</span>.
            </h2>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 items-stretch">
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-4 h-full">
              {conditions.map((c, i) => (
                <div
                  key={i}
                  className={`rounded-3xl border p-6 md:p-7 transition-colors ${
                    c.highlight
                      ? "border-[color:var(--gold-500)]/60 bg-[color:var(--gold-500)]/5"
                      : "border-[color:var(--ink-800)] bg-[color:var(--ink-900)]"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-[color:var(--ink-950)] border border-[color:var(--ink-800)] text-[color:var(--gold-500)] flex items-center justify-center mb-4">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-bold mb-1">{c.title}</h3>
                  <p className="text-sm text-[color:var(--text-on-dark-muted)] leading-relaxed">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative rounded-3xl bg-gradient-to-br from-[color:var(--ink-900)] to-[color:var(--ink-950)] border border-[color:var(--gold-500)]/40 p-8 md:p-10 h-full flex flex-col glow-gold">
              <div className="flex-1 space-y-5">
                <span className="inline-block font-mono text-[10px] tracking-[0.3em] uppercase text-[color:var(--gold-500)]">
                  último passo
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold leading-[0.95]">
                  Sua página no ar
                  <br />
                  <span className="text-[color:var(--gold-500)]">em 5 dias</span>.
                </h3>
                <p className="text-[color:var(--text-on-dark-muted)] leading-relaxed">
                  Clique no botão, manda oi no WhatsApp. Resposta em até 10 minutos no horário
                  comercial. A gente cuida do resto.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <a
                  href={waLink(waMessages.final)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCheckout("final_cta")}
                  className="group flex items-center justify-center gap-3 w-full rounded-2xl bg-[color:var(--gold-500)] hover:bg-[color:var(--gold-400)] text-[color:var(--ink-950)] px-6 py-6 md:py-7 font-display text-base md:text-xl font-bold transition-all hover:-translate-y-0.5"
                >
                  QUERO FINALIZAR AGORA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center justify-center gap-2 text-xs text-[color:var(--text-on-dark-muted)]">
                  <Lock className="w-3 h-3" />
                  Seus dados estão seguros · LGPD-compliant
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
