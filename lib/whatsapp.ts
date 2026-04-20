export const WA_PHONE = "5575999435150";

export function waLink(context: string) {
  const msg = encodeURIComponent(context);
  return `https://wa.me/${WA_PHONE}?text=${msg}`;
}

export const waMessages = {
  hero: "Olá! Vim do site e quero uma landing page que converte.",
  secondary: "Olá! Quero entender melhor os planos de landing page.",
  product: (name: string) =>
    `Olá! Tenho interesse no plano ${name}. Podemos conversar?`,
  addon: (name: string) =>
    `Olá! Quero contratar o adicional ${name}.`,
  final: "Olá! Quero finalizar a contratação com desconto PIX.",
  nav: "Olá! Vim do site e quero falar sobre uma landing page.",
};
