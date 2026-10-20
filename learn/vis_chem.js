/* Why Next? visuals for chemistry: particle model (solid/liquid/gas with a temperature slider), atom builder,
   periodic table explorer, and an equation balancer with atom counts and a balance scale. */
(()=>{const R=VIS.reg,nf=VIS.nf;
const EL='H Hydrogen,He Helium,Li Lithium,Be Beryllium,B Boron,C Carbon,N Nitrogen,O Oxygen,F Fluorine,Ne Neon,Na Sodium,Mg Magnesium,Al Aluminium,Si Silicon,P Phosphorus,S Sulfur,Cl Chlorine,Ar Argon,K Potassium,Ca Calcium,Sc Scandium,Ti Titanium,V Vanadium,Cr Chromium,Mn Manganese,Fe Iron,Co Cobalt,Ni Nickel,Cu Copper,Zn Zinc,Ga Gallium,Ge Germanium,As Arsenic,Se Selenium,Br Bromine,Kr Krypton'.split(',').map((s,i)=>{const[sym,name]=s.split(' ');return{z:i+1,sym,name}});
const MASS={H:1,He:4,Li:7,Be:9,B:11,C:12,N:14,O:16,F:19,Ne:20,Na:23,Mg:24,Al:27,Si:28,P:31,S:32,Cl:35.5,Ar:40,K:39,Ca:40,Fe:56,Cu:63.5,Zn:65,Br:80};
const NONMETAL=new Set('H He C N O F Ne P S Cl Ar Se Br Kr'.split(' ')),SEMI=new Set('B Si Ge As'.split(' '));
function pos(z){if(z<=2)return[1,z===1?1:18];const P=z<=10?2:z<=18?3:4,s=P===2?3:P===3?11:19,k=z-s;let g;if(P<4)g=k<2?k+1:k+11;else g=k+1;return[P,g]}
EL.forEach(e=>{[e.period,e.group]=pos(e.z);e.kind=NONMETAL.has(e.sym)?'non-metal':SEMI.has(e.sym)?'metalloid':'metal'});
const COLR={H:'#f8fafc',O:'#dc2626',C:'#374151',N:'#2563eb',Na:'#7c3aed',Cl:'#16a34a',Mg:'#94a3b8',Fe:'#92400e',S:'#facc15',Ca:'#a3a3a3',Cu:'#c2410c',Zn:'#64748b',K:'#a855f7',Al:'#cbd5e1'};
/* particles: canvas animation; static frames when reduced motion is on or the figure is off screen */
R('particles',c=>{const o=c.opts,mp=o.mp??0,bp=o.bp??100,name=o.name||'water';let T=o.temp??20,run=!VIS.reduced(),vis=true;
 const W=440,H=260,cv=c.el('canvas',{width:W*2,height:H*2,class:'vis-canvas',role:'img'},c.stage),g=cv.getContext('2d');g.scale(2,2);
 const N=48,cols=8,r=9,ps=[...Array(N)].map((_,i)=>({hx:W/2-(cols-1)*r+(i%cols)*2*r+(Math.floor(i/cols)%2)*r,hy:H-14-Math.floor(i/cols)*2*r*.88,x:0,y:0,vx:0,vy:0,ph:Math.random()*6.3,b:o.mix&&i%3===0}));
 ps.forEach(p=>{p.x=p.hx;p.y=p.hy});
 const state=()=>T<mp?'solid':T<bp?'liquid':'gas';const sp=()=>Math.sqrt((T+273)/293);
 function stepSim(dt){const s=state(),v=sp();const top=s==='liquid'?H-6*2*r*.88-34:6;
  ps.forEach(p=>{if(s==='solid'){p.ph+=dt*8*v;const a=1+2.5*v*Math.max(0,Math.min(1,(T-mp+60)/60));p.x+=(p.hx+Math.cos(p.ph)*a-p.x)*.5;p.y+=(p.hy+Math.sin(p.ph*1.3)*a-p.y)*.5;return}
   const tgt=s==='gas'?160*v:45*v;const m=Math.hypot(p.vx,p.vy)||1;if(m<tgt*.5||m>tgt*1.5){const an=Math.random()*6.3;p.vx=Math.cos(an)*tgt;p.vy=Math.sin(an)*tgt}
   if(s==='liquid'){p.vx+=(Math.random()-.5)*60*dt*v;p.vy+=(Math.random()-.5)*60*dt*v+30*dt}
   p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.x<r){p.x=r;p.vx=Math.abs(p.vx)}if(p.x>W-r){p.x=W-r;p.vx=-Math.abs(p.vx)}if(p.y>H-r){p.y=H-r;p.vy=-Math.abs(p.vy)}if(p.y<top+r){p.y=top+r;p.vy=Math.abs(p.vy)}});
  if(s!=='gas')for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const a=ps[i],b=ps[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>0&&d<2*r){const k=(2*r-d)/2/d;a.x-=dx*k;a.y-=dy*k;b.x+=dx*k;b.y+=dy*k}}}
 function settle(){const s=state();if(s==='solid')ps.forEach(p=>{p.x=p.hx;p.y=p.hy});else{for(let i=0;i<120;i++)stepSim(1/30)}}
 function paint(){g.clearRect(0,0,W,H);g.fillStyle='#f8fafc';g.fillRect(0,0,W,H);g.strokeStyle='#94a3b8';g.strokeRect(.5,.5,W-1,H-1);
  ps.forEach(p=>{g.beginPath();g.arc(p.x,p.y,r-1,0,7);g.fillStyle=p.b?'#f59e0b':T<mp?'#2563eb':T<bp?'#0891b2':'#7c3aed';g.fill();g.strokeStyle='#1e293b';g.lineWidth=.8;g.stroke()});
  g.fillStyle='#111';g.font='600 14px system-ui,sans-serif';g.fillText(`${nf(T)} °C: ${state()}`,10,20)}
 function say(){const s=state(),d={solid:'particles are packed in a fixed pattern and only vibrate',liquid:'particles touch but slide past each other',gas:'particles are far apart and move fast in all directions'}[s];
  let t=`At ${nf(T)} °C, ${name} is a ${s}: ${d}. It melts at ${nf(mp)} °C and boils at ${nf(bp)} °C. Hotter particles move faster; they do not get bigger.`;
  if(o.mix)t+=' The orange particles are a second substance mixed in: this is a mixture, not a pure substance.';
  if(o.density){const top=Math.min(...ps.map(p=>p.y)),frac=Math.round((H-top)/H*100);t+=` Same ${N} particles, so the same mass, now spread over about ${s==='gas'?100:frac}% of the box: the more space, the lower the density.`}
  c.say(t);cv.setAttribute('aria-label',t)}
 let last=0,raf=0;function loop(now){raf=0;if(!run||!vis||document.hidden)return;const dt=Math.min(.05,(now-(last||now))/1000);last=now;stepSim(dt);paint();raf=requestAnimationFrame(loop)}
 const kick=()=>{if(!raf&&run&&vis){last=0;raf=requestAnimationFrame(loop)}};
 const io=window.IntersectionObserver?new IntersectionObserver(es=>{vis=es[0].isIntersecting;kick()}):null;io&&io.observe(cv);
 c.stops.push(()=>{run=false;io&&io.disconnect();raf&&cancelAnimationFrame(raf)});
 const set=v=>{T=v;rg.value=v;if(!run){settle();paint()}say();kick()};
 const rg=c.range('Temperature (°C)',o.min??mp-40,o.max??bp+60,1,T,set);
 c.btn('Cool below melting',()=>set(mp-20));c.btn('Heat above boiling',()=>set(bp+30));
 const pb=c.btn(run?'Pause motion':'Play motion',()=>{run=!run;pb.textContent=run?'Pause motion':'Play motion';kick()},'ghost');
 c.cueEl=cv;settle();paint();say();kick()});
