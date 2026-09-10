import {spawn} from 'node:child_process';
const p=spawn(process.execPath,['server.js'],{cwd:process.cwd(),env:{...process.env,PORT:'18090'}});
await new Promise(r=>setTimeout(r,500));
try{
  const r=await fetch('http://127.0.0.1:18090/health');
  const d=await r.json();
  if(!r.ok||!d.ok)throw new Error('health failed');
  console.log('PASS health');
  const b=await fetch('http://127.0.0.1:18090/api/campaign/run',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({city:'Indore',category:'hotel',campaign_basis:'bad'})});
  const x=await b.json();
  if(b.status!==400||!x.error)throw new Error('compliance validation failed');
  console.log('PASS compliance validation');
}finally{p.kill('SIGTERM')}
