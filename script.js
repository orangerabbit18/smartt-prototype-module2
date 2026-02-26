// NAV
const pgs=document.querySelectorAll('.page'),sis=document.querySelectorAll('.si[data-page]');let cur=0;const vis=new Set([0]);
function goTo(n){pgs[cur].classList.remove('active');pgs[n].classList.add('active');cur=n;vis.add(n);sis.forEach((s,i)=>{s.classList.remove('active');if(i===n)s.classList.add('active');if(vis.has(i)&&i!==n)s.classList.add('completed')});uP();window.scrollTo({top:0,behavior:'smooth'})}
sis.forEach(s=>s.addEventListener('click',()=>{if(!s.classList.contains('locked'))goTo(+s.dataset.page)}));
function uP(){const g=document.querySelectorAll('.gate.unlocked').length;const p=Math.min(100,Math.round(((vis.size+g)/18)*100));document.getElementById('pP').textContent=p+'%';document.getElementById('pB').style.width=p+'%'}

// HELPERS
const rs={};let aS=0;
function sr(g,el,v){const grp=document.getElementById(g);if(grp.classList.contains('done'))return;grp.querySelectorAll('.co').forEach(o=>o.classList.remove('sel'));el.classList.add('sel');rs[g]=v;
['s1','s3','s4','s6','s7','s8'].forEach(id=>{const b=document.getElementById(id);if(b&&g==='cg'+id.slice(1))b.disabled=false})}
const cs={};
function tc(g,el){const grp=document.getElementById(g);if(grp.classList.contains('done'))return;const v=el.dataset.v;if(!cs[g])cs[g]=new Set();if(cs[g].has(v)){cs[g].delete(v);el.classList.remove('sel')}else{cs[g].add(v);el.classList.add('sel')}
if(g==='cg2')document.getElementById('s2').disabled=cs[g].size===0;
if(g==='cg5')document.getElementById('s5').disabled=cs[g].size===0}
function sfb(id,c,h){const f=document.getElementById(id);f.className='ifb show '+c;f.innerHTML=h}
function ul(id,sc){setTimeout(()=>{document.getElementById(id).classList.add('unlocked');uP();if(sc)setTimeout(()=>document.getElementById(id).scrollIntoView({behavior:'smooth',block:'center'}),200)},700)}
function hb(id){document.getElementById(id).style.display='none'}

// P0
function subC1(){const g=document.getElementById('cg1');if(g.classList.contains('done'))return;g.classList.add('done');hb('s1');
g.querySelectorAll('.co').forEach(o=>{o.classList.remove('sel');const t=o.querySelector('span').textContent;if(t.includes('Quick warm'))o.classList.add('ok');else{const m={A:'Explain',C:'Hand out',D:'Read a short'};if(rs.cg1&&t.includes(m[rs.cg1]||''))o.classList.add('no')}});
if(rs.cg1==='B'){sfb('f1','ok','<div class="ft">Strong instinct.</div>Starting with familiar material builds confidence and activates skills needed for new learning.');aS++}
else sfb('f1','pt','<div class="ft">There\'s a better first move.</div>A brief review of familiar material first builds confidence and activates prior knowledge — then you teach the new content.');
ul('g2',true)}

function subC2(){const g=document.getElementById('cg2');if(g.classList.contains('done'))return;g.classList.add('done');hb('s2');
let c=0;g.querySelectorAll('.co').forEach(o=>{const ok=o.dataset.ok==='1';const sel=cs.cg2?.has(o.dataset.v);o.classList.remove('sel');if(ok){o.classList.add('ok');if(sel)c++}else if(sel)o.classList.add('no')});
if(c===3&&!cs.cg2?.has('B')){sfb('f2','ok','<div class="ft">Excellent.</div>Guided practice → extended practice → independent demonstration. The progression: <em>I do → We do → We do more → You do.</em>');aS++}
else sfb('f2','pt','<div class="ft">Partially there.</div>The correct answers (A, C, D) represent gradual release of responsibility.');
ul('gpc1',true)}

function ckp1(){const t=document.getElementById('pc1').value.trim();if(t.length>40&&!document.getElementById('gbr').classList.contains('unlocked')){document.getElementById('gbr').classList.add('unlocked');uP();setTimeout(()=>document.getElementById('gbr').scrollIntoView({behavior:'smooth',block:'center'}),300)}else if(t.length>0&&t.length<=40)document.getElementById('pm1').style.display='block'}

