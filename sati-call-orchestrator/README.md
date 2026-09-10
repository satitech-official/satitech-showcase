# Sati Call Orchestrator MVP

Connects the Sati India Lead Engine to a local Asterisk AI voice agent and the existing WhatsApp gateway.

Flow: lead discovery -> top no-website lead -> compliant outbound call -> AI qualification -> explicit WhatsApp permission -> automatic WhatsApp follow-up.

## Run
Node 20+:
```bash
cp .env.example .env
node server.js
```
Health: `GET http://localhost:8090/health`

## Safety/compliance gates
Cold promotional PSTN calling is blocked unless both `TRAI_REGISTERED_PROMOTIONAL_CALLING=true` and `DND_SCREENING_CONFIRMED=true` are configured. WhatsApp follow-up is sent only after the voice agent records explicit permission.

The agent must disclose that it is an AI assistant; the voice can be natural but should not deceptively impersonate a human.
