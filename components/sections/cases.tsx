"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MacbookFrame } from "@/components/primitives/macbook-frame";
import { CaseModal } from "@/components/primitives/case-modal";

type CaseItem = {
  id: string;
  niche: string;
  src: string;
  alt: string;
  imgWidth: number;
  imgHeight: number;
};

const CASES: CaseItem[] = [
  {
    id: "riches",
    niche: "Joalheria de luxo",
    src: "/cases/screencapture-lp-richesjewelry.png",
    alt: "Landing page de joalheria de luxo",
    imgWidth: 1920,
    imgHeight: 8103,
  },
  {
    id: "uninassau",
    niche: "Ensino superior",
    src: "/cases/screencapture-lp-uninassau.png",
    alt: "Landing page de ensino superior",
    imgWidth: 1920,
    imgHeight: 8373,
  },
];

export function Cases() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const active = CASES.find((c) => c.id === openId) || null;

  // Detecta qual slide esta centrado pra pintar o dot ativo.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.querySelectorAll<HTMLElement>("[data-slide-index]");
    if (!slides.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = Number(
              entry.target.getAttribute("data-slide-index") ?? "0",
            );
            setActiveIndex(idx);
          }
        });
      },
      { root: track, threshold: [0.6] },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const goTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(
      `[data-slide-index="${idx}"]`,
    );
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
  };

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < CASES.length - 1;

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

        {/* Carrossel unificado: 1 por vez em qualquer breakpoint */}
        <div className="relative">
          {/* Setas desktop (ocultas no mobile) */}
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={!canPrev}
            aria-label="Case anterior"
            className="hidden md:inline-flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 z-20 items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white backdrop-blur-sm border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={!canNext}
            aria-label="Proximo case"
            className="hidden md:inline-flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 z-20 items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white backdrop-blur-sm border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <motion.div
            ref={trackRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none -mx-6 px-6 md:mx-0 md:px-0"
            style={{
              scrollPaddingLeft: "24px",
              scrollPaddingRight: "24px",
            }}
          >
            {CASES.map((c, i) => (
              <div
                key={c.id}
                data-slide-index={i}
                className="shrink-0 snap-start w-[88vw] max-w-[520px] md:w-full md:max-w-[760px] md:mx-auto"
              >
                <MacbookFrame
                  src={c.src}
                  alt={c.alt}
                  imgWidth={c.imgWidth}
                  imgHeight={c.imgHeight}
                  onExpand={() => setOpenId(c.id)}
                  label={<NicheLabel niche={c.niche} />}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots + indicador de swipe */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            {CASES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir para case ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 h-2 bg-[color:var(--gold-500)]"
                    : "w-2 h-2 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <span className="md:hidden text-xs text-[color:var(--text-on-dark-muted)]">
            deslize
          </span>
          <span
            aria-hidden="true"
            className="md:hidden inline-block animate-[slideRight_1.4s_ease-in-out_infinite] text-[color:var(--gold-500)] text-sm"
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
          title={active.niche}
        />
      )}
    </section>
  );
}

function NicheLabel({ niche }: { niche: string }) {
  return (
    <div className="text-center">
      <span className="text-sm md:text-base font-medium text-[color:var(--gold-500)]">
        {niche}
      </span>
    </div>
  );
}
