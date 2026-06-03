# Temporary PHP + JavaScript site

Parallel lightweight site for **FastComet / cPanel shared hosting** (`public_html`) while the full Next.js app deploys via GitHub Actions.

| Full app (Node) | This site (PHP) |
|-----------------|-----------------|
| `/studio`, CMS, API | Static pages + contact form |
| `universe-security-app` | `public_html` |
| GitHub Actions deploy | Upload zip |

---

## Pages

- `index.php` — Home
- `solutions.php` — Solutions overview
- `company.php` — About
- `contact.php` — Form + map (JS validation)
- `store.php` — Store coming soon
- `send-contact.php` — Form handler (email or `data/*.jsonl` fallback)

Contact details live in **`config.php`** (sync with `lib/site-config.ts`).

---

## Build zip on your PC

```bash
npm run build:php-static
```

Creates:

- `php-static-deploy/` in the repo
- `Desktop/universe-security-php.zip`

---

## Deploy to FastComet (temporary)

1. **cPanel → File Manager → `public_html`**
2. (Optional) Backup existing files
3. Upload **`universe-security-php.zip`** → **Extract**
4. Confirm **`index.php`** is in the web root
5. Visit `https://universe-security.org/`

To run **alongside** the Node app, use a subfolder instead:

- Upload to `public_html/temp/`
- Visit `https://universe-security.org/temp/`

Point the domain to Node when ready; remove or redirect the PHP folder.

---

## Contact form

1. Tries PHP `mail()` to `info@universe-security.com`
2. If mail fails, appends to `data/inquiries-YYYY-MM.jsonl` (download via File Manager)

Check cPanel **Email Deliverability** if messages don’t arrive.

---

## Local test (PHP installed)

```bash
cd deploy/php-static
php -S localhost:8080
```

Open http://localhost:8080

---

## Switch back to full site

When GitHub Actions + Node app are live, remove PHP files from `public_html` or set domain document root back to the Node application URL in cPanel.
