# Work in Cursor → push to deploy (no npm on FastComet)

You **never** run `npm install` or `npm run build` on the FastComet server.  
All fixes happen in **Cursor on your PC**. Production is updated by **git push**.

---

## Daily workflow (Cursor)

```bash
# 1. Run locally
npm run dev
```

Open:

- http://localhost:3000 — site  
- http://localhost:3000/studio — edit content  
- http://localhost:3000/admin — media  

```bash
# 2. When it works locally, push
git add -A
git commit -m "Describe your fix"
git push origin main
```

That’s your whole deploy step.

---

## Where production runs (pick one)

### Option A — Vercel (easiest “push = live”)

- Connect GitHub repo to [Vercel](https://vercel.com)  
- Every `git push` to `main` deploys automatically  
- Point **universe-security.org** DNS to Vercel (FastComet = domain only, or move DNS)  
- **No FastComet Node.js** needed at all  
- Studio, API, Payload work on Vercel  

Env vars: set in Vercel project settings (same as `.env.local`).

### Option B — FastComet + GitHub Actions (**your setup**)

FastComet **only runs** `start.cjs` (no npm on server).  
**GitHub Actions** builds after each push and uploads the bundle.

**One-time setup:** follow **[SETUP-OPTION-2.md](SETUP-OPTION-2.md)** (cPanel Node app + 4 GitHub secrets).

You still need the Node app on FastComet (`universe-security-app` + `start.cjs`) but you never touch npm there.

### Option C — Manual zip (no GitHub Actions)

After push, on your PC:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/deploy.ps1
```

Upload `Desktop/universe-security-deploy.zip` to `universe-security-app` when you want to go live.  
Slower, but no server npm.

---

## What to avoid on FastComet

| Don’t | Why |
|-------|-----|
| `npm install` in `repositories/universe-security` | Crashes (esbuild / memory) |
| cPanel **Run NPM Install** on the Git clone | Same |
| Expect **Deploy HEAD Commit** to build the app | Script skips server build on Essential plan |

---

## Your path

**Option B** — **[SETUP-OPTION-2.md](SETUP-OPTION-2.md)** → then only `git push origin main`.

---

## Local env (Cursor)

Copy `.env.example` → `.env.local`:

```
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_SECRET=your-local-secret
DATABASE_URI=file:./universe-security.db
ADMIN_PASSWORD=your-studio-password
```

Install once on PC:

```bash
npm install --legacy-peer-deps
```
