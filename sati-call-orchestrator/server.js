import http from 'node:http';
import { URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const PORT=Number(process.env.PORT||8090);
const LEAD=process.env.LEAD_ENGINE_URL||'http://localhost:8080';
const VOICE=process.env.VOICE_AGENT_URL||'http://localhost:8081';
const API_KEY=process.env.VOICE_AGENT_API_KEY||'';
const CALLBACK=process.env.PUBLIC_CALLBACK_BASE_URL||`http://localhost:${PORT}`;
const AGENT=process.env.AGENT_SLUG||'sati-sales';
const MAX=Math.max(1,Math.min(50,Number(process.env.MAX_CALLS_PER_RUN||10)));
const GAP=Math.max(5000,Number(process.env.CALL_GAP_MS||30000));
const DB=path.join(process.cwd(),'state.json');

function load(){try{return JSON.parse(fs.readFileSync(DB,'utf8'))}catch{return {calls:{},leads:{},events:[]}}}
function save(s){fs.writeFileSync(DB,JSON.stringify(s,null,2))}
function json(res,status,data){res.writeHead(status,{'content-type':'application/json','cache-control':'no-store'});res.end(JSON.stringify(data))}
async function body(req){let s='';for await(const c of req){s+=c;if(s.length>1e6)throw new Error('body too large')}return s?JSON.parse(s):{}}
function e164(v=''){const d=String(v).replace(/\D/g,'');if(!d)return'';return d.length===10?'+91'+d:d.startsWith('91')?`+${d}`:`+${d}`}
function legalBasisOk(basis,destination){if(destination==='softphone')return process.env.ALLOW_SOFTPHONE_TEST==='true';if(basis==='consent')return true;if(basis==='registered_promotional')return process.env.TRAI_REGISTERED_PROMOTIONAL_CALLING==='true'&&process.env.DND_SCREENING_CONFIRMED==='true';return false}
function headers(){return {'content-type':'application/json',...(API_KEY?{'x-api-key':API_KEY}:{})}}
function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
function followupText(x){return `Hi ${x.name} team, thank you for speaking with Sati Technologies. As discussed, I’m sharing a quick follow-up regarding your digital presence. We can help with a fast, mobile-first website focused on enquiries, credibility and stronger online visibility.\n\nPortfolio: https://satitech-official.github.io/satitech-showcase/\nWebsite: https://www.satitechnologies.com/\n\nIf you’d like, we can share a concept tailored for ${x.name}.`}
function templateVars(l){return {business_name:l.name||'your business',city:l.city||'',category:l.category||'',website_status:l.hasWebsite?'website available':'no dedicated website found',lead_id:l.id||'',phone:l.phone||l.whatsapp||''}}

async function originate(l,basis){const dest=l.destination==='softphone'?'softphone':e164(l.phone||l.whatsapp||'');if(!dest)throw new Error('lead has no dialable number');if(!legalBasisOk(basis,dest))throw new Error('calling blocked: compliant campaign basis not configured');
 const payload={destination:dest,agent_slug:AGENT,caller_id:process.env.CALLER_ID||'Sati Technologies',timeout_seconds:30,template_vars:templateVars(l),metadata:{lead_id:l.id||'',campaign_basis:basis,source:'sati-lead-engine'},callback_url:`${CALLBACK}/api/calls/callback`};
 const r=await fetch(`${VOICE}/api/outbound/originate`,{method:'POST',headers:headers(),body:JSON.stringify(payload)});const t=await r.text();let d;try{d=JSON.parse(t)}catch{d={raw:t}}if(!r.ok)throw new Error(`voice agent ${r.status}: ${t.slice(0,240)}`);return d;
}

async function runCampaign(input){const city=String(input.city||'').trim(),category=String(input.category||'hotel'),basis=String(input.campaign_basis||'');const limit=Math.min(MAX,Math.max(1,Number(input.limit||MAX)));
 if(!city)throw new Error('city is required');if(!['consent','registered_promotional','softphone_test'].includes(basis))throw new Error('campaign_basis must be consent, registered_promotional, or softphone_test');
 const q=new URL(`${LEAD}/api/leads`);q.searchParams.set('category',category);q.searchParams.set('city',city);q.searchParams.set('noWebsite','true');
 const lr=await fetch(q);const ld=await lr.json();if(!lr.ok)throw new Error(ld.error||'lead engine failed');let leads=(ld.leads||[]).filter(x=>x.phone||x.whatsapp).slice(0,limit);
 if(basis==='softphone_test')leads=[{id:'softphone-test',name:'Sati Test Lead',city,category,hasWebsite:false,destination:'softphone',phone:'softphone'}];
 const state=load(),started=[];for(const l of leads){if(state.leads[l.id]?.do_not_contact)continue;try{const out=await originate(l,basis==='softphone_test'?'registered_promotional':basis);const id=out.call_uuid||out.id||`${Date.now()}-${l.id}`;state.calls[id]={lead:l,status:'originated',created_at:new Date().toISOString(),campaign_basis:basis};state.leads[l.id]={...(state.leads[l.id]||{}),lead:l,last_call_id:id,last_called_at:new Date().toISOString()};started.push({lead_id:l.id,call_uuid:id,name:l.name});save(state)}catch(e){started.push({lead_id:l.id,name:l.name,error:e.message})}if(l!==leads.at(-1))await sleep(GAP)}return {ok:true,city,category,count:started.length,calls:started};
}

async function handleTool(input){const action=String(input.action||'');const leadId=String(input.lead_id||'');if(!leadId)throw new Error('lead_id required');const state=load();const rec=state.leads[leadId]||{};rec.updated_at=new Date().toISOString();
 if(action==='qualification'){rec.interest=input.interest||'unknown';rec.need=input.need||'';rec.budget=input.budget||'';rec.callback=input.callback||'';if(input.do_not_contact===true)rec.do_not_contact=true;}
 else if(action==='whatsapp_consent'){if(input.consent!==true)throw new Error('explicit consent=true required');rec.whatsapp_consent=true;rec.whatsapp_consent_at=new Date().toISOString();rec.whatsapp_consent_source='voice_call_explicit_permission';const lead=rec.lead||input.lead||{};const phone=input.phone||lead.whatsapp||lead.phone;if(!phone)throw new Error('no WhatsApp phone available');const wr=await fetch(`${LEAD}/api/whatsapp/send`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({phone,text:input.text||followupText(lead),consent:true,consentSource:'explicit_business_permission'})});const wd=await wr.json();if(!wr.ok)throw new Error(wd.error||'WhatsApp send failed');rec.whatsapp_sent_at=new Date().toISOString();rec.whatsapp_result=wd;}
 else throw new Error('unknown action');state.leads[leadId]=rec;state.events.push({at:new Date().toISOString(),lead_id:leadId,action});save(state);return {ok:true,lead:rec};
}

const server=http.createServer(async(req,res)=>{try{const u=new URL(req.url,`http://${req.headers.host||'localhost'}`);if(req.method==='GET'&&u.pathname==='/health')return json(res,200,{ok:true,service:'sati-call-orchestrator',lead_engine:LEAD,voice_agent:VOICE});
 if(req.method==='GET'&&u.pathname==='/api/status')return json(res,200,load());
 if(req.method==='POST'&&u.pathname==='/api/campaign/run')return json(res,200,await runCampaign(await body(req)));
 if(req.method==='POST'&&u.pathname==='/api/tools')return json(res,200,await handleTool(await body(req)));
 if(req.method==='POST'&&u.pathname==='/api/calls/callback'){const d=await body(req),state=load(),id=d.call_uuid||d.id;if(id){state.calls[id]={...(state.calls[id]||{}),...d,completed_at:new Date().toISOString()};save(state)}return json(res,200,{ok:true});}
 return json(res,404,{ok:false,error:'not found'});
 }catch(e){return json(res,400,{ok:false,error:e.message})}});
server.listen(PORT,()=>console.log(`Sati Call Orchestrator http://localhost:${PORT}`));
