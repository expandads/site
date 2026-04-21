"use client";

import { useEffect } from "react";
import { captureUtms } from "@/lib/utm";
import { trackViewContent, trackEngagedVisitor } from "@/lib/pixel";

/**
 * Rastreia engajamento real do visitante e alimenta o pixel:
 *  - captura UTMs na primeira pageview (persiste em sessionStorage)
 *  - dispara ViewContent em 50% e 75% de scroll (1x cada, por sessao)
 *  - dispara EngagedVisitor quando scroll >60% + tempo ativo >20s (1x por sessao)
 *
 * Tempo "ativo" ignora aba em background pra nao contar visitante ocioso.
 */
export function EngagementTracker() {
  useEffect(() => {
    captureUtms();

    const fired = {
      scroll50: false,
      scroll75: false,
      engaged: false,
    };

    let activeSeconds = 0;
    let maxScrollPct = 0;
    let lastTick = Date.now();

    const getScrollPct = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return 100;
      return Math.min(100, Math.round((window.scrollY / total) * 100));
    };

    const checkEngaged = () => {
      if (fired.engaged) return;
      if (maxScrollPct >= 60 && activeSeconds >= 20) {
        fired.engaged = true;
        trackEngagedVisitor();
      }
    };

    const onScroll = () => {
      const pct = getScrollPct();
      if (pct > maxScrollPct) maxScrollPct = pct;

      if (!fired.scroll50 && maxScrollPct >= 50) {
        fired.scroll50 = true;
        trackViewContent("scroll_50");
      }
      if (!fired.scroll75 && maxScrollPct >= 75) {
        fired.scroll75 = true;
        trackViewContent("scroll_75");
      }
      checkEngaged();
    };

    const tick = () => {
      if (document.visibilityState === "visible") {
        const now = Date.now();
        activeSeconds += (now - lastTick) / 1000;
        lastTick = now;
        checkEngaged();
      } else {
        lastTick = Date.now();
      }
    };

    const onVisibility = () => {
      lastTick = Date.now();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    const interval = window.setInterval(tick, 1000);

    // avaliacao inicial (caso pagina ja abra rolada por hash)
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
