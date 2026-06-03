# Universe Security — marketing website

Next.js 15 with **Payload CMS** (SQLite locally, Postgres on production) and **Universe Studio** at `/studio` for day-to-day content edits.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js App Router, React 19, Tailwind |
| CMS | Payload 3 (`/admin` for schema/media, `/studio` for editors) |
| Database | SQLite (`file:./universe-security.db`) locally; `DATABASE_URI` Postgres in production |
| Forms | Resend (contact, emergency, assessment wizard) |

Legacy `/cms-admin` and `/admin` (Blob JSON) redirect to **Studio**. Content lives in Payload globals and collections—not Vercel Blob.

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URLs, sitemap, Open Graph, WhatsApp share links (include `https://`) |
| `NEXT_PUBLIC_SERVER_URL` | Local | Fallback when site URL unset (e.g. `http://localhost:3000`) |
| `PAYLOAD_SECRET` | Yes | Payload encryption (`openssl rand -base64 32`) |
| `DATABASE_URI` | Yes | `file:./universe-security.db` locally or Postgres connection string |
| `PAYLOAD_ADMIN_EMAIL` / `PAYLOAD_ADMIN_PASSWORD` | Seed | First admin user via `npm run seed:payload` |
| `RESEND_API_KEY` + email vars | Forms | Contact, emergency, assessment submissions |

## Local development

```bash
npm install --legacy-peer-deps
copy .env.example .env.local
# Set PAYLOAD_SECRET, PAYLOAD_ADMIN_PASSWORD, NEXT_PUBLIC_SERVER_URL
npm run seed:payload   # optional: globals, services, insights, trust content
npm run dev
```

- Public site: http://localhost:3000  
- Universe Studio: http://localhost:3000/studio  
- Payload admin (media, schema): http://localhost:3000/admin  

## Edit content

1. Sign in at `/studio` (Payload user created by seed).
2. Use **Site** for branding, SEO/OG image, compliance credentials.
3. Use **Collections** for insights (articles & case studies), client logos, testimonials, inbox (contact + assessment leads).
4. Upload images in Payload **Media** (`/admin`); reference media IDs in Studio where prompted.

## Features (business)

- Multi-step **security assessment** wizard on `/contact` → structured leads in Studio inbox  
- **Case studies** on insights with problem / approach / metrics  
- **Client logos** marquee and **compliance** strip (home + solutions)  
- **Control Centre** incident simulator (CMS-driven steps + KPIs)  
- Per-insight **hero images** and OG previews; expanded JSON-LD (Organization, LocalBusiness, Service)

## Forms

- `POST /api/contact` — general contact and assessment (`leadType: "assessment"`)  
- `POST /api/emergency` — emergency hotline submissions  

## Deploy

### Vercel (current)

Single deployment with `PAYLOAD_SECRET`, Postgres `DATABASE_URI` (or JSON fallback), `NEXT_PUBLIC_SITE_URL` set to the live domain, and Resend configured. Run `npm run seed:payload` once on a fresh database if needed.

### FastComet (production) — push to deploy

**One-time setup**, then only `git push origin main`. Full steps: **[DEPLOY.md](DEPLOY.md)**.

GitHub Actions builds and uploads to your Node app (`start.cjs` on `universe-security.org`). No cPanel **Deploy HEAD Commit** or server `npm install` needed.

### GoDaddy (legacy)

Same Node bundle as FastComet: **[deploy/godaddy/README.md](deploy/godaddy/README.md)**.

### GoDaddy basic shared (PHP only)

Static HTML only: **[deploy/godaddy-shared-site/README.md](deploy/godaddy-shared-site/README.md)** — no Studio/CMS.
