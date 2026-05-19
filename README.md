# Universe Security — marketing website

Next.js on **Vercel** with a **built-in content admin** at `/admin` (no Sanity, no second backend).

## What you configure on Vercel

| Variable | Required | Purpose |
|----------|----------|---------|
| `ADMIN_PASSWORD` | Yes | Log in at `/admin` |
| `RESEND_API_KEY` + email vars | For forms | Contact & emergency |
| `NEXT_PUBLIC_SITE_URL` | Yes | SEO / sitemap |
| `BLOB_READ_WRITE_TOKEN` | Auto | Created when you add **Storage → Blob** once (images + saved content) |

That is the full CMS setup — everything runs in **one** Vercel project.

## Edit content

1. Deploy to Vercel with `ADMIN_PASSWORD` set.
2. In Vercel: **Storage → Create Blob store** (links to the project automatically).
3. Open `https://your-domain.vercel.app/admin` and sign in.
4. Edit branding, site details, hero copy → **Save & publish**.

Changes are stored in Vercel Blob and picked up on the next page load (no separate CMS account).

## Local development

```bash
npm install --legacy-peer-deps
copy .env.example .env.local
# Set ADMIN_PASSWORD in .env.local
npm run dev
```

Without Blob locally, saves go to `content/site-content.json` in the repo.

## Moving off Vercel later

Export content from the admin (or copy `site-content.json` / Blob JSON). Point the same Next.js app at any host; add Blob or a JSON file on that host. No Sanity migration.

## Forms

Contact and emergency still use Resend (`app/api/contact`, `app/api/emergency`).
