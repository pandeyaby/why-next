const N=new Map(DATA.nodes.map(n=>[n.id,n]));const PRE=new Map();const POST=new Map();
for(const e of DATA.edges){(PRE.get(e.t)||PRE.set(e.t,[]).get(e.t)).push(e);(POST.get(e.p)||POST.set(e.p,[]).get(e.p)).push(e)}
const isBridge=e=>N.get(e.t).new&&!N.get(e.p).new;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let sel=null;
function renderList(){const q=document.getElementById('q').value.toLowerCase(),old=document.getElementById('showOld').checked,only=document.getElementById('onlyLes').checked;LEARN.refreshNext();
 let h='',dom='';for(const n of DATA.nodes){if(only&&!LEARN.has(n.id))continue;if(!n.new&&!old&&!LEARN.has(n.id)&&!LEARN.isNext(n.id))continue;if(q&&!(n.n+' '+(n.desc||'')).toLowerCase().includes(q))continue;
 const d=n.s+' / '+n.d;if(d!==dom){h+=`${dom?'</div>':''}<div class="grp"><div class="dom">${esc(d)}</div>`;dom=d}
 h+=`<div class="item${sel===n.id?' sel':''}" role="button" tabindex="0" data-id="${n.id}"${sel===n.id?' aria-current="true"':''}><span class="nm ${n.new?'new':'old'}">${esc(n.n)}</span><span class="lbs"><span class="age">${n.a[0]}–${n.a[1]}</span>${LEARN.badge(n.id)}</span></div>`}
 document.getElementById('list').innerHTML=h?h+'</div>':'<p class="muted" style="padding:12px">No matches</p>'}
document.getElementById('list').onclick=e=>{const it=e.target.closest('.item');if(it)select(it.dataset.id)};
document.getElementById('list').onkeydown=e=>{const it=e.target.closest('.item');if(it&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(it.dataset.id);const l=document.getElementById('learn');if(l)l.focus()}};
document.getElementById('q').oninput=()=>{renderList();if(!WN.all)WN.loadAll().then(renderList)};document.getElementById('showOld').onchange=renderList;document.getElementById('onlyLes').onchange=renderList;
function ancestors(id,hardOnly){const s=new Set([id]),st=[id];while(st.length){const u=st.pop();for(const e of PRE.get(u)||[]){if(hardOnly&&!e.h)continue;if(!s.has(e.p)){s.add(e.p);st.push(e.p)}}}return s}
function tree(id,seen,depth){const es=(PRE.get(id)||[]).slice().sort((a,b)=>b.h-a.h);if(!es.length)return'';let h='<ul class="tree">';
 for(const e of es){const p=N.get(e.p),br=isBridge(e),rep=seen.has(e.p);seen.add(e.p);
  const kids=rep?'':tree(e.p,seen,depth+1),open=depth<2;
  h+=`<li class="node"><span class="tog">${kids?(open?'▾':'▸'):(rep?'↺':'·')}</span><span class="st ${e.h?'h':'s'}">${e.h?'hard':'soft'}</span>${br?'<span class="st b">bridge</span>':''}<span class="nm ${p.new?'new':'old'}" data-id="${p.id}">${esc(p.n)}</span> <span class="age">${p.a[0]}–${p.a[1]} · ${esc(p.d)}</span>${rep?' <span class="muted">(shown above)</span>':''}<div class="why${br?' bridge':''}">↳ ${esc(e.r)}</div>${kids?`<div style="display:${open?'block':'none'}">${kids}</div>`:''}</li>`}
 return h+'</ul>'}
