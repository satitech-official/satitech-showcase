import {SESSION,normalizeTarget,waha} from '../_waha.js';
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({ok:false,error:'POST only'});
  try{
    const {phone,text,consent=false,consentSource=''}=req.body||{};
    if(consent!==true) return res.status(403).json({ok:false,error:'Automatic WhatsApp send is enabled only for opted-in/authorized contacts.'});
    const allowed=['opt_in','inbound_whatsapp','existing_customer','explicit_business_permission'];
    if(!allowed.includes(consentSource)) return res.status(403).json({ok:false,error:'Valid consentSource required.'});
    if(!text||String(text).trim().length<1) return res.status(400).json({ok:false,error:'text is required'});
    const r=await waha('/api/sendText',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({chatId:normalizeTarget(phone),text:String(text),session:SESSION})});
    const raw=await r.text();
    let data;try{data=JSON.parse(raw)}catch{data={raw}}
    if(!r.ok) return res.status(r.status).json({ok:false,error:'WAHA send failed',details:data});
    return res.status(200).json({ok:true,data});
  }catch(e){return res.status(500).json({ok:false,error:e.message})}
}
