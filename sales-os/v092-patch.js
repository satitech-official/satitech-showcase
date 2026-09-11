// Sati Sales OS v0.9.2 cloud-control hotfix
const SATI_SYNC_BASE='https://kmlvyemgiubjagksarpt.supabase.co/functions/v1/gateway-sync';
async function satiCloudSnapshot(){
  const c=new AbortController(),t=setTimeout(()=>c.abort(),6500);
  try{
    const r=await fetch(SATI_SYNC_BASE+'/snapshot',{cache:'no-store',signal:c.signal});
    const d=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(d.error||`snapshot ${r.status}`);
    return d.snapshot||null;
  }finally{clearTimeout(t)}
}
function satiCloudStatus(platforms,snap){
  return {ok:true,version:snap?.version||'0.9.2',platforms:platforms||{},automation:{enabled:!!snap?.enabled,busy:!!snap?.busy,counters:snap?.counters||{},lastRun:snap?.lastRun||null,nextRun:snap?.nextRun||null}};
}
function satiSnapshotFresh(s){return !!s?.updatedAt&&(Date.now()-new Date(s.updatedAt).getTime()<150000)}
renderHeader=function(){
  const ps=S.status?.platforms||{},connected=Object.values(ps).filter(x=>x.connected).length;
  $('sideConn').textContent=`${connected} channels connected`;
  $('hConn').textContent=String(connected);
  $('hNext').textContent=S.auto?.nextRun?new Date(S.auto.nextRun).toLocaleTimeString():'—';
  $('fPool').textContent=String(S.auto?.leadCount||S.leads.length||0);
  $('fAuto').textContent=S.auto?.busy?'Running':S.auto?.enabled?'ON':'Paused';
  $('hAuto').textContent=S.auto?.busy?'Running':S.auto?.enabled?'Enabled':'Paused';
  if(S.online){
    badge('gwBadge','ok',`Gateway v${S.status?.version||'0.9.2'} online`);
    $('fGw').textContent='Online';$('hGw').textContent='Online';
  }else if(S.syncOnly){
    const fresh=satiSnapshotFresh(S.auto);
    badge('gwBadge',fresh?'ok':'warn',fresh?`${connected} channels · cloud synced`:`${connected} channels · status synced`);
    $('fGw').textContent=fresh?'Cloud synced':'Status synced';
    $('hGw').textContent=fresh?'Windows gateway heartbeat + automation synced':'Connector heartbeat synced · install v0.9.2 for full metrics';
  }else{
    badge('gwBadge','bad','Gateway not synced');$('fGw').textContent='Offline';$('hGw').textContent='No recent gateway heartbeat';
  }
};

refreshAll=async function(){
  let localError=null;
  try{
    const [status,auto,leads,analytics]=await Promise.all([api('/status'),api('/automation/status'),api('/automation/leads?limit=700'),api('/automation/analytics')]);
    S.status=status;S.auto=auto;S.leads=leads.leads||[];S.analytics=analytics;S.online=true;S.syncOnly=false;S.lastSync=new Date().toISOString();saveSnapshot();renderAll();return;
  }catch(e){localError=e;S.online=false}
  const cached=loadSnapshot();
  if(cached){S.status=cached.status||S.status;S.auto=cached.auto||S.auto;S.analytics=cached.analytics||S.analytics;S.leads=Array.isArray(cached.leads)?cached.leads:S.leads;S.lastSync=cached.at||S.lastSync}
  try{
    const [conn,snap]=await Promise.all([cloudConnectorStatus(),satiCloudSnapshot()]);
    const oldPlatforms=S.status?.platforms||{};
    const platforms={...oldPlatforms,...(conn.platforms||{})};
    S.status=satiCloudStatus(platforms,snap||S.auto);
    if(snap){
      S.auto=snap;
      S.analytics=snap.analytics||{};
      S.leads=Array.isArray(snap.topLeads)?snap.topLeads:S.leads;
      S.lastSync=snap.updatedAt||conn.updatedAt||new Date().toISOString();
    }
    S.syncOnly=true;S.lastSync=S.lastSync||conn.updatedAt||new Date().toISOString();saveSnapshot();
  }catch(syncErr){
    S.syncOnly=false;
    console.warn('Local gateway unavailable',localError,'cloud sync unavailable',syncErr);
  }
  renderAll();
};

function satiTriggerProtocol(action){
  try{location.href=`sati-gateway://${action}`;return true}catch{return false}
}
async function satiWaitForRun(before){
  for(let i=0;i<30;i++){
    await new Promise(r=>setTimeout(r,4000));
    try{
      const snap=await satiCloudSnapshot();
      if(!snap)continue;
      S.auto=snap;S.analytics=snap.analytics||{};S.leads=Array.isArray(snap.topLeads)?snap.topLeads:S.leads;S.syncOnly=true;S.lastSync=snap.updatedAt||S.lastSync;
      renderAll();
      if(snap.lastRun&&snap.lastRun!==before&&!snap.busy){badge('gwBadge','ok','Cycle completed · cloud synced');return true}
    }catch{}
  }
  return false;
}
runNow=async function(){
  if(S.online){
    badge('gwBadge','warn','Running cycle…');
    try{
      const d=await api('/automation/run-now',{method:'POST',body:'{}'});
      await refreshAll();
      alert(`Cycle complete: ${d.indiaAdded||0} India + ${d.globalAdded||0} global leads, ${d.outreach?.sent||0} sends.`);
    }catch(e){alert(e.message);await refreshAll()}
    return;
  }
  const before=S.auto?.lastRun||null;
  badge('gwBadge','warn','Sending command to Windows gateway…');
  satiTriggerProtocol('run-cycle');
  const ok=await satiWaitForRun(before);
  if(!ok){
    badge('gwBadge','warn','Waiting for Windows gateway');
    alert('Browser me “Open Sati Sales Gateway” prompt aaye to Open karein. Agar Windows custom protocol blocked ho, v0.9.2 folder ka RUN-CYCLE-NOW.bat use karein.');
  }
};
