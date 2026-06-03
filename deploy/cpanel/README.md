# cPanel Git deployment (FastComet)

Official guide: [Guide to Git — Deployment](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-deployment/)

## Requirements cPanel checks

1. **`.cpanel.yml`** at the repository root (included in this repo).
2. **Clean working tree** on the branch you deploy — no uncommitted edits on the server copy.

If deploy is disabled, in cPanel open **Git Version Control → Manage** and confirm both items show green.

## One-time setup

### 1) Node.js application (separate from the Git clone)

cPanel → **Setup Node.js App**:

| Field | Value |
|-------|--------|
| Application root | `/home/<cpanel_user>/universe-security-app` |
| Application URL | `universe-security.org` |
| Startup file | `start.cjs` |

Environment variables (set once):

- `NEXT_PUBLIC_SITE_URL=https://universe-security.org`
- `NEXT_PUBLIC_SERVER_URL=https://universe-security.org`
- `PAYLOAD_SECRET=...`
- `ADMIN_PASSWORD=...`
- `DATABASE_URI=...` (Postgres URL or `file:/home/<cpanel_user>/universe-security.db`)

The Git clone usually lives under `~/repositories/` — **not** the same folder as the Node app.

### 2) Clone GitHub in cPanel

**Git Version Control → Create** → clone `grantday/universe-security` (or your repo URL).

### 3) Match deploy target path

If your Node app root is not `~/universe-security-app`, set in cPanel Git deploy settings:

`CPANEL_APP_DIR=/home/<user>/your-actual-app-folder`

Or edit the default in `deploy/scripts/cpanel-post-deploy.sh`.

## Deploy workflow (pull)

1. Edit in Cursor → `git commit` → `git push origin main` (GitHub)
2. cPanel → **Git Version Control** → your repo → **Manage**
3. **Pull / Deploy** tab → **Update from Remote**
4. **Deploy HEAD Commit**

The `.cpanel.yml` script installs dependencies, runs `npm run build:fastcomet`, copies `godaddy-deploy/` into the Node app folder, and touches `tmp/restart.txt`.

## “No uncommitted changes” error

On the server, cPanel refuses deploy if someone edited files in the clone. Fix:

- **Manage** → discard local changes, or
- **Update from Remote** again so the tree matches GitHub

Never edit files inside the cPanel Git clone on the server; always change locally and push.

## Build fails on server (out of memory)

Shared hosting builds can run out of RAM. Use **GitHub Actions** instead (`.github/workflows/deploy-fastcomet.yml`) and only use cPanel Git for pull + manual copy, or upgrade plan / build locally and upload `godaddy-deploy/` once.
