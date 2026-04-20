import { AlertTriangle, TrendingDown, Hourglass } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";

const problems = [
  {
    n: "01",
    icon: AlertTriangle,
    title: "Design bonito, lead nenhum",
    body: "Agência comum entrega portfólio. Conversão cai, CPC sobe, e o CAC explode.",
  },
  {
    n: "02",
    icon: TrendingDown,
    title: "Mobile quebrado",
    body: "83% do tráfego é mobile. Se a página trava no celular, o dinheiro do anúncio vira boleto.",
  },
  {
    n: "03",
    icon: Hourglass,
    title: "Entrega eterna",
    body: "Mês pra aprovar layout, outro pra subir. Enquanto isso, o concorrente já escalou a campanha.",
  },
];

export function Problem() {
  return (
    <section className="relative bg-[color:var(--paper-50)] text-[color:var(--text-on-light)] py-20 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-[760px] mb-14 md:mb-20">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--text-on-light-muted)] mb-4 block">
              O problema
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-display font-bold mb-6">
              Você paga caro o clique.
              <br />
              Sua página joga <span className="italic text-[color:var(--gold-600)]">fora</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="space-y-4 text-lead text-[color:var(--text-on-light-muted)] max-w-[65ch] leading-relaxed">
              <p>
                Agência comum entrega &quot;site bonito&quot;. Você sobe pra campanha,
                o CPC sobe junto, e a conversão fica abaixo da média do mercado (6,6%).
                Resultado: CAC inflacionado, margem derretida, e aquela sensação de que
                tráfego pago &quot;não funciona pro seu negócio&quot;.
              </p>
              <p>
                Spoiler: funciona. O que não funciona é transformar visitante em espectador.
                Landing page não é portfólio — é máquina de decisão.
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
