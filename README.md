# Ad Expand — Landing Page

Landing page premium da agência **Ad Expand**. Foco em conversão mobile-first e publicação em Vercel.

## Stack

- **Next.js 16** (App Router, Turbopack, React Server Components)
- **TypeScript** strict + **Tailwind CSS v4**
- **motion** (Framer Motion) — reveal, word-swap, magnetic buttons
- **@radix-ui/react-accordion** — FAQ
- **lucide-react** — ícones
- **next/font** — Space Grotesk + Inter + Geist Mono self-hosted

## Rodar localmente

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de produção
npm run start        # serve o build
```

## Variáveis de ambiente

Crie `.env.local` (os scripts só são injetados se existirem):

```bash
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Deploy Vercel

```bash
npx vercel          # primeiro deploy
npx vercel --prod   # produção
```

Ou conecte o repo em vercel.com/new.

## Trocar logo oficial

Substitua `public/logo-expand.svg` (mantenha `fill="currentColor"` para herdar cor).
O componente `<Logo />` em `components/primitives/logo.tsx` também pode ser atualizado.

## WhatsApp / CTAs

Número central: `+55 75 99943-5150` — configurado em `lib/whatsapp.ts`.
Mensagens por CTA em `waMessages`.

## Estrutura

```
app/               layout, page, globals.css, metadata
components/
  sections/        navbar, hero, solutions, process, testimonials, etc
  primitives/      reveal, magnetic-button, word-swap, marquee, etc
lib/               utils (cn), whatsapp, pixel, motion tokens
public/            logo, favicon
```

## Checklist

- [x] Build limpo (`npm run build`)
- [x] Mobile-first (375 → 1280px)
- [x] Sticky CTA mobile após hero
- [x] Navbar sticky com blur
- [x] Word-swap no hero
- [x] Marquee duplo com pause on hover
- [x] Timeline com scroll-scrub (motion `useScroll`)
- [x] Accordion FAQ acessível (Radix)
- [x] Meta Pixel + GA4 via env vars
- [x] `prefers-reduced-motion` respeitado
- [x] Tipografia fluida (`clamp`)
- [ ] Trocar avatares dos depoimentos
- [ ] Gerar `og-image.png` 1200×630
- [ ] Preencher Meta Pixel ID + GA4 ID reais
