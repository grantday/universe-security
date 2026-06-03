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

## Upload to FastComet

1. Build on your PC: `npm run build:godaddy`
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

## Edit in Cursor → deploy

1. Edit locally, `npm run dev`, test
2. `git commit` + `git push`
3. Rebuild `npm run build:godaddy`, re-upload bundle, restart Node app

Or clone repo on server, `git pull`, `npm run build`, restart (if your plan has enough RAM for builds).
