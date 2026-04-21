import { AlertTriangle, TrendingDown, Hourglass } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";
import { MoneyBurn } from "@/components/primitives/money-burn";

const problems = [
  {
    n: "01",
    icon: AlertTriangle,
    title: "Bonita, mas não vende",
    body: "A página impressiona no portfólio da agência. Só que o visitante entra, não entende o que fazer, e vai embora.",
  },
  {
    n: "02",
    icon: TrendingDown,
    title: "Trava no celular",
    body: "A maioria do seu público entra pelo celular. Se demora pra abrir ou some o botão, o anúncio foi dinheiro jogado fora.",
  },
  {
    n: "03",
    icon: Hourglass,
    title: "Demora pra sair do papel",
    body: "Enquanto a agência arrasta a entrega por semanas, o concorrente já está no ar vendendo.",
  },
];

export function Problem() {
  return (
    <section className="relative bg-[color:var(--paper-50)] text-[color:var(--text-on-light)] py-20 md:py-32 overflow-hidden">
      {/* Ilustração de dinheiro queimando (decorativa) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-10 w-[380px] h-[420px] text-[color:var(--text-on-light-muted)] opacity-[0.06] hidden md:block"
      >
        <MoneyBurn />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-[760px] mb-14 md:mb-20">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--text-on-light-muted)] mb-4 block">
              O problema
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-display font-bold mb-6">
              Você paga caro pelo clique.
              <br />
              Mas sua página joga o <span className="italic text-[color:var(--gold-600)]">lead fora</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="space-y-4 text-lead text-[color:var(--text-on-light-muted)] max-w-[65ch] leading-relaxed">
              <p>
                Você investe no anúncio, a pessoa clica e chega no seu site.
                Só que a página não conversa com ela, não deixa claro o próximo passo
                e, no celular, mal carrega direito. O visitante fecha, e você pagou por isso.
              </p>
              <p>
                Landing page não é vitrine bonita pra impressionar. É uma ferramenta pra virar
                tráfego em cliente. Quando é feita direito, o mesmo anúncio vende mais.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {problems.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div className="group relative bg-white rounded-3xl border border-[color:var(--paper-200)] p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--gold-500)] h-full">
                <span className="absolute top-4 right-6 font-display font-bold text-7xl md:text-8xl text-[color:var(--paper-100)] select-none pointer-events-none leading-none">
                  {p.n}
                </span>
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-[color:var(--ink-950)] text-[color:var(--gold-500)] flex items-center justify-center mb-6">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-2">{p.title}</h3>
                  <p className="text-[color:var(--text-on-light-muted)] leading-relaxed">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