/* atom builder */
R('atom',c=>{const o=c.opts;let p=o.p??6,n=o.n??6,e=o.e??6;const s=c.svg(440,250,'Atom builder');const g=c.el('g',{},s),info=c.el('g',{},s);
 function draw(){g.textContent='';info.textContent='';const cx=130,cy=125,cap=[2,8,8,2];
  [44,72,100].forEach(rr=>c.el('circle',{cx,cy,r:rr,class:'vis-shell'},g));
  const nuc=c.el('g',{class:'vis-nuc'},g);const kinds=[];for(let i=0;i<Math.max(p,n);i++){if(i<p)kinds.push('vis-p');if(i<n)kinds.push('vis-n')}
  kinds.forEach((k,i)=>{const a=i*2.4,rr=3.2*Math.sqrt(i);c.el('circle',{cx:cx+rr*Math.cos(a),cy:cy+rr*Math.sin(a),r:5,class:k},nuc)});
  let left=e;[44,72,100,118].forEach((rr,k)=>{const m=Math.min(left,cap[k]);left-=m;for(let j=0;j<m;j++){const a=j/m*2*Math.PI-Math.PI/2;c.el('circle',{cx:cx+rr*Math.cos(a),cy:cy+rr*Math.sin(a),r:5,class:'vis-e'},g)}});
  c.cueEl=nuc;const el=EL[p-1],ch=p-e,A=p+n;
  const lines=el?[`${el.name} (${el.sym})`,`Atomic number ${p} (protons)`,`Mass number ${A} (protons + neutrons)`,ch?`Charge ${ch>0?'+':'−'}${Math.abs(ch)}: an ion`:'Neutral atom']:[p?'Element beyond this builder':'No protons: not an element'];
  lines.forEach((t,i)=>c.el('text',{x:270,y:70+i*26,class:i?'vis-lab b':'vis-big'},info,t));
  c.say((el?`${p} protons makes this ${el.name.toLowerCase()} (${el.sym}). `:'')+`${p} protons, ${n} neutrons, ${e} electrons. Mass number ${A}. `+(ch?`It has ${Math.abs(ch)} ${ch>0?'fewer':'more'} electron${Math.abs(ch)>1?'s':''} than protons, so it is an ion with charge ${ch>0?'+':'−'}${Math.abs(ch)}.`:'Protons and electrons are equal, so it is neutral.')+' Change the protons and the element changes; change the neutrons and only the mass changes.')}
 const lim=v=>Math.max(0,Math.min(20,v));[['proton',()=>p,v=>p=v],['neutron',()=>n,v=>n=v],['electron',()=>e,v=>e=v]].forEach(([w,gt,st])=>{c.btn(`+ ${w}`,()=>{st(lim(gt()+1));draw()});c.btn(`− ${w}`,()=>{st(lim(gt()-1));draw()},'ghost')});draw()});
