/* Flagship: naming types of energy (ages 7-9; NGSS 4-PS3-2/4-PS3-4 energy vocabulary, with the KS3 idea of energy stores
   and transfers). Sort things into stored energy and energy on the move, fill in the energy names along a torch,
   share 10 energy blocks between light and heat, stretch a catapult and drop a ball from a shelf. Every drag or tap
   has a button twin. */
(()=>{
VIS.reg('flagename',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const N={chem:['Chemical','gr'],elec:['Electrical','ac'],light:['Light','am'],heat:['Heat','rd'],sound:['Sound','vi'],kin:['Kinetic','cy'],elas:['Elastic','pk'],grav:['Gravitational','or']};
const nm=k=>N[k][0],cl=k=>A.col[N[k][1]];
const kind=()=>['sort','torch','blocks','sling','drop','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-10)}
function box(x,y,w,h,col,label,o){o=o||{};const g=A.ctx;A.paint.rrect(x,y,w,h,10);g.fillStyle=A.alpha(col,o.a||.15);g.fill();g.lineWidth=o.sel?4:2;g.setLineDash(o.dash?[6,4]:[]);g.strokeStyle=col;g.stroke();g.setLineDash([]);if(label)T(label,x+w/2,y+h/2,o.px||(A.narrow?12:14),{max:w-8})}
const inside=(p,r)=>r&&p.x>r[0]&&p.x<r[0]+r[2]&&p.y>r[1]&&p.y<r[1]+r[3];
function arrow(x0,y0,x1,y1){const g=A.ctx,a=Math.atan2(y1-y0,x1-x0);g.strokeStyle=A.col.mu;g.lineWidth=2.5;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();g.beginPath();g.moveTo(x1,y1);g.lineTo(x1-9*Math.cos(a-.5),y1-9*Math.sin(a-.5));g.lineTo(x1-9*Math.cos(a+.5),y1-9*Math.sin(a+.5));g.closePath();g.fillStyle=A.col.mu;g.fill()}
function bar(x,y,w,v,max,col,label){const g=A.ctx;g.fillStyle=A.alpha(A.col.tx,.08);g.fillRect(x,y,w,14);g.fillStyle=col;g.fillRect(x,y,w*Math.min(1,v/max),14);T(label,x,y-11,12,{al:'left',c:A.col.mu})}
/* step 1: stored or on the move */
const ITEMS=[['Battery','st'],['Stretched rubber band','st'],['Book on a high shelf','st'],['Rolling ball','mv'],['Drum beat','mv'],['Sunshine','mv']];
function bins(){const W=A.W,H=A.H,w=W*.44;return{st:[W*.04,H*.5,w,H*.46],mv:[W*.52,H*.5,w,H*.46]}}
function place(b){const it=ITEMS[S.i];if(!it)return;if(it[1]===b){S[b].push(it[0]);S.i++;A.sound.tick();say(S.i<6?`${it[0]}: ${b==='st'?'stored energy, waiting to be used':'energy on the move'}. Next: ${ITEMS[S.i][0]}.`:'All sorted: 3 stores, 3 on the move.')}
 else{A.sound.miss();say(b==='mv'?`${it[0]} is not moving, but it still has energy. It is waiting in a store.`:`${it[0]} carries energy from place to place. That is energy on the move.`)}S.pos=null;controls();A.redraw();S.check()}
/* step 2: the torch chain */
const SLOTS=[['In the battery','chem'],['In the wires','elec'],['Bulb gives out','light'],['Bulb gives out','heat']],TOK=['chem','elec','light','heat','sound','kin'];
function sl(i){const W=A.W,H=A.H,w=W*.28,h=H*.15;return i<3?[W*.04+i*W*.33,H*.16,w,h]:[W*.04+2*W*.33,H*.45,w,h]}
function tk(i){const W=A.W,H=A.H,w=W*.29;return[W*.04+(i%3)*W*.32,H*(i<3?.68:.84),w,H*.12]}
function torchOk(){const v=S.v;return v[0]==='chem'&&v[1]==='elec'&&[v[2],v[3]].sort().join()==='heat,light'}
function fill(k){const i=S.sel;S.v[i]=k;A.sound.tick();const want=SLOTS[i][1];let m;
 if(i===0)m=k==='chem'?'Yes: a battery stores chemical energy.':'A battery is a store. Its energy sits in chemicals until the torch is switched on.';
 else if(i===1)m=k==='elec'?'Yes: electrical energy flows along the wires.':'Energy travels along wires as electrical energy.';
 else m=k==='sound'?'A torch is quiet. Its bulb gives out light, and it gets warm.':k==='kin'?'Nothing in a torch bulb moves. Look at what comes out of it and feel it.':k==='chem'||k==='elec'?`${nm(k)} energy is earlier in the chain. What comes out of the bulb?`:S.v[2]===S.v[3]?'You used the same word twice. A bulb gives out light, and it also gets warm.':`Yes: the bulb gives out ${nm(k).toLowerCase()} energy.`;
 const nx=S.v.findIndex(x=>!x);if(nx>=0&&(k===want||i>1))S.sel=nx;say(torchOk()?'Chemical → electrical → light and heat. The torch changes energy; it never makes it.':m);controls();A.redraw();S.check()}
/* step 3: share 10 blocks */
function jar(j){const W=A.W,H=A.H;return[W*(j?.68:.38),H*.3,W*.28,H*.55]}
function give(j){if(S.bat<=0)return;S.bat--;S[j?'heat':'light']++;A.sound.tick();const{bat,light,heat}=S;
 say(bat>0?`${bat} blocks left in the battery. Light ${light}, heat ${heat}.`:heat>light?`All 10 blocks moved: light ${light}, heat ${heat}. None vanished.`:`Light ${light}, heat ${heat}. Feel an old bulb: it gets hot. More of its energy goes to heat.`);A.redraw();S.check()}
function undo(){if(S.bat>=10)return;if(S.heat){S.heat--;S.bat++}else if(S.light){S.light--;S.bat++}say(`${S.bat} blocks in the battery.`);A.redraw()}
/* step 4: catapult */
function setPull(v){v=Math.max(0,Math.min(5,Math.round(v)));if(v===S.pull||S.fly!=null)return;S.pull=v;S.land=null;A.sound.tick();say(`Stretched ${v} of 5. Elastic energy stored: ${v*v} units.`);A.redraw()}
function letGo(){if(S.fly!=null)return;const R=S.pull*S.pull;S.fly=0;const end=()=>{S.fly=null;S.land=R;const hit=R>=14;
 say(S.pull===0?'No stretch, no stored energy: the ball just drops.':hit?`Pulled ${S.pull}: the ball lands in the far box. More stretch stored more elastic energy, so it flew faster.`:`Pulled ${S.pull}: it lands short. Stretch it further to store more energy.`);A.redraw();S.check()};
 if(A.reduced()){S.fly=1;end();return}A.tween(S,{fly:1},700,'out',end)}
/* step 5: drop from a shelf */
function setH(v){v=Math.max(0,Math.min(4,Math.round(v)));if(v===S.h||S.fall!=null)return;S.h=v;S.thud=null;A.sound.tick();say(v?`The ball is on shelf ${v}. Lifting it stored gravitational energy.`:'The ball is on the floor.');A.redraw()}
function drop(){if(S.fall!=null||!S.h)return;S.fall=0;const end=()=>{S.fall=null;S.thud=S.h;A.sound.miss();say(`Dropped from shelf ${S.h}: ${S.h>=4?'a big thump':S.h>=2?'a thump':'a soft tap'}. The stored energy became kinetic, then sound and heat when it landed.`);S.check()};
 if(A.reduced()){S.fall=1;end();return}A.tween(S,{fall:1},350+S.h*90,'io',end)}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.04:.25);g.fillRect(0,0,W,H);const k=kind(),px=A.narrow?12:14;
 if(k==='chal'){T('Stored: chemical, elastic, gravitational',W/2,H*.3,A.narrow?13:16);T('On the move: kinetic, electrical, light, sound, heat',W/2,H*.45,A.narrow?12:15,{c:C.mu});T('Energy changes. It is never used up.',W/2,H*.62,A.narrow?13:16);A.fx.draw(g);return}
 if(k==='sort'){const B=bins();box(...B.st,C.gr,'',{a:.08});box(...B.mv,C.ac,'',{a:.08});T('Stored',B.st[0]+B.st[2]/2,B.st[1]+16,15);T('On the move',B.mv[0]+B.mv[2]/2,B.mv[1]+16,15);
  ['st','mv'].forEach(b=>S[b].forEach((t,j)=>T(t,B[b][0]+B[b][2]/2,B[b][1]+40+j*22,px,{w:600,max:B[b][2]-8})));
  const it=ITEMS[S.i];if(it){const w=W*.56,h=H*.16,p=S.pos||{x:W/2,y:H*.22};S.card=[p.x-w/2,p.y-h/2,w,h];box(...S.card,C.vi,it[0],{a:.2,sel:1,px:A.narrow?14:17});T('Drag me, or tap a box',W/2,H*.07,12,{c:C.mu})}}
 if(k==='torch'){SLOTS.forEach((s,i)=>{const r=sl(i),v=S.v[i];T(s[0],r[0]+r[2]/2,r[1]-10,12,{c:C.mu,max:r[2]});box(...r,v?cl(v):C.mu,v?nm(v):'?',{dash:!v,sel:S.sel===i,a:v?.18:.05})});
  const a=sl(0),b=sl(1),d=sl(2),e=sl(3);arrow(a[0]+a[2],a[1]+a[3]/2,b[0]-2,b[1]+b[3]/2);arrow(b[0]+b[2],b[1]+b[3]/2,d[0]-2,d[1]+d[3]/2);arrow(d[0]+d[2]/2,d[1]+d[3],e[0]+e[2]/2,e[1]-14);
  T('Tap a gap, then an energy word',W*.36,H*.53,12,{c:C.mu,max:W*.6});TOK.forEach((t,i)=>box(...tk(i),cl(t),nm(t),{a:.12}))}
 if(k==='blocks'){const bx=W*.04,by=H*.3,bw=W*.28,bh=H*.55;box(bx,by,bw,bh,C.gr,'',{a:.08});T('Battery',bx+bw/2,by-12,14);
  const cell=(r,n,col)=>{for(let i=0;i<n;i++){const cw=r[2]/2-8,ch=r[3]/5-6;A.paint.rrect(r[0]+5+(i%2)*(cw+6),r[1]+r[3]-ch-5-Math.floor(i/2)*(ch+6),cw,ch,5);g.fillStyle=col;g.fill()}};
  cell([bx,by,bw,bh],S.bat,C.gr);[0,1].forEach(j=>{const r=jar(j),col=j?C.rd:C.am;box(...r,col,'',{a:.08});T(j?'Heat':'Light',r[0]+r[2]/2,r[1]-12,14);cell(r,j?S.heat:S.light,col)});
  T(`Battery ${S.bat} · Light ${S.light} · Heat ${S.heat} · Total ${S.bat+S.light+S.heat}`,W/2,H*.93,A.narrow?12:14,{c:C.mu});T('Tap a jar to move a block',W/2,H*.1,12,{c:C.mu})}
 if(k==='sling'){const gy=H*.8,ax=W*.18;g.strokeStyle=C.mu;g.lineWidth=2;g.beginPath();g.moveTo(0,gy);g.lineTo(W,gy);g.stroke();
  const tx0=W*.04+W*.9*14/25;box(tx0,gy-8,W*.94-tx0,16,C.gr,'',{a:.25});T('Far box',(tx0+W*.94)/2,gy+18,12,{c:C.mu});
  g.strokeStyle=C.tx;g.lineWidth=5;g.beginPath();g.moveTo(ax,gy);g.lineTo(ax,gy-H*.3);g.stroke();
  const set=S.fly==null&&S.land==null,hx=ax-(set?S.pull:0)*W*.025,hy=gy-H*.3;g.strokeStyle=C.pk;g.lineWidth=3;g.beginPath();g.moveTo(ax-6,hy-14);g.lineTo(hx,hy);g.lineTo(ax+6,hy-14);g.stroke();
  let bx=hx,by=hy;if(S.fly!=null){const R=S.pull*S.pull,f=S.fly,d=W*.9*R/25;bx=ax+(W*.04+d-ax)*f;by=hy+(gy-10-hy)*f-Math.sin(Math.PI*f)*H*.2*(R/25+.2)}else if(S.land!=null){bx=W*.04+W*.9*S.land/25;by=gy-10}
  g.beginPath();g.arc(bx,by,10,0,7);g.fillStyle=C.or;g.fill();S.hand=[hx-30,hy-30,60,60];if(S.fly==null&&S.land==null){g.setLineDash([4,3]);g.strokeStyle=C.pk;g.beginPath();g.arc(hx,hy,24,0,7);g.stroke();g.setLineDash([])}
  bar(W*.45,H*.12,W*.5,set?S.pull*S.pull:0,25,C.pk,'Elastic (stored)');bar(W*.45,H*.28,W*.5,S.fly!=null?S.pull*S.pull:0,25,C.cy,'Kinetic (moving)');T('Drag the ball back',W*.04,H*.06,12,{al:'left',c:C.mu})}
 if(k==='drop'){const gy=H*.86,sx=W*.3,sh=i=>gy-i*H*.17;g.strokeStyle=C.mu;g.lineWidth=2;g.beginPath();g.moveTo(0,gy);g.lineTo(W,gy);g.stroke();
  for(let i=1;i<=4;i++){g.fillStyle=A.alpha(C.or,.5);g.fillRect(sx-W*.12,sh(i),W*.24,6);T('Shelf '+i,sx-W*.14,sh(i)+2,12,{al:'right',c:C.mu})}
  let y=S.h?sh(S.h)-12:gy-12,x=sx;if(S.fall!=null){x=sx+W*.2;y=sh(S.h)-12+(gy-12-sh(S.h)+12)*S.fall*S.fall}else if(S.thud!=null){x=sx+W*.2;y=gy-12}
  g.beginPath();g.arc(x,y,12,0,7);g.fillStyle=C.ac;g.fill();S.ball=[x-32,y-32,64,64];
  if(S.thud!=null){const n=S.thud;T(n>=4?'THUMP!':n>=2?'Thump':'tap',x,gy-40-n*6,10+n*4,{c:C.rd,w:900})}
  const gpe=S.fall!=null?S.h*(1-S.fall*S.fall):S.thud!=null?0:S.h,ke=S.fall!=null?S.h*S.fall*S.fall:0;
  bar(W*.6,H*.14,W*.36,gpe,4,C.or,'Gravitational (stored)');bar(W*.6,H*.32,W*.36,ke,4,C.cy,'Kinetic (moving)')}
 A.fx.draw(g)}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;drag=null;for(const x in S)delete S[x];Object.assign(S,{check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*300))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};
 if(k==='sort'&&ITEMS[S.i]){btn('Stored',()=>place('st'),`Put ${ITEMS[S.i][0]} in Stored`);btn('On the move',()=>place('mv'),`Put ${ITEMS[S.i][0]} in On the move`)}
 if(k==='torch'){btn('Next gap',()=>{S.sel=(S.sel+1)%4;say(`Gap: ${SLOTS[S.sel][0]}.`);A.redraw()},'Choose the next gap');TOK.forEach(t=>btn(nm(t),()=>fill(t),`Put ${nm(t)} in the gap: ${SLOTS[S.sel][0]}`))}
 if(k==='blocks'){btn('+1 Light',()=>give(0),'Move one block to light');btn('+1 Heat',()=>give(1),'Move one block to heat');btn('Undo',undo,'Move one block back to the battery')}
 if(k==='sling'){btn('Pull more',()=>setPull(S.pull+1),'Stretch the band more');btn('Pull less',()=>setPull(S.pull-1),'Stretch the band less');btn('Let go',letGo,'Let go of the ball')}
 if(k==='drop'){btn('Lift up',()=>setH(S.h+1),'Lift the ball one shelf higher');btn('Lower',()=>setH(S.h-1),'Put the ball one shelf lower');btn('Drop it',drop,'Drop the ball')}}
