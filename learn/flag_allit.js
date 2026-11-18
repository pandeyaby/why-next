/* Flagship – same first sound, alliteration (ages 3–4; EYFS Letters and Sounds Phase 1 Aspect 5 "alliteration";
   Development Matters 3–4: "develop phonological awareness ... spot and suggest rhymes ... recognise words with the same
   initial sound"; NC Y1 phonics groundwork). An ear task, not a letter task: sort pictures into the Sss snake's and the
   Mmm monkey's bags, pick the odd one out when a rhyme is the trap (sun, sock, bun), find who starts like kite when the
   letters differ (cake, key) or the sound is close (goat, cheese), finish silly alliterative phrases, and judge pairs
   where the sound sits at the END (fish, leaf). Not flagrhyme (end sounds) or flagphon (letter-sound links). */
(()=>{
const {PIC,up1,FIRST,BAGW,BAGOF,BAGS,TRIO,KW,KYES,KNO,FR,PAIRS,PWHY,QS}=ALLIT;
VIS.reg('flagallit',c=>{let A,ctl,chal,qn=-1,gen=0;const st={};c.fig.classList.add('young');
const DARK='#111827',GOOD='#047857',BAD='#b91c1c',EDGE='#6b7280',SEL='#7c3aed',FONT='px system-ui,sans-serif';
const stage=()=>['bags','odd','kite','silly','pairs','chal'][A.step];
const big=n=>A.narrow?n:Math.round(n*1.18);
function voice(w,on){if(!on)return;try{const s=window.speechSynthesis;if(s&&window.SpeechSynthesisUtterance){s.cancel();const u=new SpeechSynthesisUtterance(w);u.rate=.75;s.speak(u)}}catch(e){}}
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#dcfce7',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function pill(t,x,y,o){o=o||{};const g=A.ctx;let n=big(o.n||15);g.font=`800 ${n}${FONT}`;let w=g.measureText(t).width+24;
 while(w>A.W-12&&n>10){n--;g.font=`800 ${n}${FONT}`;w=g.measureText(t).width+24}
 const h=n+16,x0=Math.max(6,Math.min(A.W-w-6,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,h/2);g.fill();
 g.lineWidth=o.good?3:1.5;g.strokeStyle=o.good?GOOD:EDGE;g.stroke();g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function tile(r,w,o){o=o||{};const g=A.ctx;g.fillStyle=o.grey?'#e5e7eb':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();
 g.lineWidth=o.good||o.bad||o.on?4:2;g.strokeStyle=o.good?GOOD:o.bad?BAD:o.on?SEL:EDGE;g.stroke();
 const s=Math.min(r.h*.44,r.w*.52);g.font=`${Math.round(s)}${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(PIC[w]||'',r.x+r.w/2,r.y+r.h*.41);
 g.font=`800 ${Math.round(Math.max(12,Math.min(big(17),r.h*.19)))}${FONT}`;g.fillStyle=DARK;g.fillText(o.text||w,r.x+r.w/2,r.y+r.h*.84,r.w-8);
 if(o.good||o.bad){g.fillStyle=o.good?GOOD:BAD;g.beginPath();g.arc(r.x+r.w-14,r.y+14,12,0,7);g.fill();g.fillStyle='#ffffff';g.font=`900 14${FONT}`;g.fillText(o.good?'✓':'✗',r.x+r.w-14,r.y+15)}}
function lay(n,cols,top,bot){const gap=12,rows=Math.ceil(n/cols),w=Math.min(156,(A.W-gap*(cols+1))/cols),h=Math.min(w*1.02,(bot-top-gap*(rows-1))/rows),left=(A.W-(w*cols+gap*(cols-1)))/2;
 const out=[];for(let i=0;i<n;i++)out.push({i,x:left+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h});return out}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* step 1: the two bags */
function bagR(k){const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.11,w,h:A.H*.36}}
const bagTiles=()=>lay(6,3,A.H*.53,A.H*.98);
function drawBags(){const g=A.ctx,s=st.b;wash();
 BAGS.forEach(([who,name],k)=>{const r=bagR(k);g.fillStyle=k?(A.col.dark?'#7c2d12':'#fed7aa'):(A.col.dark?'#14532d':'#bbf7d0');A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();
  g.lineWidth=s.hot===k?4:2;g.strokeStyle=s.hot===k?SEL:EDGE;g.stroke();
  g.textAlign='center';g.textBaseline='middle';g.font=`800 ${big(14)}${FONT}`;g.fillStyle=A.col.dark?'#f9fafb':DARK;g.fillText(name,r.x+r.w/2,r.y+r.h*.14,r.w-14);
  g.font=`${Math.round(Math.min(r.h*.28,r.w*.3))}${FONT}`;g.fillStyle='#000';g.fillText(PIC[who],r.x+r.w/2,r.y+r.h*.43);
  const inBag=s.inBag.filter(w=>BAGOF(w)===k);g.font=`${Math.round(Math.min(r.h*.2,r.w/4.6))}${FONT}`;
  inBag.forEach((w,j)=>g.fillText(PIC[w],r.x+r.w*(.25+j*.25),r.y+r.h*.79))});
 bagTiles().forEach(r=>{const w=BAGW[r.i];if(st.b.inBag.includes(w)||(st.drag&&st.drag.i===r.i))return;tile(r,w,{bad:s.bad===w})});
 if(st.drag){const d=st.drag,r=bagTiles()[d.i];tile({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},BAGW[d.i],{on:1})}
 if(s.inBag.length>=6)pill('All 6 in the right bag',A.W/2,A.H*.06,{n:13,good:1});else pill('Which bag? Listen to the first sound',A.W/2,A.H*.06,{n:13})}
function drop(i,k,live){const s=st.b,w=BAGW[i];if(s.inBag.includes(w))return;voice(w,live);
 if(BAGOF(w)!==k){s.bad=w;A.sound.miss();return tell(`${up1(w)} starts with ${FIRST[w]}, not ${k?'mmm':'sss'}. Say it slowly: ${FIRST[w]}... ${w}. It goes in the ${BAGS[BAGOF(w)][1]}'s bag.`)}
 s.inBag.push(w);s.bad=null;A.sound.pop();tell(`${up1(w)} starts with ${FIRST[w]}, like ${BAGS[k][0]}. In it goes.`+(s.inBag.length>=6?' All 6 sorted by their first sound.':` ${s.inBag.length} of 6 sorted.`))}
/* step 2: odd one out */
const trioTiles=()=>lay(3,3,A.H*.22,A.H*.8);
function drawOdd(){const s=st.o,g=A.ctx;wash();
 if(s.k>=4){pill('All 4 found',A.W/2,A.H*.08,{n:14,good:1});g.font=`800 ${big(15)}${FONT}`;g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='middle';
  ['sun sock · mouse milk','bat ball · dog duck'].forEach((t,j)=>g.fillText(t,A.W/2,A.H*(.4+j*.14)));pill('Bun, house, cat, log rhymed, but started differently',A.W/2,A.H*.88,{n:12,good:1});return}
 pill(`Set ${s.k+1} of 4: who starts differently?`,A.W/2,A.H*.08,{n:14});trioTiles().forEach(r=>tile(r,TRIO[s.k][0][r.i],{bad:s.bad===r.i}));pill('Say all three. Listen to the very first sound',A.W/2,A.H*.9,{n:12})}
function oddPick(i,live){const s=st.o;if(s.k>=4)return;const [ws,odd]=TRIO[s.k],w=ws[i];voice(w,live);
 const mates=ws.filter((v,j)=>j!==odd);
 if(i!==odd){s.bad=i;A.sound.miss();return tell(`${up1(w)} starts with ${FIRST[w]}, the same as ${mates.find(v=>v!==w)}. Which one starts with a different sound?`)}
 const rhymeMate=ws.find((v,j)=>j!==odd&&v.slice(1)===w.slice(1));
 s.k++;s.bad=-1;A.sound.pop();tell(`Yes. ${up1(mates[0])} and ${mates[1]} both start with ${FIRST[mates[0]]}. ${up1(w)} starts with ${FIRST[w]}.`+(rhymeMate?` ${up1(w)} rhymes with ${rhymeMate}, but rhyming is about the end, not the start.`:'')+(s.k>=4?' All 4 found.':''))}
/* step 3: starts like kite */
const kiteR=()=>{const h=A.H*.27,w=h*.95;return{x:A.W/2-w/2,y:A.H*.11,w,h}};
const kTiles=()=>lay(5,A.narrow?3:5,A.H*.44,A.H*.97);
function drawKite(){const s=st.k;wash();pill(`Starts like kite: ${s.got.length} of 3`,A.W/2,A.H*.05,{n:13,good:s.got.length>=3});tile(kiteR(),'kite',{on:1});
 kTiles().forEach(r=>{const w=KW[r.i];tile(r,w,{good:s.got.includes(w),bad:s.bad===w})})}
function kPick(i,live){const s=st.k,w=KW[i];if(s.got.includes(w)||s.got.length>=3)return;voice(w,live);
 if(!KYES.includes(w)){s.bad=w;A.sound.miss();return tell(KNO[w])}
 s.got.push(w);s.bad=null;A.sound.pop();tell(`${up1(w)}: k... ${w}. It starts with the same sound as kite.`+(w==='cake'||w==='cat'?' It is written with a c, but the sound is k.':'')+(s.got.length>=3?' Cake, key and cat all start with k. Goat and cheese do not.':''))}
/* step 4: silly phrases */
function chipRects(){const g=A.ctx,n=big(A.narrow?16:19),f=FR[Math.min(st.s.k,2)];g.font=`800 ${n}${FONT}`;const ws=f[1].map(w=>g.measureText(w).width+30),tot=ws.reduce((a,b)=>a+b,0)+14*(ws.length-1);
 let x=(A.W-tot)/2;return f[1].map((w,j)=>{const r={j,w,x,y:A.H*.74,ww:ws[j],h:Math.max(44,n+22),n};x+=ws[j]+14;return r})}
const blankR=()=>{const w=Math.min(190,A.W*.42),h=Math.max(48,A.H*.13);return{x:A.W*.5-w-6,y:A.H*.3,w,h}};
const animR=()=>{const b=blankR(),h=A.H*.3,w=Math.min(h*.95,A.W*.42);return{x:A.W*.5+6,y:b.y+b.h/2-h/2,w,h}};
function drawSilly(){const s=st.s,g=A.ctx;wash();
 if(s.k>=3){pill('3 silly phrases',A.W/2,A.H*.08,{n:14,good:1});['🐻 bouncy bear','🐟 funny fish','🐶 dizzy dog'].forEach((t,j)=>pill(t,A.W/2,A.H*(.32+j*.18),{n:16,good:1}));return}
 const f=FR[s.k];pill(`Phrase ${s.k+1} of 3: which word starts like ${f[0]}?`,A.W/2,A.H*.08,{n:13});
 const b=blankR();g.setLineDash([7,6]);g.lineWidth=3;g.strokeStyle=A.col.dark?'#e5e7eb':'#374151';A.paint.rrect(b.x,b.y,b.w,b.h,14);g.stroke();g.setLineDash([]);
 g.font=`800 ${big(15)}${FONT}`;g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='middle';g.fillText('drop a word',b.x+b.w/2,b.y+b.h/2);tile(animR(),f[0],{on:1});
 chipRects().forEach(r=>{if(st.drag&&st.drag.j===r.j)return;chip(r,r.x,r.y,{bad:s.bad===r.j})});
 if(st.drag){const d=st.drag,r=chipRects()[d.j];chip(r,d.x-r.ww/2,d.y-r.h/2,{on:1})}}
function chip(r,x,y,o){const g=A.ctx;g.fillStyle='#ffffff';A.paint.rrect(x,y,r.ww,r.h,r.h/2);g.fill();g.lineWidth=o.bad||o.on?4:2;g.strokeStyle=o.bad?BAD:o.on?SEL:EDGE;g.stroke();
 g.fillStyle=DARK;g.font=`800 ${r.n}${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(r.w,x+r.ww/2,y+r.h/2+1)}
function fill(j,live){const s=st.s;if(s.k>=3)return;const [an,ops,ok]=FR[s.k],w=ops[j];voice(`${w} ${an}`,live);
 if(j!==ok){s.bad=j;A.sound.miss();return tell(`${up1(w)} ${an}? ${up1(w)} starts with ${w[0]==='s'?'sss':w[0]==='l'?'l':w[0]==='t'?'t':w[0]==='w'?'w':w[0]==='p'?'p':'fff'}, and ${an} starts with ${FIRST[an]}. Find the word that starts like ${an}.`)}
 s.k++;s.bad=null;A.sound.pop();tell(`${up1(w)} ${an}! Both start with ${FIRST[an]}. That is alliteration: words close together that start with the same sound.`+(s.k>=3?' All 3 phrases made.':''))}
/* step 5: start or end? */
const pairTiles=()=>{const w=Math.min(150,A.W*.36),h=Math.min(w*1.02,A.H*.42);return[{x:A.W/2-w-10,y:A.H*.13,w,h},{x:A.W/2+10,y:A.H*.13,w,h}]};
const ansR=()=>{const w=Math.min(170,(A.W-36)/2),h=Math.max(54,A.H*.14),y=A.H*.66;return[{x:A.W/2-w-8,y,w,h,t:'✓ Same start'},{x:A.W/2+8,y,w,h,t:'✗ Not the same'}]};
function drawPairs(){const s=st.p,g=A.ctx;wash();
 if(s.k>=6){pill('All 6 pairs judged',A.W/2,A.H*.08,{n:14,good:1});pill('Same start: fish fork · moon mop · dog door',A.W/2,A.H*.4,{n:13,good:1});pill('Only the FIRST sound counts',A.W/2,A.H*.62,{n:14});return}
 const [a,b]=PAIRS[s.k];pill(`Pair ${s.k+1} of 6: do they start the same?`,A.W/2,A.H*.06,{n:13});const T=pairTiles();tile(T[0],a);tile(T[1],b);
 ansR().forEach((r,j)=>{g.fillStyle=s.bad===j?'#fee2e2':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.lineWidth=s.bad===j?4:2;g.strokeStyle=s.bad===j?BAD:EDGE;g.stroke();
  g.fillStyle=DARK;g.font=`800 ${big(15)}${FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(r.t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)})}
function judge(same,live){const s=st.p;if(s.k>=6)return;const [a,b,yes]=PAIRS[s.k];voice(`${a}, ${b}`,live);
 if(!!same!==!!yes){s.bad=same?0:1;A.sound.miss();return tell((same?'Listen again. ':'Listen again. ')+PWHY[s.k])}
 s.bad=null;s.k++;A.sound.pop();tell((yes?'Yes, same start. ':'Right, not the same start. ')+PWHY[s.k-1]+(s.k>=6?' All 6 judged.':''))}
function draw(){const k=stage();if(k==='chal'){wash();pill('Challenge',A.W/2,A.H*.16,{good:1});pill('Same first sound: sun, sock, seal',A.W/2,A.H*.5,{n:15});return}
 ({bags:drawBags,odd:drawOdd,kite:drawKite,silly:drawSilly,pairs:drawPairs})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
 if(k==='bags'){const r=bagTiles().find(r=>hit(p,r)&&!st.b.inBag.includes(BAGW[r.i]));if(r){st.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const b=[0,1].find(k=>hit(p,bagR(k)));if(b!=null&&st.b.pick!=null){const i=st.b.pick;st.b.pick=null;drop(i,b,1)}return false}
 if(k==='silly'&&st.s.k<3){const r=chipRects().find(r=>p.x>=r.x&&p.x<=r.x+r.ww&&p.y>=r.y&&p.y<=r.y+r.h);if(r){st.drag={j:r.j,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='odd'){const r=trioTiles().find(r=>hit(p,r));if(r)oddPick(r.i,1);return false}
 if(k==='kite'){const r=kTiles().find(r=>hit(p,r));if(r)kPick(r.i,1);return false}
 if(k==='pairs'){const j=ansR().findIndex(r=>hit(p,r));if(j>=0)judge(j===0,1);else{const t=pairTiles().findIndex(r=>hit(p,r));if(t>=0&&st.p.k<6)voice(PAIRS[st.p.k][t],1)}}return false}
function move(p){if(!st.drag)return;st.drag.x=p.x;st.drag.y=p.y;if(stage()==='bags'){const h=[0,1].find(k=>hit(p,bagR(k)));st.b.hot=h==null?-1:h}A.redraw()}
function up(p){const d=st.drag;if(!d)return;st.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=stage();
 if(k==='bags'){st.b.hot=-1;const b=[0,1].find(k=>hit(p,bagR(k)));if(b!=null)return drop(d.i,b,1);if(tap){st.b.pick=d.i;voice(BAGW[d.i],1);return tell(`${up1(BAGW[d.i])} picked. Now tap the bag it belongs in.`)}A.redraw();return}
 if(k==='silly'){if(tap||hit(p,blankR()))fill(d.j,1);else A.redraw()}}
function fresh(){gen++;for(const k in st)delete st[k];Object.assign(st,{b:{inBag:[],bad:null,hot:-1,pick:null},o:{k:0,bad:-1},k:{got:[],bad:null},s:{k:0,bad:null},p:{k:0,bad:null},drag:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pad();st.hook()}
const check=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){fresh();tell(desc);st.hook=check(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function pad(){if(!ctl)return;ctl.innerHTML='';const k=stage(),Btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='bags')BAGW.forEach((w,i)=>{if(!st.b.inBag.includes(w)){Btn(`${PIC[w]} ${w} → 🐍`,()=>drop(i,0,1),`Put ${w} in the Sss snake's bag`);Btn(`${PIC[w]} ${w} → 🐒`,()=>drop(i,1,1),`Put ${w} in the Mmm monkey's bag`)}});
 if(k==='odd'&&st.o.k<4)TRIO[st.o.k][0].forEach((w,i)=>Btn(`${PIC[w]} ${w}`,()=>oddPick(i,1),`${w} starts with a different sound`));
 if(k==='kite'&&st.k.got.length<3)KW.forEach((w,i)=>{if(!st.k.got.includes(w))Btn(`${PIC[w]} ${w}`,()=>kPick(i,1),`Does ${w} start like kite?`)});
 if(k==='silly'&&st.s.k<3){const f=FR[st.s.k];f[1].forEach((w,j)=>Btn(`${w} ${f[0]}`,()=>fill(j,1),`Put ${w} before ${f[0]}`))}
 if(k==='pairs'&&st.p.k<6){const [a,b]=PAIRS[st.p.k];Btn(`✓ ${a}, ${b}: same start`,()=>judge(1,1));Btn(`✗ ${a}, ${b}: not the same`,()=>judge(0,1))}}
const steps=[
{h:'Two sound bags',p:'The Sss snake wants things that start with sss. The Mmm monkey wants things that start with mmm. Say each word slowly, then drag it to a bag, or tap it and then a bag.',
 task:'Put all 6 pictures in the right bag',show:()=>play(0,[[0,0],[1,1],[2,0],[3,1],[4,0],[5,1]].map(([i,k])=>()=>drop(i,k)),600),
 go:()=>begin(0,'Two bags: the Sss snake and the Mmm monkey. Six pictures: sun, moon, sock, mouse, seal, milk.',()=>st.b.inBag.length>=6,'Sun, sock and seal start with sss. Moon, mouse and milk start with mmm. You listened to the very first sound.')},
{h:'Who starts differently?',p:'Two words start with the same sound. One does not. Say all three and tap the one that starts differently. Watch out for rhymes!',
 predict:{q:'Sun and bun sound alike. Do they start with the same sound?',opts:['Yes, they sound alike','No, listen to the first sound'],ans:1},task:'Find the odd one in all 4 sets',
 show:()=>play(1,TRIO.map(t=>()=>oddPick(t[1])),650),
 go:()=>begin(1,'Three pictures: sun, sock and bun.',()=>st.o.k>=4,'Bun, house, cat and log each rhymed with a word in their set, but started with a different sound. Rhyme is the end, alliteration is the start.')},
{h:'Starts like kite',p:'Kite starts with k. Tap every picture that starts with the same sound as kite. Listen, do not look at the letters.',
 predict:{q:'Kite and cake are written with different first letters. Do they start with the same sound?',opts:['No, the letters are different','Yes, both start with k'],ans:1},task:'Find all 3 that start like kite',
 show:()=>play(2,[0,2,4].map(i=>()=>kPick(i)),700),
 go:()=>begin(2,'Kite at the top. Five pictures below: cake, goat, key, cheese and cat.',()=>st.k.got.length>=3,'Cake, key and cat start with k, like kite, even though cake and cat are written with c. Goat starts with g and cheese with ch.')},
{h:'Silly phrases',p:'Make a silly phrase where both words start the same. Drag a word into the gap, or tap it.',task:'Make all 3 silly phrases',
 show:()=>play(3,FR.map(f=>()=>fill(f[2])),700),
 go:()=>begin(3,'A gap, then a bear. Three words: fluffy, bouncy, little.',()=>st.s.k>=3,'Bouncy bear, funny fish, dizzy dog. Both words in each phrase start with the same sound: that is alliteration.')},
{h:'Start or end?',p:'Say both words. Do they START with the same sound? Tap Same start or Not the same. Tap a picture to hear it.',
 predict:{q:'Fish starts with fff. Leaf ends with fff. Do fish and leaf start the same?',opts:['Yes, both have fff','No, leaf only ends with fff'],ans:1},task:'Judge all 6 pairs',
 show:()=>play(4,PAIRS.map(p=>()=>judge(p[2])),650),
 go:()=>begin(4,'Two pictures: fish and fork. Do they start the same?',()=>st.p.k>=6,'Fish and fork, moon and mop, dog and door start the same. Leaf and bus only end with the sound, and shoe starts with sh, not sss.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.hook()});
function slip(t){let m='Say both words slowly and listen to the very first sound.';
 if(t==='rhyme')m='Those two rhyme: they END the same. Alliteration is about the START. Sun, sock: sss, sss.';
 if(t==='spell')m='Listen, do not look. The letters can differ while the sound is the same (cake, kite), or a letter can make a new sound (sh).';
 if(t==='end')m='That sound is at the end of the word. Only the first sound counts: bus starts with b.';
 if(t==='mean')m='Those words go together, but alliteration is about sound, not meaning. Listen to the first sound.';
 if(t==='close')m='Close, but not the same. Coat starts with k and goat with g: g has a hum in your throat.';
 return m}
function quiz(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:B=>{chal.hidden=B.step!==5;ctl.hidden=B.step===5;pad()},
 init:B=>{A=B;const box=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'First sound buttons'},box);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pad()}}).start()})})();
