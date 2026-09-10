$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
if (-not (Test-Path "whatsapp/.env")) {
  $api = [guid]::NewGuid().ToString("N")
  $pwd = [guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N")
  @"
WAHA_DASHBOARD_USERNAME=admin
WAHA_DASHBOARD_PASSWORD=$pwd
WAHA_API_KEY=$api
WAHA_API_KEY_PLAIN=$api
WAHA_LOCAL_STORE_BASE_DIR=/app/.sessions
WAHA_WORKER_RESTART_SESSIONS=True
WHATSAPP_DEFAULT_ENGINE=WEBJS
"@ | Set-Content "whatsapp/.env"
}
docker compose --env-file whatsapp/.env -f whatsapp/docker-compose.yml up -d
Write-Host "WAHA started. Opening Sati Lead Engine on http://localhost:8080"
Start-Process "http://localhost:8080"
node --env-file=whatsapp/.env server.js
