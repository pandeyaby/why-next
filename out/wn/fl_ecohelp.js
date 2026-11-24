/* Flagship – caring for our local environment (ages 5–6; NGSS K-ESS3-3, reducing human impact on land, water, air
   and living things). Pick up park litter that hurts animals (and leave the flowers and snails), sort six things into
   recycling, food waste and rubbish, choose to use things again rather than buy new, brush teeth with the tap off,
   and switch off lights and a TV in empty rooms but not a light someone is reading by. Data and drawings: eco_art.js.
   Every canvas tap has a button twin below. */
(()=>{const E=ECO;
VIS.reg('flagecohelp',c=>{let A,P,pad,cq,qn=-1,run=0;const K={};c.fig.classList.add('young');
const mode=()=>['litter','sort','reuse','tap','power','quiz'][A.step];
const near=(p,o)=>Math.hypot(p.x-o.px,p.y-o.py)<=o.pr;
const inBox=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function sky(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f1f17':'#f0fdf4';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. litter in the park ---------- */
let SPOTS=[];
function pickUp(i){const l=K.li;if(l.got.includes(i))return;l.got.push(i);A.sound.pop();const x=E.LITTER[i];
 say(`The ${x.t} is in the bin. ${x.hurt} Now the ${x.n} is safe.`,false)}
function touchKeep(j){A.sound.miss();say(E.KEEP[j].why,true)}
function drawLitter(){const l=K.li,y0=P.strip(l.got.length>=4?E.DONE[0]:`Litter in the bin: ${l.got.length} of 4. Tap the litter.`,l.got.length>=4?'ok':K.bad?'no':'',K.note,K.bad),g=A.ctx;
 const x=8,y=y0,w=A.W-16,h=A.H-y0-8,s=Math.min(w,h)*.18;E.park(g,x,y,w,h);E.emo(g,'🗑️',x+w-s*.7,y+s*.7,s*.9);P.text(`${l.got.length}`,x+w-s*.7,y+s*1.4,14,'center','#0f172a');SPOTS=[];
 E.LITTER.forEach((o,i)=>{const px=x+o.x*w,py=y+o.y*h;const ax=Math.max(x+s*.5,Math.min(x+w-s*.5,px+(o.x<.5?1:-1)*s*.95));E.emo(g,o.a,ax,py-s*.25,s*.8);if(!l.got.includes(i)){E.emo(g,o.e,px,py,s);SPOTS.push({k:'l',i,px,py,pr:s*.8})}});
 E.KEEP.forEach((o,j)=>{const px=x+o.x*w,py=y+o.y*h;E.emo(g,o.e,px,py,s*.8);SPOTS.push({k:'k',i:j,px,py,pr:s*.6})})}
/* ---------- 2. which bin? ---------- */
let BINR=[];
function toBin(b){const s=K.so;if(s.i>=E.ITEMS.length)return;const it=E.ITEMS[s.i];
 if(b!==it.b){s.no=b;A.sound.miss();
  if(it.b===2&&b===0)return say('Crisp packets are shiny, but they cannot go in the home recycling. Try another bin.',true);
  if(it.b===1)return say(`A ${it.t.toLowerCase()} is food. Food scraps go in the food waste bin to make compost.`,true);
  return say(`A ${it.t.toLowerCase()} can be made into something new. Do not throw it away.`,true)}
 s.i++;s.no=-1;A.sound.pop();say(E.WHY[b],false)}
function drawSort(){const s=K.so,it=E.ITEMS[s.i],y0=P.strip(it?`Thing ${s.i+1} of 6: ${it.t}. Which bin?`:E.DONE[1],it?(K.bad?'no':''):'ok',K.note,K.bad),g=A.ctx;
 const bh=Math.min(A.H*.3,150),by=A.H-bh-8,gp=8,bw=(A.W-16-gp*2)/3;
 if(it){const cs=Math.min(by-y0-12,A.W*.36,170),cx=A.W/2;P.card({x:cx-cs/2,y:y0+2,w:cs,h:cs},'');E.emo(g,it.e,cx,y0+2+cs*.42,cs*.5);P.text(it.t,cx,y0+2+cs*.84,15,'center','#0f172a')}
 BINR=E.BINS.map((b,j)=>{const r={j,x:8+j*(bw+gp),y:by,w:bw,h:bh};P.card(r,'',{no:s.no===j,sel:!it});E.emo(g,b.e,r.x+bw/2,r.y+bh*.4,Math.min(bw,bh)*.42);P.text(b.t,r.x+bw/2,r.y+bh*.82,15,'center','#0f172a');return r})}
/* ---------- 3. use it again ---------- */
let PICK=[];
function choose(j){const u=K.re;if(u.k>=E.PAIRS.length)return;const p=E.PAIRS[u.k];
 if(j===0){u.no=0;A.sound.miss();return say(`${p[0].t}: that is one more thing to throw away. Is there a way to use something again?`,true)}
 u.k++;u.no=-1;A.sound.pop();say(`${p[1].t}: no new rubbish!`,false)}
function drawReuse(){const u=K.re,p=E.PAIRS[u.k],y0=P.strip(p?`Choice ${u.k+1} of 3. Pick the one that makes less rubbish.`:E.DONE[2],p?(K.bad?'no':''):'ok',K.note,K.bad),g=A.ctx;
 if(!p){E.emo(g,'🌍',A.W/2,(y0+A.H)/2,Math.min(A.W,A.H-y0)*.4);PICK=[];return}
 const gp=10,w=(A.W-16-gp)/2,h=Math.min(A.H-y0-12,w*1.1);PICK=p.map((o,j)=>{const r={j,x:8+j*(w+gp),y:y0+4,w,h};P.card(r,'',{no:u.no===j});E.emo(g,o.e,r.x+w/2,r.y+h*.4,Math.min(w,h)*.42);
  P.wrap(o.t,w-12,`800 ${P.sz(16)}${P.F}`).forEach((t,i,a)=>P.text(t,r.x+w/2,r.y+h*.8+(i-(a.length-1)/2)*P.sz(16)*1.2,16,'center','#0f172a'));return r})}
/* ---------- 4. tap off while brushing ---------- */
let TAPR=null,BRUSHR=null;
function flip(){const t=K.tp;if(t.n>=E.BRUSHES)return;t.on=!t.on;A.sound.tick();say(t.on?'Tap on. Water is running down the drain.':'Tap off. The water stays in the pipes until you need it.',false)}
function brush(){const t=K.tp;if(t.n>=E.BRUSHES)return;t.n++;if(t.on){t.used+=E.PER;A.sound.miss();say(`You brushed with the tap running: ${E.PER} more litres went down the drain. Turn the tap off.`,true)}
 else{A.sound.pop();say(`30 seconds of brushing, ${t.n*30} seconds so far. No water wasted.`,false)}
 if(t.n>=E.BRUSHES&&t.used>E.GOAL)say(`Teeth clean, but ${t.used} litres were used. Start again and turn the tap off first.`,true)}
function again(){K.tp={on:true,n:0,used:E.WET};A.sound.tick();say('Start again. Your brush is wet and the tap is on.',false)}
function drawTap(){const t=K.tp,ok=t.n>=E.BRUSHES&&t.used<=E.GOAL,y0=P.strip(ok?E.DONE[3]:`Brushing: ${t.n*30} of 120 seconds. Water used: ${t.used} litre${t.used===1?'':'s'}.`,ok?'ok':K.bad?'no':'',K.note,K.bad),g=A.ctx;
 const gp=10,w=(A.W-16-gp*2)/3,h=Math.min(A.H-y0-12,w*1.4);TAPR={x:8,y:y0+4,w,h};BRUSHR={x:8+w+gp,y:y0+4,w,h};
 P.card(TAPR,'',{sel:t.on});E.emo(g,'🚰',TAPR.x+w/2,TAPR.y+h*.36,Math.min(w,h)*.42);if(t.on)E.emo(g,'💧',TAPR.x+w/2,TAPR.y+h*.62,Math.min(w,h)*.2);P.text(t.on?'Tap on':'Tap off',TAPR.x+w/2,TAPR.y+h*.86,15,'center','#0f172a');
 P.card(BRUSHR,'');E.emo(g,'🪥',BRUSHR.x+w/2,BRUSHR.y+h*.4,Math.min(w,h)*.42);P.text('Brush',BRUSHR.x+w/2,BRUSHR.y+h*.86,15,'center','#0f172a');
 const bx=8+2*(w+gp)+w*.2;E.bucket(g,bx,y0+4+h*.12,w*.6,h*.62,t.used,E.BRUSHES*E.PER+E.WET);P.text(`${t.used} litre${t.used===1?'':'s'}`,8+2*(w+gp)+w/2,y0+4+h*.86,15,'center')}
/* ---------- 5. switch it off ---------- */
let THINGS=[];
function off(r,k){const o=K.pw;if(E.ROOMS[r].who){A.sound.miss();return say(`Someone is reading in the ${E.ROOMS[r].t.toLowerCase()}. They need the light, so leave it on.`,true)}
 const id=r+':'+k;if(o.off.includes(id))return;o.off.push(id);A.sound.pop();say(`${E.ROOMS[r].on[k]==='📺'?'TV':'Light'} off in the empty ${E.ROOMS[r].t.toLowerCase()}.`,false)}
const need=()=>E.ROOMS.reduce((n,r)=>n+(r.who?0:r.on.length),0);
function drawPower(){const o=K.pw,ok=o.off.length>=need(),y0=P.strip(ok?E.DONE[4]:`Switched off: ${o.off.length} of ${need()}. Tap things in empty rooms.`,ok?'ok':K.bad?'no':'',K.note,K.bad),g=A.ctx;
 const gp=8,w=(A.W-16-gp)/2,h=(A.H-y0-8-gp)/2;THINGS=[];
 E.ROOMS.forEach((rm,r)=>{const R={x:8+(r%2)*(w+gp),y:y0+Math.floor(r/2)*(h+gp),w,h};const lit=rm.on.some((_,k)=>!o.off.includes(r+':'+k));
  g.fillStyle=lit?'#fef9c3':'#cbd5e1';A.paint.rrect(R.x,R.y,R.w,R.h,10);g.fill();g.lineWidth=1.6;g.strokeStyle=RIMC();g.stroke();P.text(rm.t,R.x+10,R.y+P.sz(14),14,'left','#0f172a');
  const s=Math.min(w/3.4,h*.42);rm.on.forEach((e,k)=>{const cx=R.x+s*(.8+k*1.3),cy=R.y+h*.6,isOff=o.off.includes(r+':'+k);g.globalAlpha=isOff?.35:1;E.emo(g,e,cx,cy,s*.8);g.globalAlpha=1;if(!isOff)THINGS.push({r,k,x:cx-s*.6,y:cy-s*.6,w:s*1.2,h:s*1.2})});
  if(rm.who)E.emo(g,'🧒'+rm.who,R.x+w-s*1.2,R.y+h*.6,s*.7);else if(!rm.on.length)P.text('Already off',R.x+w/2,R.y+h*.6,14,'center','#0f172a')})}
const RIMC=()=>'#64748b';
/* ---------- wiring ---------- */
function draw(){sky();const m=mode();if(m==='quiz'){P.strip('Challenge: looking after our world','ok');E.emo(A.ctx,'🌍',A.W/2,A.H*.58,Math.min(A.W,A.H)*.36);return}
 ({litter:drawLitter,sort:drawSort,reuse:drawReuse,tap:drawTap,power:drawPower})[m]();A.fx.draw(A.ctx)}
function tap(p){const m=mode();
 if(m==='litter'){const s=SPOTS.find(z=>near(p,z));if(s){if(s.k==='l')pickUp(s.i);else touchKeep(s.i)}}
 if(m==='sort'){const b=BINR.find(z=>inBox(p,z));if(b)toBin(b.j)}
 if(m==='reuse'){const b=PICK.find(z=>inBox(p,z));if(b)choose(b.j)}
 if(m==='tap'){if(inBox(p,TAPR))flip();else if(inBox(p,BRUSHR))brush()}
 if(m==='power'){const t=THINGS.find(z=>inBox(p,z));if(t)off(t.r,t.k)}return false}
function fresh(){run++;for(const k in K)delete K[k];Object.assign(K,{li:{got:[]},so:{i:0,no:-1},re:{k:0,no:-1},tp:{on:true,n:0,used:E.WET},pw:{off:[]},note:null,bad:false,test:()=>{}})}
function say(t,bad){K.note=t;K.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.test()}
const check=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(E.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();c.say(E.DESC[i]);A.cv.setAttribute('aria-label',E.DESC[i]);K.test=check(i,ok);controls();A.redraw()}
function demo(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='litter'){E.LITTER.forEach((o,i)=>{if(!K.li.got.includes(i))B(`Pick up the ${o.t}`,()=>pickUp(i))});E.KEEP.forEach((o,j)=>B(`Pick up the ${o.t}`,()=>touchKeep(j)))}
 if(m==='sort'&&K.so.i<E.ITEMS.length)E.BINS.forEach((b,j)=>B(b.t,()=>toBin(j),`Put the ${E.ITEMS[K.so.i].t.toLowerCase()} in ${b.t.toLowerCase()}`));
 if(m==='reuse'&&K.re.k<E.PAIRS.length)E.PAIRS[K.re.k].forEach((o,j)=>B(o.t,()=>choose(j)));
 if(m==='tap'){if(K.tp.n<E.BRUSHES){B(K.tp.on?'Turn the tap off':'Turn the tap on',flip);B('Brush for 30 seconds',brush)}B('Start again',again)}
 if(m==='power')E.ROOMS.forEach((rm,r)=>rm.on.forEach((e,k)=>{if(!K.pw.off.includes(r+':'+k))B(`Switch off the ${rm.t.toLowerCase()} ${e==='📺'?'TV':'light'}`,()=>off(r,k))}))}
const steps=[
{h:'Litter hurts animals',p:E.TXT[0],task:'Put all 4 bits of litter in the bin',
 show:()=>demo(0,E.LITTER.map((_,i)=>[450,()=>pickUp(i)])),go:()=>begin(0,()=>K.li.got.length>=4)},
{h:'Which bin?',p:E.TXT[1],predict:{q:'Can a shiny crisp packet go in the home recycling?',opts:['Yes, it is shiny like a can','No, it goes in the rubbish bin'],ans:1},task:'Put all 6 things in the right bin',
 show:()=>demo(1,E.ITEMS.map(it=>[450,()=>toBin(it.b)])),go:()=>begin(1,()=>K.so.i>=E.ITEMS.length)},
{h:'Use it again',p:E.TXT[2],predict:{q:'Which makes less rubbish?',opts:['A new bottle each day, then recycle it','One bottle I fill again and again'],ans:1},task:'Make 3 choices with no new rubbish',
 show:()=>demo(2,[0,1,2].map(()=>[500,()=>choose(1)])),go:()=>begin(2,()=>K.re.k>=E.PAIRS.length)},
{h:'Turn off the tap',p:E.TXT[3],task:'Brush for 2 minutes and use no more than 2 litres',
 show:()=>demo(3,[[400,flip],[400,brush],[400,brush],[400,brush],[400,brush]]),go:()=>begin(3,()=>K.tp.n>=E.BRUSHES&&K.tp.used<=E.GOAL)},
{h:'Switch it off',p:E.TXT[4],task:'Switch off everything in the empty rooms',
 show:()=>demo(4,[[450,()=>off(0,0)],[450,()=>off(0,1)],[450,()=>off(1,0)]]),go:()=>begin(4,()=>K.pw.off.length>=need())},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.test()});
function slip(t){let m='Small jobs help our world: put litter in a bin, use things again, save water and switch off.';
 if(t==='leave')m='Litter left out can hurt animals. Put it in a bin.';
 if(t==='shiny')m='Crisp packets cannot go in the home recycling, even though they are shiny. They go in the rubbish.';
 if(t==='food')m='Food scraps go in the food waste bin. They can be made into compost for plants.';
 if(t==='recycle')m='Using the same bottle again makes no rubbish at all. Recycling is good, but using again is better.';
 if(t==='tap')m='A running tap wastes about 6 litres every minute. Turn it off while you brush.';
 if(t==='light')m='Nobody is using it, so switch it off. Making electricity can put smoke into the air.';
 if(t==='using')m='Only switch off things nobody is using. Grandad needs his light to read.';
 if(t==='flower')m='Flowers are not litter. Bees and butterflies need them, so leave them to grow.';
 return m}
function ask(){qn++;const Q=E.QS[qn%E.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>reply(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function reply(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{cq.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;P=E.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Caring for our world lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:tap});controls()}}).start()})})();
