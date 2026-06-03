# Upload static-site-deploy/ (Vercel-identical static site) to FastComet via SCP/SFTP.
# Copy deploy/php-static/.env.deploy.example to .env.deploy and fill in values.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$envFile = Join-Path $root "deploy\php-static\.env.deploy"
$bundle = Join-Path $root "static-site-deploy"

if (-not (Test-Path $envFile)) {
  Write-Host "Create deploy/php-static/.env.deploy from .env.deploy.example"
  exit 1
}

Get-Content $envFile | ForEach-Object {
  if ($_ -match '^\s*([^#=]+)=(.*)$') {
    Set-Variable -Name $matches[1].Trim() -Value $matches[2].Trim() -Scope Script
  }
}

if (-not $DEPLOY_HOST -or -not $DEPLOY_USER -or -not $DEPLOY_PATH) {
  Write-Host "DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH required in .env.deploy"
  exit 1
}

if (-not (Test-Path $bundle)) {
  Write-Host "Run: npm run build:site"
  exit 1
}

if ($DEPLOY_KEY -and (Test-Path $DEPLOY_KEY)) {
  $head = Get-Content $DEPLOY_KEY -TotalCount 5 -Raw
  if ($head -match "ENCRYPTED|bcrypt") {
    Write-Host "Note: Private key has a passphrase. Run once before deploy:"
    Write-Host "  Start-Service ssh-agent; ssh-add $DEPLOY_KEY"
    Write-Host "Or use a deploy key with no passphrase (see deploy/php-static/README.md)"
  }
}

$target = "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"
$sshOpts = @("-o", "BatchMode=yes", "-o", "ConnectTimeout=20", "-o", "StrictHostKeyChecking=accept-new")
Write-Host "Building bundle…"
Set-Location $root
npm run build:php-static | Out-Host

Write-Host "Uploading to $target …"
if ($DEPLOY_KEY) {
  scp @sshOpts -i $DEPLOY_KEY -r "$bundle\*" $target
} else {
  scp @sshOpts -r "$bundle\*" $target
}
if ($LASTEXITCODE -ne 0) {
  Write-Host "Upload failed. If your key has a passphrase, run: ssh-add $DEPLOY_KEY"
  exit $LASTEXITCODE
}

Write-Host "Deploy complete."
