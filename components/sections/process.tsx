"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MessageSquare, PenTool, Code2, Rocket } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";
import { MiniSiteBuilder } from "@/components/primitives/mini-site-builder";

const steps = [
  {
    day: "Dia 0",
    icon: MessageSquare,
    title: "Briefing via WhatsApp",
    body:
      "Em 20 minutos a gente alinha objetivo, público, oferta e referências. Você responde um form rápido ou manda áudio, como preferir.",
  },
  {
    day: "Dia 1 e 2",
    icon: PenTool,
    title: "Estrutura e copy",
    body:
      "A gente escreve a copy persuasiva e monta o wireframe. Você aprova antes do design entrar.",
  },
  {
    day: "Dia 3 e 4",
    icon: Code2,
    title: "Design e desenvolvimento",
    body:
      "Design personalizado e código otimizado. Pixel e GA instalados. Testamos em celular, tablet e desktop.",
  },
  {
    day: "Dia 5",
    icon: Rocket,
    title: "Entrega e publicação",
    body:
      "Página no ar no seu domínio, pronta pra rodar. Te entregamos um mini-manual de primeiros passos na campanha.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="processo"
      className="relative py-20 md:py-32 bg-[color:var(--paper-50)] text-[color:var(--text-on-light)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-[760px] mb-14 md:mb-20">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--text-on-light-muted)] mb-4 block">
              O processo
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-display font-bold">
              Do briefing no ar em
              <br />
              <span className="italic text-[color:var(--gold-600)]">5 dias úteis</span>.
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative grid lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[color:var(--paper-200)]" />
            <motion.div
              style={{ height }}
              className="absolute left-6 top-0 w-px bg-[color:var(--gold-500)] origin-top"
            />

            <div className="space-y-10 md:space-y-16">
              {steps.map((s, i) => (
                <Reveal key={s.day} delay={i * 0.06}>
                  <div className="relative pl-16">
                    <div className="absolute left-6 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-[color:var(--gold-500)] ring-4 ring-[color:var(--paper-50)] z-10" />
                    <div className="bg-white rounded-3xl border border-[color:var(--paper-200)] p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[color:var(--ink-950)] text-[color:var(--gold-500)] flex items-center justify-center shrink-0">
                          <s.icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--gold-600)]">
                          {s.day}
                        </span>
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
                        {s.title}
                      </h3>
                      <p className="text-[color:var(--text-on-light-muted)] leading-relaxed text-sm md:text-base">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mini-site builder (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <MiniSiteBuilder progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
