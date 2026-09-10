@echo off
cd /d %~dp0
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20+ is required. Install Node.js LTS, then run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing free connector dependencies...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
echo Starting Sati WhatsApp Connector...
start "Sati WhatsApp Connector" cmd /k npm start
start "" "http://127.0.0.1:8787"
start "" "https://sati-ai-sales-manager.vercel.app"
