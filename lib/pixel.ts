import { getUtms } from "./utm";

type FBQ = (
  event: string,
  action: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string },
) => void;

declare global {
  interface Window {
    fbq?: FBQ;
    dataLayer?: unknown[];
  }
}

/**
 * Gera eventID unico pra deduplicar entre pixel (client) e CAPI (server) no futuro.
 * Formato: <nome>-<timestamp>-<random>.
 */
function makeEventId(name: string) {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${name}-${Date.now()}-${rand}`;
}

function baseParams(extra: Record<string, unknown> = {}) {
  return { ...getUtms(), ...extra };
}

export function trackLead(buttonName: string) {
  if (typeof window === "undefined") return;
  const eventID = makeEventId("lead");
  window.fbq?.(
    "track",
    "Lead",
    baseParams({ content_name: buttonName, content_category: "CTA Click" }),
    { eventID },
  );
  window.dataLayer?.push({
    event: "lead_click",
    button_name: buttonName,
    event_id: eventID,
    ...getUtms(),
  });
}

export function trackCheckout(buttonName: string) {
  if (typeof window === "undefined") return;
  const eventID = makeEventId("checkout");
  window.fbq?.(
    "track",
    "InitiateCheckout",
    baseParams({ content_name: buttonName }),
    { eventID },
  );
  window.dataLayer?.push({
    event: "initiate_checkout",
    button_name: buttonName,
    event_id: eventID,
    ...getUtms(),
  });
}

/**
 * Dispara ViewContent marcando profundidade de scroll ou secao visitada.
 * Meta usa ViewContent como sinal de engajamento pra otimizacao em campanhas
 * de topo de funil e publicos semelhantes.
 */
export function trackViewContent(name: string) {
  if (typeof window === "undefined") return;
  const eventID = makeEventId("viewcontent");
  window.fbq?.(
    "track",
    "ViewContent",
    baseParams({ content_name: name, content_category: "Engagement" }),
    { eventID },
  );
  window.dataLayer?.push({
    event: "view_content",
    content_name: name,
    event_id: eventID,
    ...getUtms(),
  });
}

/**
 * Custom event pra visitante engajado (nao-bounce).
 * Deve disparar 1x por sessao quando scroll >60% + tempo >20s.
 * Alimenta publico-semelhante de gente que realmente consome conteudo.
 */
export function trackEngagedVisitor() {
  if (typeof window === "undefined") return;
  const eventID = makeEventId("engaged");
  window.fbq?.(
    "trackCustom",
    "EngagedVisitor",
    baseParams({ content_category: "Qualified Traffic" }),
    { eventID },
  );
  window.dataLayer?.push({
    event: "engaged_visitor",
    event_id: eventID,
    ...getUtms(),
  });
}
