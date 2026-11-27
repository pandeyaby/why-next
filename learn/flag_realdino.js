/* Flagship – real dinosaurs or not? (Science, ages 5-7; Dinosaurs and palaeontology). The learner taps the animals in
   a long-ago scene that are not dinosaurs (a flying pterosaur, a sea plesiosaur, a furry mammoth), drags a dinosaur's
   legs from a lizard's sideways sprawl to straight under its body, puts Dimetrodon, T. rex, mammoths and people in time
   order, sorts film myths from fossil facts, and runs a three-question dinosaur check on new animals. Data and drawings:
   realdino_art.js. */
(()=>{const R=RDN;
VIS.reg('flagrealdino',c=>{c.fig.classList.add('young');
let A,ctl,chal,qi=-1,epoch=0,held=null,spots=[],feet=[],slots=[],tcards=[],bins=[],fcards=[],pills=[];const M={};
const STEPS=['scene','legs','time','facts','check','chal'],cur=()=>STEPS[A.step];
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function say(msg,bad){M.msg=msg;M.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);pads();A.redraw();M.ping()}
const mood=f=>f?'ok':M.bad?'no':'';
/* ---- step 1: spot the animals that are not dinosaurs ---- */
const found=()=>R.SCENE.filter((B,i)=>!B.z&&M.s.hit[i]).length;
function tapBeast(i){const B=R.SCENE[i],s=M.s;if(s.hit[i])return;
 if(B.z){s.hit[i]='dino';A.sound.miss();return say(B.yes+' Find the ones that are not dinosaurs.',true)}
 s.hit[i]='not';A.sound.pop();say(`${B.not} (${found()} of 3 found)`,false)}
function drawScene(){const s=M.s,g=A.ctx,dk=A.col.dark,n=found(),fin=n===3,y0=R.top(A,fin?R.DONE[0]:`Tap each animal that is NOT a dinosaur. (${n} of 3)`,mood(fin),M.msg,M.bad);
 const h=A.H-y0-8,sky=h*.34,land=h*.38,sz=Math.min(104,A.W*.27);
 g.fillStyle=dk?'#1e3a5f':'#dbeafe';R.round(g,8,y0,A.W-16,h,14);g.fill();g.fillStyle=dk?'#3f3f1e':'#d9f99d';g.fillRect(8,y0+sky,A.W-16,land);g.fillStyle=dk?'#0284c7':'#7dd3fc';R.round(g,8,y0+sky+land,A.W-16,h-sky-land,14);g.fill();g.fillRect(8,y0+sky+land,A.W-16,14);
 g.font=`800 14px system-ui,sans-serif`;g.fillStyle=dk?'#e2e8f0':'#1e293b';g.textAlign='left';g.textBaseline='top';g.fillText('Sky',16,y0+6);g.fillText('Land',16,y0+sky+6);g.fillText('Sea',16,y0+sky+land+6);
 const place={rex:[.24,y0+sky+land*.52],diplo:[.56,y0+sky+land*.5],mammoth:[.84,y0+sky+land*.52],ptero:[.62,y0+sky*.55],plesio:[.42,y0+sky+land+(h-sky-land)*.5]};spots=[];
 R.SCENE.forEach((B,i)=>{const [fx,y]=place[B.id],x=A.W*fx,r={i,x:x-sz/2,y:y-sz/2,w:sz,h:sz};spots.push(r);R.beast(g,B.id,x,y,B.id==='ptero'?sz*1.3:sz);const st=s.hit[i];
  if(st){g.lineWidth=4;g.strokeStyle=st==='not'?R.NO:R.OK;R.round(g,r.x,r.y,r.w,r.h,14);g.stroke();g.font=`800 13px system-ui,sans-serif`;const lab=st==='not'?'Not a dinosaur':'Dinosaur',tw=g.measureText(lab).width+12;
   g.fillStyle=st==='not'?R.NO:R.OK;R.round(g,x-tw/2,r.y+r.h-20,tw,20,8);g.fill();g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText(lab,x,r.y+r.h-10)}})}
/* ---- step 2: legs out to the side or straight under ---- */
function setLeg(side,t){const s=M.l;if(s[side]===t&&t===1)return;s[side]=t;
 if(!t){A.sound.miss();return say('That is how a lizard stands, with its legs out to the side. Drag the foot in, under the body.',true)}
 A.sound.pop();say(s.L===1&&s.R===1?'Both legs go straight down. The body is held up high.':'One leg is under the body. Now the other one.',false)}
function drawLegs(){const s=M.l,g=A.ctx,dk=A.col.dark,fin=s.L===1&&s.R===1,y0=R.top(A,fin?R.DONE[1]:'Drag each foot to stand like a dinosaur.',mood(fin),M.msg,M.bad);
 const gy=A.H-44,ss=Math.min(A.W*.52,(A.H-y0)*.95,300),cx=A.W*.63,lzx=A.W*.17,ls=Math.min(A.W*.26,140);
 R.front(g,lzx,gy,ls,0,0,dk,'Lizard');let l=s.L,r=s.R;if(held)held.side==='L'?l=held.t:r=held.t;const F=R.front(g,cx,gy,ss,l,r,dk,'Dinosaur');
 feet=[{side:'L',x:F.L.x-30,y:F.L.y-60,w:60,h:76},{side:'R',x:F.R.x-30,y:F.R.y-60,w:60,h:76}];
 g.fillStyle=dk?'#fde68a':'#b45309';feet.forEach(f=>{if(s[f.side]!==1){g.beginPath();g.arc(f.x+30,f.y+60,9,0,7);g.fill()}});
 g.font=`700 14px system-ui,sans-serif`;g.fillStyle=dk?'#cbd5e1':'#334155';g.textAlign='center';g.textBaseline='top';R.fit(g,fin?'Dinosaur legs work like pillars: they hold the body up high off the ground.':'The lizard\u2019s legs stick out. Drag each orange dot in, under the dinosaur\u2019s body.',A.W-32,g.font).forEach((t,i)=>g.fillText(t,A.W/2,y0+4+i*18))}
/* ---- step 3: who came first? ---- */
function putTime(k,si){const s=M.t,C=R.TIME[k];if(s.at[k]!=null)return;if(C.ord!==si){s.bad=k;A.sound.miss();return say(R.TIMENO[C.id],true)}
 s.at[k]=si;s.bad=null;s.pick=null;A.sound.pop();say(`${C.name}: ${R.SLOTLAB[si].replace(/:.*/,'')}.`,false)}
function drawTime(){const s=M.t,g=A.ctx,dk=A.col.dark,n=Object.keys(s.at).length,fin=n===4,y0=R.top(A,fin?R.DONE[2]:`Who came first? Put each card in its place. (${n} of 4)`,mood(fin),M.msg,M.bad);
 const sw=(A.W-24)/4,sh=Math.min(110,sw*1.25),sy=y0+30;g.strokeStyle=dk?'#94a3b8':R.EDGE;g.lineWidth=3;g.beginPath();g.moveTo(14,y0+14);g.lineTo(A.W-20,y0+14);g.lineTo(A.W-30,y0+8);g.moveTo(A.W-20,y0+14);g.lineTo(A.W-30,y0+20);g.stroke();
 g.font=`700 13px system-ui,sans-serif`;g.fillStyle=dk?'#cbd5e1':'#334155';g.textBaseline='bottom';g.textAlign='left';g.fillText('Long, long ago',14,y0+10);g.textAlign='right';g.fillText('Now',A.W-14,y0+10);
 slots=[];R.SLOTLAB.forEach((lab,si)=>{const r={si,x:8+si*(sw+2.6),y:sy,w:sw-2,h:sh};slots.push(r);const k=R.TIME.findIndex((_,j)=>s.at[j]===si);
  if(k>=0){g.fillStyle=dk?'#14532d':'#dcfce7';R.round(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=R.OK;g.lineWidth=3;g.stroke();R.beast(g,R.TIME[k].id,r.x+r.w/2,r.y+r.h*.42,Math.min(r.w,r.h)*.8)}
  else{g.setLineDash([6,5]);g.strokeStyle=dk?'#cbd5e1':R.EDGE;g.lineWidth=2.5;R.round(g,r.x,r.y,r.w,r.h,12);g.stroke();g.setLineDash([])}
  g.font=`700 ${A.narrow?11:13}px system-ui,sans-serif`;g.fillStyle=dk?R.LIGHT:R.INK;g.textAlign='center';g.textBaseline='top';R.fit(g,k>=0?R.TIME[k].name:lab,r.w-6,g.font).slice(0,2).forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h-30+i*14))});
 tcards=[];if(fin)return;const cw=(A.W-28)/2,ch=Math.min(96,(A.H-sy-sh-30)/2-8);let j=0;
 R.TIME.forEach((C,k)=>{if(s.at[k]!=null)return;const r={k,x:10+(j%2)*(cw+8),y:sy+sh+18+Math.floor(j/2)*(ch+10),w:cw,h:ch};j++;if(held&&held.k===k)return;tcards.push(r);drawTCard(r,C,s.bad===k?'no':s.pick===k?'sel':'')});
 if(held&&held.k!=null)drawTCard({x:held.x-cw/2,y:held.y-ch/2,w:cw,h:ch},R.TIME[held.k],'sel')}
function drawTCard(r,C,st){const g=A.ctx;R.card(g,r,'',st);R.beast(g,C.id,r.x+r.h*.42,r.y+r.h/2,r.h*.72);const tx=r.x+r.h*.82,tw=r.w-r.h*.82-6;let n=A.narrow?15:17;
 do{g.font=`800 ${n}px system-ui,sans-serif`;if(C.name.split(' ').every(w=>g.measureText(w).width<=tw))break;n--}while(n>11);g.fillStyle=R.INK;g.textAlign='left';g.textBaseline='middle';
 R.fit(g,C.name,tw,g.font).forEach((t,i,a)=>g.fillText(t,tx,r.y+r.h/2+(i-(a.length-1)/2)*(n+3)))}
/* ---- step 4: real or only in films? ---- */
function sortFact(i,z){const s=M.f;if(s.at[i]!=null)return;const C=R.FACTS[i];if(z!==C.z){s.bad=i;A.sound.miss();return say(C.no,true)}
 s.at[i]=z;s.bad=-1;s.pick=null;A.sound.pop();say(`${C.t}: ${R.BINS[z].toLowerCase()}.`,false)}
function drawFacts(){const s=M.f,g=A.ctx,dk=A.col.dark,n=Object.keys(s.at).length,fin=n===R.FACTS.length,y0=R.top(A,fin?R.DONE[3]:`Real, or only in films? (${n} of 6)`,mood(fin),M.msg,M.bad);
 const bw=(A.W-24)/2,bh=Math.min(130,(A.H-y0)*.34);bins=[1,0].map((z,k)=>({z,x:8+k*(bw+8),y:y0+4,w:bw,h:bh}));
 bins.forEach(b=>{const over=held&&held.i!=null&&on(held,b);g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?(b.z?'#14532d':'#3b2a12'):(b.z?'#f0fdf4':'#fff7ed'));R.round(g,b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=b.z?R.OK:'#c2410c';g.lineWidth=2.5;g.stroke();
  g.font=`800 ${A.narrow?16:18}px system-ui,sans-serif`;g.fillStyle=dk?R.LIGHT:R.INK;g.textAlign='center';g.textBaseline='top';g.fillText((b.z?'\u{1F9B4} ':'\u{1F3AC} ')+R.BINS[b.z],b.x+b.w/2,b.y+8);
  g.font=`800 ${A.narrow?20:24}px system-ui,sans-serif`;g.fillStyle=dk?'#86efac':R.OK;g.fillText('\u2713'.repeat(R.FACTS.filter((C,i)=>s.at[i]===b.z).length),b.x+b.w/2,b.y+bh*.5)});
 fcards=[];if(fin)return;const cw=(A.W-28)/2,chh=Math.min(74,(A.H-y0-bh-30)/3-8);let j=0;R.FACTS.forEach((C,i)=>{if(s.at[i]!=null)return;const r={i,x:10+(j%2)*(cw+8),y:y0+bh+16+Math.floor(j/2)*(chh+8),w:cw,h:chh};j++;if(held&&held.i===i)return;fcards.push(r);
  R.card(g,r,C.t,s.bad===i?'no':s.pick===i?'sel':'',17)});
 if(held&&held.i!=null)R.card(g,{x:held.x-cw/2,y:held.y-chh/2,w:cw,h:chh},R.FACTS[held.i].t,'sel',17)}
/* ---- step 5: the dinosaur check ---- */
function answer(row,yes){const s=M.c,B=R.BEASTS[s.b];if(!B||s.ans[row]!=null||row!==s.ans.length)return;
 if(yes!==B.a[row]){s.bad=row;A.sound.miss();return say(B.why[row],true)}
 s.ans.push(yes);s.bad=-1;A.sound.pop();
 if(s.ans.length<3)return say(B.why[row],false);
 const dino=B.a.every(Boolean);s.done++;say(B.why[row]+' '+(dino?`${B.name} passes every check: it is a dinosaur!`:`${B.name} fails a check, so it is not a dinosaur.`),false);
 if(s.b<R.BEASTS.length-1){const e=epoch;setTimeout(()=>{if(e!==epoch)return;s.b++;s.ans=[];s.bad=-1;pads();A.redraw()},900)}}
function drawCheck(){const s=M.c,g=A.ctx,dk=A.col.dark,B=R.BEASTS[s.b],fin=s.done===R.BEASTS.length,y0=R.top(A,fin?R.DONE[4]:`Dinosaur check: ${B.name} (${s.b+1} of 3)`,mood(fin),M.msg,M.bad);
 const bs=Math.min(150,A.W*.4);g.fillStyle=dk?'#1e293b':'#f1f5f9';R.round(g,8,y0,A.W-16,bs*.7,12);g.fill();R.beast(g,B.id,A.W*.3,y0+bs*.36,bs);g.font=`800 ${A.narrow?18:22}px system-ui,sans-serif`;g.fillStyle=dk?R.LIGHT:R.INK;g.textAlign='left';g.textBaseline='middle';g.fillText(B.name,A.W*.52,y0+bs*.35);
 pills=[];const ry0=y0+bs*.7+10,rh=Math.min(84,(A.H-ry0-8)/3-6),pw=Math.min(76,A.W*.2);
 R.CHECKS.forEach((q,row)=>{const y=ry0+row*(rh+6),got=s.ans[row];g.fillStyle=dk?'#0f172a':'#ffffff';R.round(g,8,y,A.W-16,rh,12);g.fill();g.strokeStyle=row===s.ans.length&&!fin?R.SEL:R.EDGE;g.lineWidth=row===s.ans.length?2.5:1.2;g.stroke();
  g.font=`700 ${A.narrow?15:17}px system-ui,sans-serif`;g.fillStyle=dk?R.LIGHT:R.INK;g.textAlign='left';g.textBaseline='middle';const rows=R.fit(g,q,A.W-2*pw-48,g.font);rows.forEach((t,i)=>g.fillText(t,18,y+rh/2+(i-(rows.length-1)/2)*19));
  [1,0].forEach((v,k)=>{const r={row,v,x:A.W-16-(2-k)*(pw+6)+6,y:y+(rh-52)/2,w:pw,h:52};pills.push(r);const st=got===v?(v===B.a[row]?'ok':'no'):(s.bad===row&&v!==B.a[row]?'no':'');R.card(g,r,v?'Yes':'No',st,20)})})}
/* ---- challenge feedback ---- */
function slip(tag){let m='A dinosaur walked on land, with its legs straight under its body, in dinosaur times.';
 if(tag==='fly')m='Pteranodon could fly, but it was a pterosaur: a flying reptile. Pterosaurs were cousins of dinosaurs, not dinosaurs.';
 if(tag==='sea')m='Sea reptiles with flippers, like Plesiosaurus, were not dinosaurs. Dinosaurs walked on land.';
 if(tag==='old')m='Living long ago does not make an animal a dinosaur. Lots of other animals lived long ago too.';
 if(tag==='big')m='Being big does not make an animal a dinosaur. Some dinosaurs were as small as a chicken.';
 if(tag==='time')m='The big dinosaurs died out 66 million years ago. People came much, much later, so no one saw a living T. rex.';
 if(tag==='film')m='Films and cartoons are made up. Scientists use fossils to find out what dinosaurs were really like.';
 if(tag==='legs')m='A lizard\u2019s legs stick out to the side. A dinosaur\u2019s legs went straight down under its body.';
 return m}
function ask(){qi++;const Q=R.QS[qi%R.QS.length],all=[[Q.a,'ok'],...Q.o],rot=qi%3,order=all.slice(rot).concat(all.slice(0,rot));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},chal.querySelector('.fl-pick'),v).onclick=()=>mark(tag,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(tag,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),good=tag==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Right: ${a}.`:'\u2717 '+slip(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(good?'Right.':slip(tag))}
/* ---- wiring ---- */
const VIEW={scene:drawScene,legs:drawLegs,time:drawTime,facts:drawFacts,check:drawCheck};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=cur();
 if(k==='chal'){const y=R.top(A,'Challenge: real dinosaur or not?','ok');R.beast(g,'rex',A.W*.25,y+60,110);R.ptero(g,A.W*.68,y+50,120);return}VIEW[k]();A.fx.draw(g)}
function down(p){const k=cur();
 if(k==='scene'){const r=spots.find(q=>on(p,q));if(r)tapBeast(r.i);return false}
 if(k==='legs'){const f=feet.find(q=>on(p,q));if(f&&M.l[f.side]!==1){held={side:f.side,t:M.l[f.side],x0:p.x,y0:p.y,x:p.x,y:p.y};return true}return false}
 if(k==='time'){const t=tcards.find(q=>on(p,q));if(t){held={k:t.k,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const sl=slots.find(q=>on(p,q));if(sl&&M.t.pick!=null)putTime(M.t.pick,sl.si);return false}
 if(k==='facts'){if(M.f.pick!=null){const b=bins.find(q=>on(p,q));if(b){sortFact(M.f.pick,b.z);return false}}const z=fcards.find(q=>on(p,q));if(z){held={i:z.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='check'){const r=pills.find(q=>on(p,q));if(r)answer(r.row,r.v);return false}return false}
function move(p){if(!held)return;held.x=p.x;held.y=p.y;if(cur()==='legs'){const inward=held.side==='L'?p.x-held.x0:held.x0-p.x;held.t=Math.max(0,Math.min(1,inward/Math.max(40,A.W*.14)))}A.redraw()}
function up(p){if(!held)return;const h=held,k=cur(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10;held=null;
 if(k==='legs'){if(tap)return setLeg(h.side,1);return setLeg(h.side,h.t>.55?1:0)}
 if(k==='time'){const sl=slots.find(q=>on(p,q));if(sl)return putTime(h.k,sl.si);if(tap){M.t.pick=h.k;return say(`Picked ${R.TIME[h.k].name}. Now tap a place on the time line.`,false)}return A.redraw()}
 if(k==='facts'){const b=bins.find(q=>on(p,q));if(b)return sortFact(h.i,b.z);if(tap){M.f.pick=h.i;return say('Picked a card. Now tap Real or Only in films.',false)}A.redraw()}}
function wipe(){epoch++;held=null;for(const k in M)delete M[k];
 Object.assign(M,{s:{hit:{}},l:{L:0,R:0},t:{at:{},pick:null,bad:null},f:{at:{},pick:null,bad:-1},c:{b:0,ans:[],bad:-1,done:0},msg:null,bad:false,ping:()=>{}})}
function open(i,over){wipe();c.say(R.DESC[i]);A.cv.setAttribute('aria-label',R.DESC[i]);
 M.ping=()=>{if(A.step===i&&!A.isDone&&over()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(R.DONE[i]+A.reveal(i))};pads();A.redraw()}
function auto(i,list){PLAN[i].go();const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=cur(),b=(t,f,l)=>{const x=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t);x.onclick=f};
 if(k==='scene')R.SCENE.forEach((B,i)=>{if(!M.s.hit[i])b(B.name,()=>tapBeast(i),`${B.name}: mark it as not a dinosaur`)});
 if(k==='legs')['L','R'].forEach(sd=>{if(M.l[sd]!==1){const nm=sd==='L'?'Left':'Right';b(`${nm} leg: under the body`,()=>setLeg(sd,1),`Put the ${nm.toLowerCase()} leg straight under the body`);b(`${nm} leg: out to the side`,()=>setLeg(sd,0),`Put the ${nm.toLowerCase()} leg out to the side`)}});
 if(k==='time'){const j=R.TIME.findIndex((_,q)=>M.t.at[q]==null);if(j>=0)R.SLOTLAB.forEach((lab,si)=>{if(!R.TIME.some((_,q)=>M.t.at[q]===si))b(`${R.TIME[j].name}: ${lab.replace(/:.*/,'')}`,()=>putTime(j,si),`Put ${R.TIME[j].name} in place ${lab}`)})}
 if(k==='facts'){const i=R.FACTS.findIndex((_,j)=>M.f.at[j]==null);if(i>=0)[1,0].forEach(z=>b(z?'Real':'Only in films',()=>sortFact(i,z),`${R.FACTS[i].t}: ${R.BINS[z]}`))}
 if(k==='check'){const s=M.c,B=R.BEASTS[s.b];if(B&&s.ans.length<3){const row=s.ans.length;[1,0].forEach(v=>b(v?'Yes':'No',()=>answer(row,v),`${B.name}: ${R.CHECKS[row]} ${v?'Yes':'No'}`))}}}
const PLAN=[
{h:'Dinosaur or not?',p:R.TXT[0],predict:{q:'Pteranodon flew in the sky long ago. Was it a dinosaur?',opts:['Yes, a flying dinosaur','No, a flying reptile'],ans:1},task:'Find the 3 animals that are not dinosaurs',
 show:()=>auto(0,[2,3,4].map(i=>[700,()=>tapBeast(i)])),go:()=>open(0,()=>found()===3)},
{h:'How did they stand?',p:R.TXT[1],predict:{q:'A lizard\u2019s legs stick out to the side. How did a dinosaur stand?',opts:['Legs out to the side','Legs straight under its body'],ans:1},task:'Put both legs straight under the body',
 show:()=>auto(1,[[700,()=>setLeg('L',1)],[700,()=>setLeg('R',1)]]),go:()=>open(1,()=>M.l.L===1&&M.l.R===1)},
{h:'Who came first?',p:R.TXT[2],predict:{q:'Did people ever see a living T. rex?',opts:['Yes, long ago','No, never'],ans:1},task:'Put all 4 cards in time order',
 show:()=>auto(2,R.TIME.map((C,k)=>[650,()=>putTime(k,C.ord)])),go:()=>open(2,()=>Object.keys(M.t.at).length===4)},
{h:'Real or film?',p:R.TXT[3],task:'Sort all 6 cards',
 show:()=>auto(3,R.FACTS.map((C,i)=>[550,()=>sortFact(i,C.z)])),go:()=>open(3,()=>Object.keys(M.f.at).length===R.FACTS.length)},
{h:'Dinosaur check',p:R.TXT[4],task:'Check all 3 animals',
 show:()=>{auto(4,[]);const e=epoch;let t=0;R.BEASTS.forEach(B=>{B.a.forEach((v,row)=>{t+=250;setTimeout(()=>{if(e===epoch)answer(row,v)},t)});t+=1100})},go:()=>open(4,()=>M.c.done===R.BEASTS.length)},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>M.ping()});
FK.shell(c,{steps:PLAN,ratio:.72,tall:1.36,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;pads()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Real dinosaur lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();
  A.gest({down,move,up});pads()}}).start()})})();
