# One command: build production bundle + zip for FastComet upload
# Run from repo root:  powershell -ExecutionPolicy Bypass -File scripts/deploy.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

Write-Host "Installing dependencies (legacy-peer-deps)..." -ForegroundColor Cyan
npm install --legacy-peer-deps

Write-Host "Building production bundle..." -ForegroundColor Cyan
npm run build:fastcomet

$zipPath = Join-Path $env:USERPROFILE "Desktop\universe-security-deploy.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

Write-Host "Creating zip on Desktop..." -ForegroundColor Cyan
Compress-Archive -Path (Join-Path $root "godaddy-deploy\*") -DestinationPath $zipPath -Force

Write-Host ""
Write-Host "DONE. Upload this zip in cPanel File Manager:" -ForegroundColor Green
Write-Host "  $zipPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "Extract into: universe-security-app (Node app folder, NOT public_html)" -ForegroundColor White
Write-Host "Then cPanel -> Setup Node.js App -> Restart" -ForegroundColor White
Write-Host ""
Write-Host "For automatic deploy later: add GitHub secrets (see DEPLOY.md) then only: git push origin main" -ForegroundColor Gray
