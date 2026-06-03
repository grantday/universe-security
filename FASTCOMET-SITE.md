# FastComet live site — match Vercel (no npm on server)

The site on **Vercel** is built with **Next.js + React**. To look **identical** on FastComet **without Node/npm**, we export the same UI as **static HTML/CSS/JS** on your PC and upload it.

| | Vercel | FastComet |
|--|--------|-----------|
| Build | Vercel runs `next build` | **You** run `npm run build:site` on your PC |
| Server | Node | **Only files** in `public_html` |
| Look | Full design | **Same** (exported from same codebase) |

The older hand-built **PHP** site (`npm run build:php-static`) is a simplified copy — **do not use it** if you want Vercel parity. Use **`npm run build:site`** instead.

---

## Edit → deploy

```bash
# 1. Edit in Cursor (same files as Vercel)
#    app/, components/, content/site-content.json

# 2. Build on PC (~5–10 min)
npm run build:site

# 3. Upload
#    Desktop: universe-security-site.zip → public_html → Extract
#    Or SSH (after ssh-add):
npm run deploy:site-ssh
```

---

## What works on static hosting

- Home hero slider, layered cards, marquee, all marketing pages  
- Contact form + assessment wizard → **email client** (`mailto:`)  
- Emergency button → call + email alert (no `/api/emergency`)  
- Insights articles (from MDX at build time)  

## Not on static hosting

- `/studio` CMS (stay on Vercel or use Node hosting later)  
- Server contact API (uses mailto instead)  

---

## SSH config

`deploy/php-static/.env.deploy` — same file used for deploy:

```env
DEPLOY_HOST=185.181.254.183
DEPLOY_USER=universe
DEPLOY_PATH=/home/universe/public_html
DEPLOY_KEY=C:\Users\cojva\Desktop\id_rsa
```

Before deploy: `ssh-add C:\Users\cojva\Desktop\id_rsa` (enter passphrase).
