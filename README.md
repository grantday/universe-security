# Universe Security — marketing website

Next.js 14 (App Router) + Tailwind CSS + MDX insights + Resend-powered forms.

## Prerequisites

- Node.js 18.18+ (20 LTS recommended)
- npm 9+

## Setup

```bash
cd universe-security
npm install
```

Copy environment variables:

```bash
copy .env.example .env.local
```

Fill in `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `EMERGENCY_TO_EMAIL`. Optionally set `NEXT_PUBLIC_SITE_URL` to your production URL (used for sitemap/metadata).

For Resend, verify your domain and set `RESEND_FROM` to an address on that domain. Until then, Resend’s `onboarding@resend.dev` sender may be used with API limits.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

CI / pre-release: run `npm run lint` and `npm run build` locally (this environment may not have `npm` on PATH; use a full Node install).

## Content

- **Insights (blog):** edit or add MDX files under [`content/insights/`](content/insights/). Frontmatter keys: `title`, `date` (ISO `YYYY-MM-DD`), `description`.
- **Contact details, phones, address:** update [`lib/site-config.ts`](lib/site-config.ts) (single source of truth).

## Placeholder content

- Testimonials and KPI figures are **samples** for layout — replace with verified data.
- Privacy & Terms pages contain **sample legal text** — replace with counsel-approved copy.
- Map embed URL in `site-config` is a placeholder — replace with your Google Maps embed.

## Emergency “silent alert”

The floating emergency UI posts to `/api/emergency`, which emails `EMERGENCY_TO_EMAIL` via Resend and logs to the server console. **SMS (e.g. Twilio) is not wired in v1** — add a provider in the route handler if required.

## Deploy (Vercel)

1. Push the repo and import the project in Vercel.
2. Set the same environment variables in Project Settings → Environment Variables.
3. Deploy. `sitemap.xml` and `robots.txt` are generated automatically.

## Project structure (high level)

- `app/` — routes, layouts, API route handlers, OG image
- `components/` — UI, home sections, MDX prose wrapper
- `content/insights/` — MDX posts
- `lib/` — site config, validations, rate limit, insights helpers
