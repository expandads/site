"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";

const faqs = [
  {
    q: "Em quanto tempo fica pronto?",
    a: "Em até 5 dias úteis a partir da aprovação do briefing. Pode acelerar sob demanda (combinamos no WhatsApp).",
  },
  {
    q: "Posso usar meu próprio domínio?",
    a: "Sim. A mensalidade (R$ 100) já cobre hospedagem e domínio, mas se você já tem um domínio próprio a gente configura na hora.",
  },
  {
    q: "Vocês rodam o tráfego também?",
    a: "Sim. A gestão de tráfego (Meta e Google) é um serviço à parte, contratado separadamente. Também produzimos criativos estáticos sob demanda. Se fizer sentido pra você, combinamos no WhatsApp.",
  },
  {
    q: "Fornecem o código-fonte?",
    a: "Sim, no pacote sem mensalidade entregamos um .ZIP com tudo que você precisa pra subir em Hostinger, HostGator ou qualquer hospedagem compatível — é só subir os arquivos e rodar. No pacote com mensalidade, a página fica hospedada com a gente.",
  },
  {
    q: "O que acontece se eu cancelar a mensalidade?",
    a: "A página sai do ar e você recebe os arquivos por 30 dias. Sem fidelidade, sem multa.",
  },
  {
    q: "Atendem fora do Brasil?",
    a: "Sim. Pagamento pode ser via PIX ou cartão internacional.",
  },
  {
    q: "Tem contrato de fidelidade?",
    a: "Não. A mensalidade (hospedagem e domínio) pode ser cancelada a qualquer momento, sem multa nem justificativa.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="relative py-20 md:py-32 bg-[color:var(--paper-50)] text-[color:var(--text-on-light)]"
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">
        <div className="mb-14 md:mb-16">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--text-on-light-muted)] mb-4 block">
              Perguntas frequentes
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-display font-bold">
              Dúvida que {" "}
              <span className="italic text-[color:var(--gold-600)]">todo mundo</span> tem.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <Accordion.Root type="single" collapsible className="border-t border-[color:var(--paper-200)]">
            {faqs.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="border-b border-[color:var(--paper-200)]"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left font-display text-lg md:text-2xl font-semibold hover:text-[color:var(--gold-600)] transition-colors">
                    {item.q}
                    <Plus className="w-5 h-5 shrink-0 text-[color:var(--gold-600)] transition-transform duration-300 group-data-[state=open]:rotate-45" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="pb-7 pr-8 text-[color:var(--text-on-light-muted)] leading-relaxed max-w-[70ch]">
                    {item.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>

      <style>{`
        @keyframes acc-down {
          from { height: 0; }
          to { height: var(--radix-accordion-content-height); }
        }
        @keyframes acc-up {
          from { height: var(--radix-accordion-content-height); }
          to { height: 0; }
        }
        .animate-accordion-down { animation: acc-down 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
        .animate-accordion-up { animation: acc-up 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>
    </section>
  );
}
