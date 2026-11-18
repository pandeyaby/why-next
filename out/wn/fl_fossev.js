/* Flagship: fossils as evidence (ages 8–11; NGSS 3-LS4-1; NC England Y6 evolution and inheritance). Layers by age,
   fossils to habitats, a seabed lifted into a mountain, horse feet, a cliff story. Drawings: fossil_art.js. */
(()=>{
const HAB=[{k:'sea',t:'Warm, shallow sea'},{k:'swamp',t:'Warm, wet swamp forest'},{k:'ice',t:'Cold, icy grassland'}];
const FOS=[{k:'coral',t:'Coral',h:'sea'},{k:'fern',t:'Fern leaf',h:'swamp'},{k:'tooth',t:'Mammoth tooth',h:'ice'}];
const MISS={coral:'Coral only grows in warm, shallow sea. Coral in rock means that place was once a warm sea.',
 fernsea:'Ferns are land plants. They grow on warm, wet ground like a swamp, not under the sea.',
 fernice:'Ferns like these need warm, wet ground. A frozen grassland is too cold and dry.',
 toothsea:'Mammoths walked on land and ate grass, so the tooth points to a grassland, not the sea.',
 toothswamp:'Woolly mammoths had thick fur to keep warm. They lived on cold, icy grasslands in the Ice Age.'};
const HORSE=[{n:4,t:'about 50 million years ago',s:'4 toes'},{n:3,t:'about 35 million years ago',s:'3 toes'},{n:1,t:'about 4 million years ago',s:'1 toe: a hoof'}];
const CLIFF=[{f:'coral',t:'coral'},{f:'fern',t:'ferns'},{f:'print',t:'lizard footprints in sand dunes'}];
const STORY=[{s:'Sea, then swamp forest, then desert',tag:'ok'},{s:'Desert, then swamp forest, then sea',tag:'topDown'},{s:'All three at the same time',tag:'sameTime'}];
VIS.reg('flagfossev',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',EDGE='#94a3b8',WHITE='#ffffff',GOOD='#047857',BAD='#b91c1c',NAVY='#1e3a8a',NOTE='#eef2ff',WON='#dcfce7',SEA='#bae6fd',PICK='#fde68a';
const ROCK=['#f5deb3','#ead0a0','#dcb98a','#cfa77a'],DUG='#fff7ed';
const MODE=['layers','match','lift','horse','cliff','chal'],mode=()=>MODE[A.step];
const z=n=>Math.round(n*(A.narrow?1:1.1)),font=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function txt(s,x,y,n,col,al){Z.font=font(n);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-14)}
function wrap(s,max,n){Z.font=font(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(r,fill,edge,lw,rad){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,rad==null?9:rad);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function boxText(r,s,n,col){const L=wrap(s,r.w-12,n),lh=z(n)+4;L.forEach((l,i)=>txt(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
function banner(s,ok){const r={x:10,y:8,w:A.W-20,h:A.H*(A.narrow?.1:.12)};box(r,ok?WON:NOTE,ok?GOOD:NAVY,2);boxText(r,s,13,ok?GOOD:INK)}
function note(){if(!S.msg)return;const L=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-6;box({x:10,y,w:A.W-20,h},WHITE,S.bad?BAD:GOOD,3);L.forEach((l,i)=>txt(l,A.W/2,y+5+lh*(i+.5),13))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const wrong=s=>{S.bad=true;S.msg=s;A.sound.miss();refresh()};
const right=s=>{S.bad=false;S.msg=s;A.sound.pop()};
const icon=(k,x,y,r)=>FOSART.icon(Z,k,x,y,r),foot=(n,x,y,r)=>FOSART.foot(Z,n,x,y,r);
/* scene area: a cliff of n layers, bottom = oldest */
function scene(){return A.narrow?{x:14,y:A.H*.13,w:A.W-28,h:A.H*.5}:{x:16,y:A.H*.17,w:A.W*.58,h:A.H*.6}}
function layerR(i,n){const s=scene(),h=s.h/n;return{x:s.x,y:s.y+(n-1-i)*h,w:s.w,h:h-2}}
function side(lines){const s=scene();let r;if(A.narrow)r={x:14,y:s.y+s.h+8,w:A.W-28,h:z(20)*lines.length+10};else r={x:A.W*.63,y:A.H*.17,w:A.W*.34,h:z(20)*lines.length+10};
 box(r,'#f8fafc',EDGE,2);lines.forEach((t,i)=>txt(t,r.x+r.w/2,r.y+5+z(20)*(i+.5),12,INK));return r}
/* step 1: order layers */
const LAY=['shell','coral','fern','print'];
function drawLayers(){const ok=S.order.length===4;banner(ok?'Bottom layer first: each layer settled on top of an older one.':'Tap the layers, oldest to youngest.',ok);
 for(let i=0;i<4;i++){const r=layerR(i,4),k=S.order.indexOf(i);box(r,ROCK[3-i],INK,2,4);icon(LAY[i],r.x+r.w*.78,r.y+r.h/2,Math.min(r.h*.36,z(18)));txt('Layer '+'DCBA'[i],r.x+z(44),r.y+r.h/2,13);
  if(k>=0){Z.fillStyle=NAVY;Z.beginPath();Z.arc(r.x+r.w*.45,r.y+r.h/2,z(14),0,7);Z.fill();txt(k+1,r.x+r.w*.45,r.y+r.h/2,13,WHITE)}}
 side(['Order so far: '+(S.order.map(i=>'DCBA'[i]).join(' → ')||'none'),'1 = oldest, 4 = youngest'])}
function tapLayer(i){if(S.order.includes(i))return;const want=S.order.length;A.sound.tick();
 if(i!==want){S.order=[];return wrong(want===0&&i===3?'The top layer was laid last. Mud and sand settle on top of older layers, so start at the bottom.':`Go up one layer at a time. The next oldest is the layer just above layer ${'DCBA'[want-1]||'D'}.`)}
 S.order.push(i);if(S.order.length===4)right('D, C, B, A. The deeper a layer, the longer ago it was laid down, so its fossils are older.');else{S.bad=false;S.msg=''}refresh()}
/* step 2: match fossils to habitats */
const fosR=j=>{if(A.narrow){const w=(A.W-40)/3;return{x:14+j*(w+6),y:A.H*.14,w,h:A.H*.2}}return{x:16,y:A.H*.18+j*A.H*.2,w:A.W*.3,h:A.H*.17}};
const habR=j=>{if(A.narrow){return{x:14,y:A.H*.39+j*A.H*.115,w:A.W-28,h:A.H*.1}}return{x:A.W*.42,y:A.H*.18+j*A.H*.2,w:A.W*.55,h:A.H*.17}};
function drawMatch(){const ok=S.placed.length===3;banner(ok?'Each fossil shows the place where it lived.':'Tap a fossil, then the place where it lived.',ok);
 FOS.forEach((f,j)=>{const r=fosR(j),done=S.placed.includes(f.k);box(r,done?WON:S.sel===f.k?PICK:WHITE,S.sel===f.k?NAVY:EDGE,S.sel===f.k?3.5:2);icon(f.k,r.x+r.w/2,r.y+r.h*.4,Math.min(r.h*.26,z(16)));txt(f.t,r.x+r.w/2,r.y+r.h*.84,12)});
 HAB.forEach((h,j)=>{const r=habR(j);box(r,j===0?SEA:j===1?'#d9f99d':'#e0f2fe',INK,2);const got=FOS.filter(f=>S.placed.includes(f.k)&&f.h===h.k).map(f=>f.t);txt(h.t+(got.length?': '+got.join(', '):''),r.x+r.w/2,r.y+r.h/2,12)})}
function pickFos(k){if(S.placed.includes(k))return;S.sel=k;A.sound.tick();S.bad=false;S.msg='';refresh()}
function putHab(h){if(!S.sel){S.bad=false;S.msg='Tap a fossil first.';return refresh()}const f=FOS.find(x=>x.k===S.sel);
 if(f.h!==h){const key=f.k==='coral'?'coral':f.k+h;S.sel=null;return wrong(MISS[key])}
 S.placed.push(f.k);S.sel=null;right({coral:'Coral: a warm, shallow sea.',fern:'Fern: warm, wet land.',tooth:'Mammoth tooth: a cold grassland in the Ice Age.'}[f.k]);refresh()}
/* step 3: seabed lifted into a mountain, t = 0..5 lots of 10 million years */
const TMAX=5;function trk(){const s=scene();return A.narrow?{x1:A.W*.12,x2:A.W*.88,y:s.y+s.h+z(30)}:{x1:A.W*.64,x2:A.W*.94,y:A.H*.5}}
function drawLift(){const s=scene(),t=S.t/TMAX,ok=S.t===TMAX;banner(ok?'The fossils formed in a seabed. Over 50 million years that seabed was pushed up.':'Drag the knob to push the seabed up, 10 million years at a time.',ok);
 const sea=s.y+s.h*.45,base=s.y+s.h;Z.fillStyle='#e0f2fe';Z.fillRect(s.x,s.y,s.w,s.h);Z.fillStyle=SEA;Z.fillRect(s.x,sea,s.w,base-sea);
 const peak=base-(s.h*.3+t*s.h*.65),shoulder=base-s.h*.3,xm=s.x+s.w/2;
 const P=[[s.x,base],[s.x,shoulder],[xm,peak],[s.x+s.w,shoulder],[s.x+s.w,base]];Z.fillStyle='#d6d3d1';Z.strokeStyle=INK;Z.lineWidth=2;Z.beginPath();P.forEach(([x,y],i)=>i?Z.lineTo(x,y):Z.moveTo(x,y));Z.closePath();Z.fill();Z.stroke();txt('sea level',s.x+z(34),sea-z(9),11,NAVY);
 if(t>.6){Z.fillStyle=WHITE;Z.beginPath();Z.moveTo(xm,peak);Z.lineTo(xm-s.w*.06,peak+s.h*.07);Z.lineTo(xm+s.w*.06,peak+s.h*.07);Z.closePath();Z.fill();Z.stroke()}
 for(let k=1;k<6;k++){const u=k/6,x=s.x+u*s.w,yTop=u<.5?shoulder+(peak-shoulder)*(u/.5):peak+(shoulder-peak)*((u-.5)/.5);icon('shell',x,yTop+z(16)+(k===3?s.h*.06:0),z(8))}
 const T=trk();Z.strokeStyle=EDGE;Z.lineWidth=6;Z.lineCap='round';Z.beginPath();Z.moveTo(T.x1,T.y);Z.lineTo(T.x2,T.y);Z.stroke();Z.lineCap='butt';
 const kx=T.x1+(T.x2-T.x1)*t;Z.fillStyle='#b45309';Z.beginPath();Z.arc(kx,T.y,z(13),0,7);Z.fill();Z.strokeStyle=WHITE;Z.lineWidth=3;Z.stroke();txt(`${S.t*10} million years`,(T.x1+T.x2)/2,T.y-z(22),12);
 if(!A.narrow)side(['Shells: in the seabed at first',ok?'Now near the top':'Where will they end up?'])}
function setT(v){S.t=Math.max(0,Math.min(TMAX,v));A.sound.tick();if(S.t===TMAX)right('Fossils show where a rock formed, not where it is now. The top of Mount Everest is old seabed rock with sea fossils in it.');else{S.bad=false;S.msg=''}refresh()}
/* step 4: dig horse feet, layer 0 = oldest (bottom) */
function drawHorse(){const ok=S.dug.length===3;banner(ok?'Over millions of years horse feet changed: 4 toes, then 3, then 1 hoof.':'Tap each layer to dig up a horse foot fossil.',ok);
 for(let i=0;i<3;i++){const r=layerR(i,3),d=S.dug.includes(i);box(r,d?DUG:ROCK[2-i],INK,2,4);txt(HORSE[i].t,r.x+r.w*.35,r.y+r.h*.35,12);
  if(d){foot(HORSE[i].n,r.x+r.w*.8,r.y+r.h*.55,Math.min(r.h*.4,z(30)));txt(HORSE[i].s,r.x+r.w*.35,r.y+r.h*.68,13,NAVY)}else txt('tap to dig',r.x+r.w*.35,r.y+r.h*.68,12,SOFT)}
 side(['Horse today: 1 toe, a hoof','Dug up: '+S.dug.length+' of 3'])}
function dig(i){if(S.dug.includes(i))return;S.dug.push(i);A.sound.tick();const n=S.dug.length;
 if(n===3)right('Oldest, deepest: 4 toes. Middle: 3. Youngest: 1 hoof, like today. The change took millions of years.');else{S.bad=false;S.msg=`${HORSE[i].t}: ${HORSE[i].s}.`}refresh()}
/* step 5: read a cliff, then pick the story */
const storyR=j=>A.narrow?{x:14,y:A.H*.52+j*A.H*.085,w:A.W-28,h:A.H*.075}:{x:A.W*.63,y:A.H*.17+j*A.H*.2,w:A.W*.34,h:A.H*.17};
function drawCliff(){const ok=S.story;banner(ok?'Read a cliff from the bottom up: sea, then swamp forest, then desert.':'Which story does this cliff tell? Tap it.',ok);
 const s=A.narrow?{x:14,y:A.H*.13,w:A.W-28,h:A.H*.37}:scene();for(let i=0;i<3;i++){const h=s.h/3,r={x:s.x,y:s.y+(2-i)*h,w:s.w,h:h-2};box(r,ROCK[3-i],INK,2,4);icon(CLIFF[i].f,r.x+r.w*.18,r.y+r.h/2,Math.min(r.h*.32,z(16)));txt(CLIFF[i].t,r.x+r.w*.6,r.y+r.h/2,12)}
 STORY.forEach((t,j)=>{const r=storyR(j);box(r,S.story&&t.tag==='ok'?WON:S.miss===j?'#fee2e2':WHITE,S.miss===j?BAD:EDGE,2);boxText(r,'ABC'[j]+'. '+t.s,12)})}
function pickStory(j){const t=STORY[j];A.sound.tick();if(t.tag==='ok'){S.story=true;S.miss=null;right('Yes. The coral at the bottom came first: a warm sea. Then ferns, and the sand dunes are youngest.');return refresh()}
 S.miss=j;wrong(t.tag==='topDown'?'That reads the cliff from the top down. The bottom layer is the oldest, so the story starts with the coral sea.':'The layers were laid one on top of another, so they come from different times. The deepest layer is the oldest.')}
/* pointer */
function down(p){const m=mode();
 if(m==='layers'){for(let i=0;i<4;i++)if(inR(p,layerR(i,4))){tapLayer(i);return true}return false}
 if(m==='match'){const j=[0,1,2].find(j=>inR(p,fosR(j)));if(j!=null){pickFos(FOS[j].k);return true}const h=[0,1,2].find(j=>inR(p,habR(j)));if(h!=null){putHab(HAB[h].k);return true}return false}
 if(m==='lift'){const T=trk();if(Math.abs(p.y-T.y)<z(26)&&p.x>T.x1-z(26)&&p.x<T.x2+z(26)){S.drag=true;move(p);return true}return false}
 if(m==='horse'){for(let i=0;i<3;i++)if(inR(p,layerR(i,3))){dig(i);return true}return false}
 if(m==='cliff'){const j=[0,1,2].find(j=>inR(p,storyR(j)));if(j!=null){pickStory(j);return true}}return false}
function move(p){if(!S.drag)return;const T=trk(),v=Math.round((p.x-T.x1)/(T.x2-T.x1)*TMAX),nv=Math.max(0,Math.min(TMAX,v));if(nv!==S.t){S.t=nv;A.sound.tick();S.msg='';A.redraw()}}
function up(){if(!S.drag)return;S.drag=false;setT(S.t)}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='layers')drawLayers();if(m==='match')drawMatch();if(m==='lift')drawLift();if(m==='horse')drawHorse();if(m==='cliff')drawCliff();
 if(m==='chal'){banner('Fossils tell you what lived, where it lived and when. Lower layers are older.');for(let i=0;i<3;i++){const r=layerR(i,3);box(r,ROCK[3-i],INK,2,4);icon(['shell','fern','tooth'][i],r.x+r.w/2,r.y+r.h/2,Math.min(r.h*.3,z(16)))}}
 note();A.fx.draw(Z)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='layers')s=`Cliff with 4 layers: D at the bottom with a shell fossil, C with coral, B with a fern, A at the top with a footprint. Tapped so far: ${S.order.map(i=>'DCBA'[i]).join(', ')||'none'}.`;
 if(m==='match')s=`Fossils: coral, fern leaf, mammoth tooth. Places: warm shallow sea, warm wet swamp forest, cold icy grassland. Matched: ${S.placed.join(', ')||'none'}.${S.sel?' Picked: '+S.sel+'.':''}`;
 if(m==='lift')s=`${S.t*10} million years. The seabed with shell fossils is ${S.t===0?'under the sea':S.t===TMAX?'now a high mountain, with the shells near the top':'rising above the sea'}.`;
 if(m==='horse')s=`Three layers. Dug up: ${S.dug.map(i=>HORSE[i].t+', '+HORSE[i].s).join('; ')||'none'}.`;
 if(m==='cliff')s='Cliff from bottom to top: coral, ferns, lizard footprints in sand dunes. Stories: '+STORY.map((t,j)=>'ABC'[j]+': '+t.s).join('. ')+'.';
 tell((S.msg?S.msg+' ':'')+s);buttons();S.then()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='layers')for(let i=3;i>=0;i--)b('Layer '+'DCBA'[i],()=>tapLayer(i),`Tap layer ${'DCBA'[i]}`);
 if(m==='match'){FOS.forEach(f=>b(f.t,()=>pickFos(f.k),'Pick the '+f.t));HAB.forEach(h=>b('→ '+h.t,()=>putHab(h.k),'Put it in: '+h.t))}
 if(m==='lift'){b('− 10 million years',()=>setT(S.t-1),'Go back 10 million years');b('+ 10 million years',()=>setT(S.t+1),'Go forward 10 million years')}
 if(m==='horse')for(let i=0;i<3;i++)b('Dig '+['bottom','middle','top'][i]+' layer',()=>dig(i));
 if(m==='cliff')['A','B','C'].forEach((t,j)=>b('Story '+t,()=>pickStory(j)));
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const fresh=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},order:[],placed:[],sel:null,t:0,drag:false,dug:[],story:false,miss:null,msg:'',bad:false})};
const steps=[
{h:'Oldest at the bottom',p:'Rock forms in layers. Mud and sand settle, then more settles on top, again and again, over millions of years.',
predict:{q:'Which layer of a cliff is the oldest?',opts:['The bottom layer','The top layer','They are all the same age'],ans:0},
task:'Tap the layers, oldest first',show:()=>{steps[0].go();play([0,1,2,3].map(i=>()=>tapLayer(i)),380)},go:()=>{fresh();refresh();S.then=finish(0,()=>S.order.length===4,'Lower layers are older.')}},
{h:'Where did it live?',p:'A fossil is the remains or trace of a living thing. It tells you what that place was like when the living thing was alive.',
task:'Match 3 fossils',show:()=>{steps[1].go();play(FOS.flatMap(f=>[()=>pickFos(f.k),()=>putHab(f.h)]),330)},go:()=>{fresh();refresh();S.then=finish(1,()=>S.placed.length===3,'Coral sea, fern swamp, mammoth grassland.')}},
{h:'Shells on a mountain',p:'Climbers find fossil sea shells in the rock near the top of Mount Everest.',
predict:{q:'Why are there sea fossils so high up?',opts:['The seabed was pushed up into a mountain','A huge flood carried them up there','Sea animals once lived on mountains'],ans:0},
task:'Push the seabed up for 50 million years',show:()=>{steps[2].go();play([1,2,3,4,5].map(v=>()=>setT(v)),300)},go:()=>{fresh();refresh();S.then=finish(2,()=>S.t===TMAX,'The rock moved, not the shells.')}},
{h:'Horses changed',p:'Horse fossils are found in layers of different ages. Compare their feet with a horse today.',
predict:{q:'Today\'s horse has 1 toe, a hoof. What do the oldest horse fossils have?',opts:['4 toes','1 hoof, the same as today','No toes at all'],ans:0},
task:'Dig up all 3 feet',show:()=>{steps[3].go();play([0,1,2].map(i=>()=>dig(i)),380)},go:()=>{fresh();refresh();S.then=finish(3,()=>S.dug.length===3,'Living things change over a very long time.')}},
{h:'Read a cliff',p:'Put it together: what lived in each layer, and which layer came first.',
task:'Pick the story the cliff tells',show:()=>{steps[4].go();play([()=>pickStory(0)],400)},go:()=>{fresh();refresh();S.then=finish(4,()=>S.story,'Bottom up: sea, swamp, desert.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['A rock layer is full of fossil fish and sea shells. What was this place like when the rock formed?','A sea',[['A hot desert','desert'],['A snowy mountain','nowLooks']]],
['Layer X lies under layer Y. Neither has been tipped over. Which layer is older?','Layer X',[['Layer Y','topOld'],['They are the same age','sameAge']]],
['Fossil sea shells are found high up on a mountain. Why?','The seabed was pushed up',[['A flood left them there','flood'],['Shellfish lived on the mountain','livedHigh']]],
['Fossil coral is found in rock in England. What does it tell you?','England was once under a warm sea',[['Coral can grow on dry land','coralLand'],['England is warm and sunny today','today']]],
['Old horse fossils have 4 toes. Horses today have 1 hoof. What does this show?','Horses changed over a very long time',[['Each horse wore its toes away by running','wornAway'],['The fossils are not real','notReal']]],
['Fossil leaves of trees are found in rock in icy Antarctica. What can you work out?','It was once warm enough for trees',[['Trees grow well on ice','treeIce'],['The leaves grew there last summer','recent']]]];
function why(tag){let m='Ask what the living thing needed, and remember that lower layers are older.';
 if(tag==='desert')m='Fish and shellfish need sea water, so the rock formed under the sea.';
 if(tag==='nowLooks')m='Fossils show where the rock formed, not where it is now: in a sea.';
 if(tag==='topOld')m='Layers pile up on older ones, so Y on top was laid later. X is older.';
 if(tag==='sameAge')m='One layer settled on the other, at different times. The lower one, X, is older.';
 if(tag==='flood')m='A flood does not put shells inside solid rock. The seabed rock was slowly pushed up.';
 if(tag==='livedHigh')m='Shellfish need sea water. Their seabed rock was pushed up over millions of years.';
 if(tag==='coralLand')m=MISS.coral;
 if(tag==='today')m='The fossil tells you about long ago, not today: England was once under a warm sea.';
 if(tag==='wornAway')m='One horse cannot change its toes in its life. The change took many generations.';
 if(tag==='notReal')m='Fossils are real remains, dated by their layers. They show horses changed over time.';
 if(tag==='treeIce')m='Trees cannot grow on ice. Leaf fossils mean Antarctica once had forests.';
 if(tag==='recent')m='Fossils take a very long time to form. These forests grew long, long ago.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+qq);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;Z=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Fossil lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