/* periodic table, elements 1–36 */
R('ptable',c=>{const o=c.opts;let hl=o.highlight||'',pick=o.z||0;const box=c.el('div',{class:'vis-pt',role:'group','aria-label':'Periodic table, elements 1 to 36'},c.stage);
 const F={metals:e=>e.kind==='metal','non-metals':e=>e.kind==='non-metal',group1:e=>e.group===1&&e.z>1,group7:e=>e.group===17,group0:e=>e.group===18,period2:e=>e.period===2,period3:e=>e.period===3};
 const LAB={metals:'Metals','non-metals':'Non-metals',group1:'Group 1 (alkali metals)',group7:'Group 7 (halogens)',group0:'Group 0 (noble gases)',period2:'Period 2',period3:'Period 3'};
 EL.forEach(e=>{const b=c.el('button',{type:'button',class:`vis-el k-${e.kind}`,style:`grid-row:${e.period};grid-column:${e.group}`,'aria-label':`${e.name}, ${e.z}`},box);b.innerHTML=`<small>${e.z}</small>${e.sym}`;b.onclick=()=>{pick=e.z;draw()};e.b=b});
 function draw(){EL.forEach(e=>{e.b.classList.toggle('vis-hl',!!hl&&F[hl](e));e.b.setAttribute('aria-pressed',e.z===pick)});
  const e=EL[pick-1];let t=hl?`${LAB[hl]}: ${EL.filter(F[hl]).map(x=>x.sym).join(', ')}. `:'';
  if(e)t+=`${e.name} (${e.sym}): atomic number ${e.z}, so ${e.z} protons. Period ${e.period}, ${e.group===18?'group 0 (also called 18)':e.group<=2?`group ${e.group}`:e.group>=13?`group ${e.group-10} (also called ${e.group})`:'a transition metal'}. A ${e.kind}.`;
  else t+='Columns are groups, rows are periods. Choose an element or a highlight.';c.say(t);c.cueEl=hl?EL.filter(F[hl]).map(x=>x.b):box}
 Object.keys(LAB).forEach(k=>c.btn(LAB[k],()=>{hl=hl===k?'':k;draw()}));c.btn('Clear',()=>{hl='';pick=0;draw()},'ghost');draw()});
