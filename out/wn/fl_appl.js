/* Flagship: what uses electricity at home (ages 8-9; NC Year 4 Electricity "identify common appliances that run on
   electricity"). Sort room items into uses / does not, split plug from battery, name the job each appliance does with
   electricity, and spot fakes that look electrical but are not. Every tap has a button twin. */
(()=>{
VIS.reg('flagappl',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['sort','source','job','fake','sand','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
const ITEMS=[
 {id:'lamp',name:'Lamp',use:1,src:'plug',job:'light'},
 {id:'fridge',name:'Fridge',use:1,src:'plug',job:'cold'},
 {id:'toast',name:'Toaster',use:1,src:'plug',job:'heat'},
 {id:'torch',name:'Torch',use:1,src:'batt',job:'light'},
 {id:'remote',name:'Remote',use:1,src:'batt',job:'signal'},
 {id:'fan',name:'Fan',use:1,src:'plug',job:'move'},
 {id:'spoon',name:'Wooden spoon',use:0},
 {id:'book',name:'Book',use:0},
 {id:'blanket',name:'Blanket',use:0},
 {id:'candle',name:'Candle',use:0,fake:1},
 {id:'wind',name:'Wind-up toy',use:0,fake:1},
 {id:'broom',name:'Broom',use:0,fake:1}];
function card(it,x,y,w,h,on){const g=A.ctx,C=A.col;A.paint.rrect(x,y,w,h,10);g.fillStyle=on?A.alpha(C.gr,.25):A.alpha(C.tx,.06);g.fill();g.strokeStyle=on?C.gr:A.alpha(C.tx,.35);g.lineWidth=on?2.5:1.5;g.stroke();T(it.name,x+w/2,y+h/2,A.narrow?12:14,{w:800,max:w-8})}
function bin(label,x,y,w,h,col){const g=A.ctx;A.paint.rrect(x,y,w,h,12);g.fillStyle=A.alpha(col,.12);g.fill();g.strokeStyle=col;g.lineWidth=2;g.stroke();T(label,x+w/2,y+16,A.narrow?12:14,{c:col,w:800})}
function layout(){const n=S.pool.length,cols=Math.min(3,n),rows=Math.ceil(n/cols),w=A.W*.28,h=A.H*.14,gapX=(A.W-cols*w)/(cols+1),gapY=A.H*.08;return S.pool.map((it,i)=>{const c=i%cols,r=(i/cols)|0;return{it,x:gapX+c*(w+gapX),y:A.H*.34+r*(h+gapY),w,h}})}
function hitCard(p){return layout().find(L=>p.x>L.x&&p.x<L.x+L.w&&p.y>L.y&&p.y<L.y+L.h)}
function put(it,bin){if(S.done.has(it.id))return;const ok=((kind()==='sort'||kind()==='sand')&&((bin==='yes'&&it.use)||(bin==='no'&&!it.use)))||(kind()==='source'&&it.use&&bin===it.src)||(kind()==='fake'&&((bin==='fake'&&it.fake)||(bin==='real'&&it.use)));
 if(!ok){A.sound.miss();say(kind()==='sort'?(it.use?it.name+' needs electricity.':'No electricity for '+it.name+'.'):kind()==='source'?(it.src==='plug'?it.name+' plugs into the wall.':it.name+' runs on batteries.'):(it.fake?it.name+' looks busy but uses no electricity.':it.name+' really uses electricity.'));return}
 S.done.add(it.id);A.sound.tick();say(it.name+': yes.');A.redraw();S.check()}
function setJob(job){const it=S.cur;if(!it)return;if(it.job!==job){A.sound.miss();say('Think what '+it.name+' mainly does with electricity.');return}
 S.done.add(it.id);A.sound.tick();const next=S.pool.find(x=>!S.done.has(x.id));S.cur=next||null;say(it.name+' uses electricity for '+job+'.'+(next?' Next: '+next.name+'.':' All four named.'));A.redraw();S.check()}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.04:.3);g.fillRect(0,0,W,H);const k=kind();
 if(k==='chal'){T('Plug = mains    Battery = cells inside',W/2,H*.3,A.narrow?14:17);T('Light, heat, move, sound, screen → electricity',W/2,H*.48,A.narrow?13:15);T('Candle, broom, wind-up: no electricity',W/2,H*.66,A.narrow?13:15,{c:C.mu});A.fx.draw(g);return}
 if(k==='sort'||k==='sand'){bin('Uses electricity',W*.04,H*.06,W*.44,H*.24,C.gr);bin('Does not',W*.52,H*.06,W*.44,H*.24,C.rd);layout().forEach(L=>card(L.it,L.x,L.y,L.w,L.h,S.done.has(L.it.id)));T('Tap a card, then a box — or use the buttons',8,H-14,12,{al:'left',c:C.mu});A.fx.draw(g);return}
 if(k==='source'){bin('Plug (mains)',W*.04,H*.06,W*.44,H*.24,C.ac);bin('Battery',W*.52,H*.06,W*.44,H*.24,C.or);layout().forEach(L=>card(L.it,L.x,L.y,L.w,L.h,S.done.has(L.it.id)));A.fx.draw(g);return}
 if(k==='job'){const it=S.cur;T(it?('What does the '+it.name+' mainly do?'):'All named',W/2,H*.18,A.narrow?16:20,{w:900});
  ['light','heat','move','cold'].forEach((j,i)=>{const x=W*.08+i*W*.23,y=H*.4,w=W*.2,h=H*.2;A.paint.rrect(x,y,w,h,12);g.fillStyle=A.alpha(C.ac,.12);g.fill();g.strokeStyle=C.ac;g.lineWidth=2;g.stroke();T(j,x+w/2,y+h/2,A.narrow?14:16,{w:800})});A.fx.draw(g);return}
 if(k==='fake'){bin('Uses electricity',W*.04,H*.06,W*.44,H*.24,C.gr);bin('Fake (no electricity)',W*.52,H*.06,W*.44,H*.24,C.rd);layout().forEach(L=>card(L.it,L.x,L.y,L.w,L.h,S.done.has(L.it.id)));A.fx.draw(g)}}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;S.pick=null;for(const x in S)if(x!=='pick')delete S[x];Object.assign(S,{done:new Set(),check:()=>{},pick:null},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*260))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='job'){['light','heat','move','cold'].forEach(j=>btn(j,()=>setJob(j),'Name the job: '+j));return}
 if(k==='sort'||k==='sand'){S.pool.forEach(it=>{if(S.done.has(it.id))return;btn(it.name+' → yes',()=>put(it,'yes'));btn(it.name+' → no',()=>put(it,'no'))});return}
 if(k==='source'){S.pool.forEach(it=>{if(S.done.has(it.id))return;btn(it.name+' → plug',()=>put(it,'plug'));btn(it.name+' → battery',()=>put(it,'batt'))});return}
 if(k==='fake'){S.pool.forEach(it=>{if(S.done.has(it.id))return;btn(it.name+' → real',()=>put(it,'real'));btn(it.name+' → fake',()=>put(it,'fake'))})}}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='job'){const jobs=['light','heat','move','cold'];for(let i=0;i<4;i++){const x=A.W*.08+i*A.W*.23,y=A.H*.4,w=A.W*.2,h=A.H*.2;if(p.x>x&&p.x<x+w&&p.y>y&&p.y<y+h){setJob(jobs[i]);return true}}return false}
 const L=hitCard(p);if(!L){if((k==='sort'||k==='sand')&&S.pick){put(S.pick,p.x<A.W/2?'yes':'no');S.pick=null;return true}
  if(k==='source'&&S.pick){put(S.pick,p.x<A.W/2?'plug':'batt');S.pick=null;return true}
  if(k==='fake'&&S.pick){put(S.pick,p.x<A.W/2?'real':'fake');S.pick=null;return true}return false}
 if(S.done.has(L.it.id))return true;S.pick=L.it;A.sound.tick();say('Selected '+L.it.name+'. Now tap a box.');return true}
