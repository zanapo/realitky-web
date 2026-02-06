# Realitní dům — moderní realitní web

Kompletní redesign realitního webu postavený na Next.js (App Router), Tailwind CSS a shadcn/ui. Struktura je vícestránková, server-side listing je optimalizovaný pro rychlost i SEO.

## Požadavky

- Node.js 20+
- pnpm 10+

## Spuštění lokálně

```bash
pnpm install
pnpm dev
```

Web běží na `http://localhost:3000`.

## ENV konfigurace

Zkopírujte `.env.example` do `.env` a doplňte hodnoty.

```bash
cp .env.example .env
```

### Přepnutí zdroje dat

- `DATA_SOURCE=mock` načítá data z `content/properties.json`.
- `DATA_SOURCE=feed` načítá data z externího feedu přes `PROPERTIES_FEED_URL`.

### Odesílání emailů

Používá se SMTP přes Nodemailer:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SMTP_TO`

## Testy

```bash
pnpm test:unit
pnpm test:e2e
```

Playwright smoke testy vyžadují běžící dev server.

## Struktura projektu

- `app/` — App Router stránky a API route.
- `components/` — UI a prezentační komponenty.
- `lib/` — datasources, validace, formattery, SEO helpers.
- `content/` — mock data pro nemovitosti a blog.

## Deploy

Projekt je připravený pro deploy na Vercel nebo jiném Node hostingu.
