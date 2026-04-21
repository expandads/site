import { Reveal } from "@/components/primitives/reveal";

const testimonials = [
  {
    quote:
      "Tinha gastado R$8k com outra agência e a página não convertia. Refizeram comigo em 5 dias e no primeiro mês já paguei o investimento. Hoje roda sozinha.",
    name: "Marina A.",
    role: "Dentista estética, São Paulo",
    metric: "Página paga no 1º mês",
    initial: "M",
  },
  {
    quote:
      "O que me surpreendeu foi a objetividade. Nada de reunião que não termina. Briefing no WhatsApp, aprovação em dois pontos e a página no ar.",
    name: "Rafael D.",
    role: "Infoprodutor, curso de inglês",
    metric: "No ar em 5 dias",
    initial: "R",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-32 bg-[color:var(--ink-950)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-[760px] mb-14 md:mb-20">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--gold-500)] mb-4 block">
              Prova real
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-display font-bold">
              Quem roda anúncio
              <br />
              com a gente,{" "}
              <span className="italic text-[color:var(--gold-500)]">escala</span>.
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-[980px]">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="relative bg-[color:var(--ink-900)] border border-[color:var(--ink-800)] rounded-3xl p-7 md:p-8 h-full flex flex-col">
                <svg
                  className="text-[color:var(--gold-500)] w-10 h-8 mb-6"
                  viewBox="0 0 48 36"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 0C6 0 0 7 0 16v20h16V16H6c0-6 4-10 8-10V0zm28 0c-8 0-14 7-14 16v20h16V16H34c0-6 4-10 8-10V0z" />
                </svg>

                <p className="text-[color:var(--text-on-dark)] leading-relaxed mb-8 text-sm md:text-base flex-1">
                  {t.quote}
                </p>

                <div className="pt-6 border-t border-[color:var(--ink-800)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-[color:var(--gold-500)] text-[color:var(--ink-950)] flex items-center justify-center font-display font-bold text-lg shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <div className="font-semibold text-[color:var(--text-on-dark)]">{t.name}</div>
                      <div className="text-xs text-[color:var(--text-on-dark-muted)]">{t.role}</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color:var(--gold-500)]/10 border border-[color:var(--gold-500)]/30 text-[color:var(--gold-500)] text-xs font-mono font-semibold">
                    {t.metric}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
