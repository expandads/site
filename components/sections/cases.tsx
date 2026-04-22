"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { MacbookFrame } from "@/components/primitives/macbook-frame";
import { CaseModal } from "@/components/primitives/case-modal";
import { Flags, type FlagCode } from "@/components/primitives/flags";

type CaseItem = {
  id: string;
  niche: string;
  country: FlagCode;
  countryName: string;
  src: string;
  alt: string;
  imgWidth: number;
  imgHeight: number;
};

const CASES: CaseItem[] = [
  {
    id: "riches",
    niche: "Joalheria de luxo",
    country: "US",
    countryName: "Estados Unidos",
    src: "/cases/screencapture-lp-richesjewelry.png",
    alt: "Landing page de joalheria de luxo",
    imgWidth: 1920,
    imgHeight: 8103,
  },
  {
    id: "uninassau",
    niche: "Ensino superior",
    country: "BR",
    countryName: "Brasil",
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

        {/* Desktop: grid 2 cols simultaneos */}
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
                label={<NicheLabel item={c} />}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: carrossel 1-por-vez com peek + dots */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            className="-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none"
            style={{
              scrollPaddingLeft: "24px",
              scrollPaddingRight: "24px",
            }}
          >
            {CASES.map((c, i) => (
              <div
                key={c.id}
                data-slide-index={i}
                className="shrink-0 snap-start w-[88vw] max-w-[520px]"
              >
                <MacbookFrame
                  src={c.src}
                  alt={c.alt}
                  imgWidth={c.imgWidth}
                  imgHeight={c.imgHeight}
                  onExpand={() => setOpenId(c.id)}
                  label={<NicheLabel item={c} />}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-1">
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
            <span className="text-xs text-[color:var(--text-on-dark-muted)]">
              deslize
            </span>
            <span
              aria-hidden="true"
              className="inline-block animate-[slideRight_1.4s_ease-in-out_infinite] text-[color:var(--gold-500)] text-sm"
            >
              →
            </span>
          </div>
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

function NicheLabel({ item }: { item: CaseItem }) {
  const Flag = Flags[item.country];
  return (
    <div className="flex items-center justify-center md:justify-start gap-2">
      <Flag
        className="w-5 h-[14px] rounded-[2px] ring-1 ring-white/10"
        title={item.countryName}
      />
      <span className="text-sm md:text-base font-medium text-[color:var(--gold-500)]">
        {item.niche}
      </span>
    </div>
  );
}
