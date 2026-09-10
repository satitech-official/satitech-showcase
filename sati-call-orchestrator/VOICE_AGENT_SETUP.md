# Free local voice layer

Recommended upstream: `Mainer-g00t/voice-asterisk-agent`, pinned for this MVP to commit `6a5e0533b5293d1727847d123bf2ab8a1fc136de`.

It provides Asterisk outbound calling, AudioSocket, call transcripts, webhook callbacks and fully local STT/LLM/TTS providers. Configure a `sati-sales` agent using `SALES_AGENT_PROMPT.md`.

Local AI choices:
- STT: local Whisper/faster-whisper.
- LLM: Ollama `qwen3:4b` or another locally installed multilingual model.
- TTS: start with local Piper for telephony. For more natural Indian-language speech, swap the TTS adapter to AI4Bharat IndicF5 or Kokoro where your hardware supports it.

Webhook tools to add to the sales agent:
- `record_qualification` -> POST `${ORCHESTRATOR_URL}/api/tools` with action=`qualification`, lead_id and extracted fields.
- `send_whatsapp_after_permission` -> POST `${ORCHESTRATOR_URL}/api/tools` with action=`whatsapp_consent`, lead_id, phone and consent=true.

Outbound campaign request to this orchestrator:
POST /api/campaign/run
{
  "city": "Indore",
  "category": "hotel",
  "limit": 5,
  "campaign_basis": "registered_promotional"
}

For local test without PSTN, use `campaign_basis=softphone_test` and register a SIP softphone.

IMPORTANT: actual mobile/PSTN calling still needs a lawful telecom route (existing SIP trunk/registered telemarketer setup or equivalent). The AI software itself can be self-hosted and free, but telephone-network carriage is not created by software alone.
