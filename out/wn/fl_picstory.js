/* Flagship – telling a story from picture cards (ages 3–4; Development Matters 2021 Communication and Language: 3–4
   "tell a long story", Reception "retell the story" and "describe events in some detail"; Literacy: "anticipate key
   events in stories"). Scenes: put Ben's balloon story in order, tell the puddle story with first, next, then and last,
   swap two egg cards and hear the story turn silly, fix three mixed-up stories, and pick an ending that fits. Drag or
   tap on the canvas; every move also has a button. Data in learn/picstory_art.js. */
(()=>{const {BALLOON,PUDDLE,TIMEW,EGG,MIXUPS,ENDS,QS}=PICS;
VIS.reg('flagpicstory',c=>{let A,tray,chal,qno=-1,ver=0;const T={};c.fig.classList.add('young');
const INKC='#1f2937',RIGHT='#047857',WRONG='#b91c1c',RULE='#64748b',LIFT='#7c3aed',FACE='px system-ui,sans-serif';
const part=()=>['order','tell','swap','fix','end','quiz'][A.step];
const big=n=>A.narrow?n:Math.round(n*1.12);
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ffedd5',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function banner(t,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=`800 ${n}${FACE}`;let w=g.measureText(t).width+24;
 while(w>A.W-12&&n>10){n--;g.font=`800 ${n}${FACE}`;w=g.measureText(t).width+24}
 const h=n+16,x=(A.W-w)/2;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(x,y-h/2,w,h,8);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?RIGHT:o.no?WRONG:RULE;g.stroke();
 g.fillStyle=INKC;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function lines(t,max,g){const out=[''];t.split(' ').forEach(w=>{const k=out.length-1,s=out[k]?out[k]+' '+w:w;if(g.measureText(s).width>max&&out[k])out.push(w);else out[k]=s});return out}
function picture(r,pic,cap,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.lineWidth=o.ok||o.no||o.on?4:2;g.strokeStyle=o.no?WRONG:o.ok?RIGHT:o.on?LIFT:RULE;g.stroke();g.textAlign='center';g.textBaseline='middle';
 if(pic){g.font=`${Math.round(Math.min(r.w*.42,r.h*(cap?.36:.55)))}${FACE}`;g.fillStyle='#000';g.fillText(pic,r.x+r.w/2,r.y+r.h*(cap?.33:.5))}
 if(cap){const n=Math.round(Math.max(11,Math.min(big(13),r.h*.13)));g.font=`800 ${n}${FACE}`;g.fillStyle=INKC;const L=lines(cap,r.w-10,g).slice(0,3);L.forEach((s,j)=>g.fillText(s,r.x+r.w/2,r.y+r.h*.74+(j-(L.length-1)/2)*(n+2),r.w-8))}}
function under(t,r,o){const g=A.ctx;g.font=`900 ${big(13)}${FACE}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=o&&o.ok?(A.col.dark?'#6ee7b7':RIGHT):A.col.tx;g.fillText(t,r.x+r.w/2,r.y+r.h+14)}
function strip(n,top,h){const gap=8,w=Math.min(150,(A.W-gap*(n+1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+i*(w+gap),y:top,w,h}))}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const NAMES=/^(Ben|Kim|Ana|Pip|Ms|Sam)\b/,low=s=>NAMES.test(s)?s:s.charAt(0).toLowerCase()+s.slice(1);
/* 1. put the balloon story in order */
const holeR=()=>strip(3,A.H*.14,A.H*.34),poolR=()=>strip(3,A.H*.62,A.H*.32);
function drawOrder(){const s=T.a;paper();const full=s.slot.every(v=>v!=null);
 banner(full?'First, next, last: the story makes sense':'Drag each card to its place',A.H*.06,{ok:full,n:13});
 holeR().forEach((r,j)=>{const k=s.slot[j];if(k==null){A.ctx.setLineDash([6,5]);picture(r,'','',{on:s.hot===j,bg:A.col.dark?'#f1f5f9':'#ffffff'});A.ctx.setLineDash([])}else picture(r,BALLOON[k][0],BALLOON[k][1],{ok:1,bg:'#ecfdf5'});under(TIMEW[[0,1,3][j]],r,{ok:k!=null})});
 poolR().forEach((r,m)=>{const k=s.pool[m];if(s.slot.includes(k)||(T.drag&&T.drag.k===k))return;picture(r,BALLOON[k][0],BALLOON[k][1],{no:s.bad===k,on:s.pick===k})});
 if(T.drag){const d=T.drag,r=poolR()[0];picture({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},BALLOON[d.k][0],BALLOON[d.k][1],{on:1})}}
function place(k,j){const s=T.a;if(s.slot.includes(k)||s.slot[j]!=null)return;s.pick=null;const word=TIMEW[[0,1,3][j]].toLowerCase();
 if(k!==j){s.bad=k;A.sound.miss();return tell(`${BALLOON[k][1]} is not ${word}. ${BALLOON[k][2]}`)}
 s.slot[j]=k;s.bad=null;A.sound.pop();tell(s.slot.every(v=>v!=null)?'First, Ben gets a balloon. Next, the wind blows it. Last, Ben is sad.':`${TIMEW[[0,1,3][j]]}: ${low(BALLOON[k][1])}.`)}
const nextHole=()=>T.a.slot.indexOf(null);
/* 2. tell the puddle story with time words */
const rainR=()=>strip(4,A.H*.12,A.H*.38),wordR=()=>strip(4,A.H*.7,A.H*.16);
function drawTell(){const s=T.b;paper();const all=s.tag.every(v=>v!=null);
 banner(all?'You told the whole story!':'Drag a word under each card',A.H*.05,{ok:all,n:13});
 rainR().forEach((r,j)=>{picture(r,PUDDLE[j][0],PUDDLE[j][1],{ok:s.tag[j]!=null,no:s.bad===j,on:s.hot===j});const w=s.tag[j];under(w==null?'?':TIMEW[w],r,{ok:w!=null})});
 wordR().forEach((r,m)=>{if(s.tag.includes(m)||(T.drag&&T.drag.w===m))return;picture(r,'',TIMEW[m],{on:s.pick===m,bg:'#fef9c3'})});
 if(T.drag){const d=T.drag,r=wordR()[0];picture({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},'',TIMEW[d.w],{on:1,bg:'#fef9c3'})}}
function label(w,j){const s=T.b;if(s.tag.includes(w)||s.tag[j]!=null)return;s.pick=null;
 const okHere=j===0?w===0:j===3?w===3:(w===1||w===2);
 if(!okHere){s.bad=j;A.sound.miss();return tell(w===3?'Last is for the end of the story. Kim jumps in at the end.':w===0?'First is for the start. The clouds come first.':j===0?`${TIMEW[w]} is for the middle. The start needs First.`:`${TIMEW[w]} is for the middle. The end needs Last.`)}
 s.tag[j]=w;s.bad=null;A.sound.pop();
 tell(s.tag.every(v=>v!=null)?s.tag.map((v,i)=>`${TIMEW[v]}, ${low(PUDDLE[i][1])}`).join('. ')+'!':`${TIMEW[w]}, ${low(PUDDLE[j][1])}.`)}
/* 3. swap the egg cards */
const eggR=()=>strip(3,A.H*.2,A.H*.4);
const sorted=a=>a.every((v,i)=>v===i);
function drawSwap(){const s=T.c;paper();const fine=sorted(s.now);
 banner(fine?(s.swaps?'Back in order: egg, crack, chick':'Tap two cards to swap them'):'Silly story! Swap them back',A.H*.07,{ok:fine&&s.swaps,no:!fine,n:13});
 eggR().forEach((r,m)=>{if(T.drag&&T.drag.m===m)return;const k=s.now[m];picture(r,EGG[k][0],EGG[k][1],{on:s.pick===m||s.hot===m,ok:fine&&s.swaps,no:!fine&&k!==m});under(TIMEW[[0,1,3][m]],r)});
 if(T.drag){const d=T.drag,r=eggR()[0],k=s.now[d.m];picture({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},EGG[k][0],EGG[k][1],{on:1})}
 banner(s.now.map((k,m)=>`${TIMEW[[0,1,3][m]]} ${low(EGG[k][1].replace('!',''))}`).join('. ')+'.',A.H*.82,{n:12,bg:'#fef9c3'})}
function swapEgg(a,b){const s=T.c;if(a===b)return;s.pick=null;[s.now[a],s.now[b]]=[s.now[b],s.now[a]];s.swaps++;A.sound.pop();
 tell(sorted(s.now)?'An egg, it cracks, a chick! Back in order, the story makes sense again.':`Now it says: ${s.now.map(k=>low(EGG[k][1].replace('!',''))).join(', then ')}. That cannot happen. The order changes the story.`)}
/* 4. fix three mixed-up stories */
const mixR=()=>strip(3,A.H*.2,A.H*.4);
function drawFix(){const s=T.d;paper();
 if(s.k>=MIXUPS.length){banner('All 3 stories fixed',A.H*.1,{ok:1});MIXUPS.forEach((m,j)=>banner(m.cards.map(x=>x[0]+' '+x[1]).join(' → '),A.H*(.32+j*.18),{n:12}));return}
 const M=MIXUPS[s.k];banner(`Story ${s.k+1} of 3: tap the 2 cards that are mixed up`,A.H*.07,{n:13});
 mixR().forEach((r,m)=>{const k=s.now[m];picture(r,M.cards[k][0],M.cards[k][1],{on:s.pick===m,no:s.bad===m});under(TIMEW[[0,1,3][m]],r)})}
function tapMix(m){const s=T.d;if(s.k>=MIXUPS.length)return;const M=MIXUPS[s.k];
 if(s.now[m]===m){s.bad=m;s.pick=null;A.sound.miss();return tell(`${M.cards[m][1]} is in the right place. Look for a card that cannot happen yet.`)}
 if(s.pick==null){s.pick=m;s.bad=null;A.sound.tick();return tell(`Picked ${low(M.cards[s.now[m]][1])}. Now tap the card to swap it with.`)}
 const a=s.pick;s.pick=null;if(a===m)return tell('Tap a different card to swap with.');
 [s.now[a],s.now[m]]=[s.now[m],s.now[a]];A.sound.pop();s.k++;s.bad=null;
 if(s.k<MIXUPS.length)s.now=MIXUPS[s.k].shown.slice();
 tell(`Fixed: ${M.cards.map(x=>low(x[1])).join(', then ')}. ${M.why}`+(s.k<MIXUPS.length?' Next story.':''))}
/* 5. pick an ending */
const endR=()=>strip(4,A.H*.12,A.H*.36),optR=()=>strip(3,A.H*.62,A.H*.3);
function drawEnd(){const s=T.e;paper();
 if(s.k>=ENDS.length){banner('Both stories have an ending that fits',A.H*.1,{ok:1});ENDS.forEach((e,j)=>banner(e.cards.map(x=>x[0]).join(' ')+' '+e.opts[0][0]+' '+e.opts[0][1],A.H*(.35+j*.2),{n:13}));return}
 const E=ENDS[s.k];banner(`Story ${s.k+1} of 2: what happens last?`,A.H*.05,{n:13});
 endR().forEach((r,j)=>{if(j<3)picture(r,E.cards[j][0],E.cards[j][1]);else{A.ctx.setLineDash([6,5]);picture(r,'❓','',{on:s.hot===1,bg:'#ffffff'});A.ctx.setLineDash([])}under(TIMEW[j],r)});
 optR().forEach((r,j)=>{if(T.drag&&T.drag.j===j)return;const o=E.opts[s.ord[j]];picture(r,o[0],o[1],{no:s.bad===s.ord[j]})});
 if(T.drag){const d=T.drag,r=optR()[0],o=E.opts[s.ord[d.j]];picture({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},o[0],o[1],{on:1})}}
function ending(j){const s=T.e;if(s.k>=ENDS.length)return;const E=ENDS[s.k],o=E.opts[s.ord[j]];
 if(o[2]!=='ok'){s.bad=s.ord[j];A.sound.miss();return tell(o[2]==='again'?`${o[1]} already happened at the start. The end is something new.`:`${o[1]} is not part of this story. The end comes from what happened before.`)}
 s.k++;s.bad=null;A.sound.pop();tell(`Last, ${low(o[1])}. ${E.cards.map(x=>low(x[1])).join(', ')}, and ${low(o[1])}.`+(s.k<ENDS.length?' Next story.':''))}
function draw(){const k=part();if(k==='quiz'){paper();banner('Challenge',A.H*.18,{ok:1});banner('🖼️ First · Next · Then · Last',A.H*.5,{n:15});return}
 ({order:drawOrder,tell:drawTell,swap:drawSwap,fix:drawFix,end:drawEnd})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='order'){const s=T.a,m=poolR().findIndex(r=>inside(p,r)&&!s.slot.includes(s.pool[poolR().indexOf(r)]));if(m>=0){T.drag={k:s.pool[m],x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const j=holeR().findIndex(r=>inside(p,r));if(j>=0&&s.pick!=null)place(s.pick,j);return false}
 if(k==='tell'){const s=T.b,m=wordR().findIndex(r=>inside(p,r));if(m>=0&&!s.tag.includes(m)){T.drag={w:m,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const j=rainR().findIndex(r=>inside(p,r));if(j>=0&&s.pick!=null)label(s.pick,j);return false}
 if(k==='swap'){const m=eggR().findIndex(r=>inside(p,r));if(m>=0){T.drag={m,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='fix'){const m=mixR().findIndex(r=>inside(p,r));if(m>=0)tapMix(m);return false}
 if(k==='end'){const j=optR().findIndex(r=>inside(p,r));if(j>=0&&T.e.k<ENDS.length){T.drag={j,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}return false}
function move(p){const d=T.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=part();
 if(k==='order')T.a.hot=holeR().findIndex(r=>inside(p,r));if(k==='tell')T.b.hot=rainR().findIndex(r=>inside(p,r));
 if(k==='swap')T.c.hot=eggR().findIndex(r=>inside(p,r)&&r.i!==d.m);if(k==='end')T.e.hot=inside(p,endR()[3])?1:0;A.redraw()}
function lift(p){const d=T.drag;if(!d)return;T.drag=null;const k=part(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(k==='order'){T.a.hot=-1;const j=holeR().findIndex(r=>inside(p,r));if(j>=0)return place(d.k,j);if(tap){T.a.pick=d.k;return tell(`Picked ${low(BALLOON[d.k][1])}. Now tap First, Next or Last.`)}}
 if(k==='tell'){T.b.hot=-1;const j=rainR().findIndex(r=>inside(p,r));if(j>=0)return label(d.w,j);if(tap){T.b.pick=d.w;return tell(`Picked ${TIMEW[d.w]}. Now tap a card.`)}}
 if(k==='swap'){const s=T.c;s.hot=-1;const m=eggR().findIndex(r=>inside(p,r));if(m>=0&&m!==d.m)return swapEgg(d.m,m);
  if(tap){if(s.pick==null||s.pick===d.m){s.pick=s.pick===d.m?null:d.m;return tell(s.pick==null?'Not picked.':`Picked ${low(EGG[s.now[d.m]][1].replace('!',''))}. Tap another card to swap.`)}return swapEgg(s.pick,d.m)}}
 if(k==='end'){T.e.hot=0;if(inside(p,endR()[3])||tap)return ending(d.j)}A.redraw()}
function reset(){ver++;for(const k in T)delete T[k];Object.assign(T,{a:{slot:[null,null,null],pool:[2,0,1],bad:null,pick:null,hot:-1},b:{tag:[null,null,null,null],bad:null,pick:null,hot:-1},
 c:{now:[0,1,2],swaps:0,pick:null,hot:-1},d:{k:0,now:MIXUPS[0].shown.slice(),pick:null,bad:null},e:{k:0,ord:[1,0,2],bad:null,hot:0},drag:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();T.hook()}
const check=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){reset();tell(desc);T.hook=check(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const v0=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v0===ver)f()},ms*(j+1)))}
function buttons(){if(!tray)return;tray.innerHTML='';const k=part(),Btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if(k==='order'){const s=T.a,j=nextHole();if(j>=0)s.pool.forEach(q=>{if(!s.slot.includes(q))Btn(`${BALLOON[q][0]} ${BALLOON[q][1]} → ${TIMEW[[0,1,3][j]]}`,()=>place(q,nextHole()),`Put ${BALLOON[q][1]} as ${TIMEW[[0,1,3][j]]}`)})}
 if(k==='tell'){const s=T.b,j=s.tag.indexOf(null);if(j>=0)TIMEW.forEach((w,m)=>{if(!s.tag.includes(m))Btn(`${w} → ${PUDDLE[j][1]}`,()=>label(m,j),`Say ${w} for ${PUDDLE[j][1]}`)})}
 if(k==='swap'){[[0,1],[1,2],[0,2]].forEach(([a,b])=>Btn(`⇄ Swap card ${a+1} and ${b+1}`,()=>swapEgg(a,b)))}
 if(k==='fix'&&T.d.k<MIXUPS.length){const M=MIXUPS[T.d.k];T.d.now.forEach((q,m)=>Btn(`${M.cards[q][0]} ${M.cards[q][1]}`,()=>tapMix(m),`Tap card ${m+1}: ${M.cards[q][1]}`))}
 if(k==='end'&&T.e.k<ENDS.length){const E=ENDS[T.e.k];T.e.ord.forEach((q,j)=>Btn(`${E.opts[q][0]} ${E.opts[q][1]}`,()=>ending(j),`End with ${E.opts[q][1]}`))}}
const steps=[
{h:'Put it in order',p:'Here is a story about Ben. Drag each picture to First, Next or Last. You can also tap a picture, then a place.',
 task:'Put all 3 cards in order',show:()=>play(0,[()=>place(0,0),()=>place(1,1),()=>place(2,2)],700),
 go:()=>open(0,'Three empty places: First, Next and Last. Three pictures: Ben is sad, Ben gets a balloon, the wind blows it.',()=>T.a.slot.every(v=>v!=null),'First, next, last. You told Ben\'s story in order.')},
{h:'Tell it with words',p:'Story words say when things happen. Drag First, Next, Then or Last under each picture.',
 task:'Put a word under all 4 cards',show:()=>play(1,[0,1,2,3].map(j=>()=>label(j,j)),650),
 go:()=>open(1,'Four pictures: grey clouds come, it rains, big puddles, Kim jumps in. Four words: First, Next, Then, Last.',()=>T.b.tag.every(v=>v!=null),'First and Last mark the start and the end. Next and Then are for the middle.')},
{h:'Swap two cards',p:'Tap two cards to swap them, or drag one onto another. Listen to the new story. Then put it right.',
 predict:{q:'You swap two cards. Is it the same story?',opts:['Yes: same pictures, same story','No: the order changes what happens'],ans:1},task:'Swap, then put it back in order',
 show:()=>play(2,[()=>swapEgg(0,2),()=>swapEgg(0,2)],1100),
 go:()=>open(2,'Egg, it cracks, a chick. In order.',()=>T.c.swaps>0&&sorted(T.c.now),'The same pictures in a new order tell a new story, and this one was silly. Order matters.')},
{h:'Spot the mix-up',p:'Two cards in each story are in the wrong place. Tap them both to swap them.',
 predict:{q:'Shoes on, then socks on. Does that work?',opts:['Yes, any order is fine','No, socks go on first'],ans:1},task:'Fix all 3 stories',
 show:()=>play(3,[()=>tapMix(0),()=>tapMix(1),()=>tapMix(1),()=>tapMix(2),()=>tapMix(0),()=>tapMix(2)],500),
 go:()=>open(3,'Story 1: shoes on, socks on, go out.',()=>T.d.k>=MIXUPS.length,'You found the card that could not happen yet, and swapped it into place.')},
{h:'How does it end?',p:'Look at the first three cards. Drag the card that comes last into the ? box, or tap it.',
 task:'Pick an ending for both stories',show:()=>play(4,[()=>ending(1),()=>ending(1)],1200),
 go:()=>open(4,'Ana waters a plant, the sun comes out, it grows tall. What comes last?',()=>T.e.k>=ENDS.length,'The end comes from what happened before. Something new, not the start again.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.hook()});
function why(t){let m='Think about what has to happen first.';
 if(t==='swap')m='The egg cracks before the chick comes out. Swap them back.';
 if(t==='same')m='The order changes what happens. A swap makes a new story.';
 if(t==='end')m='Last is for the end. The story starts with First.';
 if(t==='mid')m='Then is for the middle. The story starts with First.';
 if(t==='again')m='That happened at the start. The end is something new.';
 if(t==='off')m='That is not part of this story. The end comes from what happened.';
 return m}
function ask(){qno++;const Q=QS[qno%QS.length],all=[[Q.a,'ok'],...Q.o],r=qno%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:S=>{chal.hidden=S.step!==5;tray.hidden=S.step===5;buttons()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Story buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:lift});buttons()}}).start()})})();
