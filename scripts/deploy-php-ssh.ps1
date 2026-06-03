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

$batchMode = "yes"
if ($DEPLOY_KEY -and (Test-Path $DEPLOY_KEY)) {
  $head = (Get-Content $DEPLOY_KEY -TotalCount 5) -join "`n"
  if ($head -match "ENCRYPTED|bcrypt") {
    $batchMode = "no"
    Write-Host "Encrypted key - you may be prompted for the passphrase."
    Write-Host "Or run first: Start-Service ssh-agent; ssh-add $DEPLOY_KEY"
  }
}

$target = "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"
$sshOpts = @("-o", "BatchMode=$batchMode", "-o", "ConnectTimeout=60", "-o", "StrictHostKeyChecking=accept-new")
if (-not (Test-Path (Join-Path $bundle "index.html"))) {
  Write-Host "Building bundle..."
  Set-Location $root
  npm run build:site | Out-Host
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
} else {
  Write-Host "Using existing static-site-deploy/ (run npm run build:site to rebuild)."
  Set-Location $root
}

$askpass = Join-Path $root "scripts\ssh-askpass.cmd"
if ($DEPLOY_PASSPHRASE) {
  $env:DEPLOY_PASSPHRASE = $DEPLOY_PASSPHRASE
  $env:SSH_ASKPASS = $askpass
  $env:SSH_ASKPASS_REQUIRE = "force"
  Write-Host "Using DEPLOY_PASSPHRASE from .env.deploy for SSH."
}

Write-Host "Uploading to $target ..."
if ($DEPLOY_KEY) {
  scp @sshOpts -i $DEPLOY_KEY -r "$bundle\*" $target
} else {
  scp @sshOpts -r "$bundle\*" $target
}
Remove-Item Env:SSH_ASKPASS -ErrorAction SilentlyContinue
Remove-Item Env:SSH_ASKPASS_REQUIRE -ErrorAction SilentlyContinue
if ($LASTEXITCODE -ne 0) {
  Write-Host "Upload failed. If your key has a passphrase, run: ssh-add $DEPLOY_KEY"
  exit $LASTEXITCODE
}

Write-Host "Deploy complete."
