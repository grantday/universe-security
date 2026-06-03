# One-step deploy (FastComet)

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
