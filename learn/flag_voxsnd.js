/* Flagship – voice sounds (ages 3–4; Letters and Sounds Phase One, Aspect 3; Development Matters 2021). The child
   plays with their own voice: drag a stretch handle to find which sounds are long (sss, mmm) and which stop at once
   (t, p), give a voice sound to the thing it copies (a snake hisses sss, a bee buzzes zzz), slide a voice from whisper
   to calling voice to fit a place, put a squeak or a growl on a high-to-low ladder whether it is loud or quiet, then
   build heard patterns from long bars and short dots. Every drag or tap has a labelled button twin. No letters to
   read: a grown-up says the sounds. Data in learn/voxsnd_art.js. */
(()=>{const {STRETCH,THINGS,COPY,VOL,PLACES,RUNG,PITCH,PATS,DESC,DONE,QS}=VXS;
VIS.reg('flagvoxsnd',c=>{let A,pad,quiz,qi=-1,gen=0;c.fig.classList.add('young');
const C={ink:'#1f2937',good:'#047857',wrong:'#b91c1c',rim:'#94a3b8',sel:'#1d4ed8',card:'#ffffff',sand:'#fef3c7',mint:'#dcfce7',sky:'#e0f2fe',peach:'#ffedd5',lav:'#ede9fe'};
const S={};const scene=()=>['stretch','copy','loud','pitch','pattern','quiz'][A.step];
const px=n=>Math.round(A.narrow?n:n*1.15);
const box=(x,y,w,h)=>({x,y,w,h}),hit=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
/* words on the canvas: shrink until they fit width o.fit */
function words(s,x,y,n,o){o=o||{};const g=A.ctx;let k=px(n);do{g.font=`${o.b||800} ${k}px system-ui,sans-serif`;k--}while(o.fit&&k>8&&g.measureText(s).width>o.fit);
 g.fillStyle=o.c||C.ink;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillText(s,x,y)}
/* a flat card; right and wrong are written as ✓ and ✗ too, never colour alone */
function card(b,fill,state){const g=A.ctx;g.fillStyle=state==='good'?'#d1fae5':state==='wrong'?'#fee2e2':fill||C.card;A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(16,b.h/3));g.fill();
 g.lineWidth=state?4:2;g.strokeStyle={good:C.good,wrong:C.wrong,sel:C.sel}[state]||C.rim;g.stroke()}
function backdrop(t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,t,A.col.dark?.14:.45);g.fillRect(0,0,A.W,A.H)}
function count(t,n,of){words(`${t}: ${n} of ${of}`,A.W/2,A.H*.95,13,{c:A.col.tx,b:700})}
const pic=(k,x,y,s)=>VXS.pic(A.ctx,A.paint,k,x,y,s);
/* ---------- 1. stretch it: long or short ---------- */
const handle=()=>{const x0=A.W*.32,x1=A.W*.92;return{x0,x1,y:A.H*.24}};
const binB=i=>box(A.W*(.05+i*.47),A.H*.5,A.W*.43,A.H*.36);
function paintStretch(){backdrop(C.sky);const R=STRETCH[Math.min(S.r,STRETCH.length-1)],live=S.r<STRETCH.length,H=handle();
 const sc=box(A.W*.05,A.H*.15,A.W*.24,A.H*.18);card(sc,C.sand,'');words(live?R.s:'✓',sc.x+sc.w/2,sc.y+sc.h/2,24);
 if(live){const g=A.ctx,end=H.x0+(H.x1-H.x0)*S.len;g.strokeStyle=C.rim;g.lineWidth=3;g.setLineDash([6,6]);g.beginPath();g.moveTo(H.x0,H.y);g.lineTo(H.x1,H.y);g.stroke();g.setLineDash([]);
  g.fillStyle=R.long?'#a7f3d0':'#fecaca';g.fillRect(H.x0,H.y-px(12),end-H.x0,px(24));
  if(S.len>.05)words(R.long?R.s[0].repeat(Math.max(3,Math.round(S.len*14))):R.s+'!',H.x0+(end-H.x0)/2,H.y,15,{fit:Math.max(20,end-H.x0-6)});
  g.fillStyle=S.grab?C.sel:'#f59e0b';g.beginPath();g.arc(end,H.y,px(17),0,7);g.fill();g.lineWidth=3;g.strokeStyle=C.ink;g.stroke();words('⇢',end,H.y,15);
  words(S.tried?(R.long?'It keeps going!':'It stopped at once!'):'Drag the dot to stretch the sound',A.W/2,A.H*.4,13,{c:A.col.tx,fit:A.W-20})}
 ['Long: it stretches','Short: it stops'].forEach((t,i)=>{const b=binB(i);card(b,C.card,S.miss===i?'wrong':'');words((S.miss===i?'✗ ':'')+t,b.x+b.w/2,b.y+px(16),13,{fit:b.w-10});
  S.sorted.filter(x=>x.long===(i===0)).forEach((x,j)=>words('✓ '+x.s,b.x+b.w/2,b.y+b.h*(.42+j*.25),20,{c:C.good}))});count('Sorted',S.sorted.length,STRETCH.length)}
function tryIt(){const R=STRETCH[S.r];if(!R)return;S.tried=true;S.len=R.long?1:0;A.sound.tick();
 tell(R.long?`${R.say}. It keeps going while you have breath.`:`${R.say}. It stops at once. You cannot stretch it.`)}
function sortTo(long){const R=STRETCH[S.r];if(!R)return;if(R.long!==long){S.miss=long?0:1;A.sound.miss();return tell(oops(R.long?'cut':'repeat',R.s))}
 S.sorted.push(R);S.r++;S.len=0;S.tried=false;S.miss=-1;A.sound.pop();tell(`${R.s} is a ${long?'long':'short'} sound.`+(S.r<STRETCH.length?` Next sound: ${STRETCH[S.r].s}.`:''))}
/* ---------- 2. copy a thing with your voice ---------- */
const bubB=()=>box(A.W*.22,A.H*.08,A.W*.56,A.H*.15),thingB=i=>{const w=(A.W-30)/2;return box(10+(i%2)*(w+10),A.H*(.3+Math.floor(i/2)*.31),w,A.H*.28)};
function paintCopy(){backdrop(C.mint);const Q=COPY[Math.min(S.r,COPY.length-1)],live=S.r<COPY.length;let b=bubB();if(S.grab)b=box(S.grab.x-b.w/2,S.grab.y-b.h/2,b.w,b.h);
 card(b,C.sand,S.grab?'sel':'');words(live?'Voice: '+Q.v:'✓ All copied',b.x+b.w/2,b.y+b.h/2,18,{fit:b.w-12});
 THINGS.forEach((k,i)=>{const r=thingB(i),got=S.got.includes(k),bad=S.wrong===k;card(r,C.card,got?'good':bad?'wrong':'');pic(k,r.x+r.w/2,r.y+r.h*.42,Math.min(r.w,r.h)*.62);
  const v=(COPY.find(x=>x.w===k)||{}).v;words((got?'✓ '+k+': '+v:bad?'✗ '+k:k),r.x+r.w/2,r.y+r.h*.86,13,{fit:r.w-8})});count('Copied',S.got.length,COPY.length)}
function match(k){const Q=COPY[S.r];if(!Q)return;if(k===Q.w){S.got.push(k);S.r++;S.wrong='';A.sound.pop();return tell(`${Q.v}: the ${k}!`+(S.r<COPY.length?` Next voice sound: ${COPY[S.r].v}.`:''))}
 S.wrong=k;A.sound.miss();tell(`${k}? `+oops(Q.near[k],Q.v,k))}
/* ---------- 3. a voice to fit the place ---------- */
const slide=()=>({x0:A.W*.14,x1:A.W*.86,y:A.H*.56}),sayB=()=>box(A.W*.3,A.H*.7,A.W*.4,A.H*.12);
function paintLoud(){backdrop(C.peach);const P=PLACES[Math.min(S.r,PLACES.length-1)],live=S.r<PLACES.length,top=box(A.W*.05,A.H*.06,A.W*.9,A.H*.33);card(top,C.card,'');
 if(live){pic(P.k,top.x+top.w/2,top.y+top.h*.42,Math.min(top.w,top.h)*.6);words(P.n,top.x+top.w/2,top.y+top.h*.86,14,{fit:top.w-12})}else words('✓ '+S.done.join(' · '),top.x+top.w/2,top.y+top.h/2,13,{fit:top.w-12,c:C.good});
 const L=slide(),g=A.ctx;g.strokeStyle=A.col.tx;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(L.x0,L.y);g.lineTo(L.x1,L.y);g.stroke();
 VOL.forEach((t,i)=>{const x=L.x0+(L.x1-L.x0)*i/2;g.fillStyle=A.col.tx;g.beginPath();g.arc(x,L.y,px(5)+i*px(3),0,7);g.fill();words(t,x,L.y-px(26),11,{c:A.col.tx,fit:(L.x1-L.x0)/2.4,b:700})});
 const kx=L.x0+(L.x1-L.x0)*S.vol/2;g.fillStyle=S.grab?C.sel:'#f59e0b';g.beginPath();g.arc(kx,L.y,px(17),0,7);g.fill();g.lineWidth=3;g.strokeStyle=C.ink;g.stroke();
 const sb=sayB();card(sb,C.sand,S.slip?'wrong':'');words((S.slip?'✗ ':'')+'Say it',sb.x+sb.w/2,sb.y+sb.h/2,16);count('Voices that fit',S.done.length,PLACES.length)}
function nudge(d){S.vol=Math.max(0,Math.min(2,Math.round(S.vol)+d));S.slip='';A.sound.tick();tell(`Voice: ${VOL[S.vol]}.`)}
function sayIt(){const P=PLACES[S.r];if(!P)return;const v=Math.round(S.vol);S.vol=v;
 if(v!==P.v){S.slip=1;A.sound.miss();return tell(oops('place',VOL[v],P.n+(v>P.v?': too loud. ':': too quiet. ')+P.why))}
 S.done.push(VOL[v]);S.r++;S.slip=0;A.sound.pop();tell(`${P.n}: a ${VOL[v]}. ${P.why}`+(S.r<PLACES.length?' Now a new place.':''))}
/* ---------- 4. high or low ---------- */
const rungY=i=>A.H*(.22+i*.22),ladX=()=>A.W*.78;
function paintPitch(){backdrop(C.lav);const P=PITCH[Math.min(S.r,PITCH.length-1)],live=S.r<PITCH.length,g=A.ctx,X=ladX();
 const sc=box(A.W*.05,A.H*.1,A.W*.5,A.H*.42);card(sc,C.card,S.slip?'wrong':'');
 if(live){pic(P.k,sc.x+sc.w/2,sc.y+sc.h*.4,Math.min(sc.w,sc.h)*(P.k==='bear'?.62:.42));words((S.slip?'✗ ':'')+P.n,sc.x+sc.w/2,sc.y+sc.h*.86,12,{fit:sc.w-10})}
 else words('✓ All on the ladder',sc.x+sc.w/2,sc.y+sc.h/2,13,{c:C.good,fit:sc.w-10});
 g.strokeStyle=A.col.tx;g.lineWidth=5;g.beginPath();g.moveTo(X-px(26),rungY(0)-px(20));g.lineTo(X-px(26),rungY(2)+px(20));g.moveTo(X+px(26),rungY(0)-px(20));g.lineTo(X+px(26),rungY(2)+px(20));g.stroke();
 RUNG.forEach((t,i)=>{g.lineWidth=4;g.beginPath();g.moveTo(X-px(26),rungY(i));g.lineTo(X+px(26),rungY(i));g.stroke();words(t,X-px(34),rungY(i),12,{c:A.col.tx,al:'right',b:700})});
 if(live){const y=S.grab?S.grab.y:S.dot==null?rungY(1)+A.H*.11:rungY(S.dot);g.fillStyle=S.grab?C.sel:'#f59e0b';g.beginPath();g.arc(X,y,px(16),0,7);g.fill();g.lineWidth=3;g.strokeStyle=C.ink;g.stroke()}
 S.placed.forEach((p,j)=>words(`✓ ${p.k}: ${RUNG[p.p]}`,A.W*.3,A.H*(.6+j*.07),12,{c:A.col.tx,fit:A.W*.5}));count('On the ladder',S.placed.length,PITCH.length)}
function place(i){const P=PITCH[S.r];if(!P)return;S.dot=i;S.grab=null;
 if(i!==P.p){S.slip=1;A.sound.miss();return tell(oops(P.trap==='loud'?'mixhigh':P.trap==='quiet'?'quiethigh':i===1?'middle':'flip',P.n,P.k))}
 S.placed.push(P);S.r++;S.dot=null;S.slip=0;A.sound.pop();tell(`${P.n}: ${RUNG[i]}.`+(P.trap?` Loud or quiet does not change it: a ${P.k} sounds ${RUNG[i]}.`:'')+(S.r<PITCH.length?' Here is the next sound.':''))}
/* ---------- 5. build the pattern ---------- */
const slotB=i=>{const w=(A.W-40)/3;return box(10+i*(w+10),A.H*.38,w,A.H*.2)},blockB=i=>box(A.W*(.05+i*.47),A.H*.66,A.W*.43,A.H*.2);
function mark(t,b,colr){const g=A.ctx;g.fillStyle=colr||C.ink;if(t==='L'){A.paint.rrect(b.x+b.w*.12,b.y+b.h*.4,b.w*.76,b.h*.2,b.h*.1);g.fill()}else{g.beginPath();g.arc(b.x+b.w/2,b.y+b.h/2,Math.min(b.w,b.h)*.13,0,7);g.fill()}}
function paintPattern(){backdrop(C.sand);const P=PATS[Math.min(S.r,PATS.length-1)],live=S.r<PATS.length;
 const top=box(A.W*.05,A.H*.06,A.W*.9,A.H*.22);card(top,C.card,'');words('A grown-up says:',top.x+top.w/2,top.y+top.h*.25,11,{b:700,c:'#475569'});
 words(live?P.s.join('  '):'✓ '+S.built.join('  ·  '),top.x+top.w/2,top.y+top.h*.65,20,{fit:top.w-12,c:live?C.ink:C.good});
 [0,1,2].forEach(i=>{const b=slotB(i),has=live&&i<S.k;card(b,C.card,has?'good':live&&i===S.k&&S.slip?'wrong':'');if(has)mark(P.b[i],b,C.good);else words(live&&i===S.k?'?':'',b.x+b.w/2,b.y+b.h/2,18,{c:'#64748b'})});
 [['L','Long bar'],['S','Short dot']].forEach(([t,n],i)=>{const b=blockB(i);card(b,C.peach,'');mark(t,box(b.x,b.y,b.w,b.h*.7));words(n,b.x+b.w/2,b.y+b.h*.82,13,{fit:b.w-8})});
 count('Patterns built',S.built.length,PATS.length)}
function add(t){const P=PATS[S.r];if(!P)return;const want=P.b[S.k],snd=P.s[S.k];
 if(t!==want){S.slip=1;A.sound.miss();return tell(oops(want==='L'?'cut':'repeat',snd))}
 S.k++;S.slip=0;A.sound.tick();if(S.k<3)return tell(`${snd}: ${t==='L'?'long bar':'short dot'}. Next sound: ${P.s[S.k]}.`);
 S.built.push(P.b.replace(/L/g,'▬').replace(/S/g,'•'));S.r++;S.k=0;A.sound.pop();tell(`${P.s.join(' ')}: pattern built!`+(S.r<PATS.length?' Listen to the next one.':''))}
/* ---------- feedback that names the slip ---------- */
function oops(t,a,b){let m='Listen again, then try once more.';
 if(t==='repeat')m=`${a||'t'} stops at once. Saying it again and again (${a||'t'}-${a||'t'}-${a||'t'}) is not stretching it, so it is a short sound.`;
 if(t==='cut')m=`Try to stretch ${a||'sss'}: ${(a||'s')[0].repeat(7)}. It keeps going while you have breath, so it is a long sound.`;
 if(t==='hum')m=`Put a hand on your throat. zzz buzzes and hums, like a bee. sss only hisses, like a snake.`;
 if(t==='short')m=/tick|^[tpk]$/.test(a||'')?`${a} is short and quick. ${b?'A '+b:'That one'} makes one long sound, so it does not match.`:`${a} is one long sound. ${b?'A '+b:'That one'} makes short, quick sounds, so it does not match.`;
 if(t==='thing')m=`Think what ${b?'a '+b:'that thing'} says. ${a} copies a different thing.`;
 if(t==='place')m=`A ${a} does not fit. ${b||'Think about where you are and who is listening.'}`;
 if(t==='mixhigh')m=`Loud is not low. ${a}: still a high squeak. Loud or quiet is one thing; high or low is a different thing.`;
 if(t==='quiethigh')m=`Quiet is not high. ${a}: still a low growl. A quiet sound can be low.`;
 if(t==='middle')m=`Listen again: a ${b||'sound'} is not like your talking voice. Is it higher or lower?`;
 if(t==='flip')m=`Other end! A tiny ${b==='mouse'?'mouse squeaks high':'thing squeaks high'}; a big bear growls low.`;
 if(t==='volume')m='Loud is not long. A loud t still stops at once.';
 if(t==='nopitch')m='Every voice sound is high, low or in the middle. Listen for it.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=scene();if(k==='quiz'){backdrop(C.sand);words('Challenge',A.W/2,A.H*.4,22,{c:A.col.tx});words('Long or short · Loud or quiet · High or low',A.W/2,A.H*.55,13,{c:A.col.tx,fit:A.W-20});return}
 ({stretch:paintStretch,copy:paintCopy,loud:paintLoud,pitch:paintPitch,pattern:paintPattern})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene();
 if(k==='stretch'){const H=handle(),x=H.x0+(H.x1-H.x0)*S.len;if(S.r<STRETCH.length&&Math.hypot(p.x-x,p.y-H.y)<px(34)){S.grab={};A.redraw();return true}
  for(let i=0;i<2;i++)if(hit(p,binB(i)))sortTo(i===0);return false}
 if(k==='copy'){if(hit(p,bubB())&&S.r<COPY.length){S.grab={x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const i=THINGS.findIndex((_,j)=>hit(p,thingB(j)));if(i>=0)match(THINGS[i]);return false}
 if(k==='loud'){const L=slide(),x=L.x0+(L.x1-L.x0)*S.vol/2;if(Math.hypot(p.x-x,p.y-L.y)<px(34)){S.grab={};A.redraw();return true}if(hit(p,sayB()))sayIt();return false}
 if(k==='pitch'){const y=S.dot==null?rungY(1)+A.H*.11:rungY(S.dot);if(S.r<PITCH.length&&Math.abs(p.x-ladX())<px(40)&&Math.abs(p.y-y)<px(34)){S.grab={y:p.y};A.redraw();return true}return false}
 if(k==='pattern'){for(let i=0;i<2;i++)if(hit(p,blockB(i)))add(i?'S':'L');return false}return false}
function move(p){const g=S.grab;if(!g)return;const k=scene();
 if(k==='stretch'){const H=handle(),R=STRETCH[S.r];S.len=Math.max(0,Math.min(R&&R.long?1:.12,(p.x-H.x0)/(H.x1-H.x0)));A.redraw();return}
 if(k==='loud'){const L=slide();S.vol=Math.max(0,Math.min(2,2*(p.x-L.x0)/(L.x1-L.x0)));S.slip=0;A.redraw();return}
 if(k==='pitch'){g.y=Math.max(rungY(0),Math.min(rungY(2),p.y));A.redraw();return}
 g.x=p.x;g.y=p.y;A.redraw()}
function up(p){const g=S.grab;if(!g)return;S.grab=null;const k=scene();
 if(k==='stretch'){if(S.len>.04)tryIt();else A.redraw();return}
 if(k==='loud'){S.vol=Math.round(S.vol);return tell(`Voice: ${VOL[S.vol]}. Tap Say it.`)}
 if(k==='pitch'){let best=0;for(let i=1;i<3;i++)if(Math.abs(g.y-rungY(i))<Math.abs(g.y-rungY(best)))best=i;return place(best)}
 const i=THINGS.findIndex((_,j)=>hit(p,thingB(j)));if(i>=0&&Math.hypot(p.x-g.x0,p.y-g.y0)>10)return match(THINGS[i]);A.redraw()}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='stretch'&&S.r<STRETCH.length){b('⇢ Stretch it',tryIt,`Try to stretch ${STRETCH[S.r].s}`);b('Long box',()=>sortTo(true),'Put it in the Long box');b('Short box',()=>sortTo(false),'Put it in the Short box')}
 if(k==='copy')THINGS.forEach(t=>b(t,()=>match(t),`Give the voice sound to the ${t}`));
 if(k==='loud'){b('Quieter',()=>nudge(-1),'Make the voice quieter');b('Louder',()=>nudge(1),'Make the voice louder');b('Say it',sayIt)}
 if(k==='pitch')RUNG.forEach((t,i)=>b(t,()=>place(i),`Put the sound at ${t}`));
 if(k==='pattern'){b('Long bar',()=>add('L'),'Add a long bar');b('Short dot',()=>add('S'),'Add a short dot')}}
function reset(){gen++;for(const x in S)delete S[x];Object.assign(S,{r:0,k:0,len:0,tried:false,miss:-1,sorted:[],got:[],wrong:'',vol:1,slip:0,done:[],dot:null,placed:[],built:[],grab:null,hook:()=>{}})}
const finished=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function open(i,test){reset();tell(DESC[i]);S.hook=finished(i,test)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
const steps=[
{h:'Stretch it',p:'Some sounds keep going, like a snake: sssss. Some stop at once, like a tap: t. Drag the dot to stretch each sound, then put it in the Long box or the Short box.',
 predict:{q:'Can you stretch t for a long time, like sss?',opts:['Yes: t-t-t-t-t','No, t stops at once'],ans:1},task:'Sort 4 sounds into long and short',
 show:()=>demo(0,STRETCH.flatMap(()=>[tryIt,()=>sortTo(STRETCH[S.r].long)]),380),go:()=>open(0,()=>S.sorted.length>=STRETCH.length)},
{h:'Copy a thing',p:'Your voice can copy things: a snake, a bee, a clock, a car. Drag the voice sound to the thing it copies, or tap the thing.',
 predict:{q:'A snake says sss. Does a bee say sss too?',opts:['Yes, they both hiss','No, a bee buzzes: zzz'],ans:1},task:'Copy 4 things with your voice',
 show:()=>demo(1,COPY.map(()=>()=>match(COPY[S.r].w)),420),go:()=>open(1,()=>S.got.length>=COPY.length)},
{h:'Loud or quiet',p:'Pick a voice that fits the place. Slide from a whisper to a big calling voice, then tap Say it.',
 task:'Find the right voice for 3 places',show:()=>demo(2,PLACES.map(()=>()=>{S.vol=PLACES[S.r].v;sayIt()}),450),go:()=>open(2,()=>S.done.length>=PLACES.length)},
{h:'High or low',p:'A tiny mouse squeaks high. A big bear growls low. Drag the dot up or down the ladder to show how high or low each sound is.',
 predict:{q:'The bear growls very quietly. Does its growl go high?',opts:['Yes, quiet sounds are high','No, a growl stays low'],ans:1},task:'Put 4 sounds on the ladder',
 show:()=>demo(3,PITCH.map(()=>()=>place(PITCH[S.r].p)),420),go:()=>open(3,()=>S.placed.length>=PITCH.length)},
{h:'Sound patterns',p:'A grown-up says three sounds, like sss t sss. Build what you hear: a long bar for a long sound, a short dot for a short sound.',
 task:'Build 3 sound patterns',show:()=>demo(4,PATS.flatMap(P=>[...P.b].map(()=>()=>add(PATS[S.r].b[S.k]))),280),go:()=>open(4,()=>S.built.length>=PATS.length)},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
function next(){qi++;const Q=QS[qi%QS.length],opts=[[Q.a,''],...Q.o],k=qi%3,list=opts.slice(k).concat(opts.slice(0,k));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>judge(s,Q,t)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(s,Q,t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb');
 const arg={repeat:t.length<4?t:'t',cut:'sss',mixhigh:'A tiny mouse squeaking loudly',quiethigh:'A big bear growling quietly',place:t.replace(/^A /,'').toLowerCase(),hum:'sss',short:t,thing:t}[s];
 const why=s?oops(s,arg,s==='place'?'The baby is asleep: a whisper will not wake the baby.':s==='thing'?'clock':s==='short'?'bee':''):'';if(!s)A.win();else A.sound.miss();
 fb.innerHTML=(s?'✗ '+why:`✓ Yes: ${Q.a}`)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{quiz.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Voice sounds lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
