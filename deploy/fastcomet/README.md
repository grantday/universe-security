# Deploy on FastComet (cPanel Node.js)

Same process as VPS Node hosting — use the **standalone bundle** from your repo.

## Before upload (verify locally)

```bash
npm install --legacy-peer-deps
npm run lint
npx tsc --noEmit
npm run build
npm run build:godaddy
```

Optional smoke test:

```bash
cd godaddy-deploy
set PORT=3000
node start.cjs
```

Open `http://localhost:3000` and `http://localhost:3000/studio`.

## Edit in Cursor → deploy (like GitHub)

You **do not** need to manually upload every time. Use Git as the source of truth:

### Option A — Automatic deploy on `git push` (recommended)

1. Edit in Cursor → test with `npm run dev`
2. `git commit` + `git push origin main`
3. **GitHub Actions** builds and uploads to FastComet (`.github/workflows/deploy-fastcomet.yml`)

One-time setup in GitHub → **Settings → Secrets → Actions**:

| Secret | Example |
|--------|---------|
| `FASTCOMET_HOST` | `server123.fastcomet.com` |
| `FASTCOMET_USER` | your cPanel username |
| `FASTCOMET_SSH_KEY` | private SSH key (cPanel → SSH Access) |
| `FASTCOMET_PATH` | `/home/user/universe-security-app` |

Env vars (`PAYLOAD_SECRET`, `DATABASE_URI`, etc.) stay in **cPanel → Node.js App** — set once.

### Option B — cPanel Git deploy (`.cpanel.yml`)

Repo includes **`.cpanel.yml`** per [cPanel Git deployment](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-deployment/).

1. Clone repo in cPanel → **Git Version Control**
2. Node app in **`~/universe-security-app`** (startup `start.cjs`) — see **`deploy/cpanel/README.md`**
3. After `git push` to GitHub: **Update from Remote** → **Deploy HEAD Commit**
4. Working tree on server must be **clean** (no uncommitted edits in the clone)

### Option C — Vercel + GitHub (easiest auto-deploy)

Connect repo to Vercel; every push deploys. Point **universe-security.org** DNS to Vercel.

### Content without code deploy

Use **Studio** at `/studio` for phone, text, and pages — no Git push needed for content-only edits.

---

## Manual upload (first time or fallback)

1. Build on your PC: `npm run build:fastcomet`
2. Upload **contents** of `godaddy-deploy/` to e.g. `/home/<user>/universe-security-app/`
3. cPanel → **Setup Node.js App**:
   - **Application root**: `universe-security-app`
   - **Application URL**: `universe-security.org`
   - **Startup file**: `start.cjs`
4. Environment variables:
   - `NEXT_PUBLIC_SITE_URL=https://universe-security.org`
   - `NEXT_PUBLIC_SERVER_URL=https://universe-security.org`
   - `PAYLOAD_SECRET=...`
   - `ADMIN_PASSWORD=...`
   - `DATABASE_URI=...` (Postgres recommended, or `file:/home/<user>/universe-security.db`)
5. **Restart** the Node app
6. First-time seed: `POST https://universe-security.org/api/dev/seed?secret=YOUR_ADMIN_PASSWORD`
