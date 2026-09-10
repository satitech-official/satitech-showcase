import {ensureSession,SESSION,waha} from '../_waha.js';
export default async function handler(req,res){
  try{
    if(req.method==='POST') await ensureSession();
    const r=await waha(`/api/sessions/${encodeURIComponent(SESSION)}`);
    if(!r.ok) return res.status(r.status).json({ok:false,error:'WhatsApp session not available'});
    const data=await r.json();
    return res.status(200).json({ok:true,session:SESSION,status:data.status||data.state||'UNKNOWN',raw:data});
  }catch(e){return res.status(500).json({ok:false,error:e.message})}
}
