type FBQ = (event: string, action: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    fbq?: FBQ;
    dataLayer?: unknown[];
  }
}

export function trackLead(buttonName: string) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Lead", {
    content_name: buttonName,
    content_category: "CTA Click",
  });
  window.dataLayer?.push({
    event: "lead_click",
    button_name: buttonName,
  });
}

export function trackCheckout(buttonName: string) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "InitiateCheckout", {
    content_name: buttonName,
  });
  window.dataLayer?.push({
    event: "initiate_checkout",
    button_name: buttonName,
  });
}
