/* Flagship – telling sounds apart (ages 2–3; Letters and Sounds Phase 1, Aspect 1 "general sound discrimination:
   environmental sounds" and Aspect 2 "instrumental sounds"; Development Matters birth–3 "listen and respond to a simple
   instruction", 3–4 "develop phonological awareness"; EYFS ELG Listening, Attention and Understanding). An ear lab, not a
   letter lab: guess who made a sound while the picture hides behind a curtain, match shakers by sound when their colours
   lie, judge whether two sounds are the same or different, sort loud from quiet when size is the trap, and find what made
   each sound on a walk round the house. Not flagsense (five senses), flaglisten (listen and respond) or flagallit
   (first sounds in words). Data in learn/ears_art.js. */
(()=>{const {PIC,NAME,SAYS,SHUT,SHUTNO,FILL,SHAKE,PAIRS,PWHY,LOUD,LWHY,HOME,WALK,QS}=EARS;
VIS.reg('flagears',c=>{let A,pads,quizBox,qi=-1,epoch=0;const M={};c.fig.classList.add('young');
const TXT='#1f2937',YES='#047857',OOPS='#b91c1c',RIM='#6b7280',HI='#7c3aed',FF='px system-ui,sans-serif';
const phase=()=>['shut','shake','same','loud','walk','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.15);
let ac=null;
function hum(kind){/* tiny synthetic instrument sounds, only after a real tap */try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();const t0=ac.currentTime;
 if(kind==='bells'){[1760,2350].forEach((f,j)=>{const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.setValueAtTime(.05,t0+j*.09);g.gain.exponentialRampToValueAtTime(.0001,t0+j*.09+.5);o.connect(g).connect(ac.destination);o.start(t0+j*.09);o.stop(t0+j*.09+.55)});return}
 const len=Math.round(ac.sampleRate*.5),buf=ac.createBuffer(1,len,ac.sampleRate),d=buf.getChannelData(0),hits=kind==='rice'?6:3;
 for(let i=0;i<len;i++){const ph=(i/len*hits)%1;d[i]=(Math.random()*2-1)*Math.exp(-ph*(kind==='rice'?9:22))*(kind==='rice'?.35:.8)}
 const src=ac.createBufferSource(),flt=ac.createBiquadFilter();flt.type=kind==='rice'?'highpass':'bandpass';flt.frequency.value=kind==='rice'?4000:900;src.buffer=buf;src.connect(flt).connect(ac.destination);src.start()}catch(e){}}
function speak(w,live){if(!live)return;try{const s=window.speechSynthesis;if(s&&window.SpeechSynthesisUtterance){s.cancel();const u=new SpeechSynthesisUtterance(w);u.rate=.8;s.speak(u)}}catch(e){}}
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.08:.55);g.fillRect(0,0,A.W,A.H)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||14);g.font=`800 ${n}${FF}`;let w=g.measureText(t).width+26;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${FF}`;w=g.measureText(t).width+26}
 const h=n+16,lx=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(lx,y-h/2,w,h,9);g.fill();g.lineWidth=o.yes?3:1.5;g.strokeStyle=o.yes?YES:RIM;g.stroke();
 g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(t,lx+w/2,y+1)}
function pad(r,emo,word,o){o=o||{};const g=A.ctx;g.fillStyle=o.off?'#e5e7eb':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();
 g.lineWidth=o.yes||o.no||o.sel?4:2;g.strokeStyle=o.yes?YES:o.no?OOPS:o.sel?HI:RIM;g.stroke();g.textAlign='center';g.textBaseline='middle';
 if(emo){g.font=`${Math.round(Math.min(r.h*.42,r.w*.48))}${FF}`;g.fillStyle='#000';g.fillText(emo,r.x+r.w/2,r.y+r.h*(word?.4:.5))}
 if(word){g.font=`800 ${Math.round(Math.max(12,Math.min(fs(16),r.h*.17)))}${FF}`;g.fillStyle=TXT;g.fillText(word,r.x+r.w/2,r.y+r.h*(emo?.83:.5),r.w-10)}
 if(o.yes||o.no){g.fillStyle=o.yes?YES:OOPS;g.beginPath();g.arc(r.x+r.w-14,r.y+14,12,0,7);g.fill();g.fillStyle='#ffffff';g.font=`900 14${FF}`;g.fillText(o.yes?'✓':'✗',r.x+r.w-14,r.y+15)}}
function cells(n,cols,y0,y1,maxw){const gap=12,rows=Math.ceil(n/cols),w=Math.min(maxw||150,(A.W-gap*(cols+1))/cols),h=Math.min(w,(y1-y0-gap*(rows-1))/rows),x0=(A.W-(w*cols+gap*(cols-1)))/2;
 return Array.from({length:n},(_,i)=>({i,x:x0+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}))}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1. eyes shut: the curtain hides who made the sound */
const curtainR=()=>{const h=A.H*.3,w=Math.min(A.W*.6,260);return{x:(A.W-w)/2,y:A.H*.13,w,h}};
const shutCells=()=>cells(3,3,A.H*.52,A.H*.96);
function drawShut(){const s=M.a,g=A.ctx;ground();
 if(s.k>=SHUT.length){tag('All 5 found by ear',A.W/2,A.H*.08,{yes:1});cells(5,5,A.H*.3,A.H*.7,110).forEach((r,j)=>pad(r,PIC[SHUT[j][0]],NAME[SHUT[j][0]],{yes:1}));return}
 const [who,opts]=SHUT[s.k];tag(`Sound ${s.k+1} of 5: who made it?`,A.W/2,A.H*.06,{n:13});const r=curtainR();
 g.fillStyle=A.col.dark?'#7f1d1d':'#fecaca';A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.lineWidth=2;g.strokeStyle=RIM;g.stroke();
 g.strokeStyle=A.col.dark?'#fca5a5':'#b91c1c';g.lineWidth=2;for(let x=r.x+18;x<r.x+r.w-8;x+=22){g.beginPath();g.moveTo(x,r.y+6);g.lineTo(x,r.y+r.h-6);g.stroke()}
 tag('🔊 '+SAYS[who]+'!',A.W/2,r.y+r.h/2,{n:17});
 shutCells().forEach(q=>pad(q,PIC[opts[q.i]],NAME[opts[q.i]],{no:s.bad===q.i}))}
function shutPick(i,live){const s=M.a;if(s.k>=SHUT.length)return;const [who,opts]=SHUT[s.k],w=opts[i];speak(SAYS[who],live);
 if(w!==who){s.bad=i;A.sound.miss();return say(`${SHUTNO[w]} Listen again: ${SAYS[who]}.`)}
 s.k++;s.bad=-1;A.sound.pop();say(`Yes! ${SAYS[who]} is a ${NAME[who]}. The curtain opens: it was the ${NAME[who]}.`+(s.k>=SHUT.length?' You found all 5 without looking.':''))}
/* 2. shakers: match by sound, not colour */
const shakeCells=()=>cells(6,3,A.H*.14,A.H*.96,140);
function drawShake(){const s=M.b,g=A.ctx;ground();
 tag(s.got.length>=6?'3 pairs: same sound inside':`Pairs found: ${s.got.length/2} of 3. Shake two to compare`,A.W/2,A.H*.06,{n:13,yes:s.got.length>=6});
 shakeCells().forEach(r=>{const [cn,hex,fill]=SHAKE[r.i],done=s.got.includes(r.i),sel=s.open.includes(r.i);
  g.fillStyle=done?'#e5e7eb':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();g.lineWidth=sel||s.bad.includes(r.i)||done?4:2;g.strokeStyle=done?YES:s.bad.includes(r.i)?OOPS:sel?HI:RIM;g.stroke();
  const cw=r.w*.34,chh=r.h*.5,cx=r.x+r.w/2-cw/2,cy=r.y+r.h*.1;g.fillStyle=hex;A.paint.rrect(cx,cy,cw,chh,cw/2.4);g.fill();g.fillStyle='#374151';g.fillRect(cx+cw*.2,cy-6,cw*.6,8);
  g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.font=`800 ${Math.round(Math.max(12,Math.min(fs(15),r.h*.15)))}${FF}`;
  g.fillText(sel||done?FILL[fill].w:cn+' shaker',r.x+r.w/2,r.y+r.h*.8,r.w-10)})}
function shakeTap(i,live){const s=M.b;if(s.got.includes(i)||s.open.includes(i)||s.got.length>=6)return;const f=SHAKE[i][2];if(live)hum(f);
 if(s.open.length>=2){s.open=[]}s.bad=[];s.open.push(i);
 if(s.open.length<2){A.sound.pop();return say(`The ${SHAKE[i][0]} shaker goes ${FILL[f].w}. Now shake another one. Which one sounds the same?`)}
 const [a,b]=s.open,fa=SHAKE[a][2],fb=SHAKE[b][2];
 if(fa!==fb){s.bad=[a,b];s.open=[];A.sound.miss();return say(`Not a pair. The ${SHAKE[a][0]} one goes ${FILL[fa].w}, the ${SHAKE[b][0]} one goes ${FILL[fb].w}.`+(SHAKE[a][0]===SHAKE[b][0]?' Same colour, but a different sound inside.':' Listen, not look.'))}
 s.got.push(a,b);s.open=[];A.sound.pop();say(`A pair! Both go ${FILL[fa].w}.`+(SHAKE[a][0]!==SHAKE[b][0]?' Different colours, same sound.':'')+(s.got.length>=6?' All 3 pairs matched by ear.':''))}
const PAIRMOVES=(()=>{const by={};SHAKE.forEach((x,i)=>(by[x[2]]=by[x[2]]||[]).push(i));return Object.values(by).flat()})();
/* 3. same or different */
const twoR=()=>{const w=Math.min(160,A.W*.38),h=Math.min(w,A.H*.38);return[{x:A.W/2-w-10,y:A.H*.14,w,h},{x:A.W/2+10,y:A.H*.14,w,h}]};
const verdictR=()=>{const w=Math.min(180,(A.W-36)/2),h=Math.max(54,A.H*.14),y=A.H*.7;return[{x:A.W/2-w-8,y,w,h,t:'Same'},{x:A.W/2+8,y,w,h,t:'Different'}]};
function drawSame(){const s=M.c,g=A.ctx;ground();
 if(s.k>=PAIRS.length){tag('All 6 pairs judged',A.W/2,A.H*.08,{yes:1});tag('Same: woof woof · tick tock · jingle',A.W/2,A.H*.38,{n:13,yes:1});tag('Different: moo baa · boom shh · ring ding',A.W/2,A.H*.6,{n:13});return}
 const [x,y]=PAIRS[s.k];tag(`Pair ${s.k+1} of 6: same or different?`,A.W/2,A.H*.06,{n:13});const T=twoR();pad(T[0],'🔊',SAYS[x]);pad(T[1],'🔊',SAYS[y]);
 verdictR().forEach((r,j)=>{g.fillStyle=s.bad===j?'#fee2e2':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,r.h/2);g.fill();g.lineWidth=s.bad===j?4:2;g.strokeStyle=s.bad===j?OOPS:RIM;g.stroke();
  g.fillStyle=TXT;g.font=`800 ${fs(17)}${FF}`;g.textAlign='center';g.textBaseline='middle';g.fillText(r.t,r.x+r.w/2,r.y+r.h/2+1)})}
function sameJudge(same,live){const s=M.c;if(s.k>=PAIRS.length)return;const [x,y,yes]=PAIRS[s.k];speak(`${SAYS[x]}. ${SAYS[y]}.`,live);
 if(!!same!==!!yes){s.bad=same?0:1;A.sound.miss();return say('Listen again. '+PWHY[s.k])}
 s.bad=null;s.k++;A.sound.pop();say((yes?'Yes, the same. ':'Yes, different. ')+PWHY[s.k-1]+(s.k>=PAIRS.length?' All 6 judged.':''))}
/* 4. loud or quiet: drag into the big drum or the little mouse */
function boxR(k){const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.1,w,h:A.H*.32}}
const loudCells=()=>cells(6,3,A.H*.48,A.H*.98,150);
function drawLoud(){const s=M.d,g=A.ctx;ground();
 ['📢 Loud','🤫 Quiet'].forEach((t,k)=>{const r=boxR(k);g.fillStyle=k?(A.col.dark?'#1e3a8a':'#dbeafe'):(A.col.dark?'#7c2d12':'#ffedd5');A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();
  g.lineWidth=s.hot===k?4:2;g.strokeStyle=s.hot===k?HI:RIM;g.stroke();g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.dark?'#f9fafb':TXT;g.font=`800 ${fs(16)}${FF}`;g.fillText(t,r.x+r.w/2,r.y+r.h*.2);
  const inn=s.put.filter(i=>LOUD[i][2]===(k?0:1));g.font=`${Math.round(Math.min(r.h*.28,r.w/4.4))}${FF}`;inn.forEach((i,j)=>g.fillText(LOUD[i][1],r.x+r.w*(.25+j*.25),r.y+r.h*.66))});
 loudCells().forEach(r=>{if(s.put.includes(r.i)||(M.drag&&M.drag.i===r.i))return;pad(r,LOUD[r.i][1],LOUD[r.i][0],{no:s.bad===r.i})});
 if(M.drag){const d=M.drag,r=loudCells()[d.i];pad({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},LOUD[d.i][1],LOUD[d.i][0],{sel:1})}}
function loudPut(i,k){const s=M.d;if(s.put.includes(i))return;const isLoud=LOUD[i][2],want=k===0;
 if(!!isLoud!==want){s.bad=i;A.sound.miss();return say(`${LWHY[i]} It goes in ${isLoud?'Loud':'Quiet'}.`)}
 s.put.push(i);s.bad=null;A.sound.pop();say(LWHY[i]+(s.put.length>=6?' All 6 sorted. Big things can be quiet, and small things can be loud.':` ${s.put.length} of 6 sorted.`))}
/* 5. sound walk at home */
const homeCells=()=>cells(6,3,A.H*.24,A.H*.98,150);
function drawWalk(){const s=M.e;ground();
 if(s.k>=WALK.length){tag('Sound walk done: 5 of 5',A.W/2,A.H*.08,{yes:1});homeCells().forEach(r=>pad(r,PIC[HOME[r.i]],SAYS[HOME[r.i]],{yes:WALK.includes(HOME[r.i])}));return}
 tag(`🔊 ${SAYS[WALK[s.k]]}! What made that sound?`,A.W/2,A.H*.09,{n:15});
 homeCells().forEach(r=>pad(r,PIC[HOME[r.i]],NAME[HOME[r.i]],{no:s.bad===r.i,off:s.found.includes(HOME[r.i])}))}
function walkPick(i,live){const s=M.e;if(s.k>=WALK.length)return;const want=WALK[s.k],w=HOME[i];speak(SAYS[want],live);
 if(w!==want){s.bad=i;A.sound.miss();return say(`The ${NAME[w]} goes ${SAYS[w].toLowerCase()}. Listen: ${SAYS[want].toLowerCase()}. What makes that sound?`)}
 s.found.push(w);s.k++;s.bad=-1;A.sound.pop();say(`Yes, ${SAYS[want].toLowerCase()} is the ${NAME[want]}.`+(s.k>=WALK.length?' You found all 5 sounds round the house.':''))}
function draw(){const k=phase();if(k==='quiz'){ground();tag('Challenge',A.W/2,A.H*.16,{yes:1});tag('👂 Listen, then tell them apart',A.W/2,A.H*.5,{n:15});return}
 ({shut:drawShut,shake:drawShake,same:drawSame,loud:drawLoud,walk:drawWalk})[k]();A.fx.draw(A.ctx)}
function down(p){const k=phase();
 if(k==='loud'){const r=loudCells().find(r=>inside(p,r)&&!M.d.put.includes(r.i));if(r){M.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const b=[0,1].find(j=>inside(p,boxR(j)));if(b!=null&&M.d.pick!=null){const i=M.d.pick;M.d.pick=null;loudPut(i,b)}return false}
 if(k==='shut'){const r=shutCells().find(r=>inside(p,r));if(r)shutPick(r.i,1);else if(inside(p,curtainR())&&M.a.k<SHUT.length)speak(SAYS[SHUT[M.a.k][0]],1);return false}
 if(k==='shake'){const r=shakeCells().find(r=>inside(p,r));if(r)shakeTap(r.i,1);return false}
 if(k==='same'){const j=verdictR().findIndex(r=>inside(p,r));if(j>=0)sameJudge(j===0,1);else{const t=twoR().findIndex(r=>inside(p,r));if(t>=0&&M.c.k<PAIRS.length)speak(SAYS[PAIRS[M.c.k][t]],1)}return false}
 if(k==='walk'){const r=homeCells().find(r=>inside(p,r));if(r)walkPick(r.i,1)}return false}
function move(p){if(!M.drag)return;M.drag.x=p.x;M.drag.y=p.y;const h=[0,1].find(j=>inside(p,boxR(j)));M.d.hot=h==null?-1:h;A.redraw()}
function up(p){const d=M.drag;if(!d)return;M.drag=null;M.d.hot=-1;const b=[0,1].find(j=>inside(p,boxR(j)));if(b!=null)return loudPut(d.i,b);
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){M.d.pick=d.i;return say(`${LOUD[d.i][0]} picked. Now tap Loud or Quiet.`)}A.redraw()}
function reset(){epoch++;for(const k in M)delete M[k];Object.assign(M,{a:{k:0,bad:-1},b:{got:[],open:[],bad:[]},c:{k:0,bad:null},d:{put:[],bad:null,hot:-1,pick:null},e:{k:0,bad:-1,found:[]},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();M.hook()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){reset();say(desc);M.hook=finish(i,ok,msg)}
function demo(i,moves,ms){steps[i].go();const e0=epoch;moves.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
function buttons(){if(!pads)return;pads.innerHTML='';const k=phase(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pads,t).onclick=f};
 if(k==='shut'&&M.a.k<SHUT.length)SHUT[M.a.k][1].forEach((w,i)=>B(`${PIC[w]} ${NAME[w]}`,()=>shutPick(i,1),`The ${NAME[w]} made the sound`));
 if(k==='shake'&&M.b.got.length<6)SHAKE.forEach((x,i)=>{if(!M.b.got.includes(i))B(`Shake ${x[0]} shaker ${i+1}`,()=>shakeTap(i,1))});
 if(k==='same'&&M.c.k<PAIRS.length){B('Same',()=>sameJudge(1,1),'The two sounds are the same');B('Different',()=>sameJudge(0,1),'The two sounds are different')}
 if(k==='loud')LOUD.forEach((x,i)=>{if(!M.d.put.includes(i)){B(`${x[1]} ${x[0]} → Loud`,()=>loudPut(i,0),`${x[0]}: loud`);B(`${x[1]} ${x[0]} → Quiet`,()=>loudPut(i,1),`${x[0]}: quiet`)}});
 if(k==='walk'&&M.e.k<WALK.length)HOME.forEach((w,i)=>B(`${PIC[w]} ${NAME[w]}`,()=>walkPick(i,1),`The ${NAME[w]} made the sound`))}
const steps=[
{h:'Eyes shut',p:'Something is behind the curtain. Listen to the sound. Who made it? Tap the picture. Tap the curtain to hear it again.',
 task:'Find who made all 5 sounds',show:()=>demo(0,SHUT.map(([w,o])=>()=>shutPick(o.indexOf(w))),650),
 go:()=>open(0,'A curtain hides something. It says woof woof. Pick: cat, dog or fish.',()=>M.a.k>=SHUT.length,'Woof is a dog, quack a duck, moo a cow, boom a drum, hoo an owl. You knew them by sound alone.')},
{h:'Shaker pairs',p:'Each shaker has something inside. Tap two shakers to shake them. Do they sound the same? Find the 3 pairs.',
 predict:{q:'Two shakers are both red. Will they sound the same?',opts:['Yes, they look the same','Shake them and listen'],ans:1},task:'Find all 3 pairs by sound',
 show:()=>demo(1,PAIRMOVES.map(i=>()=>shakeTap(i)),500),
 go:()=>open(1,'Six shakers: two red, two blue, two yellow. Tap one to shake it.',()=>M.b.got.length>=6,'Each pair had the same thing inside, so the same sound. The colours did not match: you had to listen.')},
{h:'Same or different?',p:'Hear two sounds. Are they the same, or different? Tap Same or Different. Tap a sound to hear it.',
 predict:{q:'A drum and a shaker are both toys. Do they sound the same?',opts:['Yes, both are toys','No, boom and shh are different'],ans:1},task:'Judge all 6 pairs',
 show:()=>demo(2,PAIRS.map(p=>()=>sameJudge(p[2])),600),
 go:()=>open(2,'Two sounds: woof woof and woof woof. Same or different?',()=>M.c.k>=PAIRS.length,'Woof and woof, tick and tock twice, jingle and jingle were the same. Moo and baa, boom and shh, ring and ding dong were different.')},
{h:'Loud or quiet?',p:'Is it loud or quiet? Drag each one into a box, or tap it and then tap a box.',
 predict:{q:'A big elephant tiptoes. Loud or quiet?',opts:['Loud, it is big','Quiet, tiptoes are quiet'],ans:1},task:'Sort all 6 sounds',
 show:()=>demo(3,LOUD.map((x,i)=>()=>loudPut(i,x[2]?0:1)),550),
 go:()=>open(3,'Two boxes: Loud and Quiet. Six sounds below.',()=>M.d.put.length>=6,'Baby, drum and fire engine are loud. Tiptoes, whisper and nibbling are quiet. Size does not tell you: listen.')},
{h:'Sound walk',p:'We walk round the house. Listen to the sound, then tap what made it.',task:'Find all 5 sounds',
 show:()=>demo(4,WALK.map(w=>()=>walkPick(HOME.indexOf(w))),600),
 go:()=>open(4,'Drip drip! Six things: tap, door, phone, clock, bath, kettle.',()=>M.e.k>=WALK.length,'Drip is the tap, knock the door, ring the phone, tick tock the clock, splash the bath.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.hook()});
function why(t){let m='Listen to the sound itself, then think what makes it.';
 if(t==='close')m='Close, but listen again. Each thing has its own sound: meow is a cat, ding dong is a doorbell.';
 if(t==='look')m='Looks do not tell you the sound. Two shakers can look the same and sound different. Shake and listen.';
 if(t==='size')m='Size does not tell you. A tiny baby can be very loud, and a big elephant can tiptoe quietly.';
 if(t==='kind')m='Two things can both be toys and still sound different. Boom and shh are not the same.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{quizBox.hidden=B.step!==5;pads.hidden=B.step===5;buttons()},
 init:B=>{A=B;const box=c.el('div',{class:'fl-below'},A.below);pads=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sound buttons'},box);quizBox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
