"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/primitives/logo";
import { waLink, waMessages } from "@/lib/whatsapp";
import { trackLead } from "@/lib/pixel";

const navLinks = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#processo", label: "Processo" },
  { href: "#investimento", label: "Investimento" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[color:var(--ink-950)]/80 backdrop-blur-xl border-b border-[color:var(--ink-800)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="text-[color:var(--text-on-dark)] hover:text-[color:var(--gold-500)] transition-colors">
          <Logo />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[color:var(--text-on-dark-muted)] hover:text-[color:var(--gold-500)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <a
            href={waLink(waMessages.nav)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLead("navbar")}
            className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--gold-500)]/60 text-[color:var(--gold-500)] px-5 py-2.5 text-sm font-medium hover:bg-[color:var(--gold-500)]/5 transition-colors"
          >
            Falar no WhatsApp <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <button
          className="md:hidden text-[color:var(--text-on-dark)] p-2 -mr-2"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[color:var(--ink-950)] md:hidden animate-in fade-in duration-200">
          <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setOpen(false)}
              className="text-[color:var(--text-on-dark)] p-2 -mr-2"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 pt-10 pb-10 flex flex-col gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-bold text-[color:var(--text-on-dark)] hover:text-[color:var(--gold-500)] transition-colors"
              >
                {l.label}
              </a>
            ))}

            <a
              href={waLink(waMessages.nav)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackLead("navbar_mobile");
                setOpen(false);
              }}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--gold-500)] text-[color:var(--ink-950)] px-6 py-5 min-h-[56px] font-bold glow-gold"
            >
              FALAR NO WHATSAPP <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
