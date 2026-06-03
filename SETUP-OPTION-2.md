# Option 2 setup — Git push → GitHub builds → FastComet

Do this **once**. After that: edit in Cursor → `git push origin main` → site updates in ~5–10 minutes.

---

## Part A — FastComet Node app (cPanel)

### 1. Create the app folder

**File Manager** or **Terminal**:

```bash
mkdir -p ~/universe-security-app
```

Replace `universe` below with your real cPanel username (shown top-right in cPanel).

### 2. Setup Node.js App

**cPanel → Software → Setup Node.js App → Create Application**

| Field | Value |
|-------|--------|
| Node.js version | **20** (or latest offered) |
| Application mode | Production |
| Application root | `universe-security-app` |
| Application URL | `universe-security.org` (your domain) |
| Application startup file | `start.cjs` |

### 3. Environment variables (same panel → Edit)

Click your app → **Environment variables** → Add:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://universe-security.org` |
| `NEXT_PUBLIC_SERVER_URL` | `https://universe-security.org` |
| `PAYLOAD_SECRET` | Long random string (same idea as local `.env.local`) |
| `ADMIN_PASSWORD` | Password for `/studio` login |
| `DATABASE_URI` | `file:/home/universe/universe-security.db` (use your username) |

Save, then **Restart** the app (even before first deploy).

### 4. First deploy (if the site is blank)

Until GitHub secrets are set, run **once on your PC**:

```powershell
cd c:\Users\cojva\Desktop\universe-security
npm install --legacy-peer-deps
npm run build:fastcomet
```

Zip the folder `godaddy-deploy` (all files inside), upload to `universe-security-app`, extract so `start.cjs` is directly in that folder. **Restart** the Node app.

Optional seed (first time only):

`POST https://universe-security.org/api/dev/seed?secret=YOUR_ADMIN_PASSWORD`

---

## Part B — SSH key for GitHub Actions

### 1. Generate key in cPanel

**cPanel → Security → SSH Access → Manage SSH Keys → Generate a New Key**

- Key name: `github-deploy`
- Password: leave empty (or note it — GitHub needs key without passphrase for automation)
- Key type: RSA, 4096 if offered

**Authorize** the public key (Manage → Authorize).

### 2. Download / copy the private key

**Manage** → **View/Download** private key → copy **entire** block including:

```
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

(If cPanel only gives RSA PEM format, that also works in GitHub.)

### 3. Find host and username

| Secret | Where to find it |
|--------|------------------|
| `FASTCOMET_HOST` | cPanel right sidebar **Shared IP Address**, or hostname like `server###.fastcomet.com` from welcome email |
| `FASTCOMET_USER` | cPanel username (e.g. `universe`) |
| `FASTCOMET_PATH` | `/home/universe/universe-security-app` (username + folder from step A) |

---

## Part C — GitHub repository secrets

Open:  
https://github.com/grantday/universe-security/settings/secrets/actions

Click **New repository secret** for each:

| Name | Paste |
|------|--------|
| `FASTCOMET_HOST` | IP or hostname from Part B |
| `FASTCOMET_USER` | cPanel username |
| `FASTCOMET_SSH_KEY` | Full private key from Part B |
| `FASTCOMET_PATH` | `/home/universe/universe-security-app` |

No quotes around values.

---

## Part D — Test automatic deploy

1. GitHub → **Actions** tab → open **Deploy to FastComet**
2. Click **Run workflow** → branch `main` → **Run workflow**  
   (Or push any small commit to `main`.)
3. Wait for green checkmark (~5–10 min first run)
4. cPanel → **Setup Node.js App** → **Restart** if the site looks unchanged
5. Open https://universe-security.org and https://universe-security.org/studio

---

## Daily use (after setup)

```bash
npm run dev          # test in Cursor
git add -A
git commit -m "Your change"
git push origin main
```

Check **Actions** → green deploy → refresh the live site.

**Content only** (phone, text, map): edit in **Studio** — no push needed.

---

## Do not use on FastComet

- `npm install` in `repositories/universe-security`
- cPanel **Run NPM Install** on the Git clone
- Building inside `nodevenv/...`

Git clone in cPanel is optional; **GitHub Actions** is your deploy path.

---

## If the Action fails

| Error | Fix |
|-------|-----|
| SSH connection refused / timeout | Confirm `FASTCOMET_HOST` (try Shared IP), SSH enabled in hosting plan |
| Permission denied (publickey) | Re-authorize public key in cPanel; private key in `FASTCOMET_SSH_KEY` must match |
| Build fails on GitHub | Open failed job log; usually same fix as local `npm ci --legacy-peer-deps` + `npm run build:fastcomet` |
| Deploy green but old site | Restart Node app in cPanel |
| Missing secrets | Action stops at first step with list of missing secret names |

Manual fallback: `npm run build:fastcomet` → upload `godaddy-deploy` → Restart.
