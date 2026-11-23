/* Flagship – Mary Anning, fossil hunter (ages 7-9; KS1-2 science and significant people): bring the cliff down with a
   storm and pick the fossils out of the rubble, rebuild the ichthyosaur Joseph and Mary found (and reject legs and
   wings), sort dinosaurs from Mary's sea and flying reptiles, put her finds on a line of time against the word
   'dinosaur', and match each fossil to its living look-alike to see that it is extinct. Data and drawings: anning_art.js. */
(()=>{const D=ANN;
VIS.reg('flaganning',c=>{let A,bar,chal,qn=-1,run=0;const S={};c.fig.classList.add('young');
const STAGES=['cliff','build','dino','line','match','quiz'];
const stage=()=>STAGES[A.step];
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const big=n=>A.narrow?n:Math.round(n*1.12),FONT='px system-ui,sans-serif';
const dark=()=>A.col.dark,txt=()=>dark()?'#f8fafc':'#0f172a';
const GOOD='#047857',BAD='#b91c1c',EDGE='#64748b';
function lines(t,max,font){const g=A.ctx;g.font=font;const out=[];let cur='';t.split(' ').forEach(w=>{const nx=cur?cur+' '+w:w;if(cur&&g.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx});if(cur)out.push(cur);return out}
/* banner across the top: the goal, then the last feedback line under it */
function banner(t,tone){const g=A.ctx,f=`800 ${big(16)}${FONT}`,L=lines(t,A.W-36,f),lh=big(16)*1.3,h=L.length*lh+14;
 g.fillStyle=tone==='ok'?(dark()?'#14532d':'#dcfce7'):tone==='no'?(dark()?'#7f1d1d':'#fee2e2'):(dark()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,10);g.fill();
 g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'?GOOD:tone==='no'?BAD:EDGE;g.stroke();g.fillStyle=txt();g.textAlign='left';g.textBaseline='top';g.font=f;L.forEach((s,i)=>g.fillText(s,18,15+i*lh));
 let y=8+h+6;if(S.note){const f2=`700 ${big(14)}${FONT}`,L2=lines(S.note,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=S.noteBad?(dark()?'#fca5a5':BAD):(dark()?'#86efac':GOOD);L2.forEach((s,i)=>g.fillText(s,18,y+i*big(14)*1.3));y+=L2.length*big(14)*1.3+6}return y}
/* a tile: light card, picture on top, label underneath */
function tile(r,label,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.good?'#dcfce7':o.pick?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.lineWidth=o.bad||o.good||o.pick?3.5:1.5;g.strokeStyle=o.bad?BAD:o.good?GOOD:o.pick?'#1d4ed8':EDGE;g.stroke();let lab=r;
 if(o.pic){const th=label?Math.min(r.h*.36,big(o.n||14)*2.6):0,s=Math.min(r.w*.8,r.h-th-8);D.icon(g,o.pic,r.x+r.w/2,r.y+4+s/2,s);lab={x:r.x,y:r.y+r.h-th-2,w:r.w,h:th}}
 if(!label)return;let n=big(o.n||15),L;while(true){L=lines(label,lab.w-10,`800 ${n}${FONT}`);if(L.length*n*1.18<=lab.h-4||n<=11)break;n--}
 g.font=`800 ${n}${FONT}`;g.fillStyle=D.INK;g.textAlign='center';g.textBaseline='middle';L.forEach((s,i)=>g.fillText(s,lab.x+lab.w/2,lab.y+lab.h/2+(i-(L.length-1)/2)*n*1.18))}
function grid(n,cols,top,maxH,ratio){const gap=8,w=(A.W-16-gap*(cols-1))/cols,rows=Math.ceil(n/cols),h=Math.min((A.H-top-8-gap*(rows-1))/rows,w*ratio,maxH||1e9);
 return Array.from({length:n},(_,i)=>({x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
/* ---------- 1. the storm brings the cliff down ---------- */
let STONES=[],STORM=null;
function storm(){const s=S.cl;if(s.storm)return;s.storm=1;A.sound.whoosh();tell('Crash! The storm brought rock down. Now look at the stones on the beach.',false)}
function pickStone(i){const s=S.cl;if(!s.storm){A.sound.miss();return tell('The beach is bare. The fossils are still inside the cliff. Use the storm to bring rock down.',true)}
 const it=D.BEACH[i];if(s.got.includes(i)){A.sound.tick();return}
 if(!it.f){s.bad=i;A.sound.miss();return tell('A plain stone: no shape of a living thing. Look for a curl, a bullet or a round bone.',true)}
 s.got.push(i);s.bad=-1;A.sound.pop();tell(D.FOUND[it.k]+(s.got.length<3?` ${s.got.length} of 3 found.`:''),false)}
function drawCliff(){const s=S.cl,g=A.ctx,end=s.got.length>=3,y0=banner(end?D.DONE[0]:s.storm?'Tap the 3 fossils on the beach.':'Calm day. Can you find a fossil?',end?'ok':S.noteBad?'no':'');
 const top=y0+4,bot=A.H-8,cw=A.W*.42;g.fillStyle=dark()?'#334155':'#cbd5e1';g.fillRect(8,top,A.W-16,bot-top);
 const bands=['#475569','#64748b','#94a3b8','#64748b','#475569','#94a3b8'],bh=(bot-top)*.75/bands.length;
 bands.forEach((col,i)=>{g.fillStyle=col;g.beginPath();g.moveTo(8,top+i*bh);g.lineTo(8+cw-(s.storm&&i<3?cw*.25:0),top+i*bh);g.lineTo(8+cw-(s.storm&&i<3?cw*.25:0),top+(i+1)*bh);g.lineTo(8,top+(i+1)*bh);g.fill()});
 g.fillStyle='#e7c98f';g.fillRect(8,top+(bot-top)*.75,A.W-16,(bot-top)*.25);
 const bw=Math.min(110,(A.W-cw-40)*.45);STORM={x:A.W-bw-16,y:top+8,w:bw,h:bw*.7};tile(STORM,s.storm?'Storm over':'Storm',{n:13,pick:!s.storm});
 if(!s.storm){g.fillStyle='#64748b';g.beginPath();g.ellipse(STORM.x+bw*.5,STORM.y+bw*.25,bw*.3,bw*.13,0,0,7);g.fill();STONES=[];return}
 const by=top+(bot-top)*.5,bh2=bot-by-4,cols=A.narrow?3:6,sw=Math.min((A.W-cw*.6-24)/(A.narrow?3:6),110);
 STONES=D.BEACH.map((it,i)=>({i,x:8+cw*.55+(i%cols)*(sw+4),y:by+Math.floor(i/cols)*(Math.min(bh2/(6/cols),sw)+4),w:sw,h:Math.min(bh2/(6/cols),sw)}));
 STONES.forEach(r=>{const got=s.got.includes(r.i);tile(r,got?D.BEACH[r.i].t:'',{pic:D.BEACH[r.i].k,good:got,bad:s.bad===r.i,n:12})})}
/* ---------- 2. build the ichthyosaur ---------- */
let BODY=null,PCARDS=[];
function fit(j){const s=S.bu,it=D.PARTS[j];if(s.in.includes(j)||s.in.length>=4)return;s.drag=null;
 if(!it.ok){s.bad=j;A.sound.miss();return tell(it.why,true)}s.in.push(j);s.bad=-1;A.sound.pop();tell(it.say+(s.in.length<4?' Find another part.':''),false)}
function drawBuild(){const s=S.bu,end=s.in.length>=4,y0=banner(end?D.DONE[1]:`Ichthyosaur: ${s.in.length} of 4 parts.`,end?'ok':S.noteBad?'no':''),g=A.ctx;
 const bh=Math.min(A.H*.3,150),bw=Math.min(A.W-16,bh*2.6);BODY={x:(A.W-bw)/2,y:y0+2,w:bw,h:bh};tile(BODY,'',{pick:!!s.drag});
 g.save();g.globalAlpha=end?1:.25;D.icon(g,'ichthy',BODY.x+bw/2,BODY.y+bh/2,Math.min(bw*.9,bh*1.9));g.restore();
 s.in.forEach((j,n)=>{const k=D.PARTS[j].k,pos={skull:[.22,.45],spine:[.5,.42],paddle:[.45,.68],tail:[.85,.45]}[k];D.icon(g,k,BODY.x+bw*pos[0],BODY.y+bh*pos[1],bh*.42)});
 const left=D.PARTS.map((_,j)=>j).filter(j=>!s.in.includes(j)),cells=grid(left.length,A.narrow?3:Math.min(6,left.length||1),BODY.y+bh+10,150,.95);
 PCARDS=end?[]:left.map((j,n)=>({j,...cells[n]}));
 PCARDS.forEach(r=>{const d=s.drag&&s.drag.j===r.j?s.drag:null;tile(d?{x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h}:r,D.PARTS[r.j].t,{pic:D.PARTS[r.j].k,n:12,bad:s.bad===r.j,pick:!!d})})}
/* ---------- 3. dinosaur or not ---------- */
let BOX=[],CARD=null;
function sortDino(z){const s=S.di,it=D.DINO[s.i];if(!it)return;s.drag=null;
 if(z!==it.d){s.bad=z;A.sound.miss();return tell(it.why,true)}s.n[z]++;s.i++;s.bad=-1;A.sound.pop();tell(`Yes. ${it.why}`+(s.i<D.DINO.length?' Next card.':''),false)}
function drawDino(){const s=S.di,it=D.DINO[s.i],y0=banner(it?`${s.i+1} of ${D.DINO.length}: dinosaur, or not?`:D.DONE[2],it?(S.noteBad?'no':''):'ok');
 const gap=10,bw=(A.W-16-gap)/2,bh=Math.min(A.H*.24,120),by=A.H-bh-8;BOX=[[1,'Dinosaur'],[0,'Not a dinosaur']].map(([z,l],k)=>{const r={z,x:8+k*(bw+gap),y:by,w:bw,h:bh};tile(r,`${l} (${s.n[z]})`,{n:18,bad:s.bad===z});return r});
 if(it){const w=Math.min(A.W*.5,230),h=Math.min(by-y0-14,w*.95),d=s.drag;CARD={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+4,w,h};tile(CARD,it.t,{pic:it.k,n:15,pick:!!d})}else CARD=null}
/* ---------- 4. line of time ---------- */
let YEARS=[];
function stamp(i){const s=S.li;if(s.n>=D.TIME.length)return;if(i<s.n){A.sound.tick();return}
 if(i!==s.n){s.bad=i;A.sound.miss();const lo=D.TIME[s.n].y;return tell(`${D.TIME[i].y} is later. Find an earlier year first: smaller numbers come first.`,true)}
 s.n++;s.bad=-1;A.sound.pop();tell(`${D.TIME[i].y}: ${D.TIME[i].t}.`+(s.n<D.TIME.length?' What happened next?':''),false)}
function drawLine(){const s=S.li,g=A.ctx,end=s.n>=D.TIME.length,y0=banner(end?D.DONE[3]:'Tap the earliest year left.',end?'ok':S.noteBad?'no':'');
 const ly=y0+28;g.strokeStyle=txt();g.lineWidth=3;g.beginPath();g.moveTo(20,ly);g.lineTo(A.W-20,ly);g.stroke();
 const x=y=>20+(y-1795)/(1850-1795)*(A.W-40);for(let k=0;k<s.n;k++){const t=D.TIME[k];g.fillStyle=k===5?'#dc2626':'#2563eb';g.beginPath();g.arc(x(t.y),ly,7,0,7);g.fill();g.font=`700 ${big(12)}${FONT}`;g.fillStyle=txt();g.textAlign='center';g.textBaseline=k%2?'bottom':'top';g.fillText(String(t.y),x(t.y),k%2?ly-9:ly+9)}
 const cells=grid(6,A.narrow?2:3,ly+36,110,.55);YEARS=D.TIME.map((t,i)=>({i,...cells[D.SPOT[i]]}));
 YEARS.forEach(r=>tile(r,`${D.TIME[r.i].y}: ${D.TIME[r.i].t}`,{n:13,good:r.i<s.n,bad:s.bad===r.i}))}
/* ---------- 5. fossil and look-alike ---------- */
let FOS=[],LIV=[];
function choose(side,k){const s=S.ma;if(s.done.length>=4)return;
 if(side==='f'){if(s.done.includes(k))return;s.sel=k;A.sound.tick();return tell(`${D.PAIRS[k][2]}: now tap the animal alive today that it looks like.`,false)}
 if(s.sel<0){A.sound.miss();return tell('Tap a fossil on the left first.',true)}
 if(k!==s.sel){s.bad=k;A.sound.miss();return tell(`Look at the shape. A ${D.PAIRS[s.sel][2].toLowerCase()} does not look like a ${D.PAIRS[k][3].toLowerCase()}.`,true)}
 s.done.push(k);s.sel=-1;s.bad=-1;A.sound.pop();tell(D.PAIRSAY[k],false)}
function drawMatch(){const s=S.ma,end=s.done.length>=4,y0=banner(end?D.DONE[4]:'Tap a fossil, then its look-alike.',end?'ok':S.noteBad?'no':''),g=A.ctx;
 const gap=8,cw=(A.W-16-gap*3)/2,rows=4,ch=Math.min((A.H-y0-12-gap*(rows-1))/rows,cw*.55);
 FOS=D.PAIRS.map((p,k)=>({k,x:8,y:y0+4+k*(ch+gap),w:cw,h:ch}));const order=[2,0,3,1];LIV=order.map((k,n)=>({k,x:8+cw+gap*3,y:y0+4+n*(ch+gap),w:cw,h:ch}));
 s.done.forEach(k=>{const a=FOS.find(r=>r.k===k),b=LIV.find(r=>r.k===k);g.strokeStyle=GOOD;g.lineWidth=4;g.beginPath();g.moveTo(a.x+a.w,a.y+a.h/2);g.lineTo(b.x,b.y+b.h/2);g.stroke()});
 const row=(r,pic,lab,o)=>{tile(r,'',o);D.icon(g,pic,r.x+r.h*.6,r.y+r.h/2,r.h*.85);g.font=`800 ${big(13)}${FONT}`;g.fillStyle=D.INK;g.textAlign='left';g.textBaseline='middle';g.fillText(lab,r.x+r.h*1.2,r.y+r.h/2)};
 FOS.forEach(r=>row(r,D.PAIRS[r.k][0],D.PAIRS[r.k][2]+(s.done.includes(r.k)?' ✓':''),{good:s.done.includes(r.k),pick:s.sel===r.k}));
 LIV.forEach(r=>row(r,D.PAIRS[r.k][1],D.PAIRS[r.k][3],{good:s.done.includes(r.k),bad:s.bad===r.k}))}
/* ---------- wiring ---------- */
function draw(){const g=A.ctx;g.fillStyle=dark()?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=stage();
 if(m==='quiz'){banner('Challenge: Mary Anning, fossil hunter','ok');const z=Math.min(A.W*.3,A.H*.5);D.icon(g,'ichthy',A.W*.3,A.H*.6,z);D.icon(g,'ammo',A.W*.72,A.H*.6,z*.7);return}
 ({cliff:drawCliff,build:drawBuild,dino:drawDino,line:drawLine,match:drawMatch})[m]();A.fx.draw(g)}
function down(p){const m=stage();
 if(m==='cliff'){if(inR(p,STORM))storm();else{const r=STONES.find(r=>inR(p,r));if(r)pickStone(r.i);else if(!S.cl.storm&&p.y>A.H*.4)pickStone(-1)}return false}
 if(m==='build'){const r=PCARDS.find(r=>inR(p,r));if(r){S.bu.drag={j:r.j,x:p.x,y:p.y,sx:p.x,sy:p.y};return true}return false}
 if(m==='dino'){if(CARD&&inR(p,CARD)){S.di.drag={x:p.x,y:p.y};return true}const r=BOX.find(r=>inR(p,r));if(r)sortDino(r.z);return false}
 if(m==='line'){const r=YEARS.find(r=>inR(p,r));if(r)stamp(r.i);return false}
 if(m==='match'){const f=FOS.find(r=>inR(p,r));if(f){choose('f',f.k);return false}const l=LIV.find(r=>inR(p,r));if(l)choose('l',l.k);return false}return false}
function move(p){const m=stage(),d=m==='build'?S.bu.drag:m==='dino'?S.di.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=stage();
 if(m==='build'&&S.bu.drag){const d=S.bu.drag;S.bu.drag=null;if(Math.hypot(p.x-d.sx,p.y-d.sy)<=12||inR(p,BODY))fit(d.j);else{A.redraw();tell('Drop the part on the outline at the top.',false)}}
 if(m==='dino'&&S.di.drag){S.di.drag=null;const r=BOX.find(r=>inR(p,r));if(r)sortDino(r.z);else{A.redraw();tell('Drop the card in one of the boxes.',false)}}}
function fresh(){run++;for(const k in S)delete S[k];Object.assign(S,{cl:{storm:0,got:[],bad:-1},bu:{in:[],bad:-1,drag:null},di:{i:0,n:{0:0,1:0},bad:-1,drag:null},li:{n:0,bad:-1},ma:{sel:-1,done:[],bad:-1},note:null,noteBad:false,check:()=>{}})}
function tell(t,bad){S.note=t;S.noteBad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(D.DONE[i]+A.reveal(i))};
function open(i,ok){fresh();c.say(D.DESC[i]);A.cv.setAttribute('aria-label',D.DESC[i]);S.check=finish(i,ok);controls();A.redraw()}
function demo(i,list){steps[i].go();const mine=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(mine===run)f()},t)})}
function controls(){if(!bar)return;bar.innerHTML='';const m=stage(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(m==='cliff'&&S.cl.got.length<3){if(!S.cl.storm)Bt('Storm',storm,'Make a winter storm hit the cliff');else D.BEACH.forEach((it,i)=>{if(!S.cl.got.includes(i))Bt(`Stone ${i+1}`,()=>pickStone(i),`Pick up stone ${i+1}`)})}
 if(m==='build'&&S.bu.in.length<4)D.PARTS.forEach((it,j)=>{if(!S.bu.in.includes(j))Bt(it.t,()=>fit(j),`Add to the ichthyosaur: ${it.t}`)});
 if(m==='dino'&&D.DINO[S.di.i]){const it=D.DINO[S.di.i];Bt('Dinosaur',()=>sortDino(1),`${it.t} is a dinosaur`);Bt('Not a dinosaur',()=>sortDino(0),`${it.t} is not a dinosaur`)}
 if(m==='line'&&S.li.n<D.TIME.length)D.SPOT.map((_,i)=>i).sort((a,b)=>D.SPOT[a]-D.SPOT[b]).forEach(i=>{if(i>=S.li.n)Bt(String(D.TIME[i].y),()=>stamp(i),`${D.TIME[i].y}: ${D.TIME[i].t}`)});
 if(m==='match'&&S.ma.done.length<4){D.PAIRS.forEach((p,k)=>{if(!S.ma.done.includes(k))Bt(p[2],()=>choose('f',k),`Choose fossil: ${p[2]}`)});if(S.ma.sel>=0)[2,0,3,1].forEach(k=>{if(!S.ma.done.includes(k))Bt(D.PAIRS[k][3],()=>choose('l',k),`Looks like: ${D.PAIRS[k][3]}`)})}}
const steps=[
{h:'After the storm',p:D.TXT[0],predict:{q:'When is the best time to find fossils at Lyme Regis?',opts:['On a calm summer day','After a winter storm'],ans:1},task:'Find 3 fossils',
 show:()=>demo(0,[[400,storm],[500,()=>pickStone(1)],[500,()=>pickStone(3)],[500,()=>pickStone(5)]]),go:()=>open(0,()=>S.cl.got.length>=3)},
{h:'Build the ichthyosaur',p:D.TXT[1],predict:{q:'In 1811 Joseph found a long skull with sharp teeth. What was it?',opts:['A crocodile','A new sea reptile'],ans:1},task:'Put in all 4 real parts',
 show:()=>demo(1,[0,2,3,5].map(j=>[480,()=>fit(j)])),go:()=>open(1,()=>S.bu.in.length>=4)},
{h:'Dinosaur or not?',p:D.TXT[2],predict:{q:'Was Mary\'s ichthyosaur a dinosaur?',opts:['Yes, a swimming dinosaur','No, a sea reptile'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(2,D.DINO.map(it=>[420,()=>sortDino(it.d)])),go:()=>open(2,()=>S.di.i>=D.DINO.length)},
{h:'Line of time',p:D.TXT[3],predict:{q:'Was the word "dinosaur" used when Mary found her ichthyosaur?',opts:['Yes, everyone said it','No, not for 30 years'],ans:1},task:'Put all 6 in order',
 show:()=>demo(3,D.TIME.map((_,i)=>[420,()=>stamp(i)])),go:()=>open(3,()=>S.li.n>=D.TIME.length)},
{h:'Alive today?',p:D.TXT[4],task:'Match all 4 fossils',
 show:()=>demo(4,[0,1,2,3].flatMap(k=>[[300,()=>choose('f',k)],[300,()=>choose('l',k)]])),go:()=>open(4,()=>S.ma.done.length>=4)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Look again at what Mary found and when.';
 if(t==='where')m='Mary hunted on the beach below the cliffs at Lyme Regis, in Dorset, England.';
 if(t==='dino')m='Ichthyosaurs and plesiosaurs were sea reptiles, and pterosaurs flew. None of them was a dinosaur.';
 if(t==='storm')m='Winter storms bring rock down and wash fossils out. Never dig into the cliff: it can fall on you.';
 if(t==='croc')m='It looked like a crocodile, but the whole skeleton showed paddles and a tail fin: a sea reptile, the ichthyosaur.';
 if(t==='credit')m='Women could not join the Geological Society then, and men often wrote about her fossils without her name.';
 if(t==='alive')m='Looking like a living animal does not make it the same animal. No ichthyosaur is alive today: they are extinct.';
 return m}
function next(){qn++;const Q=D.QS[qn%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:X=>{chal.hidden=X.step!==5;bar.hidden=X.step===5;controls()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Fossil lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
