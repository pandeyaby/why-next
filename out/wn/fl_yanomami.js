/* Flagship – Indigenous rainforest peoples: the Yanomami (ages 5–7; KS1 geography 'human features of a non-European
   place', KS1 science 'living things and their habitats'): build a round shared house from forest parts in order, sort
   food by grow / gather / hunt or fish, run a garden for 9 years and watch the old patch grow back into forest, put
   three rainforest peoples of today on their rainforests, and share a hunter's catch fairly. Data and drawings: yano_art.js. */
(()=>{const Y=YANO;
VIS.reg('flagyanomami',c=>{let A,P,pad,qz,qk=-1,run=0;const K={};c.fig.classList.add('young');
const now=()=>['build','food','grow','map','share','quiz'][A.step];
const inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function ground(){const g=A.ctx;g.fillStyle=A.col.dark?'#052e16':'#ecfccb';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. build the round house ---------- */
let SITE=null,PC=[];
function addPart(j){const b=K.bu,it=Y.PARTS[j];if(b.done>=3||b.used.includes(j))return;b.drag=null;
 if(it.n<0){b.bad=j;A.sound.miss();return tell(it.why,true)}
 if(it.n!==b.done){b.bad=j;A.sound.miss();const need=Y.PARTS.find(x=>x.n===b.done).t.toLowerCase();return tell(it.n>b.done?`Not yet. A house needs ${need} first. Build from the ground up.`:`Already done. Next: ${need}.`,true)}
 b.used.push(j);b.done++;b.bad=-1;A.sound.pop();tell(Y.PART_DO[it.n]+(b.done<3?' What goes on next?':''),false)}
function drawBuild(){const b=K.bu,y0=P.strip(b.done<3?`Round house: ${b.done} of 3 parts.`:Y.DONE[0],b.done<3?(b.bad>=0?'no':''):'ok',K.note,K.bad);
 const sh=Math.min(A.H*.4,200),sw=Math.min(A.W-16,420);SITE={x:(A.W-sw)/2,y:y0,w:sw,h:sh};P.card(SITE,'',{sel:!!b.drag,ok:b.done>=3});
 const g=A.ctx;g.save();g.translate(SITE.x+sw/2,SITE.y+sh*.42);Y.house(g,Math.min(sw*.5,sh*.62),b.done);g.restore();
 const top=y0+sh+10,left=Y.PARTS.map((_,j)=>j).filter(j=>!b.used.includes(j)),n=Math.max(1,left.length),cols=A.narrow?Math.min(3,n):n,rows=Math.ceil(n/cols),gp=8,cw=(A.W-16-gp*(cols-1))/cols,ch=Math.min((A.H-top-8-gp*(rows-1))/rows,cw*1.05);
 PC=b.done<3?left.map((j,i)=>({j,x:8+(i%cols)*(cw+gp),y:top+Math.floor(i/cols)*(ch+gp),w:cw,h:ch})):[];
 PC.forEach(r=>{const d=b.drag&&b.drag.j===r.j?b.drag:null;P.card(d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:r,Y.PARTS[r.j].t,{pic:Y.PARTS[r.j].k,n:13,no:b.bad===r.j,sel:!!d})})}
/* ---------- 2. grow, gather, hunt or fish ---------- */
let BOX=[],HELD=null;
function sortFood(z){const f=K.fo,it=Y.FOOD[f.i];if(!it)return;f.drag=null;if(z!==it.z){f.bad=z;A.sound.miss();return tell(Y.FOOD_NO[f.i],true)}
 f.n[z]++;f.i++;f.bad=-1;A.sound.pop();tell(`Yes: ${it.t.toLowerCase()}, ${Y.BINS[z].toLowerCase()}.`+(f.i<Y.FOOD.length?' Next food.':''),false)}
function drawFood(){const f=K.fo,it=Y.FOOD[f.i],y0=P.strip(it?`Food ${f.i+1} of ${Y.FOOD.length}: where does it come from?`:Y.DONE[1],it?(f.bad>=0?'no':''):'ok',K.note,K.bad);
 const gp=8,bw=(A.W-16-gp*2)/3,bh=Math.min(A.H*.3,140),by=A.H-bh-8;
 BOX=Y.BINS.map((t,z)=>{const r={z,x:8+z*(bw+gp),y:by,w:bw,h:bh};P.card(r,`${t} (${f.n[z]})`,{n:15,no:f.bad===z,pic:['garden','forest','fish'][z]});return r});
 if(it){const w=Math.min(A.W*.42,200),h=Math.min(by-y0-12,w*1.0),d=f.drag;HELD={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+2,w,h};P.card(HELD,it.t,{pic:it.k,n:16,sel:!!d})}else HELD=null}
/* ---------- 3. a garden that moves, a forest that grows back ---------- */
let PATCH=[];
function tapPatch(i){const s=K.gr,p=s.p[i];if(s.yr>=9)return;
 if(p.k==='garden'||p.k==='tired'){A.sound.tick();return tell(p.k==='garden'?'This is the garden. Tap Next year to grow food.':'This soil is tired. Pick a forest patch for the new garden.',false)}
 if(p.k==='young'){s.bad=i;A.sound.miss();return tell('This patch is still growing back into forest. Pick a patch of big trees.',true)}
 const g=s.p.findIndex(q=>q.k==='garden');if(g>=0){s.bad=i;A.sound.miss();return tell('One small garden is enough. Keep the forest until the soil gets tired.',true)}
 const t=s.p.findIndex(q=>q.k==='tired');if(t>=0){s.p[t]={k:'young',a:0}}
 s.p[i]={k:'garden',a:0};s.bad=-1;A.sound.pop();tell(t>=0?'New small garden! The old patch can grow back now.':'A small garden is cleared. Now tap Next year.',false)}
function nextYear(){const s=K.gr;if(s.yr>=9)return;const g=s.p.findIndex(q=>q.k==='garden');
 if(g<0){A.sound.miss();s.bad=-1;return tell(s.p.some(q=>q.k==='tired')?'The soil is tired, so no food grows. Pick a forest patch for a new garden.':'No garden yet. Tap a forest patch to make a small garden.',true)}
 s.yr++;s.food++;s.p.forEach(q=>{if(q.k==='young'){q.a++;if(q.a>=3){q.k='forest';s.back++}}});const G=s.p[g];G.a++;if(G.a>=3)G.k='tired';A.sound.pop();
 tell(`Year ${s.yr}: food from the garden.`+(G.k==='tired'?' Now the soil is tired.':'')+(s.back&&s.p.every(q=>q.k!=='young')&&s.yr===6?' The old patch is forest again!':''),false)}
function drawGrow(){const s=K.gr,ok=s.yr>=9&&s.back>0,y0=P.strip(ok?Y.DONE[2]:`Year ${s.yr} of 9. Food years: ${s.food}. Grown back: ${s.back}.`,ok?'ok':s.bad>=0?'no':'',K.note,K.bad);
 const cols=A.narrow?3:6,rows=6/cols,gp=8,w=(A.W-16-gp*(cols-1))/cols,h=Math.min((A.H-y0-10-gp*(rows-1))/rows,w*1.15);
 PATCH=s.p.map((q,i)=>({i,x:8+(i%cols)*(w+gp),y:y0+4+Math.floor(i/cols)*(h+gp),w,h}));
 const name={forest:'Forest',garden:'Garden',tired:'Tired soil',young:'Growing back'};PATCH.forEach(r=>{const q=s.p[r.i];P.card(r,name[q.k]+(q.k==='garden'?` (${q.a})`:''),{pic:q.k,n:13,no:s.bad===r.i,ok:q.k==='garden',dim:q.k==='tired'})})}
/* ---------- 4. rainforest peoples today ---------- */
let RF=[],TAG=null;
function putPeople(z){const m=K.mp,it=Y.PEOPLE[m.i];if(!it)return;m.drag=null;if(z!==it.z){m.bad=z;A.sound.miss();
  return tell(`The ${it.t} live in the ${Y.ZONES[it.z].split(',')[0]}. Each rainforest has its own peoples.`,true)}
 m.got.push(m.i);m.i++;m.bad=-1;A.sound.pop();tell(`Yes: the ${it.t} live in the ${Y.ZONES[z]} today.`,false)}
function drawMap(){const m=K.mp,it=Y.PEOPLE[m.i],y0=P.strip(it?`Where do the ${it.t} live today?`:Y.DONE[3],it?(m.bad>=0?'no':''):'ok',K.note,K.bad),g=A.ctx;
 const gp=8,bw=(A.W-16-gp*2)/3,bh=Math.min(A.H*.4,190),by=A.H-bh-8;
 RF=Y.ZONES.map((t,z)=>{const r={z,x:8+z*(bw+gp),y:by,w:bw,h:bh};const got=m.got.filter(i=>Y.PEOPLE[i].z===z).map(i=>Y.PEOPLE[i].t);P.card(r,got.length?`${Y.SHORT[z]}: ${got.join(', ')} ✓`:t,{pic:'forest',n:13,no:m.bad===z,ok:got.length>0});return r});
 g.strokeStyle=A.col.dark?'#fbbf24':'#b45309';g.lineWidth=2;g.setLineDash([8,6]);g.beginPath();g.moveTo(8,by-10);g.lineTo(A.W-8,by-10);g.stroke();g.setLineDash([]);
 g.font=`700 ${P.sz(13)}${P.F}`;g.fillStyle=P.fg();g.textAlign='right';g.textBaseline='bottom';g.fillText('equator: hot and wet',A.W-12,by-14);
 if(it){const w=Math.min(A.W*.44,210),h=Math.min(by-y0-36,90),d=m.drag;TAG={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+2,w,h};P.card(TAG,`The ${it.t}`,{n:20,sel:!!d})}else TAG=null}
/* ---------- 5. share the catch ---------- */
let HUNT=null,FAM=[],MEAT=[];
function give(f){const s=K.sh;if(s.left<=0)return;s.drag=null;
 if(f<0){s.bad=-2;A.sound.miss();return tell('A Yanomami hunter does not eat the meat he caught. He gives it all away. Other hunters share with him.',true)}
 if(s.fam[f]>=2){s.bad=f;A.sound.miss();return tell(`This family has ${s.fam[f]} pieces already. Give it to a family with less.`,true)}
 s.fam[f]++;s.left--;s.bad=-1;A.sound.pop();tell(`${s.left} left to share.`,false)}
function drawShare(){const s=K.sh,y0=P.strip(s.left>0?`Share the meat fairly: ${s.left} pieces left.`:Y.DONE[4],s.left>0?(s.bad!==-1?'no':''):'ok',K.note,K.bad);
 const hw=Math.min(A.W*.3,150),hh=Math.min(A.H*.32,150);HUNT={x:8,y:y0,w:hw,h:hh};P.card(HUNT,'Hunter',{pic:'hunter',n:14,no:s.bad===-2});
 const mw=Math.min((A.W-hw-30)/3,70),mh=mw*.7;MEAT=[];for(let i=0;i<s.left;i++){const r={x:hw+18+(i%3)*(mw+6),y:y0+8+Math.floor(i/3)*(mh+6),w:mw,h:mh};MEAT.push(r)}
 MEAT.forEach((r,i)=>{const d=s.drag&&i===MEAT.length-1?s.drag:null;P.card(d?{x:d.x-mw/2,y:d.y-mh/2,w:mw,h:mh}:r,'',{pic:'meat',sel:!!d})});
 const gp=8,fw=(A.W-16-gp*2)/3,fh=Math.min(A.H-y0-hh-18,170),fy=A.H-fh-8;
 FAM=[0,1,2].map(f=>{const r={f,x:8+f*(fw+gp),y:fy,w:fw,h:fh};P.card(r,`Family ${f+1}: ${s.fam[f]}`,{pic:'family',n:14,no:s.bad===f,ok:s.fam[f]===2});return r})}
/* ---------- wiring ---------- */
function draw(){ground();const m=now();if(m==='quiz'){P.strip('Challenge: rainforest peoples','ok');const s=Math.min(A.W*.36,A.H*.55);Y.icon(A.ctx,'house',A.W*.3,A.H*.6,s);Y.icon(A.ctx,'forest',A.W*.72,A.H*.6,s);return}
 ({build:drawBuild,food:drawFood,grow:drawGrow,map:drawMap,share:drawShare})[m]();A.fx.draw(A.ctx)}
function grab(p){const m=now();
 if(m==='build'){const r=PC.find(r=>inside(p,r));if(r){K.bu.drag={j:r.j,x:p.x,y:p.y,sx:p.x,sy:p.y};return true}return false}
 if(m==='food'){if(HELD&&inside(p,HELD)){K.fo.drag={x:p.x,y:p.y};return true}const r=BOX.find(r=>inside(p,r));if(r)sortFood(r.z);return false}
 if(m==='grow'){const r=PATCH.find(r=>inside(p,r));if(r)tapPatch(r.i);return false}
 if(m==='map'){if(TAG&&inside(p,TAG)){K.mp.drag={x:p.x,y:p.y};return true}const r=RF.find(r=>inside(p,r));if(r)putPeople(r.z);return false}
 if(m==='share'){if(MEAT.some(r=>inside(p,r))){K.sh.drag={x:p.x,y:p.y,sx:p.x,sy:p.y};return true}return false}return false}
function slide(p){const m=now(),d=({build:K.bu,food:K.fo,map:K.mp,share:K.sh}[m]||{}).drag;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function drop(p){const m=now();
 if(m==='build'&&K.bu.drag){const d=K.bu.drag;K.bu.drag=null;if(Math.hypot(p.x-d.sx,p.y-d.sy)<=12||inside(p,SITE))addPart(d.j);else{A.redraw();tell('Drop the part on the house.',false)}}
 if(m==='food'&&K.fo.drag){K.fo.drag=null;const r=BOX.find(r=>inside(p,r));if(r)sortFood(r.z);else{A.redraw();tell('Drop the food in a box.',false)}}
 if(m==='map'&&K.mp.drag){K.mp.drag=null;const r=RF.find(r=>inside(p,r));if(r)putPeople(r.z);else{A.redraw();tell('Drop the name on a rainforest.',false)}}
 if(m==='share'&&K.sh.drag){const d=K.sh.drag;K.sh.drag=null;const r=FAM.find(r=>inside(p,r));if(r)give(r.f);else if(inside(p,HUNT))give(-1);else{A.redraw();tell('Drop the meat on a family.',false)}}}
function fresh(){run++;for(const k in K)delete K[k];Object.assign(K,{bu:{done:0,used:[],bad:-1,drag:null},fo:{i:0,n:[0,0,0],bad:-1,drag:null},
 gr:{yr:0,food:0,back:0,bad:-1,p:[0,1,2,3,4,5].map(()=>({k:'forest',a:0}))},mp:{i:0,got:[],bad:-1,drag:null},sh:{left:6,fam:[0,0,0],bad:-1,drag:null},note:null,bad:false,test:()=>{}})}
function tell(t,bad){K.note=t;K.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.test()}
const check=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(Y.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();c.say(Y.DESC[i]);A.cv.setAttribute('aria-label',Y.DESC[i]);K.test=check(i,ok);controls();A.redraw()}
function demo(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!pad)return;pad.innerHTML='';const m=now(),Bn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='build'&&K.bu.done<3)Y.PARTS.forEach((it,j)=>{if(!K.bu.used.includes(j))Bn(it.t,()=>addPart(j),`Add to the house: ${it.t}`)});
 if(m==='food'&&Y.FOOD[K.fo.i]){const it=Y.FOOD[K.fo.i];Y.BINS.forEach((t,z)=>Bn(t,()=>sortFood(z),`${it.t}: ${t}`))}
 if(m==='grow'&&K.gr.yr<9){Bn('Next year',nextYear,'Next year');K.gr.p.forEach((q,i)=>{if(q.k==='forest')Bn(`Garden in patch ${i+1}`,()=>tapPatch(i),`Make a garden in forest patch ${i+1}`)})}
 if(m==='map'&&Y.PEOPLE[K.mp.i]){const it=Y.PEOPLE[K.mp.i];Y.ZONES.forEach((t,z)=>Bn(t.split(',')[0],()=>putPeople(z),`The ${it.t} live in the ${t}`))}
 if(m==='share'&&K.sh.left>0){[0,1,2].forEach(f=>Bn(`Family ${f+1}`,()=>give(f),`Give a piece of meat to family ${f+1}`));Bn('Keep it for the hunter',()=>give(-1),'Keep a piece for the hunter')}}
const steps=[
{h:'Build a round house',p:Y.TXT[0],predict:{q:'Where do the Yanomami get what they need to build their house?',opts:['From a shop in a city','From the forest around them'],ans:1},task:'Build the house with 3 parts',
 show:()=>demo(0,[0,2,4].map(j=>[520,()=>addPart(j)])),go:()=>begin(0,()=>K.bu.done>=3)},
{h:'Where does the food come from?',p:Y.TXT[1],predict:{q:'Do the Yanomami get most of their food by hunting?',opts:['Yes, mostly hunting','No, mostly from their gardens'],ans:1},task:'Sort all 6 foods',
 show:()=>demo(1,Y.FOOD.map(it=>[440,()=>sortFood(it.z)])),go:()=>begin(1,()=>K.fo.i>=Y.FOOD.length)},
{h:'A garden that moves',p:Y.TXT[2],predict:{q:'The garden soil gets tired. What do they do?',opts:['Cut down all the forest','Make a new small garden; the old one grows back'],ans:1},task:'Grow food for 9 years',
 show:()=>demo(2,[[300,()=>tapPatch(0)],[380,nextYear],[380,nextYear],[380,nextYear],[380,()=>tapPatch(1)],[380,nextYear],[380,nextYear],[380,nextYear],[380,()=>tapPatch(2)],[380,nextYear],[380,nextYear],[380,nextYear]]),go:()=>begin(2,()=>K.gr.yr>=9&&K.gr.back>0)},
{h:'Rainforest peoples today',p:Y.TXT[3],predict:{q:'Do people still live in rainforests today?',opts:['No, only long ago','Yes, many peoples do'],ans:1},task:'Put all 3 peoples on their rainforest',
 show:()=>demo(3,Y.PEOPLE.map(it=>[520,()=>putPeople(it.z)])),go:()=>begin(3,()=>K.mp.i>=Y.PEOPLE.length)},
{h:'Share the catch',p:Y.TXT[4],task:'Share all 6 pieces fairly',
 show:()=>demo(4,[0,1,2,0,1,2].map(f=>[400,()=>give(f)])),go:()=>begin(4,()=>K.sh.left<=0)},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.test()});
function slip(t){let m='The forest gives the Yanomami their homes, food and medicine, and they look after it.';
 if(t==='shop')m='Not from a shop. The house, food and medicine come from the forest and the gardens around it.';
 if(t==='hunt')m='Hunting gives only a small part of the food. Most food is grown in their gardens.';
 if(t==='cut')m='They make one small new garden. The old garden grows back into forest.';
 if(t==='past')m='Not just long ago. The Yanomami and many other peoples live in rainforests today, and know them very well.';
 if(t==='one')m='Many peoples live in rainforests: the Yanomami, the Baka, the Penan and many more.';
 if(t==='keep')m='A Yanomami hunter does not eat his own catch. He shares it, and other hunters share with him.';
 return m}
function quiz(){qk++;const Q=Y.QS[qk%Y.QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function score(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{qz.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;P=Y.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Rainforest peoples lab buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:grab,move:slide,up:drop});controls()}}).start()})})();
