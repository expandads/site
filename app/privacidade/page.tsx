import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade das ferramentas internas da Ad Expand.",
  alternates: { canonical: "/privacidade" },
};

const sections = [
  {
    title: "Sobre esta política",
    text: "Esta política se aplica às ferramentas internas da Ad Expand usadas para gerenciar campanhas no Google Ads e perfis no Google Perfil da Empresa (Google Business Profile) de clientes que autorizaram esse acesso.",
  },
  {
    title: "Dados que acessamos",
    text: "Com a sua autorização via login Google, acessamos os dados das contas de Google Ads autorizadas (campanhas, anúncios, orçamentos e métricas) e, quando autorizado, dos perfis do Google Perfil da Empresa (informações do perfil, publicações e avaliações), além do e-mail da conta Google usada no login.",
  },
  {
    title: "Como usamos os dados",
    text: "Os dados são usados exclusivamente para gerenciar, otimizar e gerar relatórios das contas autorizadas pelo cliente. Não usamos esses dados para publicidade, não vendemos e não compartilhamos com terceiros.",
  },
  {
    title: "Armazenamento e segurança",
    text: "As credenciais de acesso ficam armazenadas apenas nos computadores da equipe da Ad Expand e não são enviadas para servidores de terceiros.",
  },
  {
    title: "Dados do Google",
    text: "O uso e a transferência de informações recebidas das APIs do Google seguem a Política de Dados do Usuário dos Serviços de API do Google, incluindo os requisitos de Uso Limitado.",
  },
  {
    title: "Como revogar o acesso",
    text: "Você pode revogar o acesso a qualquer momento em myaccount.google.com/permissions ou solicitando à Ad Expand pelos canais de atendimento do site.",
  },
];

export default function PrivacidadePage() {
  return (
    <main
      className="min-h-screen w-full px-4 py-20"
      style={{ background: "#FFFFFF", color: "#111111" }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Política de Privacidade</h1>
        <p className="mt-3 text-sm" style={{ color: "#57534E" }}>
          Última atualização: 13 de novembro de 2026
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="mt-2 leading-relaxed" style={{ color: "#333333" }}>
                {section.text}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-16 text-sm" style={{ color: "#57534E" }}>
          <Link href="/" className="underline">
            Ad Expand
          </Link>
        </p>
      </div>
    </main>
  );
}
