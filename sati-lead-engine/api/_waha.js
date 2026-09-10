const BASE=(process.env.WAHA_URL||'http://127.0.0.1:3000').replace(/\/$/,'');
const KEY=process.env.WAHA_API_KEY||'';
export const SESSION=process.env.WAHA_SESSION||'default';

export async function waha(path,options={}){
  const headers={...(options.headers||{})};
  if(KEY) headers['X-Api-Key']=KEY;
  const res=await fetch(BASE+path,{...options,headers});
  return res;
}

export async function ensureSession(){
  let r=await waha(`/api/sessions/${encodeURIComponent(SESSION)}`);
  if(r.ok) return r.json();
  r=await waha('/api/sessions',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:SESSION,start:true})});
  if(!r.ok){throw new Error(`Unable to create WhatsApp session (${r.status})`)}
  return r.json();
}

export function normalizeTarget(phone=''){
  const digits=String(phone).replace(/\D/g,'');
  if(!digits) throw new Error('phone is required');
  return `${digits}@c.us`;
}
