# Deploy Universe Security on GoDaddy

This site is a **Node.js** application (Next.js 15 + Payload CMS). It does **not** run on GoDaddy’s basic PHP-only shared hosting. You need one of these:

| GoDaddy product | Works? | Notes |
|-----------------|--------|--------|
| **Domain only** (DNS) | Yes | Point the domain to Vercel and keep hosting there (easiest). |
| **VPS / Dedicated** | Yes | Full control — use the steps below. |
| **Web Hosting with Node.js** (cPanel) | Yes | Use “Setup Node.js App” if your plan includes it. |
| **Economy / basic shared (PHP only)** | No | Upgrade to Node/VPS or use DNS → Vercel. |

---

## Quick build (on your PC)

```bash
npm install --legacy-peer-deps
npm run build:godaddy
```

This creates a folder **`godaddy-deploy/`** — upload **everything inside it** to your server (FTP, File Manager, or SSH).

---

## Server requirements

- **Node.js 20.x** (18+ minimum)
- **512 MB+ RAM** (1 GB+ recommended for builds; build locally and upload `godaddy-deploy` to avoid building on the server)
- **Persistent disk** for SQLite **or** a **Postgres** URL (e.g. [Neon](https://neon.tech) free tier)
- Writable folder: `public/media` (image uploads)

---

## Environment variables

Copy `deploy/godaddy/.env.example` to `.env` in the deploy folder, or set variables in cPanel → **Environment Variables**.

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://www.yourdomain.com` |
| `PAYLOAD_SECRET` | Yes | `openssl rand -base64 32` |
| `DATABASE_URI` | Yes | SQLite file path or Postgres URL |
| `ADMIN_PASSWORD` | Studio | Password for `/studio` |
| `RESEND_API_KEY` + email vars | Forms | Contact / emergency emails |

**SQLite on GoDaddy:** use an absolute path **outside** `public_html`, e.g.  
`DATABASE_URI=file:/home/username/universe-security.db`

**Postgres (recommended):** use a hosted Postgres URL; set `DATABASE_URI=postgresql://...`

After first deploy, seed the CMS once (replace password):

```bash
curl -X POST "https://www.yourdomain.com/api/dev/seed?secret=YOUR_ADMIN_PASSWORD"
```

---

## Option A — GoDaddy VPS (recommended)

1. Install Node 20 and (optional) PM2: `npm i -g pm2`
2. Upload `godaddy-deploy/` to e.g. `/home/username/universe-security`
3. Create `.env` from `.env.example`
4. Start the app:
   ```bash
   cd /home/username/universe-security
   node start.cjs
   ```
   Or with PM2: `pm2 start ecosystem.config.cjs && pm2 save`
5. Point your domain in GoDaddy DNS to the VPS IP (A record).
6. Use **Nginx** or Apache as reverse proxy to port `3000` (or set `PORT` in `.env`).

Example Nginx location block:

```nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

Enable **SSL** in GoDaddy or with Let’s Encrypt on the VPS.

---

## Option B — cPanel “Setup Node.js App”

1. In cPanel, open **Setup Node.js App** → **Create Application**
2. Node version: **20**
3. Application root: folder where you uploaded `godaddy-deploy` contents
4. Application URL: your domain or subdomain
5. Application startup file: **`start.cjs`**
6. Add environment variables from `.env.example`
7. Run **NPM Install** only if you uploaded source code; if you uploaded `godaddy-deploy`, skip install and use **Run JS script** → `start.cjs`
8. Enable **SSL** for the domain in cPanel

---

## Option C — Domain on GoDaddy, site stays on Vercel

If you only bought the domain from GoDaddy:

1. In GoDaddy → **DNS** → add **CNAME** `@` → `cname.vercel-dns.com` (or the target Vercel gives you)
2. Add the domain in Vercel → Project → **Domains**
3. Keep `NEXT_PUBLIC_SITE_URL` on Vercel set to your GoDaddy domain

No `godaddy-deploy` upload needed.

---

## After go-live checklist

- [ ] `https://www.yourdomain.com` loads with valid SSL
- [ ] `/studio` login works (`ADMIN_PASSWORD`)
- [ ] Contact form sends email (Resend verified domain)
- [ ] Footer shows correct phone **077 323 6764** and email **info@universe-security.com**
- [ ] Run seed once if CMS pages are empty
- [ ] Upload logo/images via `/admin` → Media

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| SQLite connection error | Use absolute `DATABASE_URI` path or switch to Postgres |
| 502 / app not running | Check Node app is started; confirm `PORT` matches proxy |
| Old phone/email on site | Redeploy latest `godaddy-deploy`; check `.env` `NEXT_PUBLIC_SITE_URL` |
| Media uploads fail | Ensure `public/media` is writable (`chmod 755`) |

For development questions, see the root [README.md](../../README.md).
