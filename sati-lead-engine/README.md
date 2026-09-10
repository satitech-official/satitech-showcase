# Sati Lead Engine

Free-first India business lead discovery + WhatsApp QR integration for Sati Technologies.

## Included
- Public business discovery from OpenStreetMap/Overpass
- India-wide and city/category searches
- No-website leads prioritized
- Public phone/WhatsApp fields when present in source
- Unique category-aware customized outreach copy
- WAHA QR connection screen
- Persistent WhatsApp session storage
- WhatsApp send API for opted-in/authorized contacts
- No paid lead API or paid AI API

## One-time WhatsApp setup
Requirements: Node.js 20+ and Docker Desktop/Docker Engine.

### Windows
Run `./start-free.ps1` from PowerShell.

### Linux/macOS
Run `./start-free.sh`.

The script creates local WAHA credentials, starts the free `devlikeapro/waha` Docker image with persistent storage, and starts the Sati Lead Engine at `http://localhost:8080`.

Open the dashboard, press **Connect WhatsApp**, then on the phone use WhatsApp > Linked Devices > Link a device and scan the QR. Once status becomes `WORKING`, the session is reused across restarts while `whatsapp/.sessions` is retained.

## Ports
- WAHA: `127.0.0.1:3000`
- Sati Lead Engine: `8080`

## Serverless deployment
The `api/` directory contains Vercel-compatible handlers. For a hosted dashboard, configure `WAHA_URL`, `WAHA_API_KEY`, and optionally `WAHA_SESSION`. WAHA itself needs a persistent Docker/container host; it should not be run inside a stateless serverless function.

## Messaging boundary
Automatic WhatsApp send is intentionally gated to contacts with a recorded authorization source such as opt-in, inbound WhatsApp contact, an existing customer relationship, or explicit business permission. Public-directory discovery alone does not unlock automatic cold sending.
