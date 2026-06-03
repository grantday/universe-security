# Upload php-static-deploy/ to FastComet via SCP/SFTP.
# Copy deploy/php-static/.env.deploy.example to .env.deploy and fill in values.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$envFile = Join-Path $root "deploy\php-static\.env.deploy"
$bundle = Join-Path $root "php-static-deploy"

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
  Write-Host "Run: npm run build:php-static"
  exit 1
}

$target = "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"
Write-Host "Building bundle…"
Set-Location $root
npm run build:php-static | Out-Host

Write-Host "Uploading to $target …"
if ($DEPLOY_KEY) {
  scp -i $DEPLOY_KEY -r "$bundle\*" $target
} else {
  scp -r "$bundle\*" $target
}

Write-Host "Deploy complete."
