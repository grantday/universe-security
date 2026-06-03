# Fix: “The system cannot deploy”

cPanel shows this when **either** requirement fails:

1. **No valid `.cpanel.yml`** in the **top level** of the clone  
2. **Uncommitted changes** on the server copy of the branch  

Official docs: [Guide to Git — Deployment](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-deployment/)

---

## You may not need cPanel deploy at all

If you use **GitHub Actions** (`git push origin main`), see **[DEPLOY.md](../../DEPLOY.md)**.  
You can ignore cPanel **Deploy HEAD Commit** — the live site updates from GitHub.

Use this guide only if you want cPanel deploy to work too.

---

## `npm error EOVERRIDE`

npm 11 errors when `package.json` has `"overrides"` for `next` while `next` is also listed under `dependencies`.

```bash
cd ~/repositories/universe-security
npm install --legacy-peer-deps --no-overrides
```

Or delete the `"overrides": { ... }` block from `package.json` on the server.

**Easiest:** upload **`universe-security-deploy.zip`** to `universe-security-app/` — see **ONE-STEP.md** (no npm on server).

---

## Fix 1 — `.cpanel.yml` missing on the server

The file is in GitHub on `main`, but your **server clone** may be old.

1. cPanel → **Git Version Control** → **Manage**  
2. **Pull / Deploy** → **Update from Remote**  
3. **File Manager** → open your clone (e.g. `repositories/universe-security`)  
4. Confirm **`package.json`** and **`.cpanel.yml`** are in the **same folder**

If `.cpanel.yml` is missing → **Update from Remote** failed or wrong branch (use `main`).

---

## Fix 2 — “No uncommitted changes” (most common)

Running **`npm install`** or editing files **inside the clone** on the server leaves a dirty tree. cPanel then blocks deploy.

### cPanel → Terminal (or SSH)

Replace the path with your real clone path from **Git Version Control → Manage**:

```bash
cd ~/repositories/universe-security
git status
git fetch origin
git reset --hard origin/main
git clean -fd
git status
```

You want: **`nothing to commit, working tree clean`**

Then in cPanel:

1. **Update from Remote**  
2. **Deploy HEAD Commit**

### Do not do this on the server clone

- `npm install` in `repositories/...` (use GitHub Actions instead)  
- Editing files by hand in File Manager inside the clone  
- Running builds that write `.next/` or change `package-lock.json` in the clone  

---

## Fix 3 — Branch

In **Git Version Control → Manage**, deploy branch must be **`main`** (where `.cpanel.yml` exists).

---

## Still blocked?

Send support (or your developer) a screenshot of:

- **Manage** → deployment requirements (red/green)  
- Output of `git status` from the clone folder  
- Whether `.cpanel.yml` exists in File Manager at clone root  
