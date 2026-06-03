# One-step deploy (FastComet)

## npm crashes on the server (`SIGABRT`, `esbuild`, `uv_thread_create`)?

**Normal on FastComet Essential.** Shared hosting cannot compile `esbuild` / full `npm install` (thread and memory limits).

**Do not run `npm install` in `repositories/universe-security` or in the Node virtualenv.**

Use the **zip** below only.

---

## npm `EOVERRIDE` on the server?

Do **not** run plain `npm install` in cPanel. Use the **zip** below, or:

```bash
npm install --legacy-peer-deps --no-overrides
```

If it still fails, open `package.json` on the server and **delete** the whole `"overrides": { ... }` block if present, then run the command again.

**Easiest:** upload the zip — no npm on the server.

---

## Right now (no GitHub secrets needed)

A zip is on your **Desktop**: `universe-security-deploy.zip`

### cPanel (3 steps)

1. **File Manager** → open folder **`universe-security-app`** (same as Setup Node.js App → Application root)  
   - Not `repositories/`  
   - Not `public_html`

2. **Upload** `universe-security-deploy.zip` → **Extract** here (so `start.cjs` and `server.js` are in that folder)

3. **Setup Node.js App** → **Restart**

Open: **https://universe-security.org**

Env vars must already be set in the Node app (see DEPLOY.md).

---

## Later (only `git push`)

Add 4 GitHub secrets once (DEPLOY.md), then:

```bash
git push origin main
```

No cPanel deploy, no zip.

---

## Rebuild zip anytime

```powershell
powershell -ExecutionPolicy Bypass -File scripts/deploy.ps1
```