let drag=null;
function down(p){const k=kind();
 if(k==='sort'){if(inside(p,S.card)){drag='card';return true}const B=bins();if(inside(p,B.st)){place('st');return true}if(inside(p,B.mv)){place('mv');return true}}
 if(k==='torch'){for(let i=0;i<4;i++)if(inside(p,sl(i))){S.sel=i;say(`Gap: ${SLOTS[i][0]}. Now tap an energy word.`);A.redraw();return true}for(let i=0;i<6;i++)if(inside(p,tk(i))){fill(TOK[i]);return true}}
 if(k==='blocks'){for(const j of[0,1])if(inside(p,jar(j))){give(j);return true}}
 if(k==='sling'&&inside(p,S.hand)&&S.fly==null){S.land=null;drag='sling';return true}
 if(k==='drop'&&inside(p,S.ball)&&S.fall==null){S.thud=null;drag='drop';return true}
 return false}
function move(p){if(drag==='card'){S.pos={x:p.x,y:p.y};A.redraw()}if(drag==='sling')setPull((A.W*.18-p.x)/(A.W*.025));if(drag==='drop')setH((A.H*.86-p.y)/(A.H*.17))}
function up(p){if(drag==='card'){const B=bins();if(inside(p,B.st))place('st');else if(inside(p,B.mv))place('mv');else{S.pos=null;A.redraw()}}if(drag==='sling'&&S.pull>0)letGo();drag=null}
const steps=[
{h:'Stored or on the move',p:'Energy makes things happen. Some energy is stored, waiting to be used. Some energy is on the move, going from place to place.',
 predict:{q:'A stretched rubber band is not moving. Does it have energy?',opts:['Yes, stored energy','No, it is not moving','Only if it gets warm'],ans:0},
 task:'Sort each card into Stored or On the move',show:()=>auto(0,ITEMS.map(it=>()=>place(it[1]))),
 go:()=>{reset({i:0,st:[],mv:[]});say('First card: Battery. Drag it into a box, or use the buttons.');controls();S.check=finish(0,()=>S.i===6,'Batteries, stretched bands and high-up things store energy.')}},
{h:'A torch changes energy',p:'Energy has names. A battery stores chemical energy. It flows in wires as electrical energy. A bulb gives it out as light and heat.',
 predict:{q:'Where does the light from a torch come from?',opts:['Energy stored in the battery','The bulb makes it from nothing','The switch'],ans:0},
 task:'Fill each gap with the right energy word',show:()=>auto(1,[['chem',0],['elec',1],['light',2],['heat',3]].map(([k,i])=>()=>{S.sel=i;fill(k)})),
 go:()=>{reset({v:[null,null,null,null],sel:0});say('A torch chain with 4 gaps. Tap a gap, then an energy word, or use the buttons.');controls();S.check=finish(1,torchOk,'Chemical → electrical → light and heat.')}},
{h:'Energy is never used up',p:'When a battery goes flat, its energy has not vanished. It changed into light and heat, which spread out into the room.',
 predict:{q:'An old torch bulb has been on for an hour. Where did most of the energy go?',opts:['Heat','Light','It vanished'],ans:0},
 task:'Move all 10 blocks out of the battery for an old bulb',show:()=>auto(2,[0,1,1,1,1,1,1,1,1,1].map(j=>()=>give(j))),
 go:()=>{reset({bat:10,light:0,heat:0});say('A battery with 10 energy blocks. Tap the Light or Heat jar, or use the buttons.');controls();S.check=finish(2,()=>S.bat===0&&S.heat>S.light,'All 10 blocks are still there. In a real old bulb only about 1 in 10 becomes light.')}},
{h:'Stretch it: elastic energy',p:'Stretching a band stores elastic energy. Let go and it turns into kinetic energy, the energy of movement.',
 predict:{q:'You pull the band back further. The ball will go\u2026',opts:['Further','The same distance','Less far'],ans:0},
 task:'Get the ball into the far box',show:()=>auto(3,[1,2,3,4,5].map(v=>()=>setPull(v)).concat([letGo])),
 go:()=>{reset({pull:0,land:null});say('A catapult. Drag the ball back, or use the buttons, then let go.');controls();S.check=finish(3,()=>S.land>=14,'More stretch, more stored energy, more speed.')}},
{h:'Lift it: gravitational energy',p:'Lifting something up stores gravitational energy. When it falls, that turns into kinetic energy. When it lands, it becomes sound and heat.',
 predict:{q:'Which drop lands with the bigger thump?',opts:['From the top shelf','From the bottom shelf','Both the same'],ans:0},
 task:'Lift the ball to the top shelf and drop it',show:()=>auto(4,[1,2,3,4].map(v=>()=>setH(v)).concat([drop])),
 go:()=>{reset({h:0});say('A ball on the floor next to 4 shelves. Drag it up, or use the buttons, then drop it.');controls();S.check=finish(4,()=>S.thud===4,'The higher it starts, the more energy it has to give.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A stretched spring is holding still. Which energy does it store?',[['Elastic','ok'],['Kinetic','still'],['Sound','out']]],
 ['A torch is switched on. What happens to the energy?',[['Chemical → electrical → light and heat','ok'],['The bulb makes new energy','make'],['Light → chemical','back']]],
 ['You ride a bike down a hill. Energy from the height turns into\u2026',[['Kinetic energy','ok'],['Chemical energy','store'],['Nothing: it is used up','gone']]],
 ['Where is the energy in your breakfast?',[['Stored as chemical energy','ok'],['There is none until you move','still'],['Only in hot food','hot']]],
 ['A radio battery goes flat. What happened to its energy?',[['It spread out as sound and heat','ok'],['It was destroyed','gone'],['It went back into the battery','back']]],
 ['Which of these is energy on the move?',[['Sound from a drum','ok'],['A book on a high shelf','store'],['A new battery','store']]]];
function why(t){let m='Ask: is the energy waiting in a store, or moving from place to place?';
 if(t==='still')m='Things that are not moving can still store energy, like a spring, food or a battery.';
 if(t==='out')m='Sound is energy on the move. A still spring stores elastic energy.';
 if(t==='make')m='Nothing makes energy from nothing. The bulb changes energy that came from the battery.';
 if(t==='back')m='Energy spreads out from the battery. It does not flow back and fill it up again.';
 if(t==='store')m='That energy is stored, waiting. Look for energy that is moving or spreading out.';
 if(t==='gone')m='Energy is never used up or destroyed. It changes into other kinds and spreads out.';
 if(t==='hot')m='Cold food stores energy too. It is chemical energy in the food, not heat.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Energy controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:p=>up(p)});controls()}});
A.start()})})();
