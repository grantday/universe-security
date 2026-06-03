#!/bin/bash
# cPanel Git deploy hook — FastComet Essential / shared hosting cannot run npm install
# (esbuild SIGABRT, uv_thread_create failures). Deploy the pre-built zip instead.
# See ONE-STEP.md

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
APP_DIR="${CPANEL_APP_DIR:-$HOME/universe-security-app}"

echo "[deploy] Repository: $REPO_ROOT"
echo "[deploy] Node app:     $APP_DIR"

if [ -f "$APP_DIR/server.js" ] && [ -f "$APP_DIR/start.cjs" ]; then
  mkdir -p "$APP_DIR/tmp"
  touch "$APP_DIR/tmp/restart.txt" 2>/dev/null || true
  echo "[deploy] App bundle already at $APP_DIR — restarted. No server npm build (not supported on this plan)."
  exit 0
fi

cat <<EOF

================================================================================
  SERVER npm install IS NOT SUPPORTED on FastComet Essential (memory/thread limits).
  Your error (esbuild SIGABRT / uv_thread_create) is expected on shared hosting.
================================================================================

  DO THIS INSTEAD:

  1. On your PC, run:
       powershell -ExecutionPolicy Bypass -File scripts/deploy.ps1

  2. cPanel File Manager → open:
       $APP_DIR

  3. Upload and extract:
       universe-security-deploy.zip  (from your Desktop)

  4. cPanel → Setup Node.js App → Restart

  Or use GitHub Actions deploy (DEPLOY.md) — builds in the cloud, not on this server.

================================================================================

EOF
exit 1
