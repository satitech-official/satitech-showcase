import {ensureSession,SESSION,waha} from '../_waha.js';
export default async function handler(req,res){
  try{
    await ensureSession();
    const r=await waha(`/api/${encodeURIComponent(SESSION)}/auth/qr`,{headers:{accept:'image/png'}});
    if(!r.ok){const t=await r.text().catch(()=> '');return res.status(r.status).json({ok:false,error:t||'QR not available; session may already be connected'})}
    const b=Buffer.from(await r.arrayBuffer());
    res.setHeader('content-type',r.headers.get('content-type')||'image/png');
    res.setHeader('cache-control','no-store');
    return res.status(200).send(b);
  }catch(e){return res.status(500).json({ok:false,error:e.message})}
}