/* split a topic name into lines of about 18 characters (whole words) for the map */
const wrapLab=t=>{const out=[];let cur='';for(const w of t.split(' ')){if(cur&&(cur+' '+w).length>18){out.push(cur);cur=w}else cur=cur?cur+' '+w:w}out.push(cur);return out};
const gloss=LEARN_PANEL.gloss;
function graph(id){const anc=ancestors(id,true);if(anc.size>220)return`<p class="muted">Hard-prerequisite graph has ${anc.size} topics, too many to draw. Use the chain below.</p>`;
 const depth=new Map();const dfs=u=>{if(depth.has(u))return depth.get(u);let d=0;for(const e of PRE.get(u)||[])if(e.h&&anc.has(e.p))d=Math.max(d,dfs(e.p)+1);depth.set(u,d);return d};anc.forEach(dfs);
 const L=[];anc.forEach(u=>{const d=depth.get(u);(L[d]=L[d]||[]).push(u)});L.forEach(l=>l.sort((a,b)=>N.get(a).d.localeCompare(N.get(b).d)));
 const W=Math.max(700,Math.max(...L.map(l=>l.length))*150),RH=92,H=L.length*RH+30,pos=new Map();
 L.forEach((l,d)=>l.forEach((u,i)=>pos.set(u,[(i+.5)*W/l.length,H-20-d*RH-10])));
 let s=`<div class="mapbar" role="group" aria-label="Map size"><button type="button" class="lbtn sm" data-z="1" aria-pressed="true">Readable labels</button><button type="button" class="lbtn sm" data-z="0" aria-pressed="false">Fit to width</button></div><div class="mapwrap" tabindex="0" role="region" aria-label="Prerequisite map (scroll to pan)"><svg class="wn-map" viewBox="0 0 ${W} ${H}" data-w="${W}" data-h="${H}" style="width:${W}px;height:${H}px;max-width:none">`;
 anc.forEach(u=>{for(const e of PRE.get(u)||[]){if(!e.h||!anc.has(e.p))continue;const[a,b]=pos.get(u),[c,d]=pos.get(e.p);
  s+=`<line class="ge${isBridge(e)?' br':''}" x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${isBridge(e)?'#d97706':'#cbd5e1'}" stroke-width="${isBridge(e)?2:1}"><title>${esc(e.r)}</title></line>`}});
 anc.forEach(u=>{const[x,y]=pos.get(u),n=N.get(u),ln=wrapLab(n.n),lab=ln.map((t,i)=>`<tspan x="${x}" dy="${i?13:0}">${esc(t)}</tspan>`).join('');
  s+=`<g class="gn${n.new?' nw':''}${u===id?' cur':''}" data-id="${u}" style="cursor:pointer"><circle class="${LEARN.cls(u)}" cx="${x}" cy="${y}" r="${u===id?8:5}" fill="${n.new?'#2563eb':'#9ca3af'}"/><text x="${x}" font-size="12" text-anchor="middle" fill="#111" y="${y-9-(ln.length-1)*13}">${lab}<title>${esc(n.n)} (${n.a[0]}–${n.a[1]})</title></text></g>`});
 return s+'</svg></div><p class="muted" style="font-size:12px">Hard prerequisites only; the earliest foundations are at the bottom. Orange lines are bridge edges. Hover a line to see its reason; click a node to open it.</p>'}
/* Detail text (descriptions, evidence, standards, link reasons, cluster notes) arrives in small per-domain
   chunks (wn/d*.js); the map and lessons render without it, and fill() completes the page once they load. */
const needFor=id=>[...new Set([...ancestors(id,false)].map(u=>N.get(u).k))];
function select(id){sel=id;renderList();const lz=LEARN.L[id]&&LEARN.L[id]._lz;if(lz)WN.lbload(N.get(id).k).then(()=>{if(sel===id&&!LEARN.L[id]._lz)select(id)},()=>{const b=document.getElementById('lzwait');if(b)b.textContent='This lesson could not load. Check your connection and pick it again.'});
 document.getElementById('detail').innerHTML=`<div class="card" id="dcard"></div>${lz?'<section class="learn card"><p class="muted" id="lzwait" role="status">Loading the lesson…</p></section>':LEARN_PANEL.panel(id)}<div id="dclu"></div><div class="card cv"><b>Hard-prerequisite graph</b><div id="dgraph"></div></div>
 <div class="card cv"><b>Prerequisite chain</b> <span class="muted">(click ▸ to expand)</span><div id="dtree"></div></div>`;
 if(!lz)LEARN_PANEL.mount(id);document.getElementById('main').scrollTop=0;fill(id,true);
 if(!LEARN.L[id]&&WN.flag(id))WN.lload(N.get(id).k).then(()=>{if(sel===id&&LEARN.L[id])select(id)});
 const need=needFor(id);if(!WN.has(need))WN.load(need).then(()=>{if(sel===id)fill(id)})}
