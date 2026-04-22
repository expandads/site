"use client";

import { MessageCircle, FileText, Mail, Check, Infinity as InfinityIcon, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";
import { waLink, waMessages } from "@/lib/whatsapp";
import { trackLead } from "@/lib/pixel";
import { cn } from "@/lib/utils";

type Product = {
  id: string;
  name: string;
  price: string;
  tag: string;
  badge?: string;
  description: string;
  icon: typeof MessageCircle;
  features: string[];
  featured?: boolean;
};

const products: Product[] = [
  {
    id: "form",
    name: "Página Formulário",
    price: "R$ 1.000",
    tag: "pagamento único",
    badge: "Mais pedido",
    description:
      "LP com formulário pra captura de leads qualificados. Ideal pra equipe de vendas ou atendimento por e-mail.",
    icon: FileText,
    features: [
      "Formulário com validação e anti-spam",
      "Leads entregues por e-mail",
      "Meta Pixel + GA4 instalados",
    ],
    featured: true,
  },
  {
    id: "wa",
    name: "Página WhatsApp",
    price: "R$ 800",
    tag: "pagamento único",
    description:
      "LP simples com CTAs diretos pro WhatsApp. Ideal pra atendimento humanizado e fechamento rápido.",
    icon: MessageCircle,
    features: [
      "CTAs com mensagem pré-preenchida",
      "Clique-pra-WhatsApp rastreável",
      "Design 100% mobile-first",
    ],
  },
  {
    id: "form-email",
    name: "Formulário + E-mail",
    price: "R$ 1.250",
    tag: "pagamento único",
    description:
      "Tudo do formulário + e-mail automático de confirmação com banner personalizado pro lead.",
    icon: Mail,
    features: [
      "E-mail de confirmação automatizado",
      "Banner personalizado na resposta",
      "Bump de oferta opcional no e-mail",
    ],
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="relative py-20 md:py-32 bg-[color:var(--ink-950)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-[760px] mb-14 md:mb-20">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--gold-500)] mb-4 block">
              Nossas soluções
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-display font-bold mb-6">
              Três formatos. Um objetivo:
              <br />
              <span className="italic text-[color:var(--gold-500)]">conversão real</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lead text-[color:var(--text-on-dark-muted)] max-w-[65ch] leading-relaxed">
              Escolha o modelo certo pro seu funil. Se tiver dúvida, a gente te orienta
              no WhatsApp, sem compromisso.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal
                key={p.id}
                delay={i * 0.08}
                className={cn(p.featured && "lg:col-span-2")}
              >
                <div
                  className={cn(
                    "group relative rounded-3xl border p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col",
                    p.featured
                      ? "bg-[color:var(--ink-900)] border-[color:var(--gold-500)]/50 hover:border-[color:var(--gold-500)]"
                      : "bg-[color:var(--ink-900)] border-[color:var(--ink-800)] hover:border-[color:var(--gold-500)]/60",
                  )}
                >
                  {p.badge && (
                    <span className="absolute -top-3 left-6 bg-[color:var(--gold-500)] text-[color:var(--ink-950)] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}

                  <div className="w-12 h-12 rounded-2xl bg-[color:var(--ink-950)] border border-[color:var(--ink-800)] text-[color:var(--gold-500)] flex items-center justify-center mb-6 group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
                    {p.name}
                  </h3>
                  <p className="text-sm md:text-base text-[color:var(--text-on-dark-muted)] mb-6 leading-relaxed">
                    {p.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-[color:var(--text-on-dark)]"
                      >
                        <Check className="w-4 h-4 text-[color:var(--gold-500)] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 border-t border-[color:var(--ink-800)]">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-display text-4xl md:text-5xl font-bold text-[color:var(--text-on-dark)]">
                        {p.price}
                      </span>
                      <span className="text-xs text-[color:var(--text-on-dark-muted)] font-mono">
                        {p.tag}
                      </span>
                    </div>
                    <a
                      href={waLink(waMessages.product(p.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackLead(`product_${p.id}`)}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 w-full rounded-xl px-5 py-3 min-h-[44px] text-sm font-semibold transition-colors",
                        p.featured
                          ? "bg-[color:var(--gold-500)] text-[color:var(--ink-950)] hover:bg-[color:var(--gold-400)]"
                          : "border border-[color:var(--ink-700)] hover:border-[color:var(--gold-500)] hover:text-[color:var(--gold-500)]",
                      )}
                    >
                      Quero essa <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Mensalidade banner */}
        <Reveal delay={0.4} className="mt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 rounded-3xl border border-[color:var(--ink-800)] bg-[color:var(--ink-900)] px-6 md:px-10 py-6 md:py-8">
            <div className="w-12 h-12 rounded-2xl bg-[color:var(--ink-950)] border border-[color:var(--gold-500)]/40 text-[color:var(--gold-500)] flex items-center justify-center shrink-0">
              <InfinityIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <h3 className="font-display text-xl md:text-2xl font-bold">Mensalidade</h3>
                <span className="font-mono text-sm text-[color:var(--gold-500)]">
                  R$ 100/mês
                </span>
              </div>
              <p className="text-sm md:text-base text-[color:var(--text-on-dark-muted)]">
                Sua página no ar sem dor de cabeça. Domínio + atualizações ilimitadas.
                Cancela quando quiser.
              </p>
            </div>
            <a
              href={waLink(waMessages.product("Mensalidade"))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead("product_mensalidade")}
              className="inline-flex items-center gap-2 text-sm text-[color:var(--gold-500)] hover:text-[color:var(--gold-400)] transition-colors font-medium"
            >
              Saber mais <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