// P1 DRAG DROP
let dg=null;const sl={1:{},2:{}},is={1:{},2:{}};
document.querySelectorAll('.di').forEach(d=>{d.addEventListener('dragstart',e=>{dg=d;e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',d.id);setTimeout(()=>d.style.opacity='.4',0)});d.addEventListener('dragend',()=>{d.style.opacity='';dg=null;document.querySelectorAll('.dz').forEach(z=>z.classList.remove('dzo'))})});
function dov(e){e.preventDefault();e.dataTransfer.dropEffect='move';e.currentTarget.classList.add('dzo')}
function dlv(e){e.currentTarget.classList.remove('dzo')}
function ddr(e,bk){e.preventDefault();const z=e.currentTarget;z.classList.remove('dzo');const s=+z.dataset.slot;const id=e.dataTransfer.getData('text/plain');const it=document.getElementById(id);if(!it)return;
const S=sl[bk],I=is[bk],pf='t'+bk+'-';
if(I[id]!==undefined){const os=I[id];delete S[os];const ot=document.getElementById(pf+os);ot.textContent='Drag here';ot.classList.remove('has')}
if(S[s]){const oi=S[s];document.getElementById(oi).classList.remove('placed','inz');delete I[oi]}
S[s]=id;I[id]=s;it.classList.add('placed','inz');
const tg=document.getElementById(pf+s);tg.textContent=it.textContent.substring(0,100)+(it.textContent.length>100?'...':'');tg.classList.add('has');
if(Object.keys(S).length===5)document.getElementById('cs'+bk).disabled=false}

function ckSq(bk){let c=0;const zid=bk===1?'dZ1':'dZ2';document.querySelectorAll('#'+zid+' .dz').forEach(z=>{const s=+z.dataset.slot;const id=sl[bk][s];if(!id)return;z.classList.remove('dzk','dzn');if(s===+document.getElementById(id).dataset.ok){z.classList.add('dzk');c++}else z.classList.add('dzn')});
hb('cs'+bk);const fid='sf'+bk;
if(c===5){sfb(fid,'ok','<div class="ft">Perfect! 🎉</div>Review → Model → Guided practice → Extended practice → Assessment. That\'s STEPS.');aS++}
else if(c>=3)sfb(fid,'pt',`<div class="ft">${c}/5 — close!</div>Lessons move from teacher-led to student-independent. Check the red items.`)
else sfb(fid,'pt',`<div class="ft">${c}/5.</div>The sequence follows STEPS: review → model → guided practice → extended practice → assessment.`);
ul(bk===1?'gfw':'gt3',true)}

function rsSq(bk){const S=sl[bk],I=is[bk],pf='t'+bk+'-',zid=bk===1?'dZ1':'dZ2';
Object.keys(S).forEach(s=>{const id=S[s];document.getElementById(id).classList.remove('placed','inz');delete I[id];delete S[s]});
document.querySelectorAll('#'+zid+' .dzt').forEach(t=>{t.textContent='Drag here';t.classList.remove('has')});
document.querySelectorAll('#'+zid+' .dz').forEach(z=>z.classList.remove('dzk','dzn'));
document.getElementById('cs'+bk).disabled=true;document.getElementById('cs'+bk).style.display='';
document.getElementById('sf'+bk).className='ifb'}

// P2
function subC3(){const g=document.getElementById('cg3');if(g.classList.contains('done'))return;g.classList.add('done');hb('s3');
g.querySelectorAll('.co').forEach(o=>{o.classList.remove('sel');if(o.querySelector('span').textContent.includes('Word recognition is fine'))o.classList.add('ok');else if(rs.cg3!=='B')o.classList.add('no')});
if(rs.cg3==='B'){sfb('f3','ok','<div class="ft">Exactly.</div>Marcus decodes well but can\'t make meaning — that\'s a language comprehension gap. You\'ve just applied the <em>Simple View of Reading</em>.');aS++}
else sfb('f3','pt','<div class="ft">Not quite.</div>Marcus reads accurately at good speed — word recognition is fine. The gap is language comprehension.');
ul('gsvr',true)}

function subC4(){const g=document.getElementById('cg4');if(g.classList.contains('done'))return;g.classList.add('done');hb('s4');
g.querySelectorAll('.co').forEach(o=>{o.classList.remove('sel');if(o.querySelector('span').textContent.includes('Word recognition'))o.classList.add('ok');else if(rs.cg4!=='A')o.classList.add('no')});
if(rs.cg4==='A'){sfb('f4','ok','<div class="ft">Correct.</div>Ava understands when read to — language comprehension is strong. The bottleneck is decoding. Opposite profile from Marcus.');aS++}
else sfb('f4','pt','<div class="ft">Think again.</div>Ava understands text read to her. The problem is accessing text herself — word recognition is the gap.');
ul('grp',true)}

// P3
const oS=new Set();
function tob(el){if(document.getElementById('oC').classList.contains('done'))return;const v=el.dataset.v;if(oS.has(v)){oS.delete(v);el.classList.remove('chked')}else{oS.add(v);el.classList.add('chked')}
document.getElementById('sO').disabled=oS.size===0}

function subOb(){const g=document.getElementById('oC');if(g.classList.contains('done'))return;g.classList.add('done');hb('sO');
let h=0,m=0,f=0;g.querySelectorAll('.chki').forEach(i=>{const ok=i.dataset.ok==='1';const sel=oS.has(i.dataset.v);i.classList.remove('chked');if(ok&&sel){i.classList.add('cok');h++}else if(ok&&!sel){i.classList.add('cms');m++}else if(!ok&&sel){i.classList.add('cfp');f++}});
if(h===6&&f===0){sfb('fO','ok','<div class="ft">Perfect!</div>All six teacher behaviors should be present. Extended reading and lectures are not part of this model.');aS++}
else sfb('fO','pt',`<div class="ft">${h}/6 identified.</div>${f>0?f+' extra item(s) selected. ':''}${m>0?m+' missed (red). ':''}All six — modeling, praise, feedback, monitoring, scaffolding, pacing — should be present.`);
ul('gtb',true)}

function subC5(){const g=document.getElementById('cg5');if(g.classList.contains('done'))return;g.classList.add('done');hb('s5');
let c=0;g.querySelectorAll('.co').forEach(o=>{const ok=o.dataset.ok==='1';const sel=cs.cg5?.has(o.dataset.v);o.classList.remove('sel');if(ok){o.classList.add('ok');if(sel)c++}else if(sel)o.classList.add('no')});
if(c>=4&&!cs.cg5?.has('F')){sfb('f5','ok',`<div class="ft">Strong analysis — ${c}/5 issues found.</div>No Set-up, minimal modeling, skipped Engage, no monitoring, generic praise. The vocab question (F) was actually appropriate.`);aS++}
else sfb('f5','pt',`<div class="ft">${c}/5 issues.</div>Five problems: no Set-up, poor modeling, skipped Engage, no monitoring, generic praise. Vocab question (F) was fine — good teachers are responsive.`);
ul('gen',true)}

// P4
function subC6(){const g=document.getElementById('cg6');if(g.classList.contains('done'))return;g.classList.add('done');hb('s6');
g.querySelectorAll('.co').forEach(o=>{o.classList.remove('sel');if(o.querySelector('span').textContent.includes('Jaylen, Priya'))o.classList.add('ok');else if(rs.cg6!=='A')o.classList.add('no')});
if(rs.cg6==='A'){sfb('f6','ok','<div class="ft">Excellent.</div>Three profiles: accurate + fluent, accurate but slow (need fluency), inaccurate + slow (need decoding + fluency). Each gets targeted instruction.');aS++}
else sfb('f6','pt','<div class="ft">Think about the data.</div>Group by skill profiles: high acc + high speed, high acc + low speed, low acc + low speed. Each pattern = different needs.');
ul('ggr',true)}

// P5
function subC7(){const g=document.getElementById('cg7');if(g.classList.contains('done'))return;g.classList.add('done');hb('s7');
g.querySelectorAll('.co').forEach(o=>{o.classList.remove('sel');if(o.querySelector('span').textContent.includes('Word recognition'))o.classList.add('ok');else if(rs.cg7!=='A')o.classList.add('no')});
if(rs.cg7==='A'){sfb('f7','ok','<div class="ft">Correct.</div>Language comprehension is fine. The breakdown is decoding CVCe patterns — a word recognition gap.');aS++}
else sfb('f7','pt','<div class="ft">Review the Simple View.</div>These students understand language fine but can\'t decode a specific pattern — word recognition gap.');
ul('gt2',true)}

function subC8(){const g=document.getElementById('cg8');if(g.classList.contains('done'))return;g.classList.add('done');hb('s8');
g.querySelectorAll('.co').forEach(o=>{o.classList.remove('sel');if(o.querySelector('span').textContent.includes('Modeling was incomplete'))o.classList.add('ok');else if(rs.cg8!=='B')o.classList.add('no')});
if(rs.cg8==='B'){sfb('f8','ok','<div class="ft">Exactly.</div>She modeled reading but not spelling. The Practice step also lacked encoding. Students can\'t demonstrate what they were never taught.');aS++}
else sfb('f8','pt','<div class="ft">The root cause is modeling.</div>She only modeled reading, not spelling. Without seeing encoding modeled and practiced, students couldn\'t spell in the assessment.');
ul('gfn',true);
setTimeout(()=>{const p=Math.round((aS/12)*100);document.getElementById('scV').innerHTML=`<div class="scrn">${aS}/12</div><div class="scrl">Activities Answered Correctly</div><div class="scrm">${p>=80?'Excellent! Strong understanding of STEPS, theoretical foundations, and effective instruction.':p>=60?'Good foundation. Review sections where you had difficulty.':'Keep working. Review the module, especially STEPS and the six teacher behaviors.'}</div>`;document.getElementById('scD').scrollIntoView({behavior:'smooth'})},900)}

// ACCORDION
function ta(el){el.classList.toggle('open')}

// TOAST
function showToast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('visible');setTimeout(()=>t.classList.remove('visible'),3000)}

uP();