function fill(id,quick){const n=N.get(id),anc=ancestors(id,false),ok=WN.has(needFor(id)),wait='<p class="muted">Loading details…</p>';
 const clu=(DATA.clusters||{})[n.s+'|'+n.d+'|'+n.a[0]];const prim=[...anc].filter(u=>!N.get(u).new&&N.get(u).a[0]<=10).length;const users=(POST.get(id)||[]).map(e=>N.get(e.t));
 document.getElementById('dcard').innerHTML=`<h2 style="margin:0 0 4px">${esc(n.n)}</h2>
 <span class="tag ${n.new?'new':'old'}">${n.new?'Why Next? topic':'earlier topic'}</span><span class="tag">${esc(n.s)} / ${esc(n.d)}</span><span class="tag">ages ${n.a[0]}–${n.a[1]}</span>${LEARN.badge(id)}
 ${n.desc==null?wait:`<p>${gloss(n.desc)}</p>`}
 <details class="teach"><summary>For teachers and parents: evidence, standards and map data</summary>${(n.ev||[]).length?'<b>Evidence</b><ul>'+n.ev.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>':''}
 <b>Standards:</b> ${(n.st||[]).length?n.st.map(esc).join(', '):'<span class="muted">none</span>'}<br><span class="muted">Type: ${n.ty.toLowerCase()} · source: ${n.new?'Why Next?':'Marble Skill Taxonomy v1 (upstream)'} · centrality ${n.c} (how connected it is in the map)</span><br>
 <span class="muted">${anc.size-1} earlier topics lead here (${prim} of them for ages 10 and under).</span></details>
 ${users.length?`<br><b>Unlocks:</b> ${users.map(u=>`<span class="nm ${u.new?'new':'old'}" data-id="${u.id}">${esc(u.n)}</span>`).join(' · ')}`:''}`;
 document.getElementById('dclu').innerHTML=clu?`<div class="card"><b>Cluster: ${esc(n.s)} / ${esc(n.d)}, from age ${n.a[0]}</b><p style="margin:6px 0 0">${esc(clu)}</p></div>`:'';
 const below=()=>{if(sel!==id)return;document.getElementById('dgraph').innerHTML=graph(id);mapZoom();document.getElementById('dtree').innerHTML=ok?tree(id,new Set([id]),0)||'<p class="muted">No prerequisites in this view.</p>':wait};
 quick?setTimeout(below,0):below()}
document.getElementById('detail').onclick=e=>{if(e.target.closest('.learn'))return;const t=e.target.closest('.tog');if(t){const li=t.parentElement,box=li.querySelector(':scope>div[style]');if(box){const o=box.style.display!=='none';box.style.display=o?'none':'block';t.textContent=o?'▸':'▾'}return}
 const g=e.target.closest('[data-id]');if(g)select(g.dataset.id)};
LEARN.home();renderList();const first=LEARN.nextList(0).find(n=>LEARN.has(n.id))||DATA.nodes.find(n=>n.new&&n.n==='Solving quadratics by factorising')||DATA.nodes.find(n=>n.new);WN.load(needFor(first.id)).then(()=>select(first.id),()=>select(first.id));

/* theme switch (2052 default, classic light) and gentle pointer parallax for the background and map */
(()=>{const R=document.documentElement,b=document.getElementById('themeBtn');if(!b)return;
 const sync=()=>{const c=R.dataset.theme==='classic';b.setAttribute('aria-pressed',c);b.textContent=c?'2052 look':'Classic look';b.title=c?'Switch to the dark, glowing 2052 design':'Switch to the original light design'};
 b.onclick=()=>{R.dataset.theme=R.dataset.theme==='classic'?'2052':'classic';try{localStorage.setItem('whynext.theme',R.dataset.theme)}catch(e){}sync();document.dispatchEvent(new Event('wntheme'))};sync();
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||!matchMedia('(pointer:fine)').matches)return;let raf=0,X=0,Y=0;
 addEventListener('pointermove',e=>{X=e.clientX/innerWidth*2-1;Y=e.clientY/innerHeight*2-1;if(!raf)raf=requestAnimationFrame(()=>{raf=0;R.style.setProperty('--px',X.toFixed(3));R.style.setProperty('--py',Y.toFixed(3))})},{passive:true})})();

/* map zoom: "Readable labels" shows the map at full size (labels 12px) in a scrollable box, centred on the current topic; "Fit to width" shrinks it to fit */
function mapZoom(){const g=document.getElementById('dgraph'),sv=g&&g.querySelector('.wn-map'),wr=g&&g.querySelector('.mapwrap');if(!sv)return;
 const set=z=>{const W=+sv.dataset.w,H=+sv.dataset.h,f=z?1:Math.min(1,wr.clientWidth/W);sv.style.width=W*f+'px';sv.style.height=H*f+'px';
  g.querySelectorAll('[data-z]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.z===z)));
  if(z){const c=sv.querySelector('.gn.cur circle');if(c)wr.scrollLeft=Math.max(0,+c.getAttribute('cx')-wr.clientWidth/2);wr.scrollTop=0}};
 g.querySelectorAll('[data-z]').forEach(b=>b.onclick=()=>set(+b.dataset.z));set(1)}
// After first paint, quietly fetch lesson bodies and the visuals bundle so opening a lesson is instant.
{const w=()=>WN.warm().then(()=>{window.WN_WARM=1},()=>{});const iw=()=>setTimeout(()=>(window.requestIdleCallback||setTimeout)(w,{timeout:2000}),window.WN_OFFLINE?0:3500);if(document.readyState==='complete')iw();else addEventListener('load',iw)}
