import { Mail } from "lucide-react";
import { Logo } from "@/components/primitives/logo";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.56 0h4.37v1.92h.06c.61-1.15 2.1-2.37 4.33-2.37 4.63 0 5.48 3.05 5.48 7.02V22h-4.56v-6.57c0-1.57-.03-3.6-2.19-3.6-2.2 0-2.54 1.72-2.54 3.49V22H7.78V8z" />
    </svg>
  );
}
import { waLink, waMessages } from "@/lib/whatsapp";

const columns = [
  {
    title: "Navegação",
    links: [
      { label: "Soluções", href: "#solucoes" },
      { label: "Processo", href: "#processo" },
      { label: "Investimento", href: "#investimento" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Contato",
    links: [
      {
        label: "WhatsApp — (75) 99943-5150",
        href: waLink(waMessages.nav),
        external: true,
      },
      { label: "contato@adexpand.com.br", href: "mailto:contato@adexpand.com.br" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidade", href: "/privacidade" },
      { label: "Termos de Uso", href: "/termos" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[color:var(--ink-950)] border-t border-[color:var(--ink-800)] pt-16 md:pt-24 pb-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <div className="text-[color:var(--text-on-dark)]">
            <Logo className="h-10 md:h-14" />
          </div>
          <p className="mt-5 max-w-md text-[color:var(--text-on-dark-muted)] leading-relaxed">
            Landing pages de alta conversão pra quem roda tráfego pago a sério.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-10 mb-12 pb-10 border-b border-[color:var(--ink-800)]">
          {columns.map((c) => (
            <div key={c.title}>
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--gold-500)] mb-4">
                {c.title}
              </h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={"external" in l && l.external ? "_blank" : undefined}
                      rel={"external" in l && l.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-[color:var(--text-on-dark-muted)] hover:text-[color:var(--gold-500)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--gold-500)] mb-4">
              Redes
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl border border-[color:var(--ink-800)] flex items-center justify-center text-[color:var(--text-on-dark-muted)] hover:text-[color:var(--gold-500)] hover:border-[color:var(--gold-500)] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl border border-[color:var(--ink-800)] flex items-center justify-center text-[color:var(--text-on-dark-muted)] hover:text-[color:var(--gold-500)] hover:border-[color:var(--gold-500)] transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:contato@adexpand.com.br"
                aria-label="E-mail"
                className="w-10 h-10 rounded-xl border border-[color:var(--ink-800)] flex items-center justify-center text-[color:var(--text-on-dark-muted)] hover:text-[color:var(--gold-500)] hover:border-[color:var(--gold-500)] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[color:var(--text-on-dark-muted)]">
          <div>© {new Date().getFullYear()} Ad Expand. Todos os direitos reservados.</div>
          <div className="font-mono">
            Feito com atenção aos detalhes em Salvador, BA.
          </div>
        </div>
      </div>
    </footer>
  );
}
