# Universe Security — PHP + JavaScript site

Full public-site replica of the Next.js/Vercel frontend, for **shared hosting** (PHP) with **AJAX** contact forms and **SSH** deploy.

## PC vs server (important)

| Where | What runs |
|-------|-----------|
| **Your PC (Cursor)** | `npm install`, `npm run dev`, `npm run build:php-static` |
| **FastComet server** | **PHP only** — upload the zip. No Node, no npm, no build on server |

The upload is plain **PHP, CSS, JavaScript, JSON, and SVG** — not a Node app.

## Stack

| Layer | Role |
|-------|------|
| **PHP** | Pages, routing (`index.php`), content from JSON |
| **JavaScript** | Hero slider, mobile nav, scroll reveal, AJAX contact |
| **JSON** | `content/site-content.json` + `insights.json` + `extras.json` (synced from repo) |

## Pages (same URLs as Vercel)

`/`, `/solutions`, `/industries`, `/control-centre`, `/technology`, `/insights`, `/insights/{slug}`, `/company`, `/contact`, `/store`, `/privacy`, `/terms`, `/credits`

**Not included:** `/studio`, `/cms-admin`, Payload APIs (use Next.js separately if needed).

## Update content

1. Edit `content/site-content.json` or `content/insights/*.mdx` in the main repo (or via Studio → export/sync later).
2. Rebuild and deploy:

```bash
npm run build:php-static
```

## Deploy

### Zip (cPanel File Manager)

Upload `Desktop/universe-security-php.zip` to `public_html/` and extract.

### SSH (recommended)

```bash
cp deploy/php-static/.env.deploy.example deploy/php-static/.env.deploy
# Edit DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH

npm run deploy:php-ssh
```

### Local test

```bash
npm run build:php-static
cd php-static-deploy
php -S localhost:8080
```

Open http://localhost:8080

## Contact form

- POST `/api/contact.php` (AJAX or standard form)
- Uses PHP `mail()` → `info@universe-security.com`
- Fallback: `data/inquiries-*.jsonl`

## Keeping in sync with Next.js

| Source of truth | PHP copy |
|-----------------|----------|
| `content/site-content.json` | Synced on every `build:php-static` |
| `content/insights/*.mdx` | Converted to `content/insights.json` |
| Contact in `lib/site-config.ts` | Edit `site-content.json` `site` block |

After Studio edits on Vercel, export or update `site-content.json` and redeploy PHP.
