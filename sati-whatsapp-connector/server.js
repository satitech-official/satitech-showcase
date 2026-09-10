import express from 'express';
import cors from 'cors';
import QRCode from 'qrcode';
import makeWASocket, { DisconnectReason, fetchLatestWaWebVersion, useMultiFileAuthState } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import fs from 'node:fs';
import path from 'node:path';

const PORT = Number(process.env.PORT || 8787);
const AUTH_DIR = process.env.WA_AUTH_DIR || path.resolve('.wa-session');
const allowedOrigins = new Set([
  'https://sati-ai-sales-manager.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]);

const app = express();
app.use((req,res,next)=>{res.setHeader('Access-Control-Allow-Private-Network','true');next();});
app.use(express.json({limit:'200kb'}));
app.use(cors({
  origin(origin, cb){
    if (!origin || allowedOrigins.has(origin) || /^https:\/\/sati-ai-sales-manager-.*\.vercel\.app$/.test(origin)) return cb(null,true);
    return cb(new Error('Origin not allowed'));
  }
}));

let sock = null;
let state = { status:'DISCONNECTED', qr:null, lastError:null, connectedAt:null };
let starting = false;

const normalizePhone = (phone='') => {
  let d = String(phone).replace(/\D/g,'');
  if (d.length === 10) d = '91' + d;
  return d;
};

async function startWhatsApp(){
  if (starting) return;
  starting = true;
  try {
    fs.mkdirSync(AUTH_DIR,{recursive:true});
    const { state:authState, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    const { version } = await fetchLatestWaWebVersion();
    state.status = 'CONNECTING';
    state.lastError = null;
    sock = makeWASocket({ auth: authState, version, printQRInTerminal:false, markOnlineOnConnect:false, syncFullHistory:false });
    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', async update => {
      const { connection, qr, lastDisconnect } = update;
      if (qr) {
        state.qr = await QRCode.toDataURL(qr, { margin:1, width:320 });
        state.status = 'QR_READY';
      }
      if (connection === 'open') {
        state.status = 'WORKING';
        state.qr = null;
        state.connectedAt = new Date().toISOString();
      }
      if (connection === 'close') {
        const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
        state.status = code === DisconnectReason.loggedOut ? 'LOGGED_OUT' : 'RECONNECTING';
        state.lastError = lastDisconnect?.error?.message || null;
        sock = null;
        if (code !== DisconnectReason.loggedOut) setTimeout(()=>startWhatsApp(), 2500);
      }
    });
  } catch (e) {
    state.status = 'ERROR';
    state.lastError = e.message;
  } finally {
    starting = false;
  }
}

app.get('/',(req,res)=>res.type('html').send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sati WhatsApp Connector</title><style>body{font-family:Arial;background:#f5f7fb;margin:0;color:#172033}.w{max-width:680px;margin:40px auto;padding:20px}.c{background:#fff;border-radius:16px;padding:22px;box-shadow:0 8px 30px #0001}button{padding:12px 16px;border:0;border-radius:10px;background:#0b7a36;color:#fff;font-size:16px;cursor:pointer}#qr{width:320px;max-width:100%;display:none;margin-top:18px}.ok{color:#087a35;font-weight:700}.err{color:#b42318;font-weight:700}</style></head><body><div class="w"><div class="c"><h1>Sati WhatsApp Connector</h1><p>WhatsApp → Linked Devices → Link a Device se QR scan karein.</p><button id="connect">Connect WhatsApp</button><p id="status">Checking…</p><img id="qr" alt="WhatsApp QR"></div></div><script>(()=>{const st=document.getElementById('status'),img=document.getElementById('qr'),btn=document.getElementById('connect');async function check(){try{const r=await fetch('/status'),d=await r.json();st.textContent='Status: '+d.status;st.className=d.status==='WORKING'?'ok':'';if(d.status==='WORKING'){img.style.display='none';return}const q=await fetch('/qr');if(q.ok){const j=await q.json();img.src=j.qr;img.style.display='block'}}catch(e){st.textContent=e.message;st.className='err'}}btn.onclick=async()=>{await fetch('/connect',{method:'POST'});check()};check();setInterval(check,2500)})();</script></body></html>`));
app.get('/health',(req,res)=>res.json({ok:true,service:'Sati WhatsApp Local Connector'}));
app.post('/connect',async(req,res)=>{ await startWhatsApp(); res.json({ok:true,status:state.status}); });
app.get('/status',(req,res)=>res.json({ok:true,...state,qr:undefined}));
app.get('/qr',(req,res)=>{
  if (!state.qr) return res.status(404).json({ok:false,error:'QR not available',status:state.status});
  res.json({ok:true,qr:state.qr,status:state.status});
});
app.post('/send',async(req,res)=>{
  try {
    const { phone, text, consent=false, consentSource='' } = req.body || {};
    const allowedConsent = new Set(['opt_in','inbound_whatsapp','existing_customer','explicit_business_permission']);
    if (consent !== true || !allowedConsent.has(consentSource)) return res.status(403).json({ok:false,error:'Explicit WhatsApp permission/authorization is required for automatic send.'});
    if (state.status !== 'WORKING' || !sock) return res.status(409).json({ok:false,error:'WhatsApp not connected'});
    const d = normalizePhone(phone);
    if (!d || !text) return res.status(400).json({ok:false,error:'phone and text are required'});
    const jid = `${d}@s.whatsapp.net`;
    const result = await sock.sendMessage(jid,{text:String(text)});
    res.json({ok:true,messageId:result?.key?.id || null});
  } catch(e){res.status(500).json({ok:false,error:e.message});}
});

app.listen(PORT,'127.0.0.1',()=>{
  console.log(`Sati WhatsApp Connector: http://127.0.0.1:${PORT}`);
  startWhatsApp();
});
