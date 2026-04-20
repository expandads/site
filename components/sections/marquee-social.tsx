import { Marquee } from "@/components/primitives/marquee";

const stats = [
  "+120 páginas entregues",
  "Taxa média de 22% de conversão",
  "4.9★ de satisfação",
  "Entrega em 5 dias úteis",
  "Mobile-first por padrão",
];

const tools = [
  "Meta Ads",
  "Google Ads",
  "Meta Pixel",
  "GA4",
  "Hotjar",
  "UTM Builder",
  "ActiveCampaign",
  "RD Station",
  "Tag Manager",
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[color:var(--text-on-dark-muted)] font-mono text-sm md:text-base whitespace-nowrap">
      {children}
      <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold-500)]" />
    </span>
  );
}

export function MarqueeSocial() {
  return (
    <section
      aria-label="Prova social"
      className="relative py-10 border-y border-[color:var(--ink-800)] bg-[color:var(--ink-950)]"
    >
      <div className="space-y-3">
        <Marquee>
          {stats.map((s, i) => (
            <Pill key={i}>
              <span className="text-[color:var(--text-on-dark)]">{s}</span>
            </Pill>
          ))}
        </Marquee>
        <Marquee reverse>
          {tools.map((t, i) => (
            <Pill key={i}>
              <span className="text-[color:var(--gold-500)]/90">{t}</span>
            </Pill>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
