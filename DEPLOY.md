# Deploy Universe Security (one step)

After one-time setup, you **only**:

```bash
git add -A
git commit -m "Your change"
git push origin main
```

GitHub builds the site and uploads it to FastComet. No manual cPanel deploy, no `npm install` on the server.

---

## One-time setup (≈10 minutes)

### 1) FastComet Node.js app (cPanel → Setup Node.js App)

Create **one** application (do this once):

| Field | Value |
|-------|--------|
| Application root | `/home/universe/universe-security-app` (use your real cPanel username instead of `universe`) |
| Application URL | `universe-security.org` |
| Startup file | `start.cjs` |

**Environment variables** (set once in the Node app):

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://universe-security.org` |
| `NEXT_PUBLIC_SERVER_URL` | `https://universe-security.org` |
| `PAYLOAD_SECRET` | your secret (same as local `.env.local`) |
| `ADMIN_PASSWORD` | Studio login password |
| `DATABASE_URI` | Postgres URL **or** `file:/home/universe/universe-security.db` |

Create the app folder once (File Manager or Terminal):

```bash
mkdir -p ~/universe-security-app
```

Upload **only the first time** if GitHub Actions is not ready yet: run `npm run build:fastcomet` on your PC and upload `godaddy-deploy/` contents into `universe-security-app/`, including `start.cjs`.

---

### 2) GitHub Actions secrets (automatic deploy)

GitHub → your repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | What to put |
|-------------|-------------|
| `FASTCOMET_HOST` | Server hostname from cPanel (e.g. `server123.fastcomet.com`) or server IP |
| `FASTCOMET_USER` | cPanel username (e.g. `universe`) |
| `FASTCOMET_SSH_KEY` | Full private key from cPanel → **SSH Access** → Generate/import key |
| `FASTCOMET_PATH` | Full path to Node app, e.g. `/home/universe/universe-security-app` |

**SSH key tip:** In cPanel, authorize the public key, then paste the **private** key into GitHub secret `FASTCOMET_SSH_KEY`.

---

### 3) cPanel Git clone (optional — for code backup only)

You can keep the repo in `~/repositories/universe-security` for reference.  
You **do not** need to click **Deploy HEAD Commit** if GitHub Actions is configured.

---

## Daily workflow

1. Edit in **Cursor**
2. Test locally: `npm run dev`
3. Push:

```bash
git push origin main
```

4. Open GitHub → **Actions** → wait for green **Deploy to FastComet** (about 5–10 min first time)
5. Visit `https://universe-security.org`

Content-only edits (phone, text): use **Studio** at `/studio` — no deploy needed.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| GitHub Action fails on “Install” | Uses `.npmrc` (`legacy-peer-deps=true`) — should match local install |
| Action fails on SSH | Check `FASTCOMET_HOST`, `FASTCOMET_USER`, `FASTCOMET_PATH`, and SSH key |
| Site old after green Action | cPanel → Setup Node.js App → **Restart** |
| `ERESOLVE` on server | Don’t run `npm install` on server; use GitHub Actions only |

Manual fallback: `npm run build:fastcomet` locally, upload `godaddy-deploy/` to `universe-security-app/`, Restart Node app.
