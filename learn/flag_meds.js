/* Flagship – medicines and household products: ask first (ages 4–5; PSHE Association KS1 Health and wellbeing and
   Keeping safe; EYFS 2021 ELG Managing Self (manage basic hygiene and personal needs, understand
   healthy choices); NHS and CAPT accidental-poisoning guidance). Scenes: flip look-alike pairs, pick who can
   give you medicine, sort bottles with and without a warning diamond, choose what to do with a found tablet or bottle,
   sort medicine rules. Data in learn/meds_art.js. */
(()=>{const {PAIRS,GIVE,BOTTLES,FOUND,ACTS,RULES,DESC,DONE,QS}=MED;
VIS.reg('flagmeds',c=>{let A,btns,cq,n=-1,epoch=0;const M={};c.fig.classList.add('young');
const NAVY='#172554',OKC='#15803d',NOC='#b91c1c',GREY='#6b7280',SEL='#6d28d9',FNT='px system-ui,sans-serif';
const now=()=>['pairs','give','bottles','found','rules','quiz'][A.step];
const big=v=>A.narrow?v:Math.round(v*1.16);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fce7f3',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H)}
function write(t,x,y,v,col,wt){const g=A.ctx;g.font=`${wt||800} ${big(v)}${FNT}`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function banner(t,y,o){o=o||{};const g=A.ctx;let v=big(o.v||14);g.font=`800 ${v}${FNT}`;let w=g.measureText(t).width+28;
 while(w>A.W-8&&v>10){v--;g.font=`800 ${v}${FNT}`;w=g.measureText(t).width+28}
 const h=v+16,x0=Math.max(4,(A.W-w)/2);g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,h/2);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?OKC:o.no?NOC:GREY;g.stroke();
 g.fillStyle=NAVY;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function card(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.no||o.ok||o.on?4:1.5;g.strokeStyle=o.no?NOC:o.ok?OKC:o.on?SEL:GREY;g.stroke()}
function wrap(t,x,y,w,v){const g=A.ctx;g.font=`800 ${big(v)}${FNT}`;const words=t.split(' '),lines=[];let cur='';words.forEach(wd=>{const nx=cur?cur+' '+wd:wd;if(g.measureText(nx).width>w-10&&cur){lines.push(cur);cur=wd}else cur=nx});lines.push(cur);
 const lh=big(v)+3;lines.forEach((ln,i)=>{g.fillStyle=NAVY;g.textAlign='center';g.textBaseline='middle';g.fillText(ln,x,y+(i-(lines.length-1)/2)*lh)})}
function grid(nItems,cols,y0,h,maxW){const gap=8,w=Math.min(maxW||150,(A.W-16-gap*(cols-1))/cols),x0=(A.W-(w*cols+gap*(cols-1)))/2;return Array.from({length:nItems},(_,i)=>({i,x:x0+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}))}
/* little pictures */
function thing(kind,cx,cy,s){const g=A.ctx;
 if(kind==='dots'){g.fillStyle='#f472b6';[[-.3,-.1],[0,.15],[.3,-.1],[-.1,-.35],[.2,.35]].forEach(([u,v])=>{g.beginPath();g.arc(cx+u*s,cy+v*s,s*.13,0,7);g.fill()})}
 if(kind==='drink'){g.fillStyle='#7c3aed';A.paint.rrect(cx-s*.25,cy-s*.3,s*.5,s*.65,6);g.fill();g.fillStyle='#e5e7eb';g.fillRect(cx-s*.1,cy-s*.45,s*.2,s*.15)}
 if(kind==='blob'){['#22c55e','#3b82f6','#f97316'].forEach((col,k)=>{g.fillStyle=col;g.beginPath();g.arc(cx+(k-1)*s*.14,cy,s*.24,0,7);g.fill()})}
 if(kind==='bottle'){g.fillStyle='#93c5fd';A.paint.rrect(cx-s*.22,cy-s*.25,s*.44,s*.62,6);g.fill();g.fillStyle='#1e3a8a';g.fillRect(cx-s*.09,cy-s*.42,s*.18,s*.17)}
 if(kind==='pills'){g.fillStyle='#ffffff';g.strokeStyle=NAVY;g.lineWidth=1.5;[[-.25,0],[0,.2],[.25,-.05]].forEach(([u,v])=>{g.beginPath();g.ellipse(cx+u*s,cy+v*s,s*.13,s*.08,.4,0,7);g.fill();g.stroke()})}
 if(kind==='pod')thing('blob',cx,cy,s)}
function diamond(cx,cy,s){const g=A.ctx;g.save();g.translate(cx,cy);g.rotate(Math.PI/4);g.fillStyle='#ffffff';g.fillRect(-s/2,-s/2,s,s);g.lineWidth=Math.max(2,s*.14);g.strokeStyle='#dc2626';g.strokeRect(-s/2,-s/2,s,s);g.restore();write('!',cx,cy+1,10,'#111827',900)}
/* 1. look-alike pairs */
const pairR=()=>grid(6,2,A.H*.17,Math.min(A.H*.23,96),170);
function drawPairs(){const s=M.a;ground();const all=s.seen.length>=6;banner(all?'They looked the same, but they were not':'Tap each one to see what it really is',A.H*.07,{ok:all});
 pairR().forEach(r=>{const P=PAIRS[r.i>>1],side=r.i%2?P.b:P.a,open=s.seen.includes(r.i);card(r,{ok:open&&side[1],no:open&&!side[1],on:s.hot===r.i});
  thing(['dots','drink','blob'][r.i>>1],r.x+r.w*.24,r.y+r.h/2,Math.min(r.h*.8,r.w*.4));
  wrap(open?side[0]:'?',r.x+r.w*.66,r.y+r.h*.38,r.w*.6,open?12:20);if(open)write(side[1]?'Food':'Not food',r.x+r.w*.66,r.y+r.h*.75,11,side[1]?OKC:NOC,800)})}
function flip(i){const s=M.a;if(s.seen.includes(i))return;s.seen.push(i);s.hot=i;A.sound.pop();const P=PAIRS[i>>1],side=i%2?P.b:P.a,twin=i%2?P.a:P.b;
 tell(`${P.look}: ${side[0]}. ${side[1]?'That one is food.':'That one is not food.'}`+(s.seen.includes(i^1)?` Its twin was ${twin[0]}. Same look, not the same thing.`:''))}
/* 2. who can give you medicine */
const whoR=()=>grid(3,3,A.H*.42,Math.min(A.H*.4,150),180);
function drawGive(){const s=M.b,g=A.ctx;ground();if(s.r>=GIVE.length){banner('Only a trusted grown-up gives you medicine',A.H*.12,{ok:1});return}
 const G=GIVE[s.r];banner(G.where,A.H*.06,{v:13});banner('Who can give you medicine?',A.H*.15,{v:12});
 const bx=A.W/2,by=A.H*.29,u=Math.min(A.W*.08,30);g.fillStyle='#f59e0b';A.paint.rrect(bx-u*.6,by-u*.7,u*1.2,u*1.5,6);g.fill();g.fillStyle='#ffffff';g.fillRect(bx-u*.45,by-u*.15,u*.9,u*.5);g.fillStyle='#7c2d12';g.fillRect(bx-u*.35,by-u*1.05,u*.7,u*.35);write('+',bx,by+u*.1,14,NOC,900);
 whoR().forEach(r=>{const [who,ok]=G.who[r.i];card(r,{no:s.bad===r.i,ok:s.good===r.i});const hx=r.x+r.w/2,hy=r.y+r.h*.25,hr=Math.min(r.w,r.h)*.13;
  g.fillStyle=ok&&s.good===r.i?'#bbf7d0':'#fde68a';g.beginPath();g.arc(hx,hy,hr,0,7);g.fill();g.strokeStyle=NAVY;g.lineWidth=1.5;g.stroke();g.fillStyle='#60a5fa';A.paint.rrect(hx-hr,hy+hr*1.1,hr*2,hr*1.6,hr*.5);g.fill();
  wrap(who,hx,r.y+r.h*.78,r.w,11)})}
function give(i){const s=M.b;if(s.r>=GIVE.length)return;const [who,ok]=GIVE[s.r].who[i];
 if(!ok){s.bad=i;A.sound.miss();return tell(/friend|cousin|boy/i.test(who)?`${who.split(',')[0]} is a child, not a grown-up who looks after you. Medicine is only from a trusted grown-up.`:/sister/i.test(who)?'Big children are still children. Only a trusted grown-up gives medicine.':'Never help yourself to medicine, even if you know where it is.')}
 s.bad=-1;s.good=i;A.sound.pop();const done=GIVE[s.r];s.r++;setTimeout(()=>{s.good=-1;A.redraw()},10);tell(`Yes: ${who}. ${done.where.replace(/\.$/,'')}, a trusted grown-up gives the medicine.`)}
/* 3 and 5. sort cards into two boxes */
const bins=()=>[0,1].map(k=>{const w=(A.W-30)/2;return{k,x:10+k*(w+10),y:A.H*.13,w,h:A.H*.3}});
function sortCards(list){return list===RULES?grid(list.length,2,A.H*.48,Math.min(A.H*.15,64),230):grid(list.length,3,A.H*.5,Math.min(A.H*.2,82),170)}
function drawSort(kind){const s=kind==='bottles'?M.c:M.e,list=kind==='bottles'?BOTTLES:RULES,names=kind==='bottles'?['Drink','Not a drink']:['Safe','Not safe'],g=A.ctx;ground();
 bins().forEach(b=>{g.fillStyle=b.k?(A.col.dark?'#7f1d1d':'#fee2e2'):(A.col.dark?'#14532d':'#dcfce7');A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.lineWidth=s.hot===b.k?4:2;g.strokeStyle=s.hot===b.k?SEL:GREY;g.stroke();
  write(names[b.k],b.x+b.w/2,b.y+16,12,A.col.dark?'#f8fafc':NAVY);const inBin=s.put.filter(i=>want(kind,i)===b.k);if(kind==='bottles')inBin.forEach((i,j)=>write(BOTTLES[i].n,b.x+b.w/2,b.y+36+j*big(14),11,A.col.dark?'#f8fafc':NAVY,700));write(`${inBin.length} in here`,b.x+b.w/2,b.y+b.h-14,11,A.col.dark?'#f8fafc':NAVY,700)});
 const done=s.put.length>=list.length;banner(done?'All sorted':kind==='bottles'?'Drag each bottle: a drink, or not a drink?':'Drag each card: safe or not safe?',A.H*.05,{ok:done,v:13});
 sortCards(list).forEach(r=>{if(s.put.includes(r.i)||(M.drag&&M.drag.i===r.i))return;sortCard(kind,r,r.i,{no:s.bad===r.i,on:s.pick===r.i})});
 if(M.drag){const d=M.drag,r=sortCards(list)[d.i];sortCard(kind,{x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},d.i,{on:1})}}
function sortCard(kind,r,i,o){card(r,o);if(kind==='bottles'){const B=BOTTLES[i];thing('bottle',r.x+r.w*.2,r.y+r.h*.55,Math.min(r.h*.8,r.w*.35));if(B.sign)diamond(r.x+r.w*.2,r.y+r.h*.55,Math.min(r.h,r.w)*.2);wrap(B.n,r.x+r.w*.64,r.y+r.h/2,r.w*.66,11)}
 else wrap(RULES[i][0],r.x+r.w/2,r.y+r.h/2,r.w,11)}
const want=(kind,i)=>kind==='bottles'?(BOTTLES[i].drink?0:1):(RULES[i][1]?0:1);
function drop(kind,i,k){const s=kind==='bottles'?M.c:M.e;if(s.put.includes(i))return;s.pick=null;const w=want(kind,i);
 if(w!==k){s.bad=i;A.sound.miss();if(kind==='bottles'){const B=BOTTLES[i];return tell(B.drink?`${B.n} is a drink you know. It goes in Drink.`:B.sign?`${B.n} has a red diamond: it can hurt you. Not a drink.`:`${B.n} has no red diamond, but it is still not a drink. No sign does not mean safe.`)}
  const t=RULES[i][0];return tell(RULES[i][1]?`${t}: a trusted grown-up gives it, so that is safe.`:/sister/.test(t)?'Medicine is only for the person it is for. Not safe.':/more/.test(t)?'Too much medicine can make you poorly, even if it tastes nice. Not safe.':'Vitamins are medicine too. Only a grown-up gives them. Not safe.')}
 s.put.push(i);s.bad=-1;A.sound.pop();const list=kind==='bottles'?BOTTLES:RULES;tell((kind==='bottles'?BOTTLES[i].n:RULES[i][0])+(k?(kind==='bottles'?': not a drink.':': not safe.'):(kind==='bottles'?': a drink.':': safe.'))+(s.put.length>=list.length?' All sorted.':` ${s.put.length} of ${list.length}.`))}
/* 4. you found something */
const actR=()=>grid(3,3,A.H*.62,Math.min(A.H*.26,96),190);
function drawFound(){const s=M.d,g=A.ctx;ground();if(s.r>=FOUND.length){banner('Leave it. Tell a grown-up. Every time.',A.H*.15,{ok:1});return}
 const F=FOUND[s.r];banner(`You find: ${F.t}.`,A.H*.06,{v:13});banner('What do you do?',A.H*.15,{v:12});
 g.fillStyle=A.col.dark?'#334155':'#e7e5e4';A.paint.rrect(A.W*.2,A.H*.22,A.W*.6,A.H*.34,16);g.fill();thing(F.k,A.W/2,A.H*.39,Math.min(A.W*.2,A.H*.25));
 actR().forEach(r=>{card(r,{no:s.bad===r.i});wrap(ACTS[r.i][0],r.x+r.w/2,r.y+r.h/2,r.w,11)})}
function act(i){const s=M.d;if(s.r>=FOUND.length)return;const t=ACTS[i][1];
 if(t!=='ok'){s.bad=i;A.sound.miss();return tell(t==='taste'?'Never taste something you find. It could be medicine or a cleaner that makes you very poorly.':'Do not pick it up, even to help. Leave it where it is and fetch a grown-up to deal with it.')}
 s.bad=-1;A.sound.pop();const F=FOUND[s.r];s.r++;tell(`Yes: leave the ${F.k==='pills'?'tablets':F.k==='pod'?'washing pod':'bottle'} and tell a grown-up.`)}
function draw(){const k=now();if(k==='quiz'){ground();banner('Challenge',A.H*.2,{ok:1});banner('Ask a grown-up first',A.H*.5,{v:15});return}
 if(k==='pairs')drawPairs();else if(k==='give')drawGive();else if(k==='found')drawFound();else drawSort(k);A.fx.draw(A.ctx)}
function down(p){const k=now();
 if(k==='pairs'){const r=pairR().find(r=>hit(p,r));if(r)flip(r.i);return false}
 if(k==='give'){const r=whoR().find(r=>hit(p,r));if(r)give(r.i);return false}
 if(k==='found'){const r=actR().find(r=>hit(p,r));if(r)act(r.i);return false}
 if(k==='bottles'||k==='rules'){const s=k==='bottles'?M.c:M.e,list=k==='bottles'?BOTTLES:RULES;const r=sortCards(list).find(r=>hit(p,r)&&!s.put.includes(r.i));if(r){M.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const b=bins().find(b=>hit(p,b));if(b&&s.pick!=null)drop(k,s.pick,b.k);return false}
 return false}
function move(p){const d=M.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=now(),s=k==='bottles'?M.c:M.e,b=bins().find(b=>hit(p,b));s.hot=b?b.k:-1;A.redraw()}
function up(p){const d=M.drag;if(!d)return;M.drag=null;const k=now(),s=k==='bottles'?M.c:M.e;s.hot=-1;const b=bins().find(b=>hit(p,b));if(b)return drop(k,d.i,b.k);
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){s.pick=d.i;return tell('Picked. Now tap a box.')}A.redraw()}
function clear(){epoch++;for(const k in M)delete M[k];Object.assign(M,{a:{seen:[],hot:-1},b:{r:0,bad:-1,good:-1},c:{put:[],bad:-1,hot:-1,pick:null},d:{r:0,bad:-1},e:{put:[],bad:-1,hot:-1,pick:null},drag:null,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pad();M.check()}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,ok){clear();tell(DESC[i]);M.check=ready(i,ok,DONE[i])}
function auto(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
function pad(){if(!btns)return;btns.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},btns,t).onclick=f};
 if(k==='pairs')PAIRS.forEach((P,j)=>[0,1].forEach(sd=>{const i=j*2+sd;if(!M.a.seen.includes(i))B(`${P.look} ${sd+1}`,()=>flip(i),`Look at ${P.look.toLowerCase()} number ${sd+1}`)}));
 if(k==='give'&&M.b.r<GIVE.length)GIVE[M.b.r].who.forEach((w,i)=>B(w[0],()=>give(i),`${w[0]} gives me the medicine`));
 if(k==='found'&&M.d.r<FOUND.length)ACTS.forEach((a,i)=>B(a[0],()=>act(i)));
 if(k==='bottles')BOTTLES.forEach((b,i)=>{if(!M.c.put.includes(i)){B(`${b.n} → Drink`,()=>drop('bottles',i,0));B(`${b.n} → Not a drink`,()=>drop('bottles',i,1))}});
 if(k==='rules')RULES.forEach((r,i)=>{if(!M.e.put.includes(i)){B(`Safe: ${r[0]}`,()=>drop('rules',i,0));B(`Not safe: ${r[0]}`,()=>drop('rules',i,1))}})}
const steps=[
{h:'Look-alikes',p:'Each pair looks the same. Tap each one to see what it really is.',
 predict:{q:'A sweet and a tablet can look the same. Can you always tell by looking?',opts:['Yes, I can tell','No, so I ask a grown-up'],ans:1},task:'Look at all 6',
 show:()=>auto(0,[0,1,2,3,4,5].map(i=>()=>flip(i)),400),
 go:()=>open(0,()=>M.a.seen.length>=6)},
{h:'Who gives medicine?',p:'Medicine can help when you are poorly. Tap the person who can give it to you.',
 predict:{q:'Your friend’s medicine made her better. Can you have some?',opts:['Yes, it helped her','No, it is only for her'],ans:1},task:'Choose for all 3 places',
 show:()=>auto(1,GIVE.map(G=>()=>give(G.who.findIndex(w=>w[1]))),600),
 go:()=>open(1,()=>M.b.r>=GIVE.length)},
{h:'Red diamond',p:'A red diamond on a bottle means it can hurt you. Drag each bottle to a box, or tap it and then a box.',
 predict:{q:'Shampoo has no red diamond. Can you drink it?',opts:['Yes, no sign means safe','No, it is not a drink'],ans:1},task:'Sort all 6 bottles',
 show:()=>auto(2,BOTTLES.map((b,i)=>()=>drop('bottles',i,b.drink?0:1)),450),
 go:()=>open(2,()=>M.c.put.length>=BOTTLES.length)},
{h:'You find something',p:'You find something that might be medicine or a cleaner. What do you do?',task:'Choose for all 3 finds',
 show:()=>auto(3,FOUND.map(()=>()=>act(2)),600),
 go:()=>open(3,()=>M.d.r>=FOUND.length)},
{h:'Safe or not?',p:'Drag each card to Safe or Not safe, or tap it and then a box.',task:'Sort all 6 cards',
 show:()=>auto(4,RULES.map((r,i)=>()=>drop('rules',i,r[1]?0:1)),450),
 go:()=>open(4,()=>M.e.put.length>=RULES.length)},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.check()});
function hint(t){let m='When you are not sure, ask a grown-up first.';
 if(t==='look')m='You cannot always tell by looking. Tablets can look like sweets, so ask a grown-up first.';
 if(t==='share')m='Medicine is only for the person it was given to. It could make you poorly.';
 if(t==='more')m='Too much medicine can make you poorly. Only the amount a grown-up gives.';
 if(t==='nosign')m='No sign does not mean safe. Only drink what a grown-up says is a drink.';
 if(t==='touch')m='Do not touch or taste it. Leave it and tell a grown-up.';
 if(t==='who')m='Only a trusted grown-up who looks after you gives you medicine.';
 return m}
function quiz(){n++;const Q=QS[n%QS.length],all=[[Q.a,'ok'],...Q.o],r=n%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':hint(t))}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:S=>{cq.hidden=S.step!==5;btns.hidden=S.step===5;pad()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Medicine safety lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});pad()}}).start()})})();