/* equation balancer */
const SUB={'₀':0,'₁':1,'₂':2,'₃':3,'₄':4,'₅':5,'₆':6,'₇':7,'₈':8,'₉':9};
function parse(f){f=f.replace(/[₀-₉]/g,d=>SUB[d]);let i=0;function grp(){const m={};while(i<f.length&&f[i]!==')'){let sub;if(f[i]==='('){i++;sub=grp();i++}else{const s=f.slice(i).match(/^[A-Z][a-z]?/);if(!s)throw new Error('bad formula '+f);i+=s[0].length;sub={[s[0]]:1}}
  const d=f.slice(i).match(/^\d+/);const k=d?+d[0]:1;if(d)i+=d[0].length;for(const x in sub)m[x]=(m[x]||0)+sub[x]*k}return m}return grp()}
const pretty=f=>f.replace(/(\d)/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d]);
R('balancer',c=>{const o=c.opts,sides=[o.left||[['H2',1],['O2',1]],o.right||[['H2O',1]]].map(sd=>sd.map(([f,k])=>({f,k,at:parse(f)})));
 const box=c.el('div',{class:'vis-eq'},c.stage),tbl=c.el('div',{class:'vis-tally'},c.stage),s=c.svg(440,120,'Balance of atoms');
 c.el('path',{d:'M220 40L200 105H240Z',class:'vis-stand'},s);const beam=c.el('g',{},s);c.el('rect',{x:80,y:36,width:280,height:7,rx:3,class:'vis-beam'},beam);
 const pans=[0,1].map(()=>{const p=c.el('g',{},s);c.el('path',{d:'M-46 30H46L36 40H-36Z',class:'vis-pancup'},p);c.el('line',{x1:0,y1:0,x2:-36,y2:30,class:'vis-rope'},p);c.el('line',{x1:0,y1:0,x2:36,y2:30,class:'vis-rope'},p);return p});let ang=0;
 const tally=sd=>{const m={};sd.forEach(sp=>{for(const x in sp.at)m[x]=(m[x]||0)+sp.at[x]*sp.k});return m};
 const mass=sd=>sd.reduce((t,sp)=>t+sp.k*Object.entries(sp.at).reduce((u,[x,n])=>u+(MASS[x]||0)*n,0),0);
 function mol(sp){let h='';const atoms=[];for(const x in sp.at)for(let i=0;i<sp.at[x];i++)atoms.push(x);
  for(let q=0;q<Math.min(sp.k,6);q++)h+=`<span class="vis-mol">${atoms.map(x=>`<i style="background:${COLR[x]||'#ddd'}" title="${x}">${x}</i>`).join('')}</span>`;return h+(sp.k>6?`<span>+${sp.k-6}</span>`:'')}
 function draw(){box.innerHTML=sides.map((sd,si)=>sd.map((sp,j)=>`<div class="vis-sp">${o.lock?'':`<button type="button" class="lbtn sm" data-s="${si}" data-j="${j}" data-d="1" aria-label="More ${sp.f}">+</button>`}<div class="vis-f"><b class="vis-k">${sp.k>1?sp.k:''}</b>${pretty(sp.f)}${o.names&&o.names[sp.f]?`<small>${esc(o.names[sp.f])}</small>`:''}${o.masses?`<small>${nf(sp.k*mass([{k:1,at:sp.at}]))} g</small>`:''}</div><div class="vis-mols" aria-hidden="true">${mol(sp)}</div>${o.lock?'':`<button type="button" class="lbtn sm ghost" data-s="${si}" data-j="${j}" data-d="-1" aria-label="Fewer ${sp.f}">−</button>`}</div>`).join('<span class="vis-op">+</span>')).join('<span class="vis-op">→</span>');
  const L=tally(sides[0]),Rr=tally(sides[1]),els=[...new Set([...Object.keys(L),...Object.keys(Rr)])],ok=els.every(x=>L[x]===Rr[x]);
  tbl.innerHTML=`<table><caption class="sr">Atoms on each side</caption><tr><th scope="col">Element</th><th scope="col">Left</th><th scope="col">Right</th><th scope="col"><span class="sr">Same?</span></th></tr>${els.map(x=>`<tr class="${L[x]===Rr[x]?'':'vis-bad'}"><th scope="row">${x}</th><td>${L[x]||0}</td><td>${Rr[x]||0}</td><td>${L[x]===Rr[x]?'✓':'✗'}</td></tr>`).join('')}</table>`;
  const ml=mass(sides[0]),mr=mass(sides[1]),to=ok?0:Math.max(-12,Math.min(12,(mr-ml)/4||(ml>mr?-6:6))),from=ang;ang=to;
  c.tween(600,t=>{const a=from+(to-from)*t,rr=a*Math.PI/180;beam.setAttribute('transform',`rotate(${a} 220 40)`);[[-130,0],[130,1]].forEach(([dx,i])=>pans[i].setAttribute('transform',`translate(${220+dx*Math.cos(rr)},${40+dx*Math.sin(rr)})`))});s.classList.toggle('vis-ok',ok);
  const eqs=sd=>sd.map(sp=>(sp.k>1?sp.k:'')+sp.f).join(' + ');
  let t=`${eqs(sides[0])} → ${eqs(sides[1])}. `+els.map(x=>`${x}: ${L[x]||0} left, ${Rr[x]||0} right`).join('; ')+'. ';
  t+=ok?'Balanced: every element has the same number of atoms on both sides, so no atoms are made or lost.':`Not balanced yet: ${els.filter(x=>L[x]!==Rr[x]).join(' and ')} ${els.filter(x=>L[x]!==Rr[x]).length>1?'differ':'differs'}. Change only the big numbers in front.`;
  if(o.masses)t+=` Total mass: ${nf(ml)} g before, ${nf(mr)} g after.`;c.say(t);c.cueEl=[...tbl.querySelectorAll('.vis-bad')].length?[...tbl.querySelectorAll('.vis-bad')]:[tbl]}
 box.onclick=e=>{const b=e.target.closest('button[data-d]');if(!b)return;const sp=sides[+b.dataset.s][+b.dataset.j];sp.k=Math.max(1,Math.min(9,sp.k+ +b.dataset.d));const key=b.getAttribute('aria-label');draw();const nb=box.querySelector(`[aria-label="${key}"]`);nb&&nb.focus()};
 if(!o.lock)c.btn('Reset to all 1s',()=>{sides.flat().forEach(sp=>sp.k=1);draw()},'ghost');draw()});
VIS.parseFormula=parse;
})();