const steps=[
{h:'What uses electricity?',p:'Tap each thing. Put it in Uses electricity or Does not. Light, heat, cold, movement, sound or a screen means it needs electricity.',
 predict:{q:'Does a wooden spoon need electricity?',opts:['No','Yes, to stir','Yes, if it is metal'],ans:0},
 task:'Sort all six things into the two boxes',show:()=>auto(0,[()=>S.pool.forEach(it=>put(it,it.use?'yes':'no'))]),
 go:()=>{reset({pool:ITEMS.filter(x=>['lamp','fridge','torch','spoon','book','blanket'].includes(x.id))});say('Six things from home. Sort them: electricity or not.');controls();S.check=finish(0,()=>S.done.size===6,'Lamp, fridge and torch use electricity. Spoon, book and blanket do not.')}},
{h:'Plug or battery?',p:'Mains appliances plug into a wall socket. Battery appliances carry cells inside. Sort the electrical ones.',
 predict:{q:'A fridge gets its electricity from…',opts:['a wall socket (mains)','a battery inside','candles'],ans:0},
 task:'Sort five electrical things into Plug or Battery',show:()=>auto(1,[()=>S.pool.forEach(it=>put(it,it.src))]),
 go:()=>{reset({pool:ITEMS.filter(x=>x.use&&['lamp','fridge','toast','torch','remote'].includes(x.id))});say('Five electrical things. Plug (mains) or battery?');controls();S.check=finish(1,()=>S.done.size===5,'Lamp, fridge and toaster are mains. Torch and remote use batteries.')}},
{h:'Name the job',p:'Electricity does a job: light, heat, movement or cold. Name the main job for each appliance.',
 predict:{q:'A toaster mainly uses electricity to…',opts:['make heat','make sound','keep things cold'],ans:0},
 task:'Name the job for lamp, toaster, fan and fridge',show:()=>auto(2,[()=>setJob(S.cur.job),()=>setJob(S.cur.job),()=>setJob(S.cur.job),()=>setJob(S.cur.job)]),
 go:()=>{const pool=['lamp','toast','fan','fridge'].map(id=>ITEMS.find(x=>x.id===id));reset({pool,cur:pool[0]});say('What does the Lamp mainly do with electricity?');controls();S.check=finish(2,()=>S.done.size===4,'Lamp → light, toaster → heat, fan → move, fridge → cold.')}},
{h:'Spot the fakes',p:'Some things look busy but use no electricity: a candle burns, a wind-up toy uses a spring, a broom uses your push.',
 predict:{q:'Which uses no electricity?',opts:['a candle','a lamp','a fridge'],ans:0},
 task:'Sort six things into Uses electricity or Fake',show:()=>auto(3,[()=>S.pool.forEach(it=>put(it,it.fake?'fake':'real'))]),
 go:()=>{reset({pool:ITEMS.filter(x=>['lamp','fridge','torch','candle','wind','broom'].includes(x.id))});say('Three real, three fake. Sort them.');controls();S.check=finish(3,()=>S.done.size===6,'Candle, wind-up toy and broom use no electricity.')}},
{h:'Sandbox: mix and check',p:'Free play. Sort a mixed set: some use electricity, some do not. Get five right.',
 predict:{q:'A tablet on charge uses…',opts:['mains electricity through its charger','only candles','no electricity ever'],ans:0},
 task:'Sort five mixed things into Uses electricity or Does not',show:()=>auto(4,[()=>S.pool.forEach(it=>put(it,it.use?'yes':'no'))]),
 go:()=>{reset({pool:ITEMS.filter(x=>['lamp','torch','remote','candle','book'].includes(x.id))});say('Sandbox: five mixed things. Sort them.');controls();S.check=finish(4,()=>S.done.size===5,'Sandbox clear: electrical versus not.')}},
{h:'Challenge',p:'',go:()=>{reset({pool:[]});next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Which needs electricity?',[['a fridge','ok'],['a book','book'],['a blanket','book']]],
 ['A torch usually runs on…',[['batteries','ok'],['mains only','mains'],['steam','steam']]],
 ['Which is a mains appliance?',[['a toaster','ok'],['a remote','batt'],['a wooden spoon','book']]],
 ['A wind-up toy uses…',[['a spring, not electricity','ok'],['a battery','batt'],['mains electricity','mains']]],
 ['Which job needs electricity?',[['a fan spinning','ok'],['a broom sweeping','book'],['reading a book','book']]],
 ['A phone that is off…',[['still has a charged battery','ok'],['has no electricity left at all','empty'],['must be plugged in to keep any charge','mains']]],
 ['Sam says a push scooter uses electricity because it moves. Right?',[['No','ok'],['Yes','move'],['Only downhill','move']]]];
function why(t){let m='Ask: does it light, heat, move with a motor, make a powered sound or show a screen?';
 if(t==='book')m='Books, blankets, brooms and spoons do none of those jobs, so they need no electricity.';
 if(t==='mains')m='Mains means a wall socket. Torches and remotes use batteries instead.';
 if(t==='batt')m='That one runs on batteries, not on a wall socket.';
 if(t==='steam')m='Steam is not how a torch works. Look for batteries inside.';
 if(t==='empty')m='Off only means the circuit is open. The battery can still hold charge.';
 if(t==='move')m='Moving is not enough. A push scooter has no motor and no battery.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.55,tall:.95,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Appliance controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset({pool:[]});
  A.gest({down:p=>down(p)});controls()}});
A.start()})})();
