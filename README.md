# Universe Security — marketing website

Next.js 14 (App Router) + Tailwind CSS + **Sanity CMS** + MDX insights + Resend forms.

The CMS is **host-agnostic**: Sanity runs on sanity.io. Your site can deploy on Vercel, Netlify, AWS, or any Node host — only environment variables change.

## Prerequisites

- Node.js 18.18+ (20 LTS recommended)
- npm 9+
- A [Sanity](https://sanity.io) project (free tier)

## Setup

```bash
cd universe-security
npm install
copy .env.example .env.local
```

### Sanity (content management)

1. Create a project at [sanity.io/manage](https://sanity.io/manage) (or run `npx sanity@latest init` in this folder).
2. Add to `.env.local`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `SANITY_API_READ_TOKEN` (Viewer token — for ISR fetches)
   - `SANITY_API_WRITE_TOKEN` (Editor token — for seed script only)
   - `SANITY_REVALIDATE_SECRET` (random string for webhook auth)
3. Open **Studio** at [http://localhost:3000/studio](http://localhost:3000/studio) to edit hero, services, metrics, testimonials, and insights.
4. Seed initial content from existing copy:

```bash
npm run sanity:seed
```

### Resend (forms)

Set `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO_EMAIL`, and `EMERGENCY_TO_EMAIL`.

### Site URL

Set `NEXT_PUBLIC_SITE_URL` to your production URL (metadata, sitemap).

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

The site **builds without Sanity credentials** — it falls back to `lib/site-config.ts` until you connect a project.

## Instant updates (webhook)

In Sanity → API → Webhooks, POST to:

`https://<your-domain>/api/revalidate`

Header: `x-sanity-webhook-secret: <SANITY_REVALIDATE_SECRET>`

Published edits appear within ~60 seconds (ISR) or seconds when the webhook fires.

## Deploy

Works on **any** Next.js host. On Vercel:

1. Push to GitHub and import the repo.
2. Add all env vars from `.env.example`.
3. Create a Vercel Blob store only if you add custom file uploads later (not required for Sanity images).

## Content sources

| Content | Where to edit |
|--------|----------------|
| Hero, services, KPIs, testimonials | `/studio` (Sanity) |
| Phones, fallback defaults | `lib/site-config.ts` |
| Insights (legacy MDX) | `content/insights/*.mdx` — migrating to Sanity `insight` documents in Phase 2+ |

## Project structure

- `app/` — routes, API, Studio at `/studio`
- `sanity/` — schemas, GROQ queries, seed script
- `lib/sanity/` — typed loaders with fallbacks
- `components/` — UI and motion helpers
