"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MacbookFrame } from "@/components/primitives/macbook-frame";
import { CaseModal } from "@/components/primitives/case-modal";

type CaseItem = {
  id: string;
  client: string;
  niche: string;
  result: string;
  src: string;
  alt: string;
  imgWidth: number;
  imgHeight: number;
  liveUrl?: string;
};

const CASES: CaseItem[] = [
  {
    id: "riches",
    client: "Riches Jewelry",
    niche: "Joalheria de luxo",
    result: "Landing page de coleção premium com foco em captura qualificada",
    src: "/cases/screencapture-lp-richesjewelry.png",
    alt: "Landing page Riches Jewelry",
    imgWidth: 1920,
    imgHeight: 8155,
  },
  {
    id: "uninassau",
    client: "UniNassau",
    niche: "Educação · Graduação",
    result: "Página de captação de alunos com funil de inscrição otimizado",
    src: "/cases/screencapture-lp-uninassau.png",
    alt: "Landing page UniNassau",
    imgWidth: 1920,
    imgHeight: 8373,
  },
];

export function Cases() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = CASES.find((c) => c.id === openId) || null;

  return (
    <section
      id="cases"
      className="relative py-20 md:py-28 border-t border-white/5"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-[color:var(--gold-500)] uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-[color:var(--gold-500)]" />
            Cases reais
          </div>
          <h2 className="font-display text-section font-bold text-[color:var(--text-on-dark)] mb-4">
            Páginas no ar,{" "}
            <span className="text-[color:var(--gold-500)]">convertendo</span>.
          </h2>
          <p className="text-lead text-[color:var(--text-on-dark-muted)] leading-relaxed">
            Passe o mouse pra ver a página inteira — ou clique em{" "}
            <span className="text-[color:var(--text-on-dark)]">tela cheia</span>{" "}
            pra explorar como o visitante vê.
          </p>
        </motion.div>

        {/* Desktop: grid 2 cols */}
        <div className="hidden md:grid grid-cols-2 gap-8 lg:gap-10">
          {CASES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <MacbookFrame
                src={c.src}
                alt={c.alt}
                imgWidth={c.imgWidth}
                imgHeight={c.imgHeight}
                onExpand={() => setOpenId(c.id)}
                label={<CaseLabel item={c} />}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: carrossel 1-por-vez com snap + fade indicativo na borda direita */}
        <div className="md:hidden relative">
          <div
            className="-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {CASES.map((c) => (
              <div
                key={c.id}
                className="shrink-0 snap-center w-[92vw] max-w-[520px]"
              >
                <MacbookFrame
                  src={c.src}
                  alt={c.alt}
                  imgWidth={c.imgWidth}
                  imgHeight={c.imgHeight}
                  onExpand={() => setOpenId(c.id)}
                  label={<CaseLabel item={c} />}
                />
              </div>
            ))}
          </div>

          {/* Fade na borda direita sinalizando conteudo alem */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 bottom-6 w-10 bg-gradient-to-l from-[color:var(--ink-950)] to-transparent"
          />
        </div>

        {/* Indicador de swipe + setinha animada */}
        <div className="md:hidden flex items-center justify-center gap-2 text-xs text-[color:var(--text-on-dark-muted)] mt-1">
          <span>deslize para ver o próximo</span>
          <span
            aria-hidden="true"
            className="inline-block animate-[slideRight_1.4s_ease-in-out_infinite] text-[color:var(--gold-500)]"
          >
            →
          </span>
        </div>
      </div>

      {active && (
        <CaseModal
          open={!!openId}
          onClose={() => setOpenId(null)}
          src={active.src}
          alt={active.alt}
          imgWidth={active.imgWidth}
          imgHeight={active.imgHeight}
          title={active.client}
        />
      )}
    </section>
  );
}

function CaseLabel({ item }: { item: CaseItem }) {
  return (
    <div>
      <div className="flex items-baseline gap-2 flex-wrap">
        <h3 className="font-display text-xl md:text-2xl font-bold text-[color:var(--text-on-dark)]">
          {item.client}
        </h3>
        <span className="text-xs md:text-sm text-[color:var(--gold-500)] font-medium">
          {item.niche}
        </span>
      </div>
      <p className="mt-1.5 text-sm md:text-base text-[color:var(--text-on-dark-muted)] leading-relaxed">
        {item.result}
      </p>
    </div>
  );
}
