"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { waLink, waMessages } from "@/lib/whatsapp";
import { trackLead } from "@/lib/pixel";

export function StickyCtaMobile() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > window.innerHeight * 0.9);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-3 bottom-3 z-40 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href={waLink(waMessages.hero)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackLead("sticky_mobile")}
        className="flex items-center justify-center gap-2 w-full rounded-2xl bg-[color:var(--gold-500)] text-[color:var(--ink-950)] font-bold px-6 py-4 min-h-[56px] glow-gold shadow-2xl"
      >
        FALAR NO WHATSAPP <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
