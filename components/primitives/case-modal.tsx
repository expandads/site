"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Modal fullscreen pra visualizar a screenshot inteira da landing page.
 * - ESC fecha
 * - clique no backdrop fecha
 * - body scroll lock enquanto aberto
 */
export function CaseModal({
  open,
  onClose,
  src,
  alt,
  imgWidth,
  imgHeight,
  title,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  imgWidth: number;
  imgHeight: number;
  title?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Preview ${title}` : "Preview da landing page"}
      className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      {/* Header fixo */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 py-3 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="text-sm md:text-base text-white/90 font-medium">
          {title || "Landing page"}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Imagem full, clique interno nao fecha */}
      <div
        className="max-w-[1200px] mx-auto px-4 md:px-8 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={imgWidth}
          height={imgHeight}
          className="w-full h-auto rounded-lg shadow-2xl"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>
    </div>
  );
}
