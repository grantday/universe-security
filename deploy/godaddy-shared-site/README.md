# GoDaddy Basic Shared Hosting (PHP-only) — Static HTML Site

GoDaddy basic shared hosting cannot run **Node.js**, so the full Next.js + Payload CMS app cannot be hosted there.

This folder contains a **static HTML version** of the site that you can upload to GoDaddy `public_html/`.

## Upload

1. In GoDaddy cPanel → **File Manager** → open `public_html/`
2. Upload the **contents** of `deploy/godaddy-shared-site/site/` (not the folder itself)
3. Ensure `public_html/index.html` exists after upload

## What works / what doesn’t

- ✅ Works: website pages (static)
- ✅ Works: phone/email/address, maps embed, store coming soon
- ❌ Not included: `/studio`, `/admin`, CMS editing, API forms (requires Node hosting)

If you want CMS editing, use **GoDaddy VPS** or keep hosting on **Vercel** and only use GoDaddy for the domain/DNS.

