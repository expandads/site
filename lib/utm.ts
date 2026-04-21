/**
 * Captura e persiste UTMs da URL na primeira pageview da sessao.
 * Retorna os UTMs atuais (ou ultimos capturados) pra anexar em events do pixel.
 */

const KEY = "ax_utms";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

export type Utms = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtms(): Utms {
  if (typeof window === "undefined") return {};
  try {
    const url = new URL(window.location.href);
    const fromUrl: Utms = {};
    let hasAny = false;
    for (const k of UTM_KEYS) {
      const v = url.searchParams.get(k);
      if (v) {
        fromUrl[k] = v;
        hasAny = true;
      }
    }
    if (hasAny) {
      sessionStorage.setItem(KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const cached = sessionStorage.getItem(KEY);
    return cached ? (JSON.parse(cached) as Utms) : {};
  } catch {
    return {};
  }
}

export function getUtms(): Utms {
  if (typeof window === "undefined") return {};
  try {
    const cached = sessionStorage.getItem(KEY);
    return cached ? (JSON.parse(cached) as Utms) : {};
  } catch {
    return {};
  }
}
