#!/bin/bash
# Runs from repository root when cPanel executes .cpanel.yml (Deploy HEAD Commit / push deploy).
# Set CPANEL_APP_DIR in cPanel → Git → Manage → Deploy → Environment Variables if needed,
# or edit the default below to match Setup Node.js App → Application root.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
APP_DIR="${CPANEL_APP_DIR:-$HOME/universe-security-app}"

cd "$REPO_ROOT"

# cPanel Node.js apps often expose npm/node via the app virtualenv — try common paths.
if [ -d "$HOME/nodevenv" ]; then
  NODE_BIN="$(find "$HOME/nodevenv" -maxdepth 4 -type f -name node 2>/dev/null | head -1 || true)"
  if [ -n "$NODE_BIN" ]; then
    export PATH="$(dirname "$NODE_BIN"):$PATH"
  fi
fi

export NODE_ENV=production
export npm_config_legacy_peer_deps=true

echo "[deploy] Repository: $REPO_ROOT"
echo "[deploy] Target app:  $APP_DIR"

npm install --legacy-peer-deps
npm run build:fastcomet

mkdir -p "$APP_DIR"
# Sync standalone bundle into the Node.js application root (not public_html).
/bin/cp -R "$REPO_ROOT/godaddy-deploy/." "$APP_DIR/"

# Passenger / cPanel Node restart signal (ignored if not used).
mkdir -p "$APP_DIR/tmp"
touch "$APP_DIR/tmp/restart.txt" 2>/dev/null || true

echo "[deploy] Done. Restart the Node.js app in cPanel if the site did not reload automatically."
