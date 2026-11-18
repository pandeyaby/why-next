/* Flagship: Fast & Slow Earth Changes (ages 5–7; NGSS 2-ESS1-1 / KS1 rocks and soils ideas — Earth's surface
   changes quickly in eruptions and quakes, and slowly by wind and water wearing rock away). Sort quick vs slow
   events, scrub a soft rock to model erosion, time a "quake" shake vs a drip-wear sequence, catch the myth that
   mountains never change. Distinct from flagearthq (what an earthquake is), flagvolc (volcano parts), flagland. */
(()=>{
VIS.reg('flagfastslow',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['sort','scrub','quake','drip','myth','pair','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function hill(g,x,y,w,h,worn){const C=A.col;g.fillStyle=A.alpha(C.gr,.55);g.beginPath();g.moveTo(x,y+h);g.lineTo(x+w*.5,y+(worn?h*.45:0));g.lineTo(x+w,y+h);g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke()}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#ffedd5',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Fast or slow change?',W/2,H*.32,A.narrow?15:18,{w:900});T('Quake · volcano · wind · water',W/2,H*.55,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='sort'){T(S.title||'Sort the changes',W/2,H*.07,A.narrow?13:15,{w:800});
  const bins=[{x:W*.04,y:H*.55,w:W*.44,h:H*.35,lab:'FAST'},{x:W*.52,y:H*.55,w:W*.44,h:H*.35,lab:'SLOW'}];
  bins.forEach((b,i)=>{g.fillStyle=A.alpha(i?C.cy:C.rd,.18);g.fillRect(b.x,b.y,b.w,b.h);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(b.x,b.y,b.w,b.h);T(b.lab,b.x+b.w/2,b.y+16,14,{w:900})});
  (S.cards||[]).forEach((cd,i)=>{if(S.where[i]!=null){const b=bins[S.where[i]];T(cd[0],b.x+b.w/2,b.y+40+18*S.where.slice(0,i+1).filter(x=>x===S.where[i]).length,12);return}
   const x=W*.08+i*(W*.3),y=H*.2,w=W*.26,h=H*.22;let xx=x,yy=y;if(S.drag&&S.drag.i===i){xx=S.drag.x-w/2;yy=S.drag.y-h/2}
   g.fillStyle=S.pick===i?A.alpha(C.ac,.35):A.alpha(C.am,.4);g.fillRect(xx,yy,w,h);g.strokeStyle=C.tx;g.lineWidth=S.pick===i?4:2;g.strokeRect(xx,yy,w,h);T(cd[0],xx+w/2,yy+h/2,A.narrow?12:14,{max:w-8})});
  T(S.msg||'Drag each card into FAST or SLOW.',W/2,H*.5,12,{c:C.mu})}
 if(k==='scrub'){T('Rub soft rock with wind & water',W/2,H*.08,A.narrow?13:15,{w:800});
  hill(g,W*.2,H*.25,W*.6,H*.45,S.worn>=6);T(`Wear: ${S.worn||0} / 6`,W/2,H*.8,14,{w:800});T(S.msg||'Scrub the hill — slow change takes many rubs.',W/2,H*.92,12,{c:C.mu})}
 if(k==='quake'){T('Earthquake shake',W/2,H*.08,A.narrow?14:16,{w:800});
  const shake=S.shake?((S.tick%2)?6:-6):0;g.fillStyle=A.alpha(C.mu,.5);g.fillRect(W*.25+shake,H*.35,W*.5,H*.25);g.strokeStyle=C.tx;g.lineWidth=3;g.strokeRect(W*.25+shake,H*.35,W*.5,H*.25);
  T(S.shake?'CRACK! The ground jumped.':'Tap to shake the ground once.',W/2,H*.75,13,{c:C.mu});T('A quake changes the land in seconds.',W/2,H*.9,12,{c:C.mu})}
 if(k==='drip'){T('Water wears rock — drop by drop',W/2,H*.08,A.narrow?13:15,{w:800});
  hill(g,W*.25,H*.3,W*.5,H*.4,S.drops>=8);for(let i=0;i<Math.min(S.drops||0,8);i++){g.fillStyle=C.cy;g.beginPath();g.arc(W*.5+(i%2?8:-8),H*.22+i*6,4,0,7);g.fill()}
  T(`Drops: ${S.drops||0} / 8`,W/2,H*.82,14);T(S.msg||'Keep dripping. Slow change needs many drops.',W/2,H*.94,12,{c:C.mu})}
 if(k==='myth'||k==='pair'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{cards:[['Volcano erupts',0],['Wind wears a cliff',1],['Earthquake shakes',0]],where:[null,null,null],pick:null,drag:null,worn:0,shake:0,tick:0,drops:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function dropCard(i,bin){if(S.where[i]!=null)return;const want=S.cards[i][1];
 if(bin===want){S.where[i]=bin;A.sound.pop();S.msg=`${S.cards[i][0]} → ${bin?'SLOW':'FAST'}.`;if(S.where.every(x=>x!=null))S.msg='Fast: eruption, quake. Slow: wind and water.'}
 else{A.sound.miss();S.msg=want===0?`${S.cards[i][0]} happens in moments — that is FAST.`:`${S.cards[i][0]} takes years — that is SLOW.`}
 S.pick=null;say(S.msg);A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='sort'){if(S.pick==null)(S.cards||[]).forEach((cd,i)=>{if(S.where[i]==null)btn('Pick '+cd[0],()=>{S.pick=i;say(cd[0]+' picked');A.redraw();controls()},'Pick '+cd[0])});
  else{btn('Put in FAST',()=>dropCard(S.pick,0));btn('Put in SLOW',()=>dropCard(S.pick,1))}}
 if(kind()==='scrub')btn('Scrub once',()=>{S.worn=Math.min(6,(S.worn||0)+1);S.msg=S.worn>=6?'The hill is worn smoother — slow change.':`Rub ${S.worn} of 6.`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Rub the soft rock once');
 if(kind()==='quake')btn('Shake once',()=>{S.shake=1;S.tick++;A.sound.miss();say('The ground jumped. A quake is a fast change.');A.redraw();S.check()},'Shake the ground once');
 if(kind()==='drip')btn('Add a drop',()=>{S.drops=Math.min(8,(S.drops||0)+1);S.msg=S.drops>=8?'Many drops wore the rock — slow change.':`Drop ${S.drops} of 8.`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add one water drop');
 if(kind()==='myth'||kind()==='pair')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='sort'){const i=(S.cards||[]).findIndex((_,j)=>S.where[j]==null&&p.y<A.H*.45&&p.x>=A.W*.08+j*(A.W*.3)&&p.x<=A.W*.08+j*(A.W*.3)+A.W*.26);
  if(i>=0){S.drag={i,x:p.x,y:p.y};S.pick=i;A.redraw();return true}
  if(S.pick!=null&&p.y>A.H*.55)dropCard(S.pick,p.x<A.W/2?0:1);return false}
 if(k==='scrub'){S.worn=Math.min(6,(S.worn||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(k==='quake'){S.shake=1;S.tick++;A.sound.miss();A.redraw();S.check();return true}
 if(k==='drip'){S.drops=Math.min(8,(S.drops||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(k==='myth'||k==='pair'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!p||!d||kind()!=='sort'){A.redraw();return}
 if(p.y>A.H*.5)dropCard(d.i,p.x<A.W/2?0:1);else A.redraw()}
const steps=[
{h:'Sort fast and slow',p:'Earth\'s surface changes. Some changes are fast — a volcano or an earthquake. Some are slow — wind and water wearing rock away over years.',
 predict:{q:'A volcanic eruption is…',opts:['a fast change','a slow change','not a change'],ans:0},
 task:'Sort eruption, wind wear and quake',show:()=>auto(0,[()=>{S.where=[0,1,0];A.redraw();S.check()}]),
 go:()=>{reset();say('Sort each card into FAST or SLOW.');controls();S.check=finish(0,()=>S.where[0]===0&&S.where[1]===1&&S.where[2]===0,'Eruptions and quakes are fast. Wind wear is slow.')}},
{h:'Scrub the soft rock',p:'Wind and rain rub tiny bits off rock. One rub hardly shows. Many rubs change the shape — that is slow change, called erosion.',
 predict:{q:'Wearing rock away by wind and water is…',opts:['slow change','instant','only make-believe'],ans:0},
 task:'Scrub the hill 6 times',show:()=>auto(1,[()=>{S.worn=6;A.redraw();S.check()}]),
 go:()=>{reset({worn:0,msg:'Keep scrubbing.'});say('Scrub the soft rock six times.');controls();S.check=finish(1,()=>S.worn>=6,'Many rubs wore the hill smoother. Slow change takes time.')}},
{h:'One quake shake',p:'An earthquake shakes the ground. Cracks and slips can appear in seconds. That is a fast change to Earth\'s surface.',
 predict:{q:'An earthquake changes the land…',opts:['in seconds','only over centuries','never'],ans:0},
 task:'Shake the ground once',show:()=>auto(2,[()=>{S.shake=1;A.redraw();S.check()}]),
 go:()=>{reset({shake:0});say('Shake the ground once.');controls();S.check=finish(2,()=>!!S.shake,'One shake — the land can crack in seconds. Fast change.')}},
{h:'Drip by drip',p:'Water drip by drip can wear a path in rock. You need many drops before you see the change. Slow does not mean "nothing happens".',
 predict:{q:'Water wearing rock drop by drop is…',opts:['slow change','a quake','finished in one drop'],ans:0},
 task:'Add 8 water drops',show:()=>auto(3,[()=>{S.drops=8;A.redraw();S.check()}]),
 go:()=>{reset({drops:0});say('Add eight drops.');controls();S.check=finish(3,()=>S.drops>=8,'Eight drops wore the rock. Slow change adds up.')}},
{h:'Catch a mix-up',p:'A common mix-up is thinking mountains and cliffs never change, or that every change must be a huge bang.',
 predict:{q:'Which is the mix-up?',opts:['Mountains never change at all','Wind can slowly wear a cliff','A quake can change land fast'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['Mountains never change at all','Wind can slowly wear a cliff','A quake can change land fast'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Mountains do change — slowly by wind and water, and sometimes fast in quakes or eruptions.')}},
{h:'Match the pair',p:'Fast changes: eruptions and earthquakes. Slow changes: wind, water and ice wearing rock (erosion). Pair each cause with its speed.',
 predict:{q:'Wind wearing a cliff pairs with…',opts:['slow change','fast change','no change'],ans:0},
 task:'Tap the matching speed',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Wind wearing a cliff is…',opts:['slow change (erosion)','fast like a quake','only happens on other planets'],picked:null});say('Match the speed.');controls();S.check=finish(5,()=>S.picked===0,'Wind wear is slow change — erosion over years.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
 ['A volcano erupts. Speed?',[['fast','ok'],['slow','slow'],['never','never']]],
 ['Wind wears a cliff. Speed?',[['slow','ok'],['fast','fast'],['stops Earth','never']]],
 ['An earthquake shakes. Speed?',[['fast','ok'],['slow','slow'],['only myths','never']]],
 ['Water drip wears rock. Speed?',[['slow','ok'],['fast','fast'],['one drop finishes it','never']]],
 ['Mountains never change. That is…',[['a mix-up','ok'],['always true','slow'],['only about volcanoes','fast']]],
 ['Erosion by wind and water is…',[['slow change','ok'],['a kind of quake','fast'],['not real','never']]]
];
function why(t){let m='Fast: eruption or quake. Slow: wind and water wear (erosion).';
 if(t==='slow')m='That change is quick — seconds or minutes — so it is FAST, not slow.';
 if(t==='fast')m='That change needs many years of tiny wears. It is SLOW change.';
 if(t==='never')m='Earth\'s surface does change. Some changes are fast, some are slow.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length];chal.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick'),sh=(qi+1)%3,opts=Q[1];[...opts.slice(sh),...opts.slice(0,sh)].forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t)});say('Challenge: '+Q[0]);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes. Fast or slow — both are real Earth changes.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Earth change controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}});
A.start()})})();
