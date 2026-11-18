/* Flagship – symbiosis (ages 9–11; NGSS 5-LS2-1 and MS-LS2-2 interactions between organisms; NC England Y6 living things
   and their habitats). Score what each partner gets (+ gain, 0 no change, − harm) and let the signs name the relationship:
   + + mutualism, + 0 commensalism, + − parasitism. Sort new pairs, watch a parasite and a predator over three weeks, run a
   removal test (take one partner away and watch the other's health bar), and pick out what is not symbiosis at all. */
(()=>{
 const SG=['+','0','−'],SGW=['gains','no change','is harmed'],KIND=['Mutualism','Commensalism','Parasitism'];
 const kindOf=(a,b)=>a===0&&b===0?0:a===0&&b===1?1:a===0&&b===2?2:-1;
 const PAIRS=[['Clownfish','Sea anemone',0,0,'It hides in the stinging arms, safe from bigger fish.','The clownfish chases off fish that bite anemones, and its waste feeds it.'],
  ['Remora','Shark',0,1,'It rides along and eats scraps from the shark’s meals.','The shark is not helped or hurt. It swims and hunts the same.'],
  ['Tick','Deer',0,2,'It sucks the deer’s blood for food.','The deer loses blood and can catch diseases from the tick.']];
 const SORT=[['Bee and flower',0,'The bee gets nectar; the flower gets its pollen carried.'],['Flea and dog',2,'The flea drinks blood; the dog gets itchy, sore skin.'],
  ['Barnacles on a whale',1,'Barnacles get a ride to food-rich water; the whale is barely affected.'],['Cleaner shrimp and fish',0,'The shrimp eats parasites; the fish gets cleaned.'],
  ['Tapeworm in a gut',2,'The tapeworm takes digested food; the host loses it.'],['Egret and cow',1,'The egret eats insects the cow stirs up; the cow is unaffected.']];
 const WEEK=[['Tick on a deer','The tick feeds a little every day. The deer is weaker but alive. A parasite needs its host alive.'],
  ['Fox and rabbit','The fox eats the rabbit in one meal. That is predation: a short, deadly meeting, not a partnership.']];
 const CUT=[[0,'Take the clownfish away',-30,'The anemone gets bitten by butterflyfish and does worse. It was gaining: mutualism.'],
  [1,'Take the remoras away',0,'The shark is just the same. It was neither helped nor harmed: commensalism.'],
  [2,'Take the ticks away',30,'The deer gets healthier. The tick was harming it: parasitism.']];
 const ISIT=[['Wolves hunting as a pack',1,'Same species. Symbiosis is between two different species.'],['Bee and flower',0,'Two species, close and long: mutualism.'],
  ['Fox eats a rabbit',1,'One quick kill is predation, not a long partnership.'],['Cow and the microbes in its gut',0,'Microbes break down grass; the cow gives them a home: mutualism.'],
  ['Two robins fighting over a worm',1,'Same species competing. Not symbiosis.'],['Mistletoe growing on an apple tree',0,'Mistletoe takes water from the tree: parasitism.']];
 VIS.reg('flagsymb',c=>{let A,row,quiz;
  const S={run:0,pi:0,sg:[null,null],si:0,tally:[0,0,0],wk:0,watch:0,cut:[],hp:[60,60,60],ii:0,tl:[0,0],note:'',bad:false,check:()=>{}};
  const now=()=>['score','sort','weeks','cut','isit','chal'][A.step];
  const pt=n=>Math.round(n*(A.narrow?1:1.12));
  const TXT='#14213d',SOFT='#4b5563',EDGE='#6b7280',CARD='#ffffff',SEA='#0e7490',LEAF='#15803d',BLOOD='#b91c1c',WARM='#fff7ed',GOLD='#b45309';
  const SGC=[LEAF,'#475569',BLOOD];
  function txt(g,s,x,y,n,col,al){g.font=`700 ${pt(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-16)}
  function wrapTxt(g,s,max,n){g.font=`700 ${pt(n)}px system-ui,sans-serif`;const ln=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){ln.push(cur);cur=w}else cur=t}ln.push(cur);return ln}
  function block(g,s,x,y,max,n,col){const ln=wrapTxt(g,s,max,n),h=pt(n)+5;ln.forEach((l,i)=>txt(g,l,x,y+(i-(ln.length-1)/2)*h,n,col))}
  function box(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function strip(g){if(!S.note)return;const ln=wrapTxt(g,(S.bad?'✗ ':'✓ ')+S.note,A.W-44,13),h=pt(13)+6,H=ln.length*h+12,y=A.H-H-6;box(g,{x:10,y,w:A.W-20,h:H},CARD,S.bad?BLOOD:LEAF,3);ln.forEach((l,i)=>txt(g,l,A.W/2,y+6+h*(i+.5),13,TXT))}
  const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
  const nope=s=>{S.bad=true;S.note=s;A.sound.miss();voice(s);A.redraw()};
  const good=s=>{S.bad=false;S.note=s;A.sound.pop()};
  // layout
  const partner=k=>{const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.2,w,h:A.H*.34}};
  const bin=k=>{const w=(A.W-40)/3;return{x:10+k*(w+10),y:A.H*.4,w,h:A.H*.28}};
  const two=k=>{const w=(A.W-30)/2;return{x:10+k*(w+10),y:A.H*.42,w,h:A.H*.26}};
  const lane=k=>({x:14,y:A.H*(.16+k*.26),w:A.W-28,h:A.H*.2});
  function critter(g,name,x,y,r){const col={Clownfish:'#ea580c','Sea anemone':'#db2777',Remora:'#64748b',Shark:'#334155',Tick:'#7f1d1d',Deer:'#a16207'}[name]||SEA;
   g.fillStyle=col;g.beginPath();g.ellipse(x,y,r*1.3,r*.8,0,0,7);g.fill();g.fillStyle=CARD;g.beginPath();g.arc(x+r*.75,y-r*.15,r*.18,0,7);g.fill();g.fillStyle=TXT;g.beginPath();g.arc(x+r*.78,y-r*.15,r*.08,0,7);g.fill()}
  function health(g,x,y,w,v,label){const r={x,y,w,h:pt(14)};box(g,r,'#e5e7eb',EDGE,1.5);g.fillStyle=v>=60?LEAF:v>=40?GOLD:BLOOD;g.fillRect(x+1,y+1,(w-2)*Math.max(0,Math.min(100,v))/100,r.h-2);txt(g,`${label}: ${v}`,x,y-pt(10),12,TXT,'left')}
  function scene(g){const v=now();
   if(v==='score'){const P=PAIRS[S.pi];txt(g,P?`Pair ${S.pi+1} of 3: what does each one get?`:'All 3 pairs scored',A.W/2,A.H*.08,15,TXT);if(!P)return;
    [0,1].forEach(k=>{const r=partner(k),s=S.sg[k];box(g,r,s==null?CARD:A.mix(SGC[s],'#ffffff',.85),s==null?EDGE:SGC[s],s==null?2:3.5);critter(g,P[k],r.x+r.w/2,r.y+r.h*.34,Math.min(r.w,r.h)*.16);
     txt(g,P[k],r.x+r.w/2,r.y+r.h*.66,14,TXT);txt(g,s==null?'tap: + 0 −':`${SG[s]} ${SGW[s]}`,r.x+r.w/2,r.y+r.h*.86,s==null?12:14,s==null?SOFT:SGC[s])});
    txt(g,'+ + Mutualism   + 0 Commensalism   + − Parasitism',A.W/2,A.H*.62,A.narrow?11:13,SOFT)}
   if(v==='sort'){const P=SORT[S.si],top={x:12,y:A.H*.06,w:A.W-24,h:A.H*.25};box(g,top,P?WARM:CARD,P?GOLD:EDGE,2.5);block(g,P?P[0]:'All 6 pairs sorted',A.W/2,top.y+top.h/2,top.w-20,16,P?TXT:LEAF);
    KIND.forEach((k,i)=>{const r=bin(i);box(g,r,'#f8fafc',SGC[i],2.5);txt(g,k,r.x+r.w/2,r.y+r.h*.3,A.narrow?11:14,SGC[i]);txt(g,['+ +','+ 0','+ −'][i],r.x+r.w/2,r.y+r.h*.55,15,TXT);txt(g,S.tally[i]?'●'.repeat(S.tally[i]):'tap',r.x+r.w/2,r.y+r.h*.8,13,SOFT)})}
   if(v==='weeks'){txt(g,`Week ${S.wk} of 3`,A.W/2,A.H*.07,15,TXT);
    WEEK.forEach((w,k)=>{const r=lane(k);box(g,r,'#f8fafc',k?GOLD:BLOOD,2);txt(g,w[0],r.x+10,r.y+pt(14),14,TXT,'left');
     const alive=k===0?true:S.wk===0;const hv=k===0?60-S.wk*8:(S.wk===0?60:0);health(g,r.x+10,r.y+r.h*.62,r.w-20,hv,k===0?'Deer health':'Rabbit');
     txt(g,k===0?`Tick meals: ${S.wk*7}`:(alive?'Not eaten yet':'Eaten: 1 meal'),r.x+r.w-10,r.y+pt(14),12,alive?SOFT:BLOOD,'right')});
    txt(g,'Tap a row to watch it, or tap “Next week”.',A.W/2,A.H*.72,12,SOFT)}
   if(v==='cut'){txt(g,'Removal test: take one partner away',A.W/2,A.H*.07,15,TXT);
    CUT.forEach(([pi,lab,d],k)=>{const r=lane(k),P=PAIRS[pi],done=S.cut.includes(k);box(g,r,done?'#f0fdf4':CARD,done?LEAF:EDGE,2);critter(g,P[1],r.x+r.h*.5,r.y+r.h*.5,r.h*.22);
     txt(g,`No ${P[0].toLowerCase()}${P[0]==='Tick'?'s':P[0]==='Remora'?'s':''}`,r.x+r.h,r.y+r.h*.28,A.narrow?12:14,TXT,'left');health(g,r.x+r.h,r.y+r.h*.66,r.w-r.h-14,S.hp[k],P[1])})}
   if(v==='isit'){const P=ISIT[S.ii],top={x:12,y:A.H*.06,w:A.W-24,h:A.H*.25};box(g,top,P?WARM:CARD,P?GOLD:EDGE,2.5);block(g,P?P[0]:'All 6 checked',A.W/2,top.y+top.h/2,top.w-20,16,P?TXT:LEAF);
    ['Symbiosis','Not symbiosis'].forEach((t,k)=>{const r=two(k);box(g,r,'#f8fafc',k?EDGE:SEA,2.5);txt(g,t,r.x+r.w/2,r.y+r.h*.38,A.narrow?13:15,k?TXT:SEA);txt(g,S.tl[k]?'●'.repeat(S.tl[k]):'tap',r.x+r.w/2,r.y+r.h*.72,13,SOFT)})}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(now()==='chal')txt(g,'Who gains, who loses, who does not care?',A.W/2,A.H/2,15,TXT);else scene(g);strip(g);A.fx.draw(g)}
  // actions
  function setSign(k,s){const P=PAIRS[S.pi];if(!P)return;S.sg[k]=s;const want=P[2+k];
   if(s!==want){S.sg[k]=null;const why=k===0?P[4]:P[5];return nope(`Not “${SGW[s]}” for the ${P[k].toLowerCase()}. ${why}`)}
   good(`${P[k]}: ${SGW[s]}. ${k===0?P[4]:P[5]}`);if(S.sg[0]!=null&&S.sg[1]!=null){const kd=kindOf(S.sg[0],S.sg[1]);good(`${SG[S.sg[0]]} ${SG[S.sg[1]]} means ${KIND[kd].toLowerCase()}.`);S.pi++;S.sg=[null,null]}sync()}
  function cycle(k){const s=S.sg[k];setSign(k,s==null?0:(s+1)%3)}
  function sortPair(i){const P=SORT[S.si];if(!P)return;if(i!==P[1])return nope(`Not ${KIND[i].toLowerCase()}. ${P[2]} Score each partner, then read the signs.`);S.tally[i]++;good(`${KIND[i]}. ${P[2]}`);S.si++;sync()}
  function week(){if(S.wk>=3)return;S.wk++;good(S.wk===1?WEEK[1][1]:S.wk===3?WEEK[0][1]:'The tick keeps feeding. The deer is weaker, but still alive.');sync()}
  function cut(k){if(S.cut.includes(k))return;const d=CUT[k][2];S.cut.push(k);S.hp[k]+=d;good(CUT[k][3]);sync()}
  function isIt(k){const P=ISIT[S.ii];if(!P)return;if(k!==P[1])return nope(`Look again. ${P[2]}`);S.tl[k]++;good(P[2]);S.ii++;sync()}
  function sync(){const v=now();let s='';
   if(v==='score')s=PAIRS[S.pi]?`${PAIRS[S.pi][0]} and ${PAIRS[S.pi][1]}. ${PAIRS[S.pi][0]}: ${S.sg[0]==null?'not scored':SGW[S.sg[0]]}. ${PAIRS[S.pi][1]}: ${S.sg[1]==null?'not scored':SGW[S.sg[1]]}.`:'All three pairs scored.';
   else if(v==='sort')s=SORT[S.si]?`Pair: ${SORT[S.si][0]}. Mutualism, commensalism or parasitism?`:'All six pairs sorted.';
   else if(v==='weeks')s=`Week ${S.wk} of 3. Deer health ${60-S.wk*8}. Rabbit ${S.wk?'eaten':'alive'}.`;
   else if(v==='cut')s=`Removal tests done: ${S.cut.length} of 3. `+CUT.map((x,k)=>`${PAIRS[x[0]][1]} health ${S.hp[k]}`).join(', ')+'.';
   else if(v==='isit')s=ISIT[S.ii]?`Is this symbiosis? ${ISIT[S.ii][0]}.`:'All six checked.';else s='Challenge.';
   voice((S.note?S.note+' ':'')+s);buttons();S.check()}
  function buttons(){if(!row)return;row.innerHTML='';const v=now(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},row,t);e.onclick=f};
   if(v==='score'&&PAIRS[S.pi])[0,1].forEach(k=>SG.forEach((g,s)=>b(`${PAIRS[S.pi][k]}: ${g}`,()=>setSign(k,s),`${PAIRS[S.pi][k]} ${SGW[s]}`)));
   if(v==='sort'&&SORT[S.si])KIND.forEach((k,i)=>b(k,()=>sortPair(i)));
   if(v==='weeks'&&S.wk<3)b('Next week',week);
   if(v==='cut')CUT.forEach((x,k)=>{if(!S.cut.includes(k))b(x[1],()=>cut(k))});
   if(v==='isit'&&ISIT[S.ii])['Symbiosis','Not symbiosis'].forEach((t,k)=>b(t,()=>isIt(k)));A.redraw()}
  function down(p){const v=now();
   if(v==='score'){const k=[0,1].find(k=>hit(p,partner(k)));if(k!=null)cycle(k)}
   if(v==='sort'){const i=[0,1,2].find(i=>hit(p,bin(i)));if(i!=null)sortPair(i)}
   if(v==='weeks'&&[0,1].some(k=>hit(p,lane(k))))week();
   if(v==='cut'){const k=[0,1,2].find(k=>hit(p,lane(k)));if(k!=null)cut(k)}
   if(v==='isit'){const k=[0,1].find(k=>hit(p,two(k)));if(k!=null)isIt(k)}return false}
  // steps
  const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const play=fns=>{const id=++S.run,gap=A.reduced()?15:320;fns.forEach((f,k)=>setTimeout(()=>{if(id===S.run)f()},k*gap))};
  const reset=()=>{S.run++;S.check=()=>{};S.pi=0;S.sg=[null,null];S.si=0;S.tally=[0,0,0];S.wk=0;S.cut=[];S.hp=[60,60,60];S.ii=0;S.tl=[0,0];S.note='';S.bad=false};
  const steps=[
   {h:'Plus, zero or minus',p:'Two species live close together. Tap each one to score it: + it gains, 0 no change, − it is harmed.',
    predict:{q:'A clownfish lives in a sea anemone. Does the anemone get anything back?',opts:['Yes: both of them gain','No: only the clownfish gains','No: the clownfish harms it'],ans:0},
    task:'Score 3 pairs',show:()=>{steps[0].go();play(PAIRS.flatMap(P=>[()=>setSign(0,P[2]),()=>setSign(1,P[3])]))},go:()=>{reset();sync();S.check=ready(0,()=>S.pi>=PAIRS.length,'The signs name it: + + mutualism, + 0 commensalism, + − parasitism.')}},
   {h:'Name the partnership',p:'Score both partners in your head, then tap the name that matches the signs.',
    task:'Sort 6 pairs',show:()=>{steps[1].go();play(SORT.map(P=>()=>sortPair(P[1])))},go:()=>{reset();sync();S.check=ready(1,()=>S.si>=SORT.length,'Two of each: bee, shrimp (+ +); barnacle, egret (+ 0); flea, tapeworm (+ −).')}},
   {h:'Parasite or predator?',p:'Watch a tick on a deer and a fox near a rabbit for three weeks.',
    predict:{q:'Does a parasite usually kill its host quickly?',opts:['No: it needs the host alive to keep feeding','Yes: just like a predator does'],ans:0},
    task:'Watch 3 weeks',show:()=>{steps[2].go();play([week,week,week])},go:()=>{reset();sync();S.check=ready(2,()=>S.wk>=3,'The tick fed 21 times and the deer lived. The fox fed once and the rabbit died.')}},
   {h:'The removal test',p:'Scientists check a partnership by taking one partner away. Tap a row to remove it and watch the other’s health.',
    predict:{q:'Take the remoras off a shark. What happens to the shark?',opts:['Nothing much changes','It gets sick without them','It gets much healthier'],ans:0},
    task:'Run 3 removal tests',show:()=>{steps[3].go();play([0,1,2].map(k=>()=>cut(k)))},go:()=>{reset();sync();S.check=ready(3,()=>S.cut.length>=3,'Worse without it: it was gaining. Same: it did not care. Better: it was being harmed.')}},
   {h:'Is it symbiosis?',p:'Symbiosis is a close, long relationship between two different species. Tap the right box.',
    task:'Check 6 cases',show:()=>{steps[4].go();play(ISIT.map(P=>()=>isIt(P[1])))},go:()=>{reset();sync();S.check=ready(4,()=>S.ii>=ISIT.length,'Different species, living closely for a long time. Packs, fights and single meals do not count.')}},
   {h:'Challenge',p:'',go:()=>{reset();ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>S.check()});
  // challenge: every wrong answer names its slip
  const Q=[['Clownfish and sea anemone. Which kind of symbiosis?','Mutualism: both gain',[['Commensalism: only the clownfish gains','onlyone'],['Parasitism: the clownfish harms it','harm']]],
   ['A remora rides a shark and eats its scraps. The shark is not affected. What is this?','Commensalism: + 0',[['Mutualism: + +','both'],['Parasitism: + −','scraps']]],
   ['A tick feeds on a deer for weeks. What is this?','Parasitism: + −',[['Predation: the tick is hunting','pred'],['Commensalism: the deer does not notice','notice']]],
   ['A pack of wolves hunts together. Is that symbiosis?','No: they are all one species',[['Yes: they all gain','packyes'],['Yes: it is mutualism','packmut']]],
   ['Take the ticks off a deer. What happens to the deer?','It gets healthier',[['It gets sick without them','need'],['Nothing changes','same']]],
   ['Why does a parasite usually keep its host alive?','A living host keeps feeding it',[['It is too small to kill anything','small'],['It gives the host food back','giveback']]]];
  function slip(tag){let m='Score each partner +, 0 or −, then read the signs.';
   if(tag==='onlyone')m='The anemone gains too: the clownfish chases off fish that bite it. Both gain.';
   if(tag==='harm')m='The clownfish does no harm. It keeps the anemone safe and clean.';
   if(tag==='both')m='The shark gains nothing from the remora, so it scores 0, not +.';
   if(tag==='scraps')m='Eating scraps is not harm. The shark has finished with them.';
   if(tag==='pred')m='A predator kills its prey to eat it. The tick feeds for weeks and the deer lives.';
   if(tag==='notice')m='The deer loses blood and can get ill, so it scores −, not 0.';
   if(tag==='packyes'||tag==='packmut')m='Symbiosis needs two different species. Wolves in a pack are one species.';
   if(tag==='need')m='The tick only took from the deer. Remove it and the deer does better.';
   if(tag==='same')m='Nothing changes is the commensalism result. The deer was being harmed, so it improves.';
   if(tag==='small')m='Some parasites are big, like tapeworms. It is about food: a dead host stops feeding it.';
   if(tag==='giveback')m='Giving back would make it mutualism. A parasite only takes.';return m}
  let qn=-1,run=0;
  function ask(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
   quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>mark(tag,ans)});voice('Challenge: '+q);A.redraw()}
  function mark(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');
   if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;row.hidden=A.step===5;buttons()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
