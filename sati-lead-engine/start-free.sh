#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if [ ! -f whatsapp/.env ]; then
  api="$(python3 - <<'PY'
import secrets
print(secrets.token_hex(24))
PY
)"
  pwd="$(python3 - <<'PY'
import secrets
print(secrets.token_hex(32))
PY
)"
  cat > whatsapp/.env <<ENV
WAHA_DASHBOARD_USERNAME=admin
WAHA_DASHBOARD_PASSWORD=$pwd
WAHA_API_KEY=$api
WAHA_API_KEY_PLAIN=$api
WAHA_LOCAL_STORE_BASE_DIR=/app/.sessions
WAHA_WORKER_RESTART_SESSIONS=True
WHATSAPP_DEFAULT_ENGINE=WEBJS
ENV
fi
docker compose --env-file whatsapp/.env -f whatsapp/docker-compose.yml up -d
node --env-file=whatsapp/.env server.js
