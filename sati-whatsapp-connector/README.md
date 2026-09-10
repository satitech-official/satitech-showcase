# Sati WhatsApp Local Connector

Free/self-hosted QR connector for the Sati AI Sales Manager.

1. Install Node.js 20+.
2. Run `start-windows.bat`.
3. Open the local connector page at `http://127.0.0.1:8787`.
4. In WhatsApp: Linked Devices → Link a Device → scan the QR.
5. Keep the connector running while using WhatsApp automation.

The `.wa-session` directory stores long-lived WhatsApp session credentials. Keep it private and never commit it to GitHub.

Automatic sending is gated to leads with recorded WhatsApp permission/authorization. Baileys is unofficial and should be used responsibly and in accordance with WhatsApp terms.
